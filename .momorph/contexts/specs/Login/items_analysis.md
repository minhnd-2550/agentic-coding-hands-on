# Items Analysis - Login

## Screen Context
- **Screen Purpose**: Màn hình đăng nhập cho ứng dụng Sun Annual Awards (SAA) 2025. Người dùng đăng nhập bằng tài khoản Google (chỉ domain @sun-asterisk.com) để truy cập hệ thống.
- **Target User Type**: Nhân viên Sun* (IT; Digital service) - chỉ tài khoản @sun-asterisk.com

## Responsive Behavior (Constitution Principle III)
- **Mobile (320px+)**: Layout dọc full-width. Key visual co giãn theo chiều rộng. Tiêu đề 'ROOT FURTHER' thu nhỏ font size. Nút 'LOGIN With Google' full-width với padding phù hợp. Header: logo thu nhỏ; language selector giữ nguyên vị trí góc phải. Footer căn giữa.
- **Tablet (768px+)**: Layout tương tự desktop nhưng key visual có thể bị crop hai bên. Tiêu đề và nội dung giữ tỷ lệ đọc thoải mái.
- **Desktop (1024px+)**: Layout như thiết kế gốc. Key visual hiển thị đầy đủ. Nội dung và nút đăng nhập căn trái trong khu vực hero.

## Security Context (Constitution Principle IV)
- Xác thực qua Google OAuth 2.0 thông qua Supabase Auth
- Chỉ tài khoản Google với domain `@sun-asterisk.com` được phép đăng nhập
- Rate limiting: Tối đa 5 lần đăng nhập thất bại; sau đó tạm khóa (account lockout)
- Session được quản lý bằng cookie qua `@supabase/ssr`
- Middleware (`src/libs/supabase/middleware.ts`) refresh session tự động
- Không lưu token trong localStorage/sessionStorage (chỉ lưu language preference trong localStorage)
- CSRF protection thông qua Supabase SSR cookie handling
- Người dùng đã đăng nhập PHẢI được redirect tự động đến Homepage SAA

## Internationalization (i18n)
- Ngôn ngữ khả dụng: VN; EN; JP
- Khi đổi ngôn ngữ; toàn bộ giao diện được dịch lại (full i18n)
- Language preference được lưu trong `localStorage`
- Default language: VN

---

### Item A: Header (`662:14391`)

- hasChildren: true
- Name JP: ヘッダー
- Name Trans: Header
- Item Type: others
- Item Subtype: navigation
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Thanh đầu trang chứa logo và bộ chọn ngôn ngữ.

Display Elements:
  - Logo (A.1): Biểu tượng Sun Annual Awards 2025 ở góc trái
  - Language selector (A.2): Nút chọn ngôn ngữ 'VN' với cờ Việt Nam ở góc phải

Function & Logic:
  - Logo: Không tương tác trên trang login (trên các trang khác sau login; click logo dẫn về Homepage SAA)
  - Language selector: Click mở dropdown chọn ngôn ngữ (VN; EN; JP)
  - Responsive: Trên mobile; header co giãn full-width; logo thu nhỏ; language selector giữ nguyên góc phải

Candidate QA:

---

### Item A.1: Logo (`I662:14391;186:2166`)

- hasChildren: false
- Name JP: ロゴ
- Name Trans: Logo Sun Annual Awards 2025
- Item Type: others
- Item Subtype: logo
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Logo 'Sun Annual Awards 2025' ở góc trên trái của header.

Display Elements:
  - Icon: Biểu tượng SAA 2025

Function & Logic:
  - Trang login: Không tương tác (đây là trang đầu tiên)
  - Các trang khác (sau login): Click dẫn về Homepage SAA

Candidate QA:

---

### Item A.2: Language (`I662:14391;186:1601`)

- hasChildren: false
- Name JP: 言語切り替え
- Name Trans: Language Selector
- Item Type: button
- Item Subtype:
- Button Type: toggle
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value: VN
- User Action: on_click
- Transition Note: Mở dropdown hiển thị danh sách ngôn ngữ: VN; EN; JP (linked frame: 721:4942 - Dropdown-ngôn ngữ)
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Nút chọn ngôn ngữ hiển thị ngôn ngữ hiện tại và mở menu lựa chọn.

Display Elements:
  - Cờ: Icon cờ quốc gia tương ứng bên trái
  - Text: Mã ngôn ngữ hiện tại ('VN' / 'EN' / 'JP')
  - Chevron: Mũi tên xuống nhỏ bên phải

