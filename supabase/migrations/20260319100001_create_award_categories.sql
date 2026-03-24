-- Create award_categories table for SAA 2025
CREATE TABLE IF NOT EXISTS award_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  thumbnail_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_award_categories_display_order ON award_categories (display_order);

-- RLS: authenticated read-only
ALTER TABLE award_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read award_categories"
  ON award_categories FOR SELECT
  TO authenticated
  USING (true);

-- Seed data: 6 award categories
INSERT INTO award_categories (name, slug, short_description, thumbnail_url, display_order) VALUES
  ('Top Talent', 'top-talent', 'Vinh danh top cá nhân xuất sắc trên mọi phương diện', '/images/award-top-talent.png', 1),
  ('Top Project', 'top-project', 'Vinh danh dự án xuất sắc trên mọi phương diện', '/images/award-top-project.png', 2),
  ('Top Project Leader', 'top-project-leader', 'Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá', '/images/award-top-project-leader.png', 3),
  ('Best Manager', 'best-manager', 'Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm', '/images/award-best-manager.png', 4),
  ('Signature 2025 - Creator', 'signature-2025-creator', 'Vinh danh cá nhân có đóng góp sáng tạo nổi bật và để lại dấu ấn riêng', '/images/award-signature-creator.png', 5),
  ('MVP (Most Valuable Person)', 'mvp', 'Vinh danh cá nhân có giá trị đóng góp lớn nhất cho tổ chức', '/images/award-mvp.png', 6);
