import type { AwardCategoryDetail } from "@/types/award";

export const AWARD_CATEGORIES: AwardCategoryDetail[] = [
  {
    id: "1",
    name: "Top Talent",
    menuLabel: "Top Talent",
    slug: "top-talent",
    description:
      "Giải thưởng Top Talent vinh danh những cá nhân xuất sắc toàn diện – những người không ngừng khẳng định năng lực chuyên môn vững vàng, hiệu suất công việc vượt trội, luôn mang lại giá trị vượt kỳ vọng, được đánh giá cao bởi khách hàng và đồng đội. Với tinh thần sẵn sàng nhận mọi nhiệm vụ tổ chức giao phó, họ luôn là nguồn cảm hứng, thúc đẩy động lực và tạo ảnh hưởng tích cực đến cả tập thể.",
    quantity: 10,
    unit: "Đơn vị",
    prizes: [{ value: "7.000.000 VNĐ", note: "cho mỗi giải thưởng" }],
    image: "/images/award-top-talent.png",
    order: 1,
  },
  {
    id: "2",
    name: "Top Project",
    menuLabel: "Top Project",
    slug: "top-project",
    description:
      "Giải thưởng Top Project vinh danh các tập thể dự án xuất sắc với kết quả kinh doanh vượt kỳ vọng. Hiệu quả vận hành tối ưu và sự tỉnh thần làm việc tận tâm. Đây là các dự án có đổ phức tạp kỹ thuật cao, hiệu quả tài chính tốt và có giá trị. Kết quả và thành công của dự án phải được phản hồi tích cực từ khách hàng. Giải thưởng này nhằm khích lệ sự kiên trì, sáng tạo và chuẩn phát triển vốn có trong phát triển dự án, tạo nên mô hình mẫu về sự xuất sắc và chuyên nghiệp.",
    quantity: 2,
    unit: "Tập thể",
    prizes: [{ value: "15.000.000 VNĐ", note: "cho mỗi giải thưởng" }],
    image: "/images/award-top-project.png",
    order: 2,
  },
  {
    id: "3",
    name: "Top Project Leader",
    menuLabel: "Top Project Leader",
    slug: "top-project-leader",
    description:
      'Giải thưởng Top Project Leader vinh danh những nhà quản lý dự án xuất sắc – những người luôn hết tụ tận tâm, và từ "Aim High – Be Agile" trong mọi hoạt động. Họ là những người có Project Management Skill tốt, luôn không ngừng cống hiến vượt qua thử thách và đạt được mục tiêu đã đề ra, mà còn giữ vững giá trị tốt đẹp của tổ chức, tinh thần Teamwork, và sự không khát để trở thành phiên bản tốt hơn – hạnh phúc hơn của chính mình.',
    quantity: 3,
    unit: "Cá nhân",
    prizes: [{ value: "7.000.000 VNĐ", note: "cho mỗi giải thưởng" }],
    image: "/images/award-top-project-leader.png",
    order: 3,
  },
  {
    id: "4",
    name: "Best Manager",
    menuLabel: "Best Manager",
    slug: "best-manager",
    description:
      "Giải thưởng Best Manager vinh danh những nhà lãnh đạo thực thụ – người đã sẵn đã đặt dấu của mình trên và kết quả vượt kỳ vọng, tạc động vào kết quả kinh tế qua phát triển bền vững của cả cá nhân, chức. Dưới sự lãnh đạo của họ, Bộ phận hoàn thành chỉ tiêu, dần một nhịp nhàng tỏa, bằng năng lực ải dụ duy trì chính nghĩ tình hoạt trong kỹ nghề sạt, họ truyền cảm hứng để tạo bất kể số lượng công ty bao đầy năng lượng, sẵn sàng đón nhận, khám chi với đến sau ra những thay đổi và tinh cách mạng.",
    quantity: 1,
    unit: "Cá nhân",
    prizes: [{ value: "10.000.000 VNĐ", note: "cho mỗi giải thưởng" }],
    image: "/images/award-best-manager.png",
    order: 4,
  },
  {
    id: "5",
    name: "Signature 2025 - Creator",
    menuLabel: "Signature 2025 Creator",
    slug: "signature-2025-creator",
    description:
      'Giải thưởng Signature vinh danh và khắn hoạ tài năng của bạn trên bước đường tỏa sáng mà Sun* luôn đã lại trong từng thời kỳ.\n\nTrong năm 2025, giải thưởng Signature vinh danh Creator – cá nhân/tập thể mang sứ mạng sử dụng và đóng và hoàn thiện sản phẩm technology, đóng góp, tạo ra giá trị tốt hơn phạm trọng hãnh đồng. Họ là những người nhắp bẩn còn đã để, phương pháp dự chi để, liêm hoặc, và bản thân "Creator" để trung của Sun*, họ không chỉ tạo dùng tối cứa sản phẩm công nghệ vào thời đổi mà còn cho chính mình, tận cần mọi cho cần mà người Sun* tạo giá trị.',
    quantity: 1,
    unit: "Cá nhân",
    prizes: [
      { value: "5.000.000 VNĐ", note: "cho giải cá nhân" },
      { value: "8.000.000 VNĐ", note: "cho giải tập thể" },
    ],
    image: "/images/award-signature-creator.png",
    order: 5,
  },
  {
    id: "6",
    name: "MVP (Most Valuable Person)",
    menuLabel: "MVP",
    slug: "mvp",
    description:
      'Giải thưởng MVP vinh danh cá nhân xuất sắc nhất nhân – giống như bao biển đã được dành cho bao bộ tập hợp tổ người đã thể hiện năng lực vượt bật, tinh thần cống hiến hết lý, và tầm ảnh hưởng sâu rộng để trở thành đại diện mạnh mẽ nhất trong hành trình của Sun* xuất sắc.\n\nKhông chỉ một bất bật hiệu suất và kết quả công việc, hay một tấm gương hành tử hàng ngày, MVP là người hội tụ đầy đủ phẩm chất của người Sun* và, đồng thời vượng trình mình trung hành trình với Sun* trở thành biểu tượng đã điển của nàm người đi của và trên bao*, giác phần đã tạo tất các vương tới không điện cao nhất.',
    quantity: 1,
    unit: "Cá nhân",
    prizes: [{ value: "15.000.000 VNĐ", note: "cho mỗi giải thưởng" }],
    image: "/images/award-mvp.png",
    order: 6,
  },
];
