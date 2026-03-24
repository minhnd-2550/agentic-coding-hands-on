-- ============================================================
-- SEED DATA for remote Supabase (public tables only)
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Seed events
INSERT INTO public.events (event_date, venue, broadcast_note) VALUES
  ('2025-12-26T18:30:00+07:00', 'Âu Cơ Art Center', 'Tường thuật trực tiếp qua sóng Livestream')
ON CONFLICT DO NOTHING;

-- 2. Seed award categories
INSERT INTO public.award_categories (name, slug, short_description, thumbnail_url, display_order) VALUES
  ('Top Talent', 'top-talent', 'Vinh danh top cá nhân xuất sắc trên mọi phương diện', '/images/award-top-talent.png', 1),
  ('Top Project', 'top-project', 'Vinh danh dự án xuất sắc trên mọi phương diện', '/images/award-top-project.png', 2),
  ('Top Project Leader', 'top-project-leader', 'Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá', '/images/award-top-project-leader.png', 3),
  ('Best Manager', 'best-manager', 'Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm', '/images/award-best-manager.png', 4),
  ('Signature 2025 - Creator', 'signature-2025-creator', 'Vinh danh cá nhân có đóng góp sáng tạo nổi bật và để lại dấu ấn riêng', '/images/award-signature-creator.png', 5),
  ('MVP (Most Valuable Person)', 'mvp', 'Vinh danh cá nhân có giá trị đóng góp lớn nhất cho tổ chức', '/images/award-mvp.png', 6)
ON CONFLICT (slug) DO NOTHING;

-- 3. Seed departments
INSERT INTO public.departments (name) VALUES
  ('Engineering'), ('Design'), ('Product'), ('QA'),
  ('HR'), ('Marketing'), ('Sales'), ('Operations'),
  ('Finance'), ('Management')
ON CONFLICT (name) DO NOTHING;

-- 4. Seed hashtags (base + SAA)
INSERT INTO public.hashtags (name) VALUES
  ('Dedicated'), ('Inspiring'), ('Creative'), ('Leadership'),
  ('Teamwork'), ('Innovation'), ('Mentoring'), ('Problem Solving'),
  ('Communication'), ('Resilience'),
  ('High-performing'), ('BE PROFESSIONAL'), ('BE OPTIMISTIC'),
  ('BE A TEAM'), ('THINK OUTSIDE THE BOX'), ('GET RISKY'),
  ('GO FAST'), ('WASSHOI')
ON CONFLICT (name) DO NOTHING;
