# Items Analysis - Homepage SAA (Part 1)

---

## A1 - Header (2167:9091)

- **Name JP:** ヘッダー
- **Name Trans:** Header
- **Item Type:** others
- **Subtype:** header
- **Button Type:** -
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** -
- **User Action:** Click logo để về trang chủ; click các link menu để điều hướng đến trang tương ứng; hover vào link để highlight; click icon chuông để mở panel thông báo; click VN để mở menu chọn ngôn ngữ; click avatar để mở menu tài khoản.
- **Transition Note:** Click logo -> Homepage; Click 'About SAA 2025' -> Trang About SAA 2025; Click 'Award Information' -> Trang Award Information; Click 'Sun* Kudos' -> Trang Sun* Kudos; Click bell -> Notification panel; Click VN -> Language dropdown; Click avatar -> Dropdown-profile
- **Database Table:** -
- **Database Column:** -
- **Database Note:** -
- **Validation Note:** -
- **Description:**
  - Purpose: Header điều hướng chính của trang, cung cấp các liên kết và chức năng chính cho người dùng.
  - Display: Hiển thị logo Sun* Annual Awards (bên trái), các link điều hướng 'About SAA 2025', 'Award Information', 'Sun* Kudos' (giữa), và các nút chức năng icon chuông thông báo, nút chọn ngôn ngữ 'VN', icon tài khoản người dùng (bên phải). Nền tối, chữ sáng.
  - Function: Click logo về trang chủ. Click từng link menu chuyển trang tương ứng. Hover vào link hiển thị hiệu ứng highlight. Click icon chuông mở panel thông báo. Click VN mở dropdown chọn ngôn ngữ. Click avatar mở menu tài khoản.
- **Candidate QA:**
  - Xác nhận header hiển thị đúng logo, 3 link menu, icon chuông, nút ngôn ngữ, icon tài khoản.
  - Xác nhận click logo điều hướng về trang chủ.
  - Xác nhận click từng link menu chuyển đến trang đúng.
  - Xác nhận hover vào link menu có hiệu ứng highlight.
  - Xác nhận header hiển thị đúng trên các kích thước màn hình khác nhau.

---

## A1.1 - LOGO (I2167:9091;178:1033)

- **Name JP:** ロゴ
- **Name Trans:** Logo
- **Item Type:** button
- **Subtype:** -
- **Button Type:** icon_text
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** -
- **User Action:** Click để về trang chủ.
- **Transition Note:** on_click -> Homepage
- **Database Table:** -
- **Database Column:** -
- **Database Note:** -
- **Validation Note:** -
- **Description:**
  - Purpose: Logo thương hiệu Sun* Annual Awards, dùng làm nút điều hướng về trang chủ.
  - Display: Hiển thị logo Sun* Annual Awards 2025 dạng icon kết hợp text, nằm bên trái header. Logo có biểu tượng Sun* màu đỏ cam và text 'Sun* Annual Awards 2025'.
  - Function: Click logo điều hướng về trang chủ (Homepage).
- **Candidate QA:**
  - Xác nhận logo hiển thị đúng hình ảnh và text 'Sun* Annual Awards 2025'.
  - Xác nhận click logo điều hướng về trang chủ.
  - Xác nhận logo có trạng thái hover (cursor pointer).

---

## A1.2 - Button-Selected state (I2167:9091;186:1579)

- **Name JP:** ボタン - 選択状態
- **Name Trans:** Button - Selected State
- **Item Type:** button
- **Subtype:** -
- **Button Type:** text_link
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** -
- **User Action:** Click để điều hướng đến trang 'About SAA 2025'.
- **Transition Note:** on_click -> Trang About SAA 2025
- **Database Table:** -
- **Database Column:** -
- **Database Note:** -
- **Validation Note:** -
- **Description:**
  - Purpose: Nút menu điều hướng đang ở trạng thái được chọn (selected), cho biết người dùng đang ở trang hiện tại.
  - Display: Hiển thị text 'About SAA 2025' với kiểu chữ nổi bật (màu vàng/sáng), có đường gạch dưới để chỉ trạng thái đang chọn. Phân biệt rõ với các nút menu khác.
  - Function: Click điều hướng đến trang 'About SAA 2025'. Trạng thái selected hiển thị text nổi bật với underline.
