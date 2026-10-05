# Ngâm chút

Landing page giới thiệu 3 túi ngâm chân thư giãn: Đêm Êm, Tan Làm và Dầm Mưa.

## Chạy local

Bạn có thể mở trực tiếp file `index.html` trong trình duyệt hoặc dùng VS Code Live Server.

## Ảnh sản phẩm và logo

Ảnh sản phẩm và logo đang được dùng trực tiếp từ thư mục `assets/images`:

- `DemEm.png` — Đêm Êm
- `TanLam.png` — Tan Làm
- `DamMua.png` — Dầm Mưa
- `LogoNgamChut.jpg` — logo

Ba ảnh PNG đã loại bỏ nền trắng ở hai góc trên để hòa vào nền trang. Ảnh sản phẩm được tham chiếu trong `js/script.js`; logo nằm trong `index.html` và `product.html`. Có thể thay ảnh giữ nguyên tên file hoặc cập nhật các đường dẫn tương ứng.

## Playlist nhạc

Trang chi tiết mỗi sản phẩm có một playlist để người dùng chọn nghe. Các file nhạc nằm trong `assets/audio`:

- `dem-em.mp3`
- `tan-lam.mp3`
- `dam-mua.mp3`

Bạn có thể thay các file này bằng nhạc thật nếu muốn. Giữ nguyên tên file để không cần chỉnh code. Nhạc không tự phát; chỉ được tải khi người dùng chọn một bản.

## Trang chi tiết sản phẩm

Các nút “Khám phá” dẫn tới `product.html?id=dem-em`, `product.html?id=tan-lam` hoặc `product.html?id=dam-mua`. Trang tĩnh này đọc mã sản phẩm từ URL, nên hoạt động trực tiếp trên GitHub Pages mà không cần backend.

## Deploy lên GitHub Pages

1. Push project lên repository GitHub.
2. Vào Settings > Pages.
3. Chọn `Deploy from a branch`.
4. Chọn branch `main` hoặc `master` và folder `root`.
5. Save. GitHub Pages sẽ cung cấp URL để xem trang.

## Lưu ý kỹ thuật

- Website không cần backend.
- Tất cả asset đều dùng đường dẫn tương đối để hoạt động trên GitHub Pages.
- Dữ liệu sản phẩm, ảnh, mô tả và các lựa chọn nhạc được lưu trong `products` array ở đầu `js/script.js`.
- Nếu cần thêm / sửa sản phẩm hoặc bản nhạc, cập nhật mảng `products` trong `js/script.js`.

## Chỉnh sửa nội dung

Các đoạn text chính nằm trong:

- `index.html`
- `product.html`
- `js/script.js`

Nếu bạn muốn đổi slogan, mô tả, tên sản phẩm hoặc quy trình, hãy sửa các dòng tương ứng.
