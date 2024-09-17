export interface Course {
  id: number;
  title_en: string;
  course_category_id: number;
  course_sub_category_id: number;
  course_type_id: number;
  course_difficulty_id: number;
  course_tag_id: number;
  course_status_id: number;
  price: number;
  old_price: number;
  subscription_price: number;
  start_from: string;
  lesson: number;
  course_code: number;
  image: string;
  thumbnail_image: string;
  thumbnail_video: string;
  status: number;
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  duration: string;
}

