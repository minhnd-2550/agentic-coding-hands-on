-- Add title, is_anonymous, anonymous_name columns for Write Kudos feature
ALTER TABLE public.kudos
  ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS is_anonymous boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS anonymous_name text;

-- Seed titles for existing kudos data
UPDATE public.kudos SET title = 'Người em phi thường' WHERE id = '10000000-0000-0000-0000-000000000001';
UPDATE public.kudos SET title = 'Leader tuyệt vời nhất team' WHERE id = '10000000-0000-0000-0000-000000000002';
UPDATE public.kudos SET title = 'Thành viên tích cực nhất' WHERE id = '10000000-0000-0000-0000-000000000003';
UPDATE public.kudos SET title = 'Người định hướng sản phẩm' WHERE id = '10000000-0000-0000-0000-000000000004';
UPDATE public.kudos SET title = 'Backend developer xuất sắc' WHERE id = '10000000-0000-0000-0000-000000000005';
UPDATE public.kudos SET title = 'Mắt thẩm mỹ tuyệt vời' WHERE id = '10000000-0000-0000-0000-000000000006';
UPDATE public.kudos SET title = 'Marketing siêu đỉnh', is_anonymous = true, anonymous_name = 'Người hâm mộ bí ẩn' WHERE id = '10000000-0000-0000-0000-000000000007';
UPDATE public.kudos SET title = 'Trụ cột tinh thần của team' WHERE id = '10000000-0000-0000-0000-000000000008';
UPDATE public.kudos SET title = 'Bậc thầy tối ưu quy trình' WHERE id = '10000000-0000-0000-0000-000000000009';
UPDATE public.kudos SET title = 'QA chuyên nghiệp nhất' WHERE id = '10000000-0000-0000-0000-000000000010';
