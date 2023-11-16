# SE_Integration_Project_Official-Sem_231
Đây là repository chính thức cho môn Công nghệ phần mềm HK231.

***(Cập nhật đầu tiên 16/11/2023): Cập nhật hệ thống đăng nhập đăng ký, sử dụng cơ chế tokenization***

## Document cho project
Link task 1,2 (chỉ đọc): [Task 1,2](https://www.overleaf.com/read/sqsqqtdhmbjd#7ccd49)

Link task 3,4,5 (chỉ đọc): [Task 3,4,5](https://www.overleaf.com/read/myrmgrdxngpx#c45e67)

## Setup ngay sau khi clone project lần đầu
### Setup cơ sở dữ liệu MySQL và khởi chạy server MySQL trên máy
Trước hết, ***vui lòng cài đặt MySQL lên máy nếu chưa có, rồi nhập file `hcmut_spss.sql` vào***. Nếu chưa biết cách cài đặt thì đây là hướng dẫn:
- Các bạn có thể cài trực tiếp ứng dụng MySQL lên máy, hoặc cài đặt ứng dụng tổng hợp XAMPP tại [đây](https://www.apachefriends.org/download.html) (ứng dụng này được sử dụng trong môn Lập trình Web nên cài cũng không thừa đâu).
- Nếu dùng XAMPP, cài đặt xong thì vui lòng run as administrator ứng dụng, khi cửa sổ bật ra thì bấm nút Start ở dòng MySQL và Apache. Sau đó vào trình duyệt bất kỳ trên máy, nhập localhost rồi enter. Trang Welcome sẽ hiện ra.
- Trên thanh điều hướng, nhấn vào mục `phpMyAdmin`. Trang quản lý sẽ hiện ra, và trên thanh điều hướng mới lúc này sẽ có nút Import hoặc nhập. Bấm vào đó, khi trang hiện lên sẽ thấy khung chọn tệp. Chọn tệp `hcmut_spss.sql` rồi bấm nhập. Sau khi xong, để ý dashboard bên trái màn hình, cái list với mấy cái icon hình trụ ấy, nếu thấy một dòng tên `hcmut_spss` xuất hiện nghĩa là file database đã nhập thành công. Có thể nhấp vào dòng đó để bắt đầu xem trong cái database đó có gì.
- Sau đó, trong ứng dụng XAMPP bạn có thể stop Apache đi nếu không cần vọc nữa (nếu cần tương tác trên môi trường tiếp thì giữ cũng được), nhưng tuyệt đối không tắt MySQL. Do hiện sử dụng localhost để host server database, nếu bạn tắt nó đi nghĩa là server database sẽ offline và web chắc chắn sẽ bị lỗi ở những trang cần truy cứu database. Chỉ stop MySQL đi khi bạn muốn tắt máy đi nghỉ không debug cho project này nữa, hoặc chỉ đơn giản là đã suffer với project này quá đủ rồi, đang muốn làm cái khác và không còn nhu cầu bật cái web của project này nữa thì tắt :). Nhớ mỗi khi cần bật cái web của project này lên thì phải start MySQL trong XAMPP trước.
- Mỗi khi kiểm tra thấy repo có cập nhật, nên drop cái database cũ, rồi import lại file `hcmut_spss.sql` hiện tại trong project vì có thể có những thay đổi trên DB. Các bạn khi làm xong nếu có đổi gì trong database cũng export file sql mới rồi bỏ vào repo này để người sau còn cập nhật theo.
### Setup các thư viện cho project
Do việc push kèm thư mục node_modules (thư mục chứa các thư viện cho NodeJS và ReactJS) sẽ khiến project trở nên rất nặng (thư mục node_modules của ReactJS có dung lượng loanh quanh 300-400 MB), cũng như git sẽ không thể track được toàn bộ thay đổi.

Do đó, hai thư mục node_modules của NodeJS và ReactJS đã phải được đưa vào .gitignore.

Vì thế, ngay sau khi clone project này về lần đầu tiên, các thành viên vui lòng tiến hành cài đặt lại các thư viện này. Cụ thể như sau:

Với NodeJS, mở terminal và gõ:
```
npm install
```
Các thư viện cần thiết cho NodeJS sẽ được cài đặt.

Với ReactJS cũng tương tự, chỉ cần chuyển vào thư mục views sau đó cài đặt. Gõ hai lệnh sau:
```
cd views
npm install
```
Các thư viện cần thiết cho ReactJS sẽ được cài đặt.

## Khởi chạy web
Sau khi clone project này, mở terminal tại thư mục mà project được clone (nếu đang ở thư mục views thì phải quay ra thư mục cha nha) và gõ:
```
npm run dev
```
Trang localhost:3000 sẽ khởi chạy tự động trên trình duyệt mặc định của máy sau vài giây nếu việc thiết lập thành công (nó hơi lâu một chút do phải khởi chạy cả ReactJS ở front-end lẫn NodeJS/ExpressJS ở back-end)

## Một số thông tin về web
### Công nghệ được sử dụng
- Front-end:
    - HTML + CSS
    - Bootstrap 5 (được cài đặt như là một thư viện trong thư mục node_modules của ReactJS)
    - Javascript
    - jQuery
    - ReactJS
    - Axios (để thực hiện http request trong ReactJS)
- Back-end:
    - Server code: NodeJS v20, ExpressJS
    - Database: MySQL

### Các lưu ý
- File database này hiện chỉ có 2 table là user và printer. Vui lòng thêm các table khác liên quan đến module mà các bạn làm, cũng như thêm dữ liệu vào khi làm.
- Hiện tại, trang đã hiện thực tính năng đăng nhập (signin/authentication),  đăng ký (signup/registration) và có cơ chế xác thực (authorization), và các thành viên được khuyến khích đọc qua code cả Front-end lẫn Back-end để hiểu và thêm cơ chế xác thực (authorization) vào các trang, các tính năng cần đăng nhập với quyền nhất định (xem minh hoạ trong chính repo này về hai trang công khai (/publicTest) và trang ẩn (/protectedTest) để hiểu và quan sát cách nó vận hành). 
- **Tuy nhiên, trong trường hợp các thành viên không thể nắm được code hoặc không thể hiện thực lại cơ chế trên các trang mà bản thân hiện thực, thì không bắt buộc các thành viên phải cố bỏ cơ chế xác thực vào**
- Cụ thể, các thành viên nên ưu tiên code để chạy được trước, **trường hợp phát sinh ví dụ khi thực hiện yêu cầu in cần thông tin về sinh viên viên thực hiện yêu cầu, thì hard code một sinh viên bất kỳ gừi lên server thôi**. (Nhớ là sinh viên hard code này phải có trong database rồi, tại người dùng có `user_id` là khoá chính, nếu lưu trữ một yêu cầu in lên database thì phải chắc chắn sinh viên thực hiện đã phải tồn tại trong database rồi. Hãy dùng chức năng đăng ký đã hiện thực để thêm sinh viên mới nếu muốn, mặc định khi đăng ký sẽ đăng ký một sinh viên mới). Tuy vậy, **vẫn khuyến khích gửi dữ liệu thực của sinh viên đang đăng nhập, nó cũng không khó lấy lắm, chỉ cần tham khảo code ví dụ hai trang công khai (/publicTest) và trang ẩn (/protectedTest), hiểu rồi và viết theo là được**
- Lưu ý thêm là mật khẩu của user trong database sẽ bị mã hoá, do đó khi đăng ký bất kỳ user nào mới thì phải nhớ mật khẩu. Mật khẩu cho hai tài khoản đang có sẵn trong database hiện tại là 23571113
- Trang web hiện được viết theo mô hình kết hợp giữa MVC và Layer, trong đó phần UI chứa trong thư mục `views` được xem là một layer chứa tất cả các component liên quan, sử dụng ReactJS để hiện thực. Ngoài ra tồn tại một layer API để React gọi về server NodeJS đối với các tác vụ cần database hoặc xử lý từ server. Ở server NodeJS thì vẫn tổ chức hai bộ phận là Controller và Model.
- Nếu có đổi database về sau, chỉ cần thay đổi file `connect_db` và các file model đối tượng liên quan trong thư mục `model`. Code hiện tại đã cố gắng chia tách phần model kết nối database này với phần model của từng page trong web nhằm đảm bảo khi hiện thực hoặc đổi database, chỉ cần thay đổi kết nối trong `connect_db` và thay đổi các câu lệnh truy vấn trong các file model đối tượng liên quan, còn API mà các file đối tượng cung cấp ra là không đổi và không cần sửa (tuân thủ tối da bộ quy tắc quan trọng trong lập trình: SOLID)
- Trang web có vài thiết lập liên quan đến bảo mật thông qua các thư viện: `helmet`, `express-rate-limit`.
- Trang web đã cấu hình proxy cho ReactJS để đảm bảo ReactJS và NodeJS server tương tác được (không bị lỗi cors). Tuy nhiên, nếu xuất hiện lỗi `Invalid options object. Dev Server has been initialized using an options object that does not match the API schema... options.allowedHosts[0] should be a non-empty string` thì báo ngay để nhóm trưởng có phương án xử lý (đây là một lỗi không đại trà, chỉ một số bị thôi, nhóm trưởng cũng đã cố gắng khắc phục và hi vọng không thành viên nào bị lỗi này).
- Sau mỗi thay đổi ở NodeJS server code, vui lòng `Ctrl+C` để tắt cả ReactJS và NodeJS server, sau đó `npm run dev` lại để khởi chạy lại server, thì các thay đổi mới thấy được.

Lời cuối, chúc tất cả một ngày tốt lành!
