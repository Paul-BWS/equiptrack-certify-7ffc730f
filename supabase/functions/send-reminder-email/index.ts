import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      SUPABASE_URL!,
      SUPABASE_SERVICE_ROLE_KEY!
    )

    const { companyId } = await req.json()

    // Fetch company details
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('name')
      .eq('id', companyId)
      .single()

    if (companyError) throw companyError

    // Fetch contacts for the company
    const { data: contacts, error: contactsError } = await supabase
      .from('contacts')
      .select('email, name')
      .eq('company_id', companyId)
      .eq('is_primary', true)

    if (contactsError) throw contactsError

    if (!contacts || contacts.length === 0) {
      throw new Error('No primary contact found for this company')
    }

    // Fetch equipment due for service
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    const { data: torqueWrenches, error: torqueError } = await supabase
      .from('torque_wrench')
      .select('model, serial_number, next_service_due')
      .eq('company_id', companyId)
      .lte('next_service_due', thirtyDaysFromNow.toISOString())
      .gt('next_service_due', new Date().toISOString())

    if (torqueError) throw torqueError

    const { data: tyreGauges, error: tyreError } = await supabase
      .from('tyre_gauges')
      .select('model, serial_number, next_service_due')
      .eq('company_id', companyId)
      .lte('next_service_due', thirtyDaysFromNow.toISOString())
      .gt('next_service_due', new Date().toISOString())

    if (tyreError) throw tyreError

    const equipment = [
      ...(torqueWrenches || []).map(tw => ({
        ...tw,
        type: 'Torque Wrench'
      })),
      ...(tyreGauges || []).map(tg => ({
        ...tg,
        type: 'Tyre Gauge'
      }))
    ].sort((a, b) => new Date(a.next_service_due).getTime() - new Date(b.next_service_due).getTime())

    if (equipment.length === 0) {
      throw new Error('No equipment due for service in the next 30 days')
    }

    const equipmentList = equipment.map(item => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.type}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.model}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.serial_number}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${new Date(item.next_service_due).toLocaleDateString()}</td>
      </tr>
    `).join('')

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Equipment Service Reminder</h2>
        <p>Dear ${contacts[0].name},</p>
        <p>This is a reminder that the following equipment for ${company.name} is due for service in the next 30 days:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 8px; border: 1px solid #ddd;">Type</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Model</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Serial Number</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Service Due</th>
            </tr>
          </thead>
          <tbody>
            ${equipmentList}
          </tbody>
        </table>

        <p style="margin-top: 20px;">Please contact us to schedule your service appointment.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">Best regards,<br>BWS Calibration</p>
        </div>
      </div>
    `

    // Send email using Resend with the default domain
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'BWS Calibration <onboarding@resend.dev>', // Using Resend's default domain
        to: [contacts[0].email],
        subject: `Equipment Service Reminder - ${company.name}`,
        html: emailHtml,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(`Failed to send email: ${error}`)
    }

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in send-reminder-email function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})