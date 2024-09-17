
import { SafeHtml } from '@angular/platform-browser';

export interface Blog {
    id: number;
    tags_id: number;
    blog_categories_id: number;
    name: string;
    description: SafeHtml; // Updated to SafeHtml type
    code?: string | null;
    is_enabled: number;
    blog_image_path?: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    author: string;
    tag_name: string;
    category_name: string;
  }
  