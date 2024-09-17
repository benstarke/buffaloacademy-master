export interface Tag {
    id: number;
    name: string;
    description: string;
    created_by: number;
    created_at: string;
    updated_by: number | null;
    updated_at: string;
    author: string;
    duration: string; // Assuming duration is a string in human-readable format like "3 months ago"
}
