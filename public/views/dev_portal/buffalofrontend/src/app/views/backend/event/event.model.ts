export interface Event {
    id: number;
    title: string;
    description: string;
    image: string;
    topic?: string;
    goal?: string;
    location?: string;
    hosted_by: string;
    created_by: string;
    created_at: string;
    updated_by?: string;
    updated_at?: string;
    duration: string;
    event_day: string;
  }
  