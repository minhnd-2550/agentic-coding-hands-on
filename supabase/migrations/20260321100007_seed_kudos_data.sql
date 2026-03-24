-- ============================================================
-- SEED DATA for Sun* Kudos - Full development/testing dataset
-- Run: supabase db reset (applies all migrations + seeds)
-- ============================================================

-- 0. Seed auth.users (required for profiles FK constraint)
-- Password for all test users: password123
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
) VALUES
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated',
   'nhat@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"full_name":"Huỳnh Dương Xuân Nhật"}', now(), now()),

  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated',
   'xuan@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"full_name":"Huỳnh Dương Xuân"}', now(), now()),

  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000003', 'authenticated', 'authenticated',
   'linh@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"full_name":"Nguyễn Hoàng Linh"}', now(), now()),

  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000004', 'authenticated', 'authenticated',
   'quy@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"full_name":"Nguyễn Văn Quý"}', now(), now()),

  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000005', 'authenticated', 'authenticated',
   'hiep@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"full_name":"Đỗ Hoàng Hiệp"}', now(), now()),

  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000006', 'authenticated', 'authenticated',
   'duc@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"full_name":"Trần Minh Đức"}', now(), now()),

  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000007', 'authenticated', 'authenticated',
   'hong@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"full_name":"Lê Thị Hồng"}', now(), now()),

  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000008', 'authenticated', 'authenticated',
   'an@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"full_name":"Phạm Văn An"}', now(), now()),

  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000009', 'authenticated', 'authenticated',
   'hai@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"full_name":"Võ Thanh Hải"}', now(), now()),

  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000010', 'authenticated', 'authenticated',
   'tuan@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"full_name":"Ngô Quốc Tuấn"}', now(), now())
ON CONFLICT (id) DO NOTHING;

-- 0b. Seed auth.identities (required by Supabase auth)
INSERT INTO auth.identities (
  id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001',
   '{"sub":"00000000-0000-0000-0000-000000000001","email":"nhat@sun-asterisk.com"}', 'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002',
   '{"sub":"00000000-0000-0000-0000-000000000002","email":"xuan@sun-asterisk.com"}', 'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003',
   '{"sub":"00000000-0000-0000-0000-000000000003","email":"linh@sun-asterisk.com"}', 'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004',
   '{"sub":"00000000-0000-0000-0000-000000000004","email":"quy@sun-asterisk.com"}', 'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005',
   '{"sub":"00000000-0000-0000-0000-000000000005","email":"hiep@sun-asterisk.com"}', 'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006',
   '{"sub":"00000000-0000-0000-0000-000000000006","email":"duc@sun-asterisk.com"}', 'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000007',
   '{"sub":"00000000-0000-0000-0000-000000000007","email":"hong@sun-asterisk.com"}', 'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000008',
   '{"sub":"00000000-0000-0000-0000-000000000008","email":"an@sun-asterisk.com"}', 'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000009',
   '{"sub":"00000000-0000-0000-0000-000000000009","email":"hai@sun-asterisk.com"}', 'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000010',
   '{"sub":"00000000-0000-0000-0000-000000000010","email":"tuan@sun-asterisk.com"}', 'email', now(), now(), now())
ON CONFLICT DO NOTHING;

-- 1. Seed profiles (UPSERT: trigger may have created basic ones from auth.users)
INSERT INTO public.profiles (id, name, email, avatar_url, department_id, star_count, badge) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Huỳnh Dương Xuân Nhật', 'nhat@sun-asterisk.com', null,
   (SELECT id FROM public.departments WHERE name = 'Engineering' LIMIT 1), 120, 'Legend Hero'),
  ('00000000-0000-0000-0000-000000000002', 'Huỳnh Dương Xuân', 'xuan@sun-asterisk.com', null,
   (SELECT id FROM public.departments WHERE name = 'Design' LIMIT 1), 85, 'Rising Hero'),
  ('00000000-0000-0000-0000-000000000003', 'Nguyễn Hoàng Linh', 'linh@sun-asterisk.com', null,
   (SELECT id FROM public.departments WHERE name = 'Product' LIMIT 1), 200, 'Super Hero'),
  ('00000000-0000-0000-0000-000000000004', 'Nguyễn Văn Quý', 'quy@sun-asterisk.com', null,
   (SELECT id FROM public.departments WHERE name = 'Engineering' LIMIT 1), 95, 'New Hero'),
  ('00000000-0000-0000-0000-000000000005', 'Đỗ Hoàng Hiệp', 'hiep@sun-asterisk.com', null,
   (SELECT id FROM public.departments WHERE name = 'QA' LIMIT 1), 60, null),
  ('00000000-0000-0000-0000-000000000006', 'Trần Minh Đức', 'duc@sun-asterisk.com', null,
   (SELECT id FROM public.departments WHERE name = 'Engineering' LIMIT 1), 45, null),
  ('00000000-0000-0000-0000-000000000007', 'Lê Thị Hồng', 'hong@sun-asterisk.com', null,
   (SELECT id FROM public.departments WHERE name = 'Design' LIMIT 1), 30, null),
  ('00000000-0000-0000-0000-000000000008', 'Phạm Văn An', 'an@sun-asterisk.com', null,
   (SELECT id FROM public.departments WHERE name = 'Marketing' LIMIT 1), 25, null),
  ('00000000-0000-0000-0000-000000000009', 'Võ Thanh Hải', 'hai@sun-asterisk.com', null,
   (SELECT id FROM public.departments WHERE name = 'HR' LIMIT 1), 15, null),
  ('00000000-0000-0000-0000-000000000010', 'Ngô Quốc Tuấn', 'tuan@sun-asterisk.com', null,
   (SELECT id FROM public.departments WHERE name = 'Operations' LIMIT 1), 10, null)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  department_id = EXCLUDED.department_id,
  star_count = EXCLUDED.star_count,
  badge = EXCLUDED.badge;