- **Candidate QA:**
  - Xác nhận nút hiển thị text 'About SAA 2025' với trạng thái selected (text nổi bật, có underline).
  - Xác nhận click nút điều hướng đến trang About SAA 2025.
  - Xác nhận trạng thái selected khác biệt rõ với trạng thái normal và hover.

---

## A1.3 - Button Hover State (I2167:9091;186:1587)

- **Name JP:** ボタン - ホバー状態
- **Name Trans:** Button - Hover State
- **Item Type:** button
- **Subtype:** -
- **Button Type:** text_link
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** -
- **User Action:** Click để điều hướng đến trang 'Awards Information'.
- **Transition Note:** on_click -> Trang Awards Information
- **Database Table:** -
- **Database Column:** -
- **Database Note:** -
- **Validation Note:** -
- **Description:**
  - Purpose: Nút menu điều hướng đang ở trạng thái hover, hiển thị khi người dùng di chuột vào.
  - Display: Hiển thị text 'Award Information' với kiểu chữ sáng hơn trạng thái normal, có hiệu ứng nền sáng nhẹ khi hover.
  - Function: Click điều hướng đến trang 'Awards Information'. Trạng thái hover hiển thị nền sáng nhẹ để phản hồi tương tác.
- **Candidate QA:**
  - Xác nhận nút hiển thị text 'Award Information'.
  - Xác nhận hover vào nút có hiệu ứng nền sáng.
  - Xác nhận click nút điều hướng đến trang Awards Information.
  - Xác nhận trạng thái hover khác biệt với trạng thái normal và selected.

---

## A1.5 - Button-Normal state (I2167:9091;186:1593)

- **Name JP:** ボタン - 通常状態
- **Name Trans:** Button - Normal State
- **Item Type:** button
- **Subtype:** -
- **Button Type:** text_link
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** -
- **User Action:** Click để điều hướng đến trang 'Sun* Kudos'.
- **Transition Note:** on_click -> Trang Sun* Kudos
- **Database Table:** -
- **Database Column:** -
- **Database Note:** -
- **Validation Note:** -
- **Description:**
  - Purpose: Nút menu điều hướng ở trạng thái bình thường (normal), chưa được chọn và chưa hover.
  - Display: Hiển thị text 'Sun* Kudos' với kiểu chữ mặc định (màu trắng/sáng nhạt), không có underline hay hiệu ứng nền.
  - Function: Click điều hướng đến trang 'Sun* Kudos'. Hover sẽ chuyển sang trạng thái hover.
- **Candidate QA:**
  - Xác nhận nút hiển thị text 'Sun* Kudos' ở trạng thái normal.
  - Xác nhận click nút điều hướng đến trang Sun* Kudos.
  - Xác nhận hover vào nút chuyển sang trạng thái hover.
  - Xác nhận trạng thái normal khác biệt với selected và hover.

---

## A1.6 - Notification (I2167:9091;186:2101)

- **Name JP:** 通知
- **Name Trans:** Notification
- **Item Type:** button
- **Subtype:** -
- **Button Type:** icon_text
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** -
- **User Action:** Click để mở panel thông báo.
- **Transition Note:** on_click -> Notification panel (dropdown/overlay)
- **Database Table:** notifications
- **Database Column:** -
- **Database Note:** Lấy danh sách thông báo chưa đọc của người dùng hiện tại để hiển thị badge.
- **Validation Note:** -
- **Description:**
  - Purpose: Nút icon thông báo cho phép người dùng xem các thông báo mới.
  - Display: Icon hình chuông kích thước 40x40px, nằm bên phải header. Có badge đỏ (dot) hiển thị khi có thông báo chưa đọc. Badge là chấm tròn đỏ nhỏ ở góc trên phải icon chuông.
  - Function: Click mở panel/dropdown danh sách thông báo. Badge đỏ tự động ẩn khi không có thông báo chưa đọc. Số lượng thông báo chưa đọc được cập nhật realtime.
- **Candidate QA:**
  - Xác nhận icon chuông hiển thị đúng kích thước 40x40px.
  - Xác nhận badge đỏ hiển thị khi có thông báo chưa đọc.
  - Xác nhận badge đỏ ẩn đi khi không có thông báo chưa đọc.
  - Xác nhận click icon mở panel thông báo.
  - Xác nhận danh sách thông báo hiển thị đúng nội dung.

---

