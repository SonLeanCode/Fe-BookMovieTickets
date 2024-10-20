import { useEffect } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  useEffect(() => {
    // Function to animate values
    function animateValue(id, start, end, duration) {
      let startTimestamp = null;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        document.getElementById(id).innerText = Math.floor(
          progress * (end - start) + start,
        );
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          document.getElementById(id).innerText = end; // Ensure the final value is shown accurately
        }
      };

      window.requestAnimationFrame(step);
    }

    // Animate the values
    animateValue("transactions", 0, 440, 2000); // 44 triệu
    animateValue("assets", 0, 1899000, 2000); // 19 tỷ
    animateValue("users", 0, 26000, 2000); // 46,000
  }, []);

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h1 className="font-bold uppercase">
            Đặt Vé <span className="text-red-600">Xem Phim</span> Bất Kì Ngay Hôm Nay!
          </h1>
          <h3 className="text-lg">Trải nghiệm điện ảnh tuyệt vời tại rạp.</h3>{" "}
          {/* Thay đổi kích thước nếu cần */}
          <p className="text-sansang">
            {" "}
            Nhập email để nhận thông tin về lịch chiếu và ưu đãi đặc biệt.
          </p>
          <form className="email-signup">
            <input type="email" placeholder="Địa chỉ email" required />
            <button className="font-bold" type="submit">
              Đặt Vé Ngay
            </button>
          </form>
        </div>
      </header>

      {/* Features Section */}
      <section>
        {featuresData.map((feature, index) => (
          <div className="features" key={index}>
            <div className="row">
              {index % 2 === 0 ? (
                <>
                  <div className="text-col">
                    <h2>{feature.title}</h2>
                    <p>{feature.description}</p>
                  </div>
                  <div className="img-col">
                    {feature.video ? (
                      <video autoPlay>
                        <source src={feature.video} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={feature.img} alt="" />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="img-col">
                    <img src={feature.img} alt="" />
                  </div>
                  <div className="text-col">
                    <h2>{feature.title}</h2>
                    <p>{feature.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section>
        <div className="bg-dark features py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-lg leading-7 text-blue-500">
                  Giao dịch mỗi 24 giờ
                </dt>
                <dd
                  id="transactions"
                  className="order-first text-4xl font-bold tracking-tight text-white sm:text-6xl"
                >
                  0{" "}
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-lg leading-7 text-green-500">
                  Tài sản đang nắm giữ
                </dt>
                <dd
                  id="assets"
                  className="order-first text-4xl font-bold tracking-tight text-white sm:text-6xl"
                >
                  0
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-lg leading-7 text-red-500">
                  Người dùng mới hàng năm
                </dt>
                <dd
                  id="users"
                  className="order-first text-4xl font-bold tracking-tight text-white sm:text-6xl"
                >
                  0
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* promo section  */}
      <section>
        <div className="bg-dark features relative overflow-hidden">
          <section
            aria-labelledby="sale-heading"
            className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <h2
                id="sale-heading"
                className="text-1xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-6xl"
              >
                Mua vé phim{" "}
                <span className="text-red-600">giảm giá 25%</span> ngay hôm nay!
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-xl text-white">
                Đừng bỏ lỡ cơ hội thưởng thức những bộ phim hot nhất với giá ưu
                đãi. Mua vé ngay khi còn chỗ!
              </p>
              <a
                href="#"
                className="mt-6 inline-block w-full rounded-md border border-transparent bg-red-600 px-8 py-3 font-medium text-white hover:bg-red-800 sm:w-auto"
              >
                Mua vé ngay
              </a>
            </div>
          </section>

          <section
            aria-labelledby="testimonial-heading"
            className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
          >
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <h2
                id="testimonial-heading"
                className="text-2xl font-bold tracking-tight text-white"
              >
                Khách hàng nói gì về dịch vụ của chúng tôi?
              </h2>

              <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                <blockquote className="sm:flex lg:block">
                  <svg
                    width="24"
                    height="18"
                    viewBox="0 0 24 18"
                    aria-hidden="true"
                    className="flex-shrink-0 text-gray-300"
                  >
                    <path
                      d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                    <img
                      src="https://i.pinimg.com/564x/31/f1/59/31f15973fa9c37679194d44f81e8504f.jpg"
                      width={80}
                      height={80}
                      alt=""
                    />
                    <cite className="mt-4 block font-semibold not-italic text-white">
                      Tuấn - Hồ Chí Minh
                    </cite>
                    <p className="mt-2 text-base text-slate-400">
                      Dịch vụ đặt vé rất tiện lợi! Tôi đã đặt vé cho cả gia đình
                      và không gặp bất kỳ khó khăn nào.
                    </p>
                  </div>
                </blockquote>
                <blockquote className="sm:flex lg:block">
                  <svg
                    width="24"
                    height="18"
                    viewBox="0 0 24 18"
                    aria-hidden="true"
                    className="flex-shrink-0 text-gray-300"
                  >
                    <path
                      d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                    <img
                      src="https://i.pinimg.com/736x/4b/b1/bb/4bb1bbcf8511946ae41ea13463dc654d.jpg"
                      width={80}
                      height={80}
                      alt=""
                    />
                    <cite className="mt-4 block font-semibold not-italic text-white">
                      Ngọc, Hà Nội
                    </cite>
                    <p className="mt-2 text-base text-slate-400">
                      Dịch vụ đặt vé rất tiện lợi! Tôi đã đặt vé cho cả gia đình
                      và không gặp bất kỳ khó khăn nào.
                    </p>
                  </div>
                </blockquote>
                <blockquote className="sm:flex lg:block">
                  <svg
                    width="24"
                    height="18"
                    viewBox="0 0 24 18"
                    aria-hidden="true"
                    className="flex-shrink-0 text-gray-300"
                  >
                    <path
                      d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                    <img
                      src="https://i.pinimg.com/736x/7d/db/bb/7ddbbb7721e1c65af3b4cf23d063622e.jpg"
                      width={80}
                      height={80}
                      alt=""
                    />
                    <cite className="mt-4 block font-semibold not-italic text-white">
                      Sơn, Hà Nội
                    </cite>
                    <p className="mt-2 text-base text-slate-400">
                      Dịch vụ đặt vé rất tiện lợi! Tôi đã đặt vé cho cả gia đình
                      và không gặp bất kỳ khó khăn nào.
                    </p>
                  </div>
                </blockquote>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* logo sectiôn  */}
      <section>
        <div className="bg-dark features py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-6">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <img
                  src="https://i.pinimg.com/564x/34/e6/14/34e61496b47f918fa7b7711a2407d44a.jpg"
                  alt="Logo Yamaha"
                />
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <img
                  src="https://i.pinimg.com/736x/ee/27/10/ee27101c5de2330e40a1688d090c158d.jpg"
                  alt="Logo Yamaha"
                />
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <img
                  src="https://i.pinimg.com/564x/3f/a7/23/3fa7236f8b4403e96ded6f4864978cbc.jpg"
                  alt="Logo Yamaha"
                />
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <img
                  src="https://i.pinimg.com/564x/c9/ec/43/c9ec43116bcc039fe55de50a3240a53b.jpg"
                  alt="Logo Yamaha"
                />
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <img
                  src="https://i.pinimg.com/564x/1c/c2/ba/1cc2baf0630c7bcf76e867034677dbf4.jpg"
                  alt="Logo Yamaha"
                />
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <img
                  src="https://i.pinimg.com/564x/85/99/e1/8599e17e8aec6ab5d5b773254c3d8517.jpg"
                  alt="Logo Yamaha"
                />
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="faq">
        <h2>Câu hỏi thường gặp</h2>
        <ul className="accordion">
          {faqData.map((faq, index) => (
            <li key={index}>
              <input type="radio" name="accordion" id={`faq-${index}`} />
              <label htmlFor={`faq-${index}`}>{faq.question}</label>
              <div className="content">
                <p>{faq.answer}</p>
              </div>
            </li>
          ))}
        </ul>
        <small>
          Sẵn sàng xem phim? Nhập địa chỉ email của bạn để tạo hoặc khởi động
          lại thành viên của bạn.
        </small>
        <form className="email-signup">
          <input type="email" placeholder="Địa chỉ email" required />
          <button type="submit">Bắt đầu ngay</button>
        </form>
      </div>
    </div>
  );
};

// Sample data for features, FAQs, and footer links
const featuresData = [
  {
    title: "Xem Phim Tại Rạp",
    description:
      "Trải nghiệm những bộ phim mới nhất trên màn hình lớn với âm thanh sống động.",
    img: "https://i.pinimg.com/originals/08/25/95/08259569cc082a3eb5189bb5f2b36b78.gif", // Thay đổi link video nếu cần
  },
  {
    title: "Đặt Vé Online Dễ Dàng",
    description:
      "Đặt vé chỉ với vài cú click chuột và nhận vé điện tử ngay lập tức.",
    img: "/src/assets/daclathich.jpg", // Thay đổi link hình ảnh nếu cần
  },
  {
    title: "Xem Phim Mọi Lúc, Mọi Nơi",
    description:
      "Chọn giờ chiếu và địa điểm phù hợp để có trải nghiệm xem phim tuyệt vời nhất.",
    img: "https://i.pinimg.com/originals/f0/bf/fc/f0bffc25920287a3d96566d120b53d86.gif", // Thay đổi link video nếu cần
  },
  {
    title: "Ưu Đãi Đặc Biệt Cho Khách Hàng",
    description:
      "Nhận thông báo về các chương trình khuyến mãi và ưu đãi đặc biệt khi đặt vé.",
    img: "https://i.pinimg.com/736x/78/44/65/7844654d1dc779e3a19063880966ae54.jpg", // Thay đổi link hình ảnh nếu cần
  },
];

const faqData = [
  {
    question: "Vé xem phim là gì?",
    answer:
      "Vé xem phim cho phép bạn vào rạp để thưởng thức các bộ phim mới nhất với trải nghiệm âm thanh và hình ảnh chất lượng cao.",
  },
  {
    question: "Giá vé xem phim là bao nhiêu?",
    answer:
      "Giá vé dao động từ 50.000 VNĐ đến 200.000 VNĐ tùy thuộc vào bộ phim và thời gian chiếu.",
  },
  {
    question: "Tôi có thể xem phim ở đâu?",
    answer:
      "Bạn có thể xem phim tại các rạp chiếu phim trên toàn quốc theo lịch chiếu đã công bố.",
  },
  {
    question: "Tôi có thể hủy vé đã đặt không?",
    answer:
      "Có, bạn có thể hủy vé đã đặt trong vòng 1 giờ trước giờ chiếu mà không mất phí.",
  },
  {
    question: "Tôi có thể xem những bộ phim nào?",
    answer:
      "Chúng tôi có một thư viện phong phú với nhiều thể loại phim, bao gồm phim hành động, tình cảm, hài hước, và phim hoạt hình.",
  },
  {
    question: "Có ưu đãi nào cho trẻ em không?",
    answer:
      "Chúng tôi có các chương trình ưu đãi đặc biệt cho trẻ em, bao gồm vé trẻ em và các bộ phim hoạt hình phù hợp.",
  },
];

export default LandingPage;
