export interface Material {
  id: number;
  title: string;
  lesson_id: number;
  type: string;
  content: string;
  content_url: string;
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
}

