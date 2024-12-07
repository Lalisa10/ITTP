# ITTP
Ứng dụng giúp đăng tải nhiều file ảnh văn bản tiếng Anh và chuyển thành các file pdf tiếng Việt tương ứng. Các bước bao gồm:
1. Người dùng upload một hoặc nhiều ảnh lên hệ thống;
2. Hệ thống chuyển ảnh sang dạng văn bản tiếng Anh;
3. Hệ thống dịch văn bản tiếng anh sang tiếng Việt;
4. Hệ thống chuyển mỗi văn bản thành một file pdf;
5. Hệ thống trả lại người dùng một file zip chứa các file pdf.

## Mục lục
[]
- Nhận dạng văn bản
## Libraries and Framework
React, RabbitMQ, express.js, pdfkit, multer, tesseract, react-toastify, cors, @iamtraction/google-translate, axios, tailwindCSS

## Prerequisites
- Node.js
- RabbitMQ: kết nối với RabbitMQ server 
## Install
```sh
# clone the project
$ git clone https://github.com/thinhuet2022/ITTP.git

# install dependencies
$ npm install

# chạy frontend
$ npm run dev

# chạy backend (cấu hình mặc định là mỗi FIlter chạy 3 tiến trình song song, có thể thay đổi trong file pm2.config.js)
$ npm start

# xóa message trong queue
$ npm run delete

# xóa các tiến trình chạy backend 
$ npm run delete
```
