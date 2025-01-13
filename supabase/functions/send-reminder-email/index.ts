import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Equipment {
  id: string;
  model: string;
  serial_number: string;
  next_service_due: string;
  company_id: string;
}

interface Company {
  id: string;
  name: string;
  contacts: Array<{
    email: string;
    name: string;
    is_primary: boolean;
  }>;
}

// Function to generate the email HTML template
const generateEmailTemplate = (companyName: string, equipmentList: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; margin-bottom: 20px;">Equipment Service Reminder</h2>
      
      <p style="margin-bottom: 15px;">Dear ${companyName},</p>
      
      <p style="margin-bottom: 15px;">The following equipment is due for service in the next 30 days:</p>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        ${equipmentList.split('\n').map(item => `<div style="margin-bottom: 10px;">${item}</div>`).join('')}
      </div>
      
      <p style="margin-bottom: 15px;">Please contact us as soon as possible to schedule your service appointment.</p>
      
      <p style="margin-bottom: 5px;">Best regards,</p>
      <p style="margin-top: 0;">BWS Calibration Team</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
        <p>For urgent inquiries, please contact us directly at:</p>
        <p>Phone: +44 (0)1455 245700</p>
        <p>Email: calibration@bws-uk.com</p>
      </div>
    </div>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get equipment due for service in the next 30 days
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    // Query both torque wrenches and tyre gauges
    const [{ data: torqueWrenches }, { data: tyreGauges }] = await Promise.all([
      supabase
        .from('torque_wrench')
        .select('id, model, serial_number, next_service_due, company_id')
        .gte('next_service_due', today.toISOString())
        .lte('next_service_due', thirtyDaysFromNow.toISOString()),
      supabase
        .from('tyre_gauges')
        .select('id, model, serial_number, next_service_due, company_id')
        .gte('next_service_due', today.toISOString())
        .lte('next_service_due', thirtyDaysFromNow.toISOString())
    ]);

    const equipment = [...(torqueWrenches || []), ...(tyreGauges || [])];
    
    // Group equipment by company
    const equipmentByCompany: { [key: string]: Equipment[] } = {};
    equipment.forEach((item) => {
      if (!equipmentByCompany[item.company_id]) {
        equipmentByCompany[item.company_id] = [];
      }
      equipmentByCompany[item.company_id].push(item);
    });

    // Get company details and contacts
    for (const companyId of Object.keys(equipmentByCompany)) {
      const { data: company } = await supabase
        .from('companies')
        .select(`
          id,
          name,
          contacts (
            email,
            name,
            is_primary
          )
        `)
        .eq('id', companyId)
        .single();

      if (company && company.contacts) {
        // Send email to primary contacts
        const primaryContacts = company.contacts.filter(
          (contact) => contact.is_primary
        );

        if (primaryContacts.length > 0) {
          const equipmentList = equipmentByCompany[companyId]
            .map(
              (item) =>
                `${item.model} (Serial: ${item.serial_number}) - Due: ${new Date(
                  item.next_service_due
                ).toLocaleDateString('en-GB')}`
            )
            .join('\n');

          const emailHtml = generateEmailTemplate(company.name, equipmentList);

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "BWS <calibration@bws-uk.com>",
              to: primaryContacts.map((contact) => contact.email),
              subject: "Equipment Service Reminder - 30 Day Notice",
              html: emailHtml,
            }),
          });

          if (!res.ok) {
            console.error(`Failed to send email to ${company.name}:`, await res.text());
          }
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-reminder-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);