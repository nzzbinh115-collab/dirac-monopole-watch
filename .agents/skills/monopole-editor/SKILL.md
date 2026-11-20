---
name: monopole-editor
description: Biên tập nội dung cho Dirac Monopole Watch: phân loại bài nghiên cứu, ghi mức độ bằng chứng và viết bản tin tiếng Việt. Dùng khi quét arXiv hoặc nguồn tin, thêm bài mới, hay tổng hợp bản tin tháng. Chỉ xét monopole Dirac theo phạm vi bên dưới.
---

# Monopole Editor

Trang này phục vụ một người đọc theo dõi nghiên cứu về đơn cực từ Dirac. Giúp người đọc nhanh chóng biết bài nói gì, liên quan tới monopole Dirac tới đâu và mức độ tin cậy của bản tin. Không thêm bước chỉ để hoàn thiện quy trình.

## Phạm vi

Chỉ xét monopole Dirac: hạt điểm mang điện tích từ, điều kiện lượng tử hóa Dirac, dây Dirac, mô tả Wu–Yang hai miền, trường và thế vectơ liên quan.

- Monopole ’t Hooft–Polyakov và monopole GUT là đối tượng khác. Chỉ ghi khi bài thật sự nối sang monopole Dirac và phải gắn nhãn rõ đó là đối tượng khác.
- Monopole hiệu dụng trong vật liệu (spin ice và tương tự) là tương tự vật lý, không phải monopole Dirac. Mặc định loại, trừ khi người đọc yêu cầu.

## Phân loại mỗi bài

Ghi hai trường độc lập.

**Mức độ liên quan**

- `DIRECT`: nghiên cứu trực tiếp monopole Dirac.
- `RELATED`: không nghiên cứu trực tiếp nhưng có mối liên hệ cụ thể chỉ ra được, chẳng hạn dùng mô tả Wu–Yang, xét lượng tử hóa điện tích, hoặc tán xạ lên monopole. Liên hệ mơ hồ như “cùng gauge theory” không đủ.
- `EXCLUDED`: chỉ trùng từ khóa hoặc thuộc đối tượng khác.
- `PENDING_REVIEW`: chưa đủ thông tin để phân loại đáng tin cậy.

**Loại tài liệu**

- `RESEARCH`: nghiên cứu gốc.
- `REVIEW`: bài tổng quan.
- `THESIS`: luận án hoặc luận văn.
- `NEWS`: thông cáo hoặc tin từ tổ chức thí nghiệm, chưa có bài báo gốc.
- `OTHER`: tài liệu không thuộc các loại trên nhưng vẫn có lý do rõ ràng để lưu.

## Mức độ bằng chứng

Ghi rõ trên mỗi bản tin; không gộp các mức sau với nhau.

- `THEORY`: kết quả lý thuyết hoặc chứng minh toán.
- `SIMULATION`: mô phỏng hoặc tính số.
- `LIMIT`: giới hạn thực nghiệm loại trừ, không phải phát hiện.
- `CANDIDATE`: tín hiệu ứng viên chưa được xác nhận.
- `DETECTION`: phát hiện đã qua kiểm chứng độc lập.

## Quy tắc biên tập

1. Không phân loại chỉ từ tiêu đề hay từ khóa. Tối thiểu đọc abstract; với bài quan trọng, đọc phần liên quan trong toàn văn.
2. Không bịa số liệu, tên thí nghiệm, DOI, arXiv ID hoặc ngày công bố. Nếu chưa chắc, để trống trường đó và ghi `PENDING_REVIEW`.
3. Không viết giới hạn loại trừ thành phát hiện, kết quả lý thuyết thành bằng chứng thực nghiệm, hay ứng viên thành xác nhận. Kết quả không tìm thấy gì không chứng minh monopole không tồn tại: nó chỉ loại trừ trong phạm vi mô hình và giả định của phân tích; bản tin phải nói rõ phạm vi này.
4. Phân biệt điều tác giả tuyên bố với diễn giải của người biên tập.
5. Không dùng “đột phá” hoặc “lần đầu tiên” nếu nguồn không nói vậy.
6. Không kết luận “chưa từng có nghiên cứu về X” chỉ vì một lượt tìm kiếm không thấy.
7. Mỗi bản tin ghi `editorial_verification`: `VERIFIED` hoặc `PENDING_REVIEW`. `VERIFIED` chỉ có nghĩa là thông tin biên tập đã được kiểm tra; nó không đồng nghĩa một kết quả khoa học đã được xác nhận. Chỉ đặt `VERIFIED` khi đã kiểm đủ cả bốn điều kiện:
   - Nguồn gốc xác định và mở được.
   - Phân loại có căn cứ.
   - Các khẳng định chính có nguồn đỡ.
   - Bản tin không nói quá kết quả và ghi rõ giới hạn nguồn (ví dụ: mới đọc abstract hay chỉ có thông cáo).

   Nếu chưa đủ điều kiện, ghi `PENDING_REVIEW`. Bản tin vẫn có thể đăng trong mục tin chưa kiểm chứng; không được che trạng thái xác minh.

## Định dạng bản tin

Mỗi bản tin gồm:

1. Tiêu đề bài gốc và liên kết arXiv hoặc DOI.
2. Một đến hai câu nêu tác giả làm gì và kết quả chính.
3. Ba nhãn riêng: mức độ liên quan, loại tài liệu, mức độ bằng chứng.
4. Một câu nêu giới hạn: bài chưa chứng minh hoặc chưa khảo sát điều gì.
5. Trạng thái `editorial_verification` và mức độ bằng chứng khoa học riêng biệt.

Không suy diễn thông tin thiếu; để trống trường chưa xác minh và ghi `PENDING_REVIEW` khi cần.

## Nhịp vận hành

- Quét hàng tuần: arXiv `hep-th`, `hep-ex`, `math-ph` và trang của các nhóm thí nghiệm như MoEDAL. Chỉ đưa tiếp bài đạt ít nhất `RELATED`; bỏ qua `EXCLUDED`.
- Tổng hợp hàng tháng từ các bài đã phân loại. Đưa bài `PENDING_REVIEW` vào mục riêng “Chưa rõ” ở cuối trang; không giấu bài và không ép viết thành bản tin chắc chắn.
