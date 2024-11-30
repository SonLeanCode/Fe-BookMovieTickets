import ReactECharts from "echarts-for-react"; // Import thành phần ReactECharts
import { ArrowUturnLeftIcon  } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
const CinemaRevenue = () => {
  const bieudo1 = {
    backgroundColor: "#ffffff", // Đặt nền trắng cho biểu đồ
    title: {
      text: "Biểu đồ thống kê vé và doanh thu rạp",
      left: "center",
      textStyle: { color: "#000000" }, // Màu tiêu đề (đen)
      padding: [20, 10, 50, 10],// [trên, phải, dưới, trái]
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Số vé bán ra", "Doanh thu rạp"],
      top: "12%",
      textStyle: { color: "#000000" }, // Màu chữ trong legend (đen)
    },
    grid: {
      top: "20%", // Đẩy toàn bộ biểu đồ xuống để tránh tiêu đề
      left: "10%", // Khoảng cách từ lề trái
      right: "10%", // Khoảng cách từ lề phải
      bottom: "15%", // Khoảng cách từ lề dưới
    },
    style:{
        zindex:"-999",
    },
    xAxis: {
      type: "category",
      data: ["Rạp A", "Rạp B", "Rạp C", "Rạp D", "Rạp E"],
      axisLabel: { color: "#000000" }, // Màu chữ trên trục X (đen)
    },
    yAxis: [
      {
        type: "value",
        name: "Số vé",
        nameTextStyle: { color: "#000000" }, // Màu chữ của tên trục (đen)
        axisLabel: { color: "#000000" }, // Màu chữ trên trục Y (đen)
      },
      {
        type: "value",
        name: "Doanh thu",
        nameTextStyle: { color: "#000000" }, // Màu chữ của tên trục (đen)
        axisLabel: { color: "#000000" }, // Màu chữ trên trục Y (đen)
      },
    ],
    series: [
      {//data vé
        name: "Số vé bán ra",
        type: "bar",
        data: [50, 70, 60, 90, 80],
        itemStyle: { color: "#87CEFA" }, // Màu xanh
      },
      {//data rạp
        name: "Doanh thu rạp",
        type: "bar",
        yAxisIndex: 1,
        data: [100000, 120000, 150000, 200000, 180000],
        itemStyle: { color: "#FFC0CB" }, // Màu hồng
      },
    ],
  };

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 ">
        <Link to="../dashboard">
            <div className="flex items-center text-blue-400 cursor-pointer mb-5">
                    <ArrowUturnLeftIcon  className="w-5 h-5 mr-2" />
                    Quay lại
            </div>
        </Link>

        <h3 className="text-2xl mb-5 text-white font-bold">Doanh thu rạp</h3>
        <div className="">
            <ReactECharts  option={bieudo1}  style={{ height: 400, width: "100%" }} />
        </div>
        <div className="p-6 mt-6 rounded-sm bg-gray-100 font-sans flex justify-between">
            {/* Doanh thu theo phim */}
            <div className="w-1/2 pr-4">
                <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-semibold">Doanh thu theo phim</h5>
                <a href="#" className="text-blue-500 hover:underline">Xem tất cả</a>
                </div>
                <div className="overflow-hidden">
                <table className="w-full table-auto bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">Tên phim</th>
                        <th className="px-4 py-2 text-right text-gray-700 font-medium">Tổng vé bán ra</th>
                        <th className="px-4 py-2 text-right text-gray-700 font-medium">Tổng doanh thu</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-t">
                        <td className="px-4 py-2 text-gray-600">Monkey Man Báo Thù</td>
                        <td className="px-4 py-2 text-right text-gray-600">5</td>
                        <td className="px-4 py-2 text-right text-gray-600">1,066,000</td>
                    </tr>
                    <tr className="border-t">
                        <td className="px-4 py-2 text-gray-600">Cái Giá Của Hạnh Phúc</td>
                        <td className="px-4 py-2 text-right text-gray-600">4</td>
                        <td className="px-4 py-2 text-right text-gray-600">760,000</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>

            {/* Doanh thu theo rạp */}
            <div className="w-1/2 pl-4">
                <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-semibold">Doanh thu theo rạp</h5>
                <a href="#" className="text-blue-500 hover:underline">Xem tất cả</a>
                </div>
                <div className="overflow-hidden ">
                <table className="w-full table-auto bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">Rạp chiếu</th>
                        <th className="px-4 py-2 text-right text-gray-700 font-medium">Tổng vé bán ra</th>
                        <th className="px-4 py-2 text-right text-gray-700 font-medium">Tổng doanh thu</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-t">
                        <td className="px-4 py-2 text-gray-600">HCinema Aeon Hà Đông</td>
                        <td className="px-4 py-2 text-right text-gray-600">9</td>
                        <td className="px-4 py-2 text-right text-gray-600">1,826,000</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
    </div>
  );
};

export default CinemaRevenue;
