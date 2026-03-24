# Items Analysis - Homepage SAA (Part 2)

---

## 1. B1.3.3 - Minutes (ID: 2167:9048)

- **Name JP:** 分 (カウントダウン)
- **Name Trans:** Minutes (Countdown)
- **Item Type:** others
- **Subtype:** countdown_unit
- **Button Type:** -
- **Data Type:** -
- **Format:** 2 chữ số (00-59)
- **Required:** -
- **Min/Max Length:** 2 / 2
- **Default Value:** "20" (giá trị mẫu trong design)
- **User Action:** Không có tương tác trực tiếp. Giá trị tự động cập nhật theo thời gian thực.
- **Transition Note:** Không chuyển trang. Đếm ngược tự động đến thời điểm sự kiện (26/12/2025).
- **Database Table/Column/Note:** events / event_date / Tính toán phút còn lại từ thời điểm hiện tại đến event_date.
- **Validation Note:** Giá trị phút phải nằm trong khoảng 00-59. Khi đếm ngược kết thúc, hiển thị 00.
- **Description:** Mục đích: Hiển thị số phút còn lại trong bộ đếm ngược đến sự kiện SAA. Hiển thị: Gồm 2 ô flip-clock hiển thị 2 chữ số phút và nhãn "MINUTES" phía dưới. Nền ô màu tối, chữ số màu trắng. Chức năng: Tự động giảm mỗi phút, đồng bộ cùng DAYS và HOURS tạo thành bộ countdown hoàn chỉnh.
- **Candidate QA:**
  - Xác nhận số phút hiển thị đúng 2 chữ số (có zero-padding, ví dụ "05").
  - Xác nhận nhãn "MINUTES" hiển thị phía dưới ô số.
  - Xác nhận countdown cập nhật realtime mỗi phút.
  - Xác nhận khi phút về 00, giờ giảm 1 và phút reset về 59.
  - Xác nhận khi countdown kết thúc (đã qua ngày sự kiện), hiển thị 00 hoặc ẩn countdown.

---

## 2. B2 - Thong tin su kien (ID: 2167:9053)

- **Name JP:** イベント情報
- **Name Trans:** Event Information
- **Item Type:** others
- **Subtype:** info_block
- **Button Type:** -
- **Data Type:** -
- **Format:** Text tĩnh, nhiều dòng
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** "Thoi gian: 26/12/2025 | Dia diem: Au Co Art Center | Tuong thuat truc tiep qua song Livestream"
- **User Action:** Không có tương tác. Chỉ hiển thị thông tin.
- **Transition Note:** Không chuyển trang.
- **Database Table/Column/Note:** events / event_date, venue, broadcast_note / Lấy thông tin sự kiện từ bảng events.
- **Validation Note:** Không có validation. Dữ liệu tĩnh hoặc lấy từ CMS.
- **Description:** Mục đích: Cung cấp thông tin cơ bản về sự kiện SAA cho người dùng. Hiển thị: 3 thông tin trên 2 dòng: (1) "Thoi gian: 26/12/2025" và "Dia diem: Au Co Art Center" trên cùng dòng, (2) "Tuong thuat truc tiep qua song Livestream" dòng dưới. Nhãn (Thoi gian, Dia diem) màu đỏ cam, giá trị màu vàng sáng, ghi chú livestream màu xám nhạt. Chức năng: Hiển thị tĩnh, không có tương tác.
- **Candidate QA:**
  - Xác nhận hiển thị đúng ngày sự kiện "26/12/2025".
  - Xác nhận hiển thị đúng địa điểm "Au Co Art Center".
  - Xác nhận hiển thị dòng ghi chú "Tuong thuat truc tiep qua song Livestream".
  - Xác nhận màu sắc nhãn và giá trị đúng theo design (nhãn đỏ cam, giá trị vàng).
  - Xác nhận responsive: thông tin hiển thị rõ ràng trên các kích thước màn hình.

---

## 3. B3 - Call-To-Action (ID: 2167:9062)

- **Name JP:** コールトゥアクション
- **Name Trans:** Call-To-Action
- **Item Type:** button
- **Subtype:** text_link
- **Button Type:** text_link
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** -
- **User Action:** Click vào một trong hai nút để điều hướng đến trang tương ứng.
- **Transition Note:** Nút "ABOUT AWARDS" -> trang Awards Information. Nút "ABOUT KUDOS" -> trang Sun* Kudos.
- **Database Table/Column/Note:** - / - / Không liên quan database. Chỉ chứa link điều hướng tĩnh.
- **Validation Note:** Không có validation.
- **Description:** Mục đích: Nhóm chứa 2 nút CTA chính trên phần bìa (hero section), hướng dẫn người dùng đến các trang thông tin chi tiết. Hiển thị: 2 nút nằm ngang cạnh nhau: "ABOUT AWARDS" (nền vàng, chữ đen) và "ABOUT KUDOS" (nền tối, chữ trắng). Cả hai đều có icon mũi tên hướng lên-phải. Chức năng: Container chứa 2 nút con B3.1 và B3.2.
- **Candidate QA:**
  - Xác nhận cả 2 nút hiển thị đúng vị trí ngang hàng.
  - Xác nhận nút "ABOUT AWARDS" có nền vàng, nút "ABOUT KUDOS" có nền tối.
  - Xác nhận khoảng cách giữa 2 nút đúng theo design.
  - Xác nhận responsive: 2 nút vẫn hiển thị hợp lý trên mobile.

---

## 4. B3.1 - Button-IC About (ID: 2167:9063)