Function & Logic:
  - Click: Mở dropdown để chọn ngôn ngữ (VN; EN; JP) (linked frame: 721:4942 - Dropdown-ngôn ngữ)
  - Hover: Hiệu ứng highlight và đổi cursor thành pointer
  - Khi chọn ngôn ngữ mới: Toàn bộ giao diện được dịch lại (full i18n)
  - Lưu trữ: Language preference lưu trong localStorage
  - Khi tải trang: Đọc localStorage để hiển thị ngôn ngữ đã chọn trước đó; mặc định VN

Candidate QA:

---

### Item B: Bìa (`662:14393`)

- hasChildren: true
- Name JP: カバー
- Name Trans: Hero Cover / Login Screen
- Item Type: others
- Item Subtype: hero
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Hero bìa giới thiệu SAA 2025 với nút đăng nhập bằng Google.

Display Elements:
  - Hình nền (B.1): Artwork trang trí toàn khung với tiêu đề 'ROOT FURTHER'
  - Nội dung (B.2): Mô tả 'Bắt đầu hành trình của bạn cùng SAA 2025.' và 'Đăng nhập để khám phá!'
  - Nút (B.3): 'LOGIN With Google' có Google icon

Function & Logic:
  - Container chứa key visual; nội dung giới thiệu và nút đăng nhập
  - Không có tương tác riêng ở cấp container
  - Responsive: Trên mobile; layout dọc full-width; nội dung và nút căn giữa

Candidate QA:

---

### Item B.1: Key Visual (`662:14395`)

- hasChildren: false
- Name JP: キービジュアル
- Name Trans: Key Visual
- Item Type: others
- Item Subtype: hero_banner
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Hình ảnh chủ đạo (Key Visual) bên trong khu vực hero. Là phần con của Bìa (B); chứa artwork nền và tiêu đề lớn.

Display Elements:
  - Background: Họa tiết nghệ thuật sóng nhiều màu sắc
  - Title: 'ROOT FURTHER'

Function & Logic:
  - Hiển thị: Chỉ hiển thị; không tương tác
  - Responsive: Hình nền cover toàn bộ vùng hero; text 'ROOT FURTHER' co giãn responsive

Lưu ý: Item C (Keyvisual - 662:14388) là container bao ngoài toàn trang bao gồm cả header/footer. Item B.1 này là phần key visual bên trong khu vực hero (Bìa).

Candidate QA:

---

### Item B.2: content (`662:14753`)

- hasChildren: false
- Name JP: 紹介コンテンツ
- Name Trans: Introduction Content
- Item Type: others
- Item Subtype: info_block
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Mô tả ngắn trong khu vực hero kêu gọi người dùng đăng nhập để khám phá SAA 2025.

Display Elements:
  - Dòng 1: Label - 'Bắt đầu hành trình của bạn cùng SAA 2025.'
  - Dòng 2: Label - 'Đăng nhập để khám phá!'

Function & Logic:
  - Hiển thị: Truyền thông điệp và hướng người dùng tới nút 'LOGIN With Google'
  - Responsive: Text wrap tự nhiên trên mobile; không bị cắt
  - i18n: Nội dung text được dịch theo ngôn ngữ đã chọn

Candidate QA:

---

### Item B.3: Login (`662:14425`)

- hasChildren: false
- Name JP: Googleログインボタン
- Name Trans: Login with Google Button
- Item Type: button
- Item Subtype:
- Button Type: icon_text
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Mở luồng xác thực Google OAuth qua Supabase Auth; sau khi thành công redirect đến Homepage SAA
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:
- Condition: Email không thuộc domain @sun-asterisk.com
  Error: Toast "Chỉ tài khoản @sun-asterisk.com được phép đăng nhập."

- Condition: Người dùng hủy luồng xác thực Google
  Error: Toast "Đăng nhập đã bị hủy. Vui lòng thử lại."

- Condition: Lỗi mạng hoặc lỗi server
  Error: Toast "Đã có lỗi xảy ra. Vui lòng thử lại sau."

- Condition: Vượt quá 5 lần đăng nhập thất bại
  Error: Toast "Tài khoản tạm thời bị khóa. Vui lòng thử lại sau."

Description:
Nút dùng để đăng nhập bằng tài khoản Google qua Supabase Auth. Chỉ chấp nhận tài khoản @sun-asterisk.com.

Display Elements:
  - Text: 'LOGIN With Google'
  - Icon: Google logo bên phải text

