export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  department_id: string | null;
  department_name?: string;
  star_count: number;
  badge: string | null;
}

export interface Kudos {
  id: string;
  sender_id: string;
  receiver_id: string;
  title: string;
  content: string;
  hashtags: string[];
  images: string[];
  media_type: 'image' | 'video' | null;
  is_anonymous: boolean;
  anonymous_name: string | null;
  hearts_count: number;
  created_at: string;
}

export interface CreateKudosPayload {
  receiver_id: string;
  title: string;
  content: string;
  hashtags: string[];
  images: string[];
  is_anonymous: boolean;
  anonymous_name: string | null;
}

export interface KudosWithUser extends Kudos {
  sender: UserProfile;
  receiver: UserProfile;
  is_hearted_by_me?: boolean;
}

export interface Heart {
  id: string;
  user_id: string;
  kudos_id: string;
  created_at: string;
}

export interface Hashtag {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface SecretBox {
  id: string;
  user_id: string;
  is_opened: boolean;
  gift_description: string | null;
  opened_at: string | null;
}

export interface SpotlightEntry {
  name: string;
  kudos_count: number;
}

export interface KudosStats {
  kudos_received: number;
  kudos_sent: number;
  hearts_received: number;
  secret_boxes_opened: number;
  secret_boxes_unopened: number;
}

export interface KudosFeedPage {
  data: KudosWithUser[];
  nextCursor: string | null;
}

export interface SecretBoxWithUser extends SecretBox {
  user: UserProfile;
}