- **Name JP:** アワードについてボタン
- **Name Trans:** Button About Awards
- **Item Type:** button
- **Subtype:** icon_text
- **Button Type:** icon_text
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** "ABOUT AWARDS"
- **User Action:** Click: Điều hướng đến trang Awards Information.
- **Transition Note:** Chuyển đến trang Awards Information (trang giới thiệu hệ thống giải thưởng).
- **Database Table/Column/Note:** - / - / Không liên quan database. URL điều hướng tĩnh.
- **Validation Note:** Không có validation.
- **Description:** Mục đích: Nút CTA chính dẫn người dùng đến trang thông tin giải thưởng. Hiển thị: Nút hình chữ nhật bo góc, nền màu vàng (#F5E6A3), chữ "ABOUT AWARDS" màu đen đậm, icon mũi tên hướng lên-phải (MM_MEDIA_Up) ở bên phải. State hover được thiết kế trong design. Chức năng: Khi click, điều hướng đến trang Awards Information.
- **Candidate QA:**
  - Xác nhận text hiển thị đúng "ABOUT AWARDS".
  - Xác nhận nền nút màu vàng, chữ đen.
  - Xác nhận icon mũi tên hiển thị bên phải text.
  - Xác nhận hover state: thay đổi style khi rê chuột (theo design).
  - Xác nhận click chuyển đúng đến trang Awards Information.
  - Xác nhận cursor pointer khi hover.

---

## 5. B3.2 - Button-IC Kudos (ID: 2167:9064)

- **Name JP:** Kudosについてボタン
- **Name Trans:** Button About Kudos
- **Item Type:** button
- **Subtype:** icon_text
- **Button Type:** icon_text
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** "ABOUT KUDOS"
- **User Action:** Click: Điều hướng đến trang Sun* Kudos.
- **Transition Note:** Chuyển đến trang Sun* Kudos (trang phong trào ghi nhận).
- **Database Table/Column/Note:** - / - / Không liên quan database. URL điều hướng tĩnh.
- **Validation Note:** Không có validation.
- **Description:** Mục đích: Nút CTA dẫn người dùng đến trang Sun* Kudos. Hiển thị: Nút hình chữ nhật bo góc, nền màu tối đậm (dark teal), chữ "ABOUT KUDOS" màu trắng, icon mũi tên hướng lên-phải (MM_MEDIA_Up) bên phải. State normal (không hover). Chức năng: Khi click, điều hướng đến trang Sun* Kudos.
- **Candidate QA:**
  - Xác nhận text hiển thị đúng "ABOUT KUDOS".
  - Xác nhận nền nút màu tối, chữ trắng.
  - Xác nhận icon mũi tên hiển thị bên phải text.
  - Xác nhận hover state: thay đổi style khi rê chuột.
  - Xác nhận click chuyển đúng đến trang Sun* Kudos.
  - Xác nhận cursor pointer khi hover.

---

## 6. B4 - content (ID: 5001:14827)

- **Name JP:** コンテンツ（Root Further説明）
- **Name Trans:** Content (Root Further Description)
- **Item Type:** others
- **Subtype:** info_block
- **Button Type:** -
- **Data Type:** -
- **Format:** Đoạn văn bản dài, nhiều đoạn (paragraph)
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** Đoạn mô tả dài về tinh thần "Root Further" - chủ đề SAA 2025
- **User Action:** Không có tương tác trực tiếp. Người dùng chỉ đọc nội dung.
- **Transition Note:** Không chuyển trang.
- **Database Table/Column/Note:** content_pages / body / Nội dung tĩnh hoặc từ CMS, mô tả tinh thần chương trình SAA.
- **Validation Note:** Không có validation. Nội dung tĩnh.
- **Description:** Mục đích: Truyền tải thông điệp và tinh thần "Root Further" - chủ đề chính của Sun* Annual Awards 2025 đến người dùng. Hiển thị: Khối văn bản dài gồm nhiều đoạn, chữ trắng/xám nhạt trên nền tối, bao gồm: (1) đoạn giải thích ý nghĩa "Root Further", (2) câu trích dẫn tiếng Anh "A tree with deep roots fears no storm" kèm bản dịch, (3) đoạn kêu gọi hành động. Bên trên có logo "Root Further" dạng hình ảnh. Chức năng: Hiển thị tĩnh, cung cấp context cho người dùng về chương trình.
- **Candidate QA:**
  - Xác nhận nội dung hiển thị đầy đủ, không bị cắt.
  - Xác nhận font chữ, kích thước, màu sắc đúng theo design.
  - Xác nhận câu trích dẫn tiếng Anh hiển thị đúng định dạng (in nghiêng hoặc ngoặc kép).
  - Xác nhận responsive: text xuống dòng hợp lý trên mobile.
  - Xác nhận logo "Root Further" hiển thị phía trên đoạn text.

---

## 7. C1 - Header Giai thuong (ID: 2167:9069)

- **Name JP:** 賞セクションヘッダー
- **Name Trans:** Awards Section Header
- **Item Type:** others
- **Subtype:** info_block
- **Button Type:** -
- **Data Type:** -
- **Format:** Caption + Divider + Title
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** Caption: "Sun* annual awards 2025", Title: "He thong giai thuong"
- **User Action:** Không có tương tác.
- **Transition Note:** Không chuyển trang.
- **Database Table/Column/Note:** - / - / Nội dung tĩnh, hardcode.
- **Validation Note:** Không có validation.
- **Description:** Mục đích: Tiêu đề cho section danh sách giải thưởng, giúp người dùng nhận biết đang xem phần hệ thống giải thưởng. Hiển thị: Gồm 3 phần: (1) Caption nhỏ "Sun* annual awards 2025" màu vàng nhạt, (2) đường kẻ ngang phân cách (Rectangle 26), (3) tiêu đề lớn "He thong giai thuong" font đậm màu vàng sáng. Chức năng: Hiển thị tĩnh, đóng vai trò section header.
- **Candidate QA:**
  - Xác nhận caption "Sun* annual awards 2025" hiển thị đúng.
  - Xác nhận tiêu đề "He thong giai thuong" hiển thị đúng font lớn, đậm.
  - Xác nhận đường kẻ phân cách giữa caption và title.
  - Xác nhận màu sắc đúng theo design (vàng nhạt/vàng sáng).

---

## 8. C2 - Award list (ID: 5005:14974)

- **Name JP:** 賞一覧
- **Name Trans:** Award List
- **Item Type:** others
- **Subtype:** card
- **Button Type:** -
- **Data Type:** -
- **Format:** Grid 3 cột x 2 hàng
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** 6 thẻ giải thưởng: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP
- **User Action:** Click vào thẻ bất kỳ để mở trang Awards Information với hashtag tương ứng. Hover nâng nhẹ thẻ.
- **Transition Note:** Click thẻ -> chuyển đến trang Awards Information#[ten-giai-thuong].
- **Database Table/Column/Note:** award_categories / name, description, image_url / Lấy danh sách hạng mục giải thưởng.
- **Validation Note:** Không có validation input. Đảm bảo hiển thị đủ 6 thẻ.
- **Description:** Mục đích: Hiển thị toàn bộ danh sách hạng mục giải thưởng SAA 2025 dưới dạng grid thẻ trực quan. Hiển thị: Grid 3 cột x 2 hàng, mỗi thẻ gồm: ảnh hạng mục (hình tròn vàng gold với tên giải), tên giải, mô tả ngắn, và nút "Chi tiet". Hàng 1: Top Talent, Top Project, Top Project Leader. Hàng 2: Best Manager, Signature 2025 - Creator, MVP. Nền tối, viền vàng nhẹ quanh ảnh. Chức năng: Mỗi thẻ là clickable, dẫn đến trang chi tiết giải thưởng tương ứng. Hover effect nâng nhẹ thẻ.
- **Candidate QA:**
  - Xác nhận hiển thị đủ 6 thẻ giải thưởng.
  - Xác nhận layout grid 3 cột x 2 hàng.
  - Xác nhận mỗi thẻ có đủ: ảnh, tên, mô tả, nút "Chi tiet".
  - Xác nhận hover effect: thẻ nâng nhẹ khi rê chuột.
  - Xác nhận click mỗi thẻ chuyển đến đúng trang Awards Information với hashtag tương ứng.
  - Xác nhận responsive: grid chuyển về 2 cột hoặc 1 cột trên tablet/mobile.

---

## 9. C2.1 - Top Talent Award (ID: 2167:9075)

- **Name JP:** トップタレント賞
- **Name Trans:** Top Talent Award
- **Item Type:** others
- **Subtype:** card
- **Button Type:** -
- **Data Type:** -
- **Format:** Card: Ảnh + Tên + Mô tả + Nút
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** Title: "Top Talent", Description: "Vinh danh top ca nhan xuat sac tren moi phuong dien", CTA: "Chi tiet"
- **User Action:** Click vào thẻ hoặc nút "Chi tiet" để mở trang Awards Information#top-talent.
- **Transition Note:** Chuyển đến trang Awards Information với anchor #top-talent.
- **Database Table/Column/Note:** award_categories / id, name, short_description, thumbnail_url / Lấy thông tin hạng mục Top Talent.
- **Validation Note:** Không có validation input.
- **Description:** Mục đích: Giới thiệu hạng mục giải thưởng "Top Talent" - vinh danh cá nhân xuất sắc nhất. Hiển thị: Thẻ card gồm: (1) Ảnh thumbnail hình tròn vàng gold với text "TOP TALENT" bên trong, nền tối có viền vàng, (2) Tên giải "Top Talent" font vàng sáng, (3) Mô tả ngắn "Vinh danh top ca nhan xuat sac tren moi phuong dien" font xám nhạt, (4) Nút "Chi tiet" với icon mũi tên. Chức năng: Toàn thẻ clickable, dẫn đến trang chi tiết. Hover: nâng nhẹ thẻ.
- **Candidate QA:**
  - Xác nhận ảnh thumbnail hiển thị đúng hạng mục "TOP TALENT".
  - Xác nhận tên giải "Top Talent" hiển thị đúng.
  - Xác nhận mô tả hiển thị đầy đủ, tối đa 2 dòng.
  - Xác nhận nút "Chi tiet" có icon mũi tên.
  - Xác nhận click chuyển đúng đến trang Awards Information#top-talent.
  - Xác nhận hover effect trên toàn thẻ.

---

## 10. C2.1.1 - Picture-Award (ID: I2167:9075;214:1019)

- **Name JP:** 賞画像
- **Name Trans:** Award Picture
- **Item Type:** others
- **Subtype:** card
- **Button Type:** -
- **Data Type:** -
- **Format:** Hình ảnh (image component)
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** Ảnh thumbnail "TOP TALENT" - hình tròn vàng gold trên nền tối
- **User Action:** Click: Mở trang Awards Information#top-talent. Hover: nâng nhẹ.
- **Transition Note:** Chuyển đến trang Awards Information#top-talent.
- **Database Table/Column/Note:** award_categories / thumbnail_url / Ảnh thumbnail của hạng mục, lưu trên storage.
- **Validation Note:** Ảnh phải tồn tại. Nếu lỗi tải ảnh, hiển thị placeholder.
- **Description:** Mục đích: Hiển thị ảnh đại diện cho hạng mục giải thưởng "Top Talent", tạo ấn tượng thị giác. Hiển thị: Component gồm 2 layer: (1) MM_MEDIA_Award BG - nền hình tròn vàng gold với hiệu ứng phát sáng và đế trophy, (2) Awards-Name chứa text "TOP TALENT" font lớn đậm nằm giữa hình tròn. Viền vàng nhẹ bao quanh. Chức năng: Clickable, cùng hành vi với thẻ cha C2.1. Hover effect nâng nhẹ.
- **Candidate QA:**
  - Xác nhận ảnh tải thành công, không bị vỡ.
  - Xác nhận text "TOP TALENT" hiển thị rõ ràng trong ảnh.
  - Xác nhận hiệu ứng vàng gold và viền hiển thị đúng.
  - Xác nhận click ảnh chuyển đến trang Awards Information.
  - Xác nhận hover effect hoạt động.
  - Xác nhận ảnh giữ tỷ lệ, không bị méo trên các kích thước màn hình.

---

## 11. C2.1.2 - Top Talent (Label) (ID: I2167:9075;214:1021)

- **Name JP:** トップタレント（ラベル）
- **Name Trans:** Top Talent (Label)
- **Item Type:** label
- **Subtype:** -
- **Button Type:** -
- **Data Type:** -
- **Format:** Text đơn dòng
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** "Top Talent"
- **User Action:** Click: Mở trang Awards Information#top-talent (kế thừa từ thẻ cha).
- **Transition Note:** Chuyển đến trang Awards Information#top-talent.
- **Database Table/Column/Note:** award_categories / name / Tên hạng mục giải thưởng.
- **Validation Note:** Không có validation.
- **Description:** Mục đích: Hiển thị tên hạng mục giải thưởng "Top Talent" trong thẻ card. Hiển thị: Text "Top Talent" font vàng sáng, kích thước vừa, nằm dưới ảnh thumbnail và trên mô tả ngắn. Chức năng: Label tĩnh, clickable kế thừa từ thẻ cha.
- **Candidate QA:**
  - Xác nhận text hiển thị đúng "Top Talent".
  - Xác nhận font màu vàng sáng, kích thước đúng design.
  - Xác nhận vị trí nằm dưới ảnh, trên mô tả.
  - Xác nhận click dẫn đến đúng trang chi tiết.

---

## 12. C2.1.3 - Vinh danh top ca nhan xuat sac tren moi phuong dien (Label) (ID: I2167:9075;214:1022)

- **Name JP:** 説明文（トップタレント）
- **Name Trans:** Description (Top Talent)
- **Item Type:** label
- **Subtype:** -
- **Button Type:** -
- **Data Type:** -
- **Format:** Text, tối đa 2 dòng, ellipsis nếu quá dài
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** "Vinh danh top ca nhan xuat sac tren moi phuong dien"
- **User Action:** Không có tương tác trực tiếp.
- **Transition Note:** Không chuyển trang (nằm trong thẻ clickable cha).
- **Database Table/Column/Note:** award_categories / short_description / Mô tả ngắn của hạng mục giải thưởng.
- **Validation Note:** Hiển thị tối đa 2 dòng. Nếu text dài hơn, cắt và hiển thị dấu ba chấm (text-overflow: ellipsis, -webkit-line-clamp: 2).
- **Description:** Mục đích: Cung cấp mô tả ngắn gọn về hạng mục giải thưởng "Top Talent" để người dùng hiểu nhanh ý nghĩa. Hiển thị: Dòng text màu xám nhạt, font nhỏ hơn tên giải, nằm dưới label "Top Talent". Giới hạn 2 dòng, nếu vượt quá sẽ hiển thị dấu "...". Chức năng: Label mô tả tĩnh.
- **Candidate QA:**
  - Xác nhận text mô tả hiển thị đúng nội dung.
  - Xác nhận giới hạn 2 dòng hoạt động (dấu ba chấm khi text dài).
  - Xác nhận font màu xám nhạt, kích thước nhỏ hơn tên giải.
  - Xác nhận vị trí nằm dưới label tên giải, trên nút "Chi tiet".
  - Kiểm tra với text dài hơn design: xác nhận ellipsis hoạt động.

---

## 13. C2.1.4 - Button-IC (ID: I2167:9075;214:1023)

- **Name JP:** 詳細ボタン
- **Name Trans:** Detail Button
- **Item Type:** button
- **Subtype:** icon_text
- **Button Type:** icon_text
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** "Chi tiet"
- **User Action:** Click: Mở trang Awards Information với hashtag #top-talent.
- **Transition Note:** Chuyển đến trang Awards Information#top-talent.
- **Database Table/Column/Note:** - / - / Không liên quan database. URL điều hướng tĩnh dựa trên award_category slug.
- **Validation Note:** Không có validation.
- **Description:** Mục đích: Nút dẫn người dùng đến trang chi tiết hạng mục giải thưởng Top Talent. Hiển thị: Text "Chi tiet" màu trắng/xám nhạt kèm icon mũi tên hướng lên-phải (MM_MEDIA_Up) bên phải. Không có nền nút riêng, dạng text link. Chức năng: Khi click, điều hướng đến trang Awards Information với anchor tương ứng.
- **Candidate QA:**
  - Xác nhận text hiển thị đúng "Chi tiet".
  - Xác nhận icon mũi tên hiển thị bên phải text.
  - Xác nhận click chuyển đến đúng trang Awards Information#top-talent.
  - Xác nhận hover state: có thay đổi visual (underline hoặc đổi màu).
  - Xác nhận cursor pointer khi hover.

---

## 14. C2.2 - Top Project Award (ID: 2167:9076)

- **Name JP:** トッププロジェクト賞
- **Name Trans:** Top Project Award
- **Item Type:** others
- **Subtype:** card
- **Button Type:** -
- **Data Type:** -
- **Format:** Card: Ảnh + Tên + Mô tả + Nút
- **Required:** -
- **Min/Max Length:** - / -
- **Default Value:** Title: "Top Project", Description: "Vinh danh du an xuat sac tren moi phuong dien, du an co doanh thu noi bat", CTA: "Chi tiet"
- **User Action:** Click vào thẻ hoặc nút "Chi tiet" để mở trang Awards Information#top-project.
- **Transition Note:** Chuyển đến trang Awards Information với anchor #top-project.
- **Database Table/Column/Note:** award_categories / id, name, short_description, thumbnail_url / Lấy thông tin hạng mục Top Project.
- **Validation Note:** Không có validation input.
- **Description:** Mục đích: Giới thiệu hạng mục giải thưởng "Top Project" - vinh danh dự án xuất sắc nhất. Hiển thị: Thẻ card cấu trúc giống C2.1, gồm: (1) Ảnh thumbnail hình tròn vàng gold với text "TOP PROJECT", (2) Tên giải "Top Project" font vàng sáng, (3) Mô tả "Vinh danh du an xuat sac tren moi phuong dien, du an co doanh thu noi bat" font xám nhạt, (4) Nút "Chi tiet" với icon mũi tên. Nằm ở cột giữa hàng 1 trong grid. Chức năng: Toàn thẻ clickable, dẫn đến trang chi tiết. Hover: nâng nhẹ thẻ.
- **Candidate QA:**
  - Xác nhận ảnh thumbnail hiển thị đúng "TOP PROJECT".
  - Xác nhận tên giải "Top Project" hiển thị đúng.
  - Xác nhận mô tả hiển thị đầy đủ, tối đa 2 dòng.
  - Xác nhận nút "Chi tiet" có icon mũi tên.
  - Xác nhận click chuyển đúng đến trang Awards Information#top-project.
  - Xác nhận hover effect nâng nhẹ thẻ.
  - Xác nhận cấu trúc thẻ nhất quán với C2.1 (Top Talent).
