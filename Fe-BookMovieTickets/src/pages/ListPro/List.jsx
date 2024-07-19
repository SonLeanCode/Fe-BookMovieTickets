import { useState, useEffect } from "react";
import ProductList from "./ProductList";

export const ListProDuct = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCate = async () => {
      try {
        const response = await fetch("http://localhost:3000/cate");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data); // assuming data is an array of categories
        setActiveTab(data[0]?._id); // set default active tab to the first category
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCate();
  }, []);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  if (loading) {
    return <div>Loading...</div>; // show loading indicator while fetching data
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#161616] py-20 text-white">
      <div className="my-14">
        <h2 className="mb-1 ml-20 text-3xl font-bold text-green-600">
          <span className="mr-2">|</span> PHIM
        </h2>
        <nav className="grid grid-cols-3 gap-x-4 text-center">
          {categories.map((cate) => (
            <li
              key={cate._id}
              className={`relative h-[35px] cursor-pointer py-2 ${
                activeTab === cate._id ? "text-green-400" : "text-white"
              } inline-block`}
              onClick={() => handleTabClick(cate._id)}
            >
              {cate.name}
              {activeTab === cate._id && (
                <div className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 transform bg-green-400"></div>
              )}
            </li>
          ))}
        </nav>
      </div>
      {/* List sản phẩm */}
      <ProductList activeTab={activeTab} />

      <div className="my-20">
        <h2 className="mb-1 ml-5 flex items-center justify-center pb-20 text-2xl font-bold text-green-600">
          <span className="mr-2">|</span> PHIM ĐANG CHIẾU
        </h2>
        <div className="mx-[200px]">
          <p className="text-justify text-[13px] leading-normal text-gray-400">
            Nhìn lại khoảng thời gian này 10 năm trước, thể loại siêu anh hùng
            hay cụ thể là MCU được người người nhà nhà yêu thích, ra đường làm
            fan siêu anh hùng như vua mặc long bào, đứng đầu chuỗi thức ăn. Tuy
            nhiên, “cực thình tất suy”, sự đi xuống của MCU cũng như của thể
            loại siêu anh hùng đã khiến không ít khán giả không còn quá mặn mà
            với những tác phẩm từng vang bóng 1 thời. Dẫu vậy, vào mùa hè năm
            nay, Deadpool sẽ trở lại để vực dậy thể loại anh hùng cũng như vũ
            trụ điện ảnh Marvel. Đi đôi với Người Chồn và gã phản anh hùng lắm
            mồm, khán giả còn được chào đón màn trở lại của những cái tên được
            yêu thích trên rạp chiếu phim như bè lũ loi nhoi Minions trong
            <span className="pr-1 text-orange-200"> Despicable Me 4 </span>, “tử
            thần” Conan trong{" "}
            <span className="pr-1 text-orange-200">
              Thám Tử Lừng Danh Conan
            </span>{" "}
            Movie 27. Chưa hết, “quá phụ đen” Scarlett Johansson sẽ có chuyện
            tình đầy mùi mẫn khi kết hợp cùng tài tử Channing Tatum. Cùng chờ
            đón nha!
          </p>
          <div>
            <h3 className="mt-5 font-bold text-orange-400">
              Despicable Me 4 / Kẻ Trộm Mặt Trăng 4 Hoạt hình
            </h3>
            <p className="mt-4 text-justify text-[13px] leading-normal text-gray-400">
              Despicable Me (Kẻ Trộm Mặt Trăng) phát hành năm 2010, các phần
              phim xoay quanh câu chuyện của ác nhân của Gru và những trợ thủ
              Minions nhí nhố. Thương hiệu Kẻ Trộm Mặt Trăng được đón nhận nhiệt
              tình trên màn ảnh rộng, điển hình như Despicable Me 3 từng đạt hơn
              một tỷ USD phòng vé toàn cầu, trở thành một trong những phim hoạt
              hình có doanh thu cao nhất mọi thời đại. Phần tiếp theo mang tên
              <span className="px-1 text-orange-200">
                Despicable Me 4 (tựa Việt: Kẻ Cắp Mặt Trăng 4)
              </span>
              sẽ trở lại{" "}
              <span className="pr-1 text-orange-500">rạp chiếu phim</span> vào
              hè năm nay.
              <br />
              <p className="text mt-4 text-[13px] leading-normal text-gray-400">
                Tiếp nối những sự kiện trong phần ba Despicable Me 3 (2017), giờ
                đây Gru (Steve Carrell lồng tiếng) đã hoàn lương, hạn chế tham
                gia các hoạt động phi pháp. Ngoài vợ Lucy Wilde và các cô con
                gái nuôi Margo, Edith, Agnes, giờ đây gia đình Gru còn đón thêm
                thành viên mới là nhóc tì Gru Junior - con trai đầu lòng của
                anh. Tuy nhiên, sự an toàn của gia đình Gru nhanh chóng bị đe
                dọa khi kẻ thù cũ của anh là Maxime Le Mal (Will Ferrell lồng
                tiếng) đã trốn khỏi nhà tù, hắn lên kế hoạch trả thù và thanh
                toán nợ cũ với Gru. Đồng hành với Maxime còn có người yêu
                Valentina của gã. Do đó, Gru buộc phải đứng lên đối mặt với kẻ
                thù để bảo vệ gia đình và các Minions
              </p>
            </p>
          </div>
          {/*  */}
          <div>
            <h3 className="mt-5 font-bold text-orange-400">
              Fly Me To The Moon / Vụ Bê Bối Ánh Trăng Hài, Tình cảm
            </h3>
            <p className="mt-4 text-justify text-[13px] leading-normal text-gray-400">
              <span className="px-1 text-orange-200">
                {" "}
                Fly Me To The Moon (tựa Việt: Vụ Bê Bối Ánh Trăng){" "}
              </span>
              là dự án do Apple đồng sản xuất, lấy bối cảnh cuộc chạy đua vào vũ
              trụ những năm 1960. Bộ phim mới do đạo diễn Greg Berlanti cầm
              trịch - gương mặt đứng sau thành công của những tác phẩm đình đám
              như Love, Simon hay vũ trụ siêu anh hùng Arrowverse... Với sự góp
              mặt của 2 ngôi sao là Scarlett Johansson cùng Channing Tatum, tác
              phẩm sẽ rất đáng được mong đợi trong mùa hè này.
              <br />
              <p className="mt-4 text-[13px] leading-normal text-gray-400">
                Tiếp nối những sự kiện trong phần ba Despicable Me 3 (2017), giờ
                đây Gru (Steve Carrell lồng tiếng) đã hoàn lương, hạn chế tham
                gia các hoạt động phi pháp. Ngoài vợ Lucy Wilde và các cô con
                gái nuôi Margo, Edith, Agnes, giờ đây gia đình Gru còn đón thêm
                thành viên mới là nhóc tì Gru Junior - con trai đầu lòng của
                anh. Tuy nhiên, sự an toàn của gia đình Gru nhanh chóng bị đe
                dọa khi kẻ thù cũ của anh là Maxime Le Mal (Will Ferrell lồng
                tiếng) đã trốn khỏi nhà tù, hắn lên kế hoạch trả thù và thanh
                toán nợ cũ với Gru. Đồng hành với Maxime còn có người yêu
                Valentina của gã. Do đó, Gru buộc phải đứng lên đối mặt với kẻ
                thù để bảo vệ gia đình và các Minions
              </p>
            </p>
          </div>
          {/*  */}
          <div>
            <h3 className="mt-5 font-bold text-orange-400">
              Twisters / Lốc Xoáy Tử Thần Hành động
            </h3>
            <p className="mt-4 text-justify text-[13px] leading-normal text-gray-400">
              Mùa hè năm nay, điện ảnh Hollywood sẽ mang trở lại màn ảnh một tác
              phẩm hứa hẹn của thể loại phim thảm họa, với quy mô và kinh phí
              đầu tư khủng.{" "}
              <span className="px-1 text-orange-200">
                Twisters (tựa việt: Lốc Xoáy Tử Thần)
              </span>{" "}
              là phần phim tiếp theo của{" "}
              <span className="px-1 text-orange-500"> phim hay</span> kinh điển
              Twister (1996).
              <span className="px-1 text-orange-500">Phim mới</span> đến từ đội
              ngũ sản xuất “máu mặt” của những loạt phim đình đám như Jurassic
              World hay Indiana Jones, do đạo diễn Lee Isaac Chung của Minari
              cầm trịch. Bên cạnh đó, phim quy tụ dàn diễn viên trẻ tài năng,
              từng gây ấn tượng với khán giả qua nhiều tác phẩm thành công như
              Daisy Edgar-Jones vai Kate, Glen Powell, Anthony Ramos và tân
              Superman David Corenswet.
              <br />
              <p className="mt-4 text-[13px] leading-normal text-gray-400">
                Câu chuyện về con gái của 2 người săn bão nổi tiếng của phần
                trước là Jo Thornton và Bill Harding. Để thoát khỏi cái bóng quá
                lớn của cha mẹ, cô gái có một quyết định liều lĩnh khi nỗ lực
                thử nghiệm hệ thống cảnh báo thời tiết trong một cơn lốc xoáy dữ
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