## A1.7 - Language (I2167:9091;186:1696)

- **Name JP:** 言語切替
- **Name Trans:** Language Switcher
- **Item Type:** button
- **Subtype:** -
- **Button Type:** icon_text
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** VN
- **User Action:** Click để mở menu chọn ngôn ngữ.
- **Transition Note:** on_click -> Language dropdown menu (VN/EN)
- **Database Table:** -
- **Database Column:** -
- **Database Note:** Lưu ngôn ngữ ưa thích của người dùng (cookie/localStorage hoặc user settings).
- **Validation Note:** -
- **Description:**
  - Purpose: Nút chuyển đổi ngôn ngữ giao diện giữa Tiếng Việt và Tiếng Anh.
  - Display: Hiển thị icon cờ Việt Nam và text 'VN' với icon mũi tên xuống (dropdown indicator). Nằm bên phải header, trước icon tài khoản.
  - Function: Click mở dropdown menu chọn ngôn ngữ với 2 option: VN (Tiếng Việt) và EN (Tiếng Anh). Chọn ngôn ngữ sẽ thay đổi toàn bộ giao diện sang ngôn ngữ tương ứng.
- **Candidate QA:**
  - Xác nhận nút hiển thị icon cờ Việt Nam và text 'VN'.
  - Xác nhận click mở dropdown menu chọn ngôn ngữ.
  - Xác nhận dropdown có 2 option: VN và EN.
  - Xác nhận chọn ngôn ngữ thay đổi toàn bộ giao diện.
  - Xác nhận ngôn ngữ mặc định là VN.

---

## A1.8 - Button-IC (I2167:9091;186:1597)

- **Name JP:** アカウントボタン
- **Name Trans:** Account Button
- **Item Type:** button
- **Subtype:** -
- **Button Type:** icon_text
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** -
- **User Action:** Click để mở menu tài khoản.
- **Transition Note:** on_click -> Dropdown-profile (Profile / Sign out / Admin Dashboard)
- **Database Table:** users
- **Database Column:** -
- **Database Note:** Lấy thông tin người dùng hiện tại để hiển thị avatar và menu tùy chọn.
- **Validation Note:** -
- **Description:**
  - Purpose: Nút biểu tượng tài khoản cho phép người dùng truy cập menu cá nhân.
  - Display: Icon hình người dùng (user silhouette) kích thước 40x40px, viền vàng, nền tối. Nằm ở vị trí cuối cùng bên phải header.
  - Function: Click mở dropdown menu tài khoản với các option: Profile (xem hồ sơ cá nhân), Sign out (đăng xuất), Admin Dashboard (bảng điều khiển quản trị - chỉ hiển thị cho admin).
- **Candidate QA:**
  - Xác nhận icon tài khoản hiển thị đúng kích thước 40x40px.
  - Xác nhận click icon mở dropdown menu tài khoản.
  - Xác nhận dropdown có các option: Profile, Sign out.
  - Xác nhận option Admin Dashboard chỉ hiển thị cho tài khoản có quyền admin.
  - Xác nhận click Sign out đăng xuất thành công.

---

## 3.5 - Keyvisual (2167:9027)

- **Name JP:** キービジュアル
- **Name Trans:** Key Visual
- **Item Type:** others
- **Subtype:** hero
- **Button Type:** -
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** -
- **User Action:** Xem thông tin sự kiện; click nút CTA 'ABOUT AWARDS' hoặc 'ABOUT KUDOS' để điều hướng.
- **Transition Note:** Click 'ABOUT AWARDS' -> Trang Awards Information; Click 'ABOUT KUDOS' -> Trang Sun* Kudos
- **Database Table:** events
- **Database Column:** -
- **Database Note:** Lấy thông tin sự kiện (ngày, địa điểm, thời gian đếm ngược) từ cấu hình sự kiện.
- **Validation Note:** -
- **Description:**
  - Purpose: Banner hero chính của trang chủ, hiển thị chủ đề sự kiện, đồng hồ đếm ngược và thông tin sự kiện.
  - Display: Nền hình ảnh đầy màu sắc (artwork minh họa cây rễ sâu). Tiêu đề lớn 'ROOT FURTHER' kiểu typography đặc biệt. Bên dưới có nhãn 'Comming soon', đồng hồ đếm ngược (DAYS/HOURS/MINUTES), thông tin sự kiện: Thời gian 26/12/2025, Địa điểm Âu Cơ Art Center, Tường thuật trực tiếp qua sóng Livestream. 2 nút CTA: 'ABOUT AWARDS' và 'ABOUT KUDOS' với icon mũi tên.
  - Function: Đồng hồ đếm ngược tự động cập nhật theo thời gian thực. Click 'ABOUT AWARDS' điều hướng đến trang Awards Information. Click 'ABOUT KUDOS' điều hướng đến trang Sun* Kudos.
