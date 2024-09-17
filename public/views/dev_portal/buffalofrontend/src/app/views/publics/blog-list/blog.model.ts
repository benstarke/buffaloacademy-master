// blog.model.ts

import { SafeHtml } from '@angular/platform-browser';

export interface Blog {
  id: number;
  tags_id: number;
  blog_categories_id: number;
  name: string;
  description: SafeHtml; // Use SafeHtml type for description
  code: string | null;
  is_enabled: number;
  blog_image_path: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  category_name: string;
  tag_name: string;
  author: string;
  duration: string;  // Add this field
}

  export interface Category {
    id: number;
    name: string;
    author: string;
    code: string | null;
  }
  
  export interface Tag {
    id: number;
    name: string;
  }
  