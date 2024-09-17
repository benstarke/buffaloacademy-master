export interface BlogStatus {
    id: number;
    name: string;
    description: string;
    code?: string | null;
    is_enabled: number;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    altered_by: string | null;
    altered_on: string | null;
    author: string;
  }
  