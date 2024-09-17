export interface Permission {
    id: number;
    name: string;
    identity: string;
    code?: string;
    is_enabled?: number;
    created_by: string;
    created_at: string;
    updated_by?: string;
    updated_at?: string;
    author: string;
    duration: string;
  }
  