-- 2. Seed SAA hashtags (supplement the generic ones from create migration)
INSERT INTO public.hashtags (name) VALUES
  ('High-performing'),
  ('BE PROFESSIONAL'),
  ('BE OPTIMISTIC'),
  ('BE A TEAM'),
  ('THINK OUTSIDE THE BOX'),
  ('GET RISKY'),
  ('GO FAST'),
  ('WASSHOI')
ON CONFLICT (name) DO NOTHING;

-- 3. Seed kudos (10 appreciation messages)
-- Note: title/is_anonymous/anonymous_name columns added in later migration
INSERT INTO public.kudos (id, sender_id, receiver_id, content, hashtags, images, media_type, hearts_count, created_at) VALUES
  ('10000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000002',
   E'Cảm ơn người em bình thường nhưng phi thường :D\nCảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. <3 và cuộc sống...',
   ARRAY['Dedicated', 'Inspiring', 'Creative'],
   '{}', null, 1000,
   '2025-10-30T10:00:00Z'),

  ('10000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000003',
   '00000000-0000-0000-0000-000000000001',
   E'Anh Nhật là một người leader tuyệt vời! Luôn sẵn sàng hỗ trợ và chia sẻ kinh nghiệm cho team.\nCảm ơn anh đã giúp em rất nhiều trong dự án vừa rồi.',
   ARRAY['Leadership', 'Mentoring', 'Dedicated'],
   '{}', null, 850,
   '2025-10-30T09:30:00Z'),

  ('10000000-0000-0000-0000-000000000003',
   '00000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000004',
   E'Quý là thành viên tích cực nhất team mình!\nLuôn hoàn thành task đúng deadline và chất lượng code rất tốt. Keep it up!',
   ARRAY['Dedicated', 'Innovation'],
   '{}', null, 720,
   '2025-10-30T08:45:00Z'),

  ('10000000-0000-0000-0000-000000000004',
   '00000000-0000-0000-0000-000000000005',
   '00000000-0000-0000-0000-000000000003',
   E'Chị Linh đã giúp team product định hướng sản phẩm rất tốt.\nNhờ chị mà team dev hiểu rõ requirement và giảm thiểu bug rất nhiều. Cảm ơn chị!',
   ARRAY['Communication', 'Problem Solving'],
   '{}', null, 650,
   '2025-10-29T16:00:00Z'),

  ('10000000-0000-0000-0000-000000000005',
   '00000000-0000-0000-0000-000000000004',
   '00000000-0000-0000-0000-000000000006',
   E'Đức là một backend developer xuất sắc. API của Đức luôn chạy mượt và performance rất tốt.\nTeam FE rất thích làm việc với API của Đức.',
   ARRAY['Innovation', 'Dedicated', 'Teamwork'],
   '{}', null, 500,
   '2025-10-29T14:30:00Z'),

  ('10000000-0000-0000-0000-000000000006',
   '00000000-0000-0000-0000-000000000006',
   '00000000-0000-0000-0000-000000000007',
   E'Hồng là designer có mắt thẩm mỹ rất tốt. Mọi design đều rất đẹp và dễ hiểu.\nCảm ơn Hồng đã làm cho sản phẩm của team thêm đẹp hơn!',
   ARRAY['Creative', 'Inspiring'],
   '{}', null, 430,
   '2025-10-29T11:00:00Z'),

  ('10000000-0000-0000-0000-000000000007',
   '00000000-0000-0000-0000-000000000007',
   '00000000-0000-0000-0000-000000000008',
   E'An đã làm rất tốt trong việc quảng bá sản phẩm ra thị trường.\nSố lượng user tăng 30% kể từ khi An tham gia team marketing.',
   ARRAY['Leadership', 'Communication'],
   '{}', null, 380,
   '2025-10-28T15:00:00Z'),

  ('10000000-0000-0000-0000-000000000008',
   '00000000-0000-0000-0000-000000000008',
   '00000000-0000-0000-0000-000000000009',
   E'Hải luôn lo lắng cho sức khoẻ và tinh thần của cả team.\nNhờ Hải mà team luôn có những buổi team building vui vẻ. Cảm ơn Hải!',
   ARRAY['Teamwork', 'Resilience'],
   '{}', null, 310,
   '2025-10-28T10:30:00Z'),

  ('10000000-0000-0000-0000-000000000009',
   '00000000-0000-0000-0000-000000000009',
   '00000000-0000-0000-0000-000000000010',
   E'Tuấn rất giỏi trong việc tối ưu hoá quy trình làm việc.\nNhờ Tuấn mà team tiết kiệm được rất nhiều thời gian và công sức.',
   ARRAY['Innovation', 'Problem Solving'],
   '{}', null, 250,
   '2025-10-27T09:00:00Z'),

  ('10000000-0000-0000-0000-000000000010',
   '00000000-0000-0000-0000-000000000010',
   '00000000-0000-0000-0000-000000000005',
   E'Hiệp là QA rất kĩ tính và chuyên nghiệp.\nMọi bug đều được report chi tiết, giúp dev fix nhanh chóng. Cảm ơn Hiệp!',
   ARRAY['Dedicated', 'Communication', 'Resilience'],
   '{}', null, 180,
   '2025-10-26T13:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- 4. Seed hearts (some users hearted some kudos)
INSERT INTO public.hearts (user_id, kudos_id) VALUES
  ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004'),
  ('00000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000005'),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000006')
ON CONFLICT (user_id, kudos_id) DO NOTHING;

-- 5. Seed secret boxes
INSERT INTO public.secret_boxes (user_id, is_opened, gift_description, opened_at) VALUES
  ('00000000-0000-0000-0000-000000000001', true, 'Nhận được 1 sổ phong SAA', now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000001', true, 'Nhận được 1 voucher Grab 100k', now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000001', false, null, null),
  ('00000000-0000-0000-0000-000000000001', false, null, null),
  ('00000000-0000-0000-0000-000000000002', true, 'Nhận được 1 áo phông SAA', now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000003', true, 'Nhận được 1 pin SAA', now() - interval '30 minutes'),
  ('00000000-0000-0000-0000-000000000004', true, 'Nhận được 1 voucher Coffee 50k', now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000005', true, 'Nhận được 1 sổ phong SAA', now() - interval '4 hours'),
  ('00000000-0000-0000-0000-000000000006', true, 'Nhận được 1 sticker pack SAA', now() - interval '6 hours'),
  ('00000000-0000-0000-0000-000000000007', true, 'Nhận được 1 cap SAA', now() - interval '7 hours'),
  ('00000000-0000-0000-0000-000000000008', true, 'Nhận được 1 túi SAA', now() - interval '8 hours'),
  ('00000000-0000-0000-0000-000000000009', true, 'Nhận được 1 bình nước SAA', now() - interval '9 hours'),
  ('00000000-0000-0000-0000-000000000010', true, 'Nhận được 1 voucher Shopee 200k', now() - interval '10 hours')
ON CONFLICT DO NOTHING;

-- 6. Seed notifications (for user 1 — the default test user)
INSERT INTO public.notifications (user_id, title, body, read, created_at) VALUES
  ('00000000-0000-0000-0000-000000000001',
   'Bạn nhận được Kudos mới!',
   'Nguyễn Hoàng Linh đã gửi lời cảm ơn đến bạn.',
   false, now() - interval '10 minutes'),
  ('00000000-0000-0000-0000-000000000001',
   'Kudos của bạn nhận được 100 tim!',
   'Kudos bạn gửi cho Huỳnh Dương Xuân đã nhận được 100 tim.',
   false, now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000001',
   'Bạn có Secret Box mới!',
   'Hãy mở để nhận phần quà bất ngờ.',
   true, now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000001',
   'Chào mừng đến SAA 2025!',
   'Hãy khám phá hệ thống giải thưởng và gửi Kudos cho đồng đội.',
   true, now() - interval '1 day'),
  ('00000000-0000-0000-0000-000000000001',
   'Kudos của bạn đã lên Highlight!',
   'Kudos bạn gửi cho Huỳnh Dương Xuân đã được chọn vào Highlight.',
   true, now() - interval '2 days'),
  -- Notifications for user 2
  ('00000000-0000-0000-0000-000000000002',
   'Bạn nhận được Kudos mới!',
   'Huỳnh Dương Xuân Nhật đã gửi lời cảm ơn đến bạn.',
   false, now() - interval '30 minutes'),
  ('00000000-0000-0000-0000-000000000002',
   'Bạn có Secret Box mới!',
   'Hãy mở để nhận phần quà bất ngờ.',
   true, now() - interval '5 hours'),
  -- Notifications for user 3
  ('00000000-0000-0000-0000-000000000003',
   'Bạn nhận được Kudos mới!',
   'Đỗ Hoàng Hiệp đã gửi lời cảm ơn đến bạn.',
   false, now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000003',
   'Kudos của bạn nhận được 50 tim!',
   'Kudos bạn gửi cho Huỳnh Dương Xuân Nhật đã nhận được 50 tim.',
   true, now() - interval '6 hours')
ON CONFLICT DO NOTHING;
