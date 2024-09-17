export interface SystemAuditTrail {
  id: number;
  table_name: string;
  table_action: string;
  record_id?: number | null; // Updated to be optional and can be null
  prev_tabledata: string;
  current_tabledata: string;
  ip_address: string;
  created_by: string;
  created_at: string;
  updated_by?: string | null; // Updated to be optional and can be null
  updated_at?: string | null; // Updated to be optional and can be null
  altered_by?: string | null; // Updated to be optional and can be null
  altered_at?: string | null; // Updated to be optional and can be null
}