- **Candidate QA:**
  - Xác nhận banner hiển thị đúng tiêu đề 'ROOT FURTHER'.
  - Xác nhận đồng hồ đếm ngược hoạt động đúng và cập nhật realtime.
  - Xác nhận thông tin sự kiện hiển thị đúng (ngày, địa điểm).
  - Xác nhận click 'ABOUT AWARDS' điều hướng đúng trang.
  - Xác nhận click 'ABOUT KUDOS' điều hướng đúng trang.
  - Xác nhận hình nền hiển thị đúng.

---

## B1 - Countdown time (2167:9035)

- **Name JP:** カウントダウンタイム
- **Name Trans:** Countdown Time
- **Item Type:** others
- **Subtype:** countdown
- **Button Type:** -
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** -
- **User Action:** Xem thời gian đếm ngược đến sự kiện.
- **Transition Note:** -
- **Database Table:** events
- **Database Column:** event_date
- **Database Note:** Tính toán thời gian còn lại dựa trên ngày sự kiện (26/12/2025) từ cấu hình hệ thống.
- **Validation Note:** -
- **Description:**
  - Purpose: Section đồng hồ đếm ngược hiển thị thời gian còn lại đến mốc sự kiện Sun* Annual Awards 2025.
  - Display: Gồm nhãn 'Comming soon' phía trên và 3 nhóm số đếm ngược bên dưới: Days, Hours, Minutes. Mỗi nhóm số gồm 2 chữ số dạng flip-clock và nhãn đơn vị phía dưới. Nền tối, chữ số màu trắng sáng.
  - Function: Tự động cập nhật theo thời gian thực, giảm dần đến mốc sự kiện. Khi hết thời gian, section này có thể ẩn đi hoặc chuyển sang trạng thái khác.
- **Candidate QA:**
  - Xác nhận nhãn 'Comming soon' hiển thị đúng.
  - Xác nhận 3 nhóm số (Days, Hours, Minutes) hiển thị đúng.
  - Xác nhận đồng hồ đếm ngược cập nhật realtime (giảm dần mỗi phút).
  - Xác nhận giá trị đếm ngược chính xác so với ngày sự kiện.
  - Xác nhận xử lý đúng khi đồng hồ về 0.

---

## B1.2 - Coming soon (2167:9036)

- **Name JP:** 近日公開ラベル
- **Name Trans:** Coming Soon Label
- **Item Type:** label
- **Subtype:** -
- **Button Type:** -
- **Data Type:** -
- **Format:** -
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** Comming soon
- **User Action:** -
- **Transition Note:** -
- **Database Table:** -
- **Database Column:** -
- **Database Note:** -
- **Validation Note:** -
- **Description:**
  - Purpose: Nhãn thông báo trạng thái sự kiện sắp diễn ra.
  - Display: Hiển thị text 'Comming soon' màu vàng/cam, đặt phía trên đồng hồ đếm ngược. Font chữ nhỏ hơn tiêu đề chính.
  - Function: Hiển thị tĩnh. Ẩn đi khi thời gian đã trôi qua mốc sự kiện (sự kiện đã diễn ra).
- **Candidate QA:**
  - Xác nhận nhãn 'Comming soon' hiển thị đúng.
  - Xác nhận nhãn ẩn đi sau khi sự kiện đã diễn ra.
  - Xác nhận font, màu sắc hiển thị đúng theo thiết kế.

---

## B1.3 - Countdown (2167:9037)

