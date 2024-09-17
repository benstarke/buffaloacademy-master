export interface Lesson {
  id: number;
  title: string;
  course_curriculum_id: number;
  description: string;
  notes: string;
  minutes: number;
  seconds: number;
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  duration: string;
}

