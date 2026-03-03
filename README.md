# Agentic Coding Hands-on

Repository phục vụ khóa thực hành **Agentic Coding** nội bộ Sun\*. Học viên sẽ sử dụng **MoMorph + Claude Code** để generate code từ Figma design.

## Branches

Repository có 2 branch:

- **`main`** — Source code khởi tạo ban đầu. Học viên clone về và làm trên nhánh này. Cần tự cài đặt MoMorph CLI và chạy `momorph init` để sinh ra các thư mục `.claude`, `.vscode` (chứa prompts) kết nối với MoMorph MCP Server.
- **`sample`** — Có sẵn các thư mục `.claude`, `.vscode`, `.momorph` chứa specs mẫu của một số màn hình. Dùng để tham khảo khi muốn xem context đầu vào và kết quả mà MoMorph sinh ra trông như thế nào.

## Prerequisites

- Node.js v24.x
- Docker (for running Supabase)
- Yarn v1.22.22 (package manager)
- [MoMorph CLI](https://github.com/momorph/cli)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) hoặc VSCode + MoMorph Extension

### Tech Stack

- **Next.js** – React framework for building full-stack web applications
- **Supabase** – Backend-as-a-Service (BaaS) platform providing database, authentication, and real-time features
- **Cloudflare Workers** – Edge computing platform for deploying and running applications
- **TailwindCSS** – Utility-first CSS framework

## Hướng dẫn thực hành

### Bước 1: Clone repository

```sh
git clone https://github.com/sun-asterisk-internal/agentic-coding-hands-on.git
cd agentic-coding-hands-on
```

### Bước 2: Cài đặt dependencies

```sh
# Tạo file .env:
cp .env.example .env

# Cài đặt packages:
yarn install
```

### Bước 3: Đăng nhập MoMorph Web và kết nối tài khoản GitHub

1. Truy cập [MoMorph Web](https://momorph.ai/) và đăng nhập bằng tài khoản Figma (dùng email `*@sun-asterisk.com`).
2. Điền link file Figma sau để tiếp tục: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C/SAA-2025---Internal-Live-Coding
3. Vào **Settings → GitHub → Connect** để kết nối tài khoản GitHub của bạn với MoMorph.
4. Chọn repository `sun-asterisk-internal/agentic-coding-hands-on` để liên kết.

> **Lưu ý:** Repository này đã được connect sẵn với MoMorph và Figma project trên hệ thống. Bạn chỉ cần kết nối tài khoản GitHub cá nhân với MoMorph là có thể sử dụng.

### Bước 4: Đặt git remote trỏ đúng repository

Đảm bảo git remote của repo trên local trỏ tới repository gốc:

```sh
git remote set-url origin https://github.com/sun-asterisk-internal/agentic-coding-hands-on.git
```

Điều này cần thiết để MoMorph VSCode Extension có thể nhận diện repository và hiển thị Figma file đã liên kết.

### Bước 5: Cài đặt MoMorph CLI

Chọn một trong các cách sau:

```sh
# macOS / Linux (Homebrew):
brew install momorph/tap/momorph-cli

# Windows (Chocolatey):
choco install momorph

# Windows (PowerShell):
irm https://raw.githubusercontent.com/momorph/cli/refs/heads/main/scripts/install.ps1 | iex

# Linux / macOS (Bash):
curl -fsSL https://raw.githubusercontent.com/momorph/cli/refs/heads/main/scripts/install.sh | bash
```

Xác nhận cài đặt thành công:

```sh
momorph version
```

### Bước 6: Đăng nhập MoMorph CLI

```sh
momorph login
```

CLI sẽ hiển thị một mã xác thực và link đăng nhập. Nhấn `Enter` để mở link trên trình duyệt, sau đó nhập mã để hoàn tất xác thực.

Kiểm tra thông tin tài khoản:

```sh
momorph whoami
```

### Bước 7: Khởi tạo MoMorph project

Chạy lệnh init để sinh ra các thư mục cấu hình (`.claude`, `.vscode` prompts, kết nối MCP server...):

```sh
# Nếu dùng Claude Code:
momorph init . --ai claude

# Nếu dùng GitHub Copilot:
momorph init . --ai copilot

# Nếu dùng Cursor:
momorph init . --ai cursor
```

Lệnh này sẽ:
- Tải template MoMorph project mới nhất
- Sinh các file cấu hình (`.claude/`, prompt files, workflow scripts...)
- Thiết lập kết nối MCP server cho AI agent đã chọn
- Tự động cài đặt MoMorph VSCode Extension (nếu chưa cài). Sau khi cài đặt, mở source code repo trên VSCode → chạy command "MoMorph: Sign In" → click vào biểu tượng MoMorph trên sidebar → bạn sẽ thấy danh sách frame list của Figma file đã liên kết.

### Bước 8: Bắt đầu generate code

Sử dụng Figma project để thực hành:

**Figma file:** [SAA 2025 - Internal Live Coding](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C/SAA-2025---Internal-Live-Coding)

#### Chuẩn bị context: Viết Screen Spec trên MoMorph Web

Trước khi bắt đầu generate code, bạn cần chuẩn bị screen spec trên MoMorph Web thông qua MoMorph Figma Plugin (yêu cầu Figma Account - Full Seat). Từ MoMorph Figma Plugin, đánh số cho các frame Figma cần nhập specs, submit các items này lên MoMorph Web và bắt đầu viết screen spec mô tả chi tiết chức năng, behavior, business logic của màn hình đó thủ công hoặc sử dụng tính năng sinh specs tự động của MoMorph. Screen spec trên server chính là nguồn thông tin gốc (source of truth) cho toàn bộ quy trình generate code phía sau.

> **Lưu ý cho bài thực hành này:** Screen spec của các màn hình đã được chuẩn bị sẵn trên MoMorph server rồi, nên các bạn **không cần viết spec** mà có thể **bắt tay vào quy trình generate code ngay từ bước `/momorph.constitution`**. Vui lòng tham khảo thêm tài liệu [MoMorph Figma Plugin](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F07S87PSVUN) nếu muốn tìm hiểu chi tiết hơn về khâu viết Screen Spec.

#### Quy trình generate code với MoMorph

Sau khi đã có screen spec trên MoMorph server, sử dụng các slash commands trong AI agent để generate code:

1. **`/momorph.constitution`** — Khởi tạo coding standards và conventions cho project
2. **`/momorph.specify`** — Kéo screen spec từ MoMorph server về local và sinh ra các file spec cục bộ (`spec.md`, `design-style.md`)
3. **`/momorph.reviewspecify`** — Review và refine spec output (nên chạy 2–3 lần để kết quả tốt hơn)
4. **`/momorph.plan`** — Tạo implementation plan chi tiết
5. **`/momorph.reviewplan`** — Review và refine plan output (nên chạy 2–3 lần để kết quả tốt hơn)
6. **`/momorph.tasks`** — Chia nhỏ plan thành danh sách task thực thi
7. **`/momorph.implement`** — Thực thi tasks, sinh code theo design

> **Tại sao đã có spec trên MoMorph rồi mà vẫn cần chạy `/momorph.specify`?**
>
> - **Screen spec trên MoMorph server** là bản mô tả chức năng, behavior, business logic do con người viết và lưu trên nền tảng MoMorph Web. Nó đóng vai trò nguồn thông tin gốc (source of truth).
> - **`/momorph.specify`** sẽ đọc screen spec đó từ server, kết hợp với thông tin design từ Figma (layout, style, component structure...), rồi tổng hợp lại thành các file spec cục bộ (`spec.md`, `design-style.md`) ngay trong repo. Các file này chính là context trực tiếp mà AI agent sử dụng trong các bước tiếp theo (plan, tasks, implement).
>
> Nói cách khác: screen spec trên server = **input do người dùng viết**, còn output của `/momorph.specify` = **context đã được xử lý và làm giàu** để AI agent có thể hiểu và sinh code chính xác.

#### Ví dụ prompt cho từng command

**1. `/momorph.constitution`** — Tạo các quy tắc phát triển cần tuân thủ trong project:

```
/momorph.constitution Viết clean code, tổ chức source code rõ ràng, ngắn gọn. Áp dụng các best practices với Next.js, Cloudflare Workers, Supabase. Ứng dụng cũng cần được đảm bảo responsive hỗ trợ tương thích với nhiều kích thước màn hình khác nhau, bao gồm từ mobile, tablet cho đến desktop. Ngoài ra, cũng lưu ý tuân thủ các tiêu chuẩn bảo mật secure coding practices owasp.
```

**2. `/momorph.specify`** — Tạo local specs + tổng hợp thông tin về figma design:

```
/momorph.specify Tạo specs cho màn hình Login sau:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

**3. `/momorph.reviewspecify`** — Review spec đã sinh:

```
/momorph.reviewspecify Review specs cho màn hình Login sau:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

> Nên chạy lệnh này 2–3 lần để spec được review kỹ hơn.

**4. `/momorph.plan`** — Tạo implementation plan:

```
/momorph.plan Sử dụng Supabase Auth + Next.js + Cloudflare. Hãy tạo kế hoạch phát triển màn hình Login:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

**5. `/momorph.reviewplan`** — Review plan đã sinh:

```
/momorph.reviewplan Hãy review lại plan của màn hình Login:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

> Nên chạy lệnh này 2–3 lần để plan được review kỹ hơn.

**6. `/momorph.tasks`** — Chia plan thành danh sách tasks:

```
/momorph.tasks Hãy phân chia công việc phát triển màn Login:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

**7. `/momorph.implement`** — Thực thi tasks, sinh code:

```
/momorph.implement Tiến hành phát triển màn Login:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

**8. Fix bug sau khi implement hết các tasks:**

Khuyến nghị tiếp tục sử dụng command `/momorph.implement` để fix bug:
```
/momorph.implement Thêm task fix bug sai font chữ ở footer. Hãy review lại một lượt xem font chữ các các item đã đúng theo design chưa.
```

### Bước 9: Chạy development server

```sh
# Khởi động local containers:
make up

# Chạy dev server:
make dev

# Dừng containers:
make down
```

## Tài liệu tham khảo

- [MoMorph CLI Documentation](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F0A86NC88SK)
- [MoMorph MCP Server](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F0A9HULD5D0)
- [MoMorph VSCode Extension](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F094K2LTV71)
- [MoMorph Web](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F092SAQBXR8)
- [MoMorph Figma Plugin](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F07S87PSVUN)