- **Name JP:** カウントダウン
- **Name Trans:** Countdown
- **Item Type:** others
- **Subtype:** countdown
- **Button Type:** -
- **Data Type:** -
- **Format:** DD:HH:MM
- **Required:** -
- **Min/Max Length:** -
- **Default Value:** -
- **User Action:** Xem thời gian đếm ngược.
- **Transition Note:** -
- **Database Table:** events
- **Database Column:** event_date
- **Database Note:** Tính toán từ event_date trừ đi thời gian hiện tại.
- **Validation Note:** -
- **Description:**
  - Purpose: Bộ đồng hồ đếm ngược gồm 3 đơn vị thời gian.
  - Display: 3 nhóm số đặt cạnh nhau theo hàng ngang: Days, Hours, Minutes. Mỗi nhóm gồm 2 ô số (flip-clock style) màu xám bạc và nhãn đơn vị (DAYS/HOURS/MINUTES) phía dưới bằng chữ in hoa.
  - Function: Tự động đếm ngược, giảm dần theo thời gian thực. Giá trị Minutes giảm mỗi phút, Hours giảm mỗi giờ, Days giảm mỗi ngày.
- **Candidate QA:**
  - Xác nhận 3 nhóm số hiển thị đúng dạng flip-clock.
  - Xác nhận nhãn DAYS, HOURS, MINUTES hiển thị đúng.
  - Xác nhận giá trị đếm ngược chính xác.
  - Xác nhận animation flip khi số thay đổi (nếu có).

---

## B1.3.1 - Days (2167:9038)

- **Name JP:** 日数
- **Name Trans:** Days
- **Item Type:** others
- **Subtype:** countdown_tile
- **Button Type:** -
- **Data Type:** number
- **Format:** 2 chữ số (00-99)
- **Required:** -
- **Min/Max Length:** 2/2
- **Default Value:** -
- **User Action:** -
- **Transition Note:** -
- **Database Table:** events
- **Database Column:** event_date
- **Database Note:** Tính số ngày còn lại = (event_date - current_date).days
- **Validation Note:** -
- **Description:**
  - Purpose: Ô hiển thị số ngày còn lại trong đồng hồ đếm ngược.
  - Display: 2 ô chữ số dạng flip-clock (kiểu đồng hồ lật) màu xám bạc, hiển thị số ngày còn lại. Bên dưới có nhãn 'DAYS' chữ in hoa. Trong hình mẫu hiển thị giá trị '20'.
  - Function: Tự động cập nhật, giảm 1 đơn vị mỗi ngày. Hiển thị 2 chữ số (thêm số 0 đứng đầu nếu < 10).
- **Candidate QA:**
  - Xác nhận hiển thị đúng 2 chữ số.
  - Xác nhận nhãn 'DAYS' hiển thị bên dưới.
  - Xác nhận giá trị giảm đúng 1 đơn vị mỗi ngày.
  - Xác nhận hiển thị '00' khi hết ngày.
  - Xác nhận thêm số 0 đứng đầu khi giá trị < 10 (ví dụ: 09, 05).

---

## B1.3.2 - Hours (2167:9043)

- **Name JP:** 時間
- **Name Trans:** Hours
- **Item Type:** others
- **Subtype:** countdown_unit
- **Button Type:** -
- **Data Type:** number
- **Format:** 2 chữ số (00-23)
- **Required:** -
- **Min/Max Length:** 2/2
- **Default Value:** -
- **User Action:** -
- **Transition Note:** -
- **Database Table:** events
- **Database Column:** event_date
- **Database Note:** Tính số giờ còn lại = (event_date - current_date).hours % 24
- **Validation Note:** -
- **Description:**
  - Purpose: Ô hiển thị số giờ còn lại trong đồng hồ đếm ngược.
  - Display: 2 ô chữ số dạng flip-clock (kiểu đồng hồ lật) màu xám bạc, hiển thị số giờ còn lại. Bên dưới có nhãn 'HOURS' chữ in hoa. Trong hình mẫu hiển thị giá trị '20'.
  - Function: Tự động cập nhật, giảm 1 đơn vị mỗi giờ. Reset về 23 khi chuyển ngày mới. Hiển thị 2 chữ số (thêm số 0 đứng đầu nếu < 10).
- **Candidate QA:**
  - Xác nhận hiển thị đúng 2 chữ số.
  - Xác nhận nhãn 'HOURS' hiển thị bên dưới.
  - Xác nhận giá trị trong khoảng 00-23.
  - Xác nhận giá trị giảm đúng 1 đơn vị mỗi giờ.
  - Xác nhận reset về 23 khi chuyển ngày và giá trị Days giảm 1.
  - Xác nhận hiển thị '00' khi hết giờ trong ngày.
