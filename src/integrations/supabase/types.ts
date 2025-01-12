export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      certificates: {
        Row: {
          certification_number: string
          created_at: string
          expiry_date: string
          id: string
          issue_date: string
          torque_wrench_id: string | null
          updated_at: string
        }
        Insert: {
          certification_number: string
          created_at?: string
          expiry_date: string
          id?: string
          issue_date: string
          torque_wrench_id?: string | null
          updated_at?: string
        }
        Update: {
          certification_number?: string
          created_at?: string
          expiry_date?: string
          id?: string
          issue_date?: string
          torque_wrench_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_torque_wrench_id_fkey"
            columns: ["torque_wrench_id"]
            isOneToOne: false
            referencedRelation: "torque_wrench"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string
          billingaddress: string | null
          created_at: string
          group_id: string | null
          id: string
          industry: string
          name: string
          notes: string | null
          useseparatebillingaddress: boolean | null
          website: string | null
        }
        Insert: {
          address: string
          billingaddress?: string | null
          created_at?: string
          group_id?: string | null
          id?: string
          industry: string
          name: string
          notes?: string | null
          useseparatebillingaddress?: boolean | null
          website?: string | null
        }
        Update: {
          address?: string
          billingaddress?: string | null
          created_at?: string
          group_id?: string | null
          id?: string
          industry?: string
          name?: string
          notes?: string | null
          useseparatebillingaddress?: boolean | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "company_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      company_groups: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company_id: string | null
          created_at: string
          email: string
          id: string
          is_primary: boolean | null
          name: string
          phone: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email: string
          id?: string
          is_primary?: boolean | null
          name: string
          phone: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string
          id?: string
          is_primary?: boolean | null
          name?: string
          phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          address: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      service_records: {
        Row: {
          created_at: string
          equipment_id: string | null
          id: string
          notes: string | null
          service_date: string
          service_type: string
          technician: string
        }
        Insert: {
          created_at?: string
          equipment_id?: string | null
          id?: string
          notes?: string | null
          service_date: string
          service_type: string
          technician: string
        }
        Update: {
          created_at?: string
          equipment_id?: string | null
          id?: string
          notes?: string | null
          service_date?: string
          service_type?: string
          technician?: string
        }
        Relationships: []
      }
      torque_wrench: {
        Row: {
          cert_number: string | null
          company_id: string
          created_at: string
          definitive_readings: Json | null
          engineer: string | null
          id: string
          last_service_date: string | null
          max_torque: number | null
          min_torque: number | null
          model: string | null
          next_service_due: string | null
          notes: string | null
          readings: Json | null
          result: string | null
          serial_number: string | null
          status: string | null
          units: string | null
          updated_at: string
        }
        Insert: {
          cert_number?: string | null
          company_id: string
          created_at?: string
          definitive_readings?: Json | null
          engineer?: string | null
          id?: string
          last_service_date?: string | null
          max_torque?: number | null
          min_torque?: number | null
          model?: string | null
          next_service_due?: string | null
          notes?: string | null
          readings?: Json | null
          result?: string | null
          serial_number?: string | null
          status?: string | null
          units?: string | null
          updated_at?: string
        }
        Update: {
          cert_number?: string | null
          company_id?: string
          created_at?: string
          definitive_readings?: Json | null
          engineer?: string | null
          id?: string
          last_service_date?: string | null
          max_torque?: number | null
          min_torque?: number | null
          model?: string | null
          next_service_due?: string | null
          notes?: string | null
          readings?: Json | null
          result?: string | null
          serial_number?: string | null
          status?: string | null
          units?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tyre_gauges: {
        Row: {
          cert_number: string | null
          company_id: string
          created_at: string
          definitive_readings: Json | null
          engineer: string | null
          id: string
          last_service_date: string | null
          max_pressure: number | null
          min_pressure: number | null
          model: string | null
          next_service_due: string | null
          notes: string | null
          readings: Json | null
          result: string | null
          sent_on: string | null
          serial_number: string | null
          status: string | null
          units: string | null
          updated_at: string
        }
        Insert: {
          cert_number?: string | null
          company_id: string
          created_at?: string
          definitive_readings?: Json | null
          engineer?: string | null
          id?: string
          last_service_date?: string | null
          max_pressure?: number | null
          min_pressure?: number | null
          model?: string | null
          next_service_due?: string | null
          notes?: string | null
          readings?: Json | null
          result?: string | null
          sent_on?: string | null
          serial_number?: string | null
          status?: string | null
          units?: string | null
          updated_at?: string
        }
        Update: {
          cert_number?: string | null
          company_id?: string
          created_at?: string
          definitive_readings?: Json | null
          engineer?: string | null
          id?: string
          last_service_date?: string | null
          max_pressure?: number | null
          min_pressure?: number | null
          model?: string | null
          next_service_due?: string | null
          notes?: string | null
          readings?: Json | null
          result?: string | null
          sent_on?: string | null
          serial_number?: string | null
          status?: string | null
          units?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tyre_gauges_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_companies: {
        Row: {
          company_id: string
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_company_groups: {
        Row: {
          created_at: string
          group_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          group_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          group_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_company_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "company_groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
