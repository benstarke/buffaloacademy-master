export interface Tag {
    id: number;
    name: string;
    description: string;
    code?: string;
    is_enabled?: number;
    created_by: string;
    created_at: string;
    updated_by?: string;
    updated_at?: string;
    altered_by?: string;
    altered_on?: string;
    author: string;
    duration: string;
  }
  