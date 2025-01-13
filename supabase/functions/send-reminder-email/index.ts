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
const generateEmailTemplate = (companyName: string, equipmentList: Equipment[]) => {
  const settings = {
    logo: "/logo.png" // This will be replaced with the actual logo URL from settings
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #266bec; margin-bottom: 10px;">BWS Calibration Services Ltd</h1>
        <p style="color: #4b5563; margin: 0;">Unit 1 Tungsten Park</p>
        <p style="color: #4b5563; margin: 0;">Coventry Road, Hinckley</p>
        <p style="color: #4b5563; margin: 0;">Leicestershire, LE10 0NB</p>
      </div>

      <p style="margin-bottom: 20px; color: #374151;">Dear ${companyName},</p>
      
      <p style="margin-bottom: 20px; color: #374151;">This email serves as a friendly reminder that the following equipment requires recalibration/retesting soon:</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        ${equipmentList.map(item => `
          <div style="margin-bottom: 20px; color: #4b5563;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937;">Equipment Details</h3>
            <p style="margin: 4px 0;">Model: ${item.model}</p>
            <p style="margin: 4px 0;">Serial Number: ${item.serial_number}</p>
            <p style="margin: 4px 0;">Next Service Due: ${new Date(item.next_service_due).toLocaleDateString('en-GB')}</p>
          </div>
        `).join('')}
      </div>
      
      <p style="margin-bottom: 20px; color: #374151;">Action Required: None - our service coordinator team will be in contact to book your recalibration/retest with our engineers before the expiration date to ensure:</p>
      <ul style="color: #374151; margin-bottom: 20px;">
        <li>Continued accuracy of measurements</li>
        <li>Compliance with quality standards</li>
        <li>Uninterrupted operational capability</li>
      </ul>

      <p style="margin-bottom: 20px; color: #374151;">If you have any questions or need assistance, please contact Cathy or Clare on 0161 223 1843.</p>

      <div style="margin-top: 30px;">
        <p style="margin-bottom: 5px; color: #374151;">Best regards,</p>
        <p style="margin-top: 0; color: #266bec; font-weight: 600;">Service Department, BWS LTD</p>
      </div>
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <div style="text-align: center;">
          <p style="color: #266bec; font-weight: 600; margin-bottom: 15px;">Contact Information</p>
          <p style="color: #4b5563; margin: 5px 0;">Telephone: +44 (0)1455 245700</p>
          <p style="color: #4b5563; margin: 5px 0;">Email: calibration@bws-uk.com</p>
          <p style="color: #4b5563; margin: 5px 0;">Website: www.basicwelding.co.uk</p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280;">
          <p style="margin: 3px 0;">BWS Calibration Services Ltd | Registered in England & Wales</p>
          <p style="margin: 3px 0;">Company Registration No: 03334319 | VAT No: GB123456789</p>
        </div>
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
          const emailHtml = generateEmailTemplate(company.name, equipmentByCompany[companyId]);

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "BWS <calibration@bws-uk.com>",
              to: primaryContacts.map((contact) => contact.email),
              subject: "Equipment Calibration Reminder - Upcoming Retest Due",
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