Function & Logic:
  - Click: Mở luồng xác thực Google OAuth qua Supabase Auth
  - Domain restriction: Chỉ chấp nhận tài khoản Google với domain @sun-asterisk.com
  - Success: Redirect đến Homepage SAA
  - Error: Hiển thị toast notification với thông báo lỗi tương ứng
  - State: Khi đang xử lý; nút disabled và hiển thị biểu tượng loading
  - State: Nút luôn enabled vì không có input cần validate trước khi click
  - Chống double-click: Disable nút ngay khi click lần đầu cho đến khi xử lý xong
  - Error recovery: Khi OAuth thất bại; hiển thị toast lỗi và re-enable nút
  - Rate limiting: Sau 5 lần đăng nhập thất bại; tạm khóa và hiển thị toast cảnh báo
  - Security: Xác thực qua Supabase Auth (Google provider); session cookie qua @supabase/ssr
  - Navigation action: submit_form
  - Responsive: Trên mobile nút full-width; trên desktop giữ kích thước cố định
  - i18n: Text nút và toast messages được dịch theo ngôn ngữ đã chọn

Candidate QA:

---

### Item C: Keyvisual (`662:14388`)

- hasChildren: false
- Name JP: キービジュアル背景
- Name Trans: Key Visual Background (Full Page)
- Item Type: others
- Item Subtype: hero_banner
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Container hình nền trang trí bao phủ toàn bộ trang đăng nhập (bao gồm cả khu vực header và footer).

Display Elements:
  - Background: Artwork nghệ thuật sóng nhiều màu bao phủ toàn trang

Function & Logic:
  - Hiển thị: Chỉ hiển thị; không tương tác
  - Responsive: Background sử dụng object-fit cover; đảm bảo không có khoảng trắng trên mọi kích thước màn hình

Lưu ý: Đây là container nền toàn trang; khác với B.1 (Key Visual bên trong hero). Item này bao gồm cả vùng header và footer.

Candidate QA:

---

### Item D: Footer (`662:14447`)

- hasChildren: false
- Name JP: フッター
- Name Trans: Footer
- Item Type: label
- Item Subtype:
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Hiển thị thông tin bản quyền ở chân trang.

Display Elements:
  - Text: 'Bản quyền thuộc về Sun* © 2025'

Function & Logic:
  - Hiển thị: Luôn cố định ở cuối trang (sticky bottom)
  - Tương tác: Không tương tác
  - Responsive: Text căn giữa trên mọi kích thước màn hình
  - i18n: Text bản quyền được dịch theo ngôn ngữ đã chọn

Candidate QA:

---

## Page-Level Behavior

### Authenticated User Redirect
- Nếu người dùng đã đăng nhập (có session hợp lệ); middleware PHẢI redirect tự động đến Homepage SAA mà không hiển thị trang login.
- Kiểm tra session qua `src/libs/supabase/middleware.ts`.

### Login Flow
1. Người dùng click 'LOGIN With Google'
2. Nút chuyển sang trạng thái loading (disabled + spinner)
3. Mở Google OAuth popup/redirect qua Supabase Auth
4. Google trả về thông tin xác thực
5. Server kiểm tra domain email PHẢI là @sun-asterisk.com
6. Nếu hợp lệ: Set session cookie → redirect đến Homepage SAA
7. Nếu không hợp lệ: Hiển thị toast lỗi → re-enable nút

### Rate Limiting
- Tối đa 5 lần đăng nhập thất bại
- Sau 5 lần: Hiển thị toast "Tài khoản tạm thời bị khóa. Vui lòng thử lại sau."
- Nút Login vẫn hiển thị nhưng server từ chối yêu cầu

### Error Display
- Tất cả lỗi đăng nhập hiển thị dưới dạng toast notification
- Toast tự động ẩn sau 5 giây
- Toast hiển thị ở vị trí top-right (hoặc top-center trên mobile)

### Page Loading State
- Khi trang đang tải (SSR/hydration); hiển thị trạng thái loading phù hợp (skeleton hoặc spinner).
- Nút 'LOGIN With Google' chỉ khả dụng sau khi trang đã hydrate hoàn toàn.

### Internationalization (i18n)
- Tất cả text trên trang (nội dung; nút; toast; footer) PHẢI được dịch theo ngôn ngữ đã chọn
- Ngôn ngữ khả dụng: VN; EN; JP
- Preference lưu trong localStorage; mặc định VN
- Khi đổi ngôn ngữ; toàn bộ giao diện re-render với ngôn ngữ mới (không reload trang)

### Accessibility
- Nút Login PHẢI có `aria-label` mô tả rõ chức năng
- Language selector PHẢI có `aria-expanded` và `aria-haspopup="listbox"`
- Hỗ trợ keyboard navigation: Tab qua các phần tử tương tác (Language selector → Login button)
- Logo có `alt` text mô tả
- Toast notification PHẢI có `role="alert"` để screen reader đọc được
