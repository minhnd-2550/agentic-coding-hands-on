export type Event = {
  id: string;
  event_date: string;
  venue: string;
  broadcast_note: string | null;
  created_at: string;
};

export type AwardCategory = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  thumbnail_url: string | null;
  display_order: number;
  created_at: string;
};
