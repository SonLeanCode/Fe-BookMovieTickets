import "./FooterWeb.css"; // Đảm bảo bạn đã tạo file CSS này

const FooterWeb = () => {
  return (
    <>
        <session>
          <footer>
            <div className="footer-container">
              <footer>
                <div className="footer-container">
                  <div className="footer-logo">
                    <h1>ST-FLIX</h1>
                    <strong>
                      Chúng tôi cung cấp các dịch vụ giải trí trực tuyến chất lượng cao.
                      Để biết thêm thông tin, hãy liên hệ với chúng tôi qua email hoặc
                      số điện thoại dưới đây.
                    </strong>
                    <br></br>
                    <strong>Email: Stflix@gmail.com</strong>
                    <br></br>
                    <strong>Điện thoại: (123) 456-7890</strong>

                    <div className="social-icons">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        className="social-icon"
                      >
                        <img
                          src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png"
                          alt="Facebook"
                        />
                      </a>
                      <a
                        href="https://youtube.com"
                        target="_blank"
                        className="social-icon"
                      >
                        <img
                          src="https://img.icons8.com/ios-filled/50/ffffff/youtube.png"
                          alt="YouTube"
                        />
                      </a>
                      <a
                        href="https://tiktok.com"
                        target="_blank"
                        className="social-icon"
                      >
                        <img
                          src="https://img.icons8.com/ios-filled/50/ffffff/tiktok.png"
                          alt="TikTok"
                        />
                      </a>
                      <a href="https://zalo.me" target="_blank" className="social-icon">
                        <img
                          src="https://img.icons8.com/ios-filled/50/ffffff/zalo.png"
                          alt="Zalo"
                        />
                      </a>
                    </div>
                  </div>

                  <div className="footer-links">
                    <div className="footer-menu">
                      <h3>Trang chủ</h3>
                      <ul className="sub-menu">
                        <li>
                          <a href="#">Giới thiệu</a>
                        </li>
                        <li>
                          <a href="#">Tin tức</a>
                        </li>
                        <li>
                          <a href="#">Sự kiện</a>
                        </li>
                      </ul>
                    </div>
                    <div className="footer-menu">
                      <h3>Giới thiệu</h3>
                      <ul className="sub-menu">
                        <li>
                          <a href="#">Về chúng tôi</a>
                        </li>
                        <li>
                          <a href="#">Đội ngũ</a>
                        </li>
                        <li>
                          <a href="#">Đối tác</a>
                        </li>
                      </ul>
                    </div>
                    <div className="footer-menu">
                      <h3>Dịch vụ</h3>
                      <ul className="sub-menu">
                        <li>
                          <a href="#">Dịch vụ chính</a>
                        </li>
                        <li>
                          <a href="#">Dịch vụ bổ sung</a>
                        </li>
                        <li>
                          <a href="#">Khách hàng</a>
                        </li>
                      </ul>
                    </div>
                    <div className="footer-menu">
                      <h3>Liên hệ</h3>
                      <ul className="sub-menu">
                        <li>
                          <a href="#">Thông tin liên hệ</a>
                        </li>
                        <li>
                          <a href="#">Gửi phản hồi</a>
                        </li>
                        <li>
                          <a href="#">Bản đồ</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="footer-payment-methods">
                    <p>Chúng tôi chấp nhận các phương thức thanh toán sau:</p>
                    <div className="payment-icons">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png?20201011055544"
                        alt="Credit Card"
                      />
                      <img
                        src="https://img.pikbest.com/png-images/qiantu/vector-cartoon-minimalistic-banknote-coin-gold-coin-icon_2691793.png!f305cw"
                        alt="Cash"
                      />
                    </div>
                  </div>
                </div>
              </footer>
              </div>
              </footer>
          </session>
    </>
  );
};

export default FooterWeb;
