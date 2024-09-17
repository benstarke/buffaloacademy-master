export interface Enrollment {
    id: number;
    student_id: number;
    course_id:number;
    enrollment_date: string;
    start_date: string;
    end_date: string;
    created_by: string;
    created_at: string;
    updated_by?: string;
    updated_at?: string;
    duration: string;
  }

