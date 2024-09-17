export interface Course {
    id: number;
    course_category_id: number;
    course_sub_category_id: number;
    course_type_id: number;
    course_difficulty_id: number;
    course_tag_id: number;
    title_en: string;
    title_bn: string;
    description_en: string;
    description_bn: string;
    type: string;
    price: string;
    old_price: string | null;
    subscription_price: string | null;
    start_from: string | null;
    duration: number;
    lesson: number;
    prerequisites_en: string;
    prerequisites_bn: string;
    difficulty: string;
    course_code: string | null;
    image: string;
    thumbnail_image: string;
    thumbnail_video: string;
    tag: string;
    status: number;
    language: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    instructor_id: number; 
    instructor_name: string;
    instructor_email: string;
    instructor_title: string;
    instructor_bio: string;
    instructor_image: string;
    instructor_designation: string;
    category_name: string;
    sub_category_name: string;
    course_type_name: string;
    course_tag_name: string;
    course_difficulty_name: string;

    // Curriculum
    curriculum?: CurriculumInfo[];
    curriculumLoaded?: boolean;
  }


  
interface CurriculumInfo {
  id: number;
  course_id: number;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  // FOR LESSON SUMMARY
  lessonSummary?: LessonSummary;
  lessonSummaryLoaded?: boolean;
  // for lessons
  lessons?: Lessons[];
  lessonsLoaded?: boolean;
}

export interface LessonSummary {
  total_lessons: number;
  total_duration: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export interface Lessons {
  id: number;
  title: string;
  course_curriculum_id: number;
  description: string;
  notes: string;
  minutes:number;
  seconds:number;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  // materials
  materials?: Materials[];
  materialsLoaded?: boolean;
}


export interface Materials {
  id: number;
  lesson_id: number;
  title: string;
  type: string;
  content: string;
  content_url: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
}


  