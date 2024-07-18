// import { useParams } from "react-router-dom";
import TodayDate from "./Day/Day";
import VideoPopup from "./video/Video";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

export const DetaiTicKet = () => {
  // const { id } = useParams;
  // const [move, setMove] = useState;
  // useEffect(() => {
  //   const fetchApi = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5173/detail/${id}`);
  //       if (response.ok) {
  //         const data = await response.json;
  //         setMove(data);
  //       } else {
  //         throw new Error("Không thể lấy thông tin");
  //       }
  //     } catch (error) {
  //       console.error;
  //       "Lỗi kho lấy dữ liệu", error;
  //     }
  //   };
  //   fetchApi();
  // }, [id, setMove]);
  // const location = useLocation();
  // const { item } = location.state || {}; // Check if state exists to avoid errors
  //   nếu điều hướng trang bằng .history.push là trang thì detail thì state sẽ là  detail
  // if (!item) {
  //   return <div>Không tìm thấy thông tin phim</div>;
  // }

  return (
    <div className="">
      {/* <iframe
        width="100%"
        height="600px"
        src="https://www.youtube.com/embed/1ryqp7IVZro?si=baOECov02ZaZm_wE"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe> */}
      <VideoPopup />
      {/* {move.id && ( */}
      <div className="flex h-[1800px] bg-[#161616] px-[120px] py-[55px]">
        <div className="mr-10">
          <img
            className="aspect-[4/5] w-[300px]"
            src="./src/assets/hinh3.avif"
            alt=""
          />
          <div>
            {/* noi dung phim */}
            <div className="absolute top-[135%] pr-[550px]">
              <h2 className="text-white">
                <span className="text-3xl font-bold text-purple-600">|</span>{" "}
                <span className="text-xl font-bold text-gray-300">
                  NỘI DUNG PHIM
                </span>
              </h2>
              <p className="mt-4 text-justify text-[13px] leading-normal text-gray-400">
                <span className="px-1 text-orange-200">
                  {" "}
                  Fly Me To The Moon (tựa Việt: Vụ Bê Bối Ánh Trăng){" "}
                </span>
                là dự án do Apple đồng sản xuất, lấy bối cảnh cuộc chạy đua vào
                vũ trụ những năm 1960. Bộ phim mới do đạo diễn Greg Berlanti cầm
                trịch - gương mặt đứng sau thành công của những tác phẩm đình
                đám như Love, Simon hay vũ trụ siêu anh hùng Arrowverse... Với
                sự góp mặt của 2 ngôi sao là Scarlett Johansson cùng Channing
                Tatum, tác phẩm sẽ rất đáng được mong đợi trong mùa hè này.
                <br />
                <p className="mt-4 text-[13px] leading-normal text-gray-400">
                  Tiếp nối những sự kiện trong phần ba Despicable Me 3 (2017),
                  giờ đây Gru (Steve Carrell lồng tiếng) đã hoàn lương, hạn chế
                  tham gia các hoạt động phi pháp. Ngoài vợ Lucy Wilde và các cô
                  con gái nuôi Margo, Edith, Agnes, giờ đây gia đình Gru còn đón
                  thêm thành viên mới là nhóc tì Gru Junior - con trai đầu lòng
                  của anh. Tuy nhiên, sự an toàn của gia đình Gru nhanh chóng bị
                  đe dọa khi kẻ thù cũ của anh là Maxime Le Mal (Will Ferrell
                  lồng tiếng) đã trốn khỏi nhà tù, hắn lên kế hoạch trả thù và
                  thanh toán nợ cũ với Gru. Đồng hành với Maxime còn có người
                  yêu Valentina của gã. Do đó, Gru buộc phải đứng lên đối mặt
                  với kẻ thù để bảo vệ gia đình và các Minions
                </p>
                <br />
                <p className="mt-4 text-[13px] leading-normal text-gray-400">
                  Kẻ Trộm Mặt Trăng 4 đánh dấu sự quay lại của Chris Renaud,
                  người đã từng chỉ đạo Despicable Me 1, Despicable Me 2 và The
                  Lorax. Kịch bản được thực hiện bởi Mike White (The White
                  Lotus), và giống như tất cả các phim của Illumination, Chris
                  Meledandri tiếp tục phụ trách sản xuất. Lồng tiếng cho bộ phim
                  là dàn diễn viên quen thuộc qua các phần trước như diễn viên
                  Steve Carell (The Office) sẽ trở lại lồng tiếng cho Gru và
                  Kristen Wiig (Bridesmaids) lồng tiếng cho cô vợ Lucy Wilde,
                  Miranda Cosgrove (iCarly) vẫn đảm nhiệm lồng tiếng cho vai
                  Margo, con gái lớn của Gru và Steve Coogan (Philomena) lồng
                  tiếng cho Silas Ramsbottom cùng nhiều diễn viên tên tuổi khác.
                  Xem thêm tại:
                </p>
              </p>
            </div>
          </div>
          {/* LICH CHIEU  */}
          <div className="absolute top-[190%]">
            <h2 className="text-white">
              <span className="text-3xl font-bold text-purple-600">|</span>{" "}
              <span className="text-xl font-bold text-gray-300">
                LỊCH CHIẾU
              </span>
            </h2>
            <div>
              {/* day */}

              <TodayDate />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 py-7">
          <div className="rounded-lg">
            <h2 className="mb-2 pb-3 text-xl font-bold text-white">
              Joker 2 | The new movie
            </h2>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mr-2 h-6 w-6 text-[#90C63F]"
                >
                  <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>99 Phút</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mr-2 h-6 w-6 text-[#90C63F]"
                >
                  <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15" />
                </svg>
                <span>29/08/2024</span>
              </div>
            </div>
            <div className="flex items-center pt-3 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-[#ff00ff]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>

              <span className="text-white">
                <spa className="text-[20px]"> 8.2</spa>{" "}
                <span className="text-gray-400">(120 votes)</span>
              </span>
            </div>
            {/*  */}
            <div className="pt-3 text-gray-200">
              <span className="text-gray-400">Quốc gia:</span>
              <span className="ml-6">Mỹ</span>
            </div>
            {/*  */}
            <div className="pt-3 text-gray-200">
              <span className="text-gray-400">Nhà sản xuất:</span>
              <span className="ml-4">DC Entertainment</span>
            </div>
            {/*  */}
            <div className="flex items-center pt-3 text-white">
              <span className="text-gray-400">Thể loại:</span>
              <span className="ml-6 rounded-lg border-2 border-gray-400 px-5 py-1 hover:border-orange-500">
                Kinh dị
              </span>
            </div>
            {/*  */}
            <div className="flex items-center pt-3 text-white">
              <span className="text-gray-400">Đạo diễn:</span>
              <span className="ml-4 rounded-lg border-2 border-gray-400 px-5 py-1 hover:border-orange-500">
                Todd Phillips
              </span>
            </div>
            {/*  */}
            <div className="flex flex-wrap items-center pt-3 text-white">
              <span className="text-gray-400">Diễn viên:</span>
              <span className="ml-4 inline-block rounded-lg border-2 border-gray-400 px-5 py-1 hover:border-orange-500">
                Joaquin Phoenix
              </span>
              <span className="ml-4 inline-block rounded-lg border-2 border-gray-400 px-5 py-1 hover:border-orange-500">
                Harley Quinn
              </span>
            </div>
          </div>
          {/*  */}
        </div>

        {/*phim dang chieu  */}
        <div className="ml-[170px]">
          <div>
            <h2 className="text-white">
              <span className="text-3xl font-bold text-green-600">|</span>{" "}
              <span className="text-xl font-bold text-gray-300">
                PHIM ĐANG CHIẾU
              </span>
            </h2>
            <div className="mt-5">
              <img
                className="aspect-[5/3] w-[350px]"
                src="./src/assets/hinh4.webp"
                alt=""
              />
              <p className="my-5 text-white">Joker 1</p>
            </div>
          </div>
          {/*  */}
          <div>
            <div className="mt-5">
              <img
                className="aspect-[5/3] w-[350px]"
                src="./src/assets/hinh5.jpg"
                alt=""
              />
              <p className="my-5 text-white">Kẻ Đánh Cắp Trăng</p>
            </div>
          </div>
          {/*  */}
          <div>
            <div className="mt-5">
              <img
                className="aspect-[5/3] w-[350px]"
                src="./src/assets/hinh7.webp"
                alt=""
              />
              <p className="my-5 text-white">The Super Mario Bros</p>
            </div>
          </div>
          {/*  */}
          <div>
            <div className="mt-5">
              <img
                className="aspect-[5/3] w-[350px]"
                src="./src/assets/hinh14.jpg"
                alt=""
              />
              <p className="my-5 text-white">Bố Gìa</p>
            </div>
          </div>
          {/* xem them */}
          <div className="flex justify-end">
            <div className="inline-block border-2 border-orange-400 px-6 py-2 hover:bg-orange-400">
              <button className="text-[14px] text-orange-200">Xem thêm</button>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};
