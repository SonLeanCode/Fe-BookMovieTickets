import ReactECharts from "echarts-for-react"; // Import thành phần ReactECharts
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  useGetCinemasStatsQuery,
  useGetMoviesStatsQuery,
  useGetCinemaSalesStatsQuery,
} from "../../services/RevenueStatistics/revenuestatistics.service";

const CinemaRevenue = () => {
  // const {
  //   data: CinemaStatsData,
  //   isLoading: CinemaStatsLoading,
  //   isError: CinemaStatsError,
  // } = useGetCinemasStatsQuery();
  // console.log(CinemaStatsData);

  const {
    data: CinemaSalesStatsData,
    isLoading: CinemaSalesStatsLoading,
    isError: CinemaSalesStatsError,
  } = useGetCinemaSalesStatsQuery();
  
  const {
    data: movie
  } = useGetMoviesStatsQuery();



  if (CinemaSalesStatsLoading) return <div>Loading...</div>;
  if (CinemaSalesStatsError) return <div>Error loading data</div>;

  // Chuẩn bị dữ liệu cho biểu đồ
  const xAxisData = CinemaSalesStatsData?.map((item) => item._id);
  const ticketsData = CinemaSalesStatsData?.map((item) => item.totalTickets || 0);
  const revenueData = CinemaSalesStatsData?.map((item) => item.totalRevenue || 0);


  const bieudo1 = {
    backgroundColor: "#ffffff",
    title: {
      text: "Biểu đồ thống kê vé và doanh thu rạp",
      left: "center",
      textStyle: { color: "#000000" },
      padding: [20, 10, 50, 10],
    },
    tooltip: {
    trigger: "axis",
    formatter: function (params) {
      return params
        .map((item) => {
          if (item.seriesName === "Doanh thu rạp") {
            return `${item.marker} ${item.seriesName}: ${item.value.toLocaleString()} VNĐ`;
          }
          return `${item.marker} ${item.seriesName}: ${item.value}`;
        })
        .join("<br/>");
    },
  },
    legend: {
      data: ["Số vé bán ra", "Doanh thu rạp"],
      top: "12%",
      textStyle: { color: "#000000" },
    },
    grid: {
      top: "20%",
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLabel: { color: "#000000" },
    },
    yAxis: [
      {
        type: "value",
        name: "Số vé",
        nameTextStyle: { color: "#000000" },
        axisLabel: { color: "#000000" },
      },
      {
        type: "value",
        name: "Doanh thu",
        nameTextStyle: { color: "#000000" },
        axisLabel: { color: "#000000" },
      },
    ],
    series: [
      {
        name: "Số vé bán ra",
        type: "bar",
        data: ticketsData,
        itemStyle: { color: "#87CEFA" },
      },
      {
        name: "Doanh thu rạp",
        type: "bar",
        yAxisIndex: 1,
        data: revenueData,
        itemStyle: { color: "#FFC0CB" },
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

        <h3 className="text-2xl mb-5 text-white font-bold">Thống kê rạp</h3>
        <div className="">
            <ReactECharts  option={bieudo1}  style={{ height: 400, width: "100%" }} />
        </div>
        <div className=" mt-6 rounded-sm  font-sans flex justify-between">
            {/* Doanh thu theo phim */}
            <div className="w-1/2 p-3 mr-2 bg-gray-100 rounded">
                <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-semibold">Doanh thu theo phim</h5>
                <a href="#" className="text-blue-500 hover:underline">Xem tất cả</a>
                </div>
                <div className="overflow-hidden">
                <table className="w-full table-auto bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-2 text-left text-gray-700 font-medium">Tên phim</th>
                        <th className="px-2 py-2 text-right text-gray-700 font-medium">vé bán ra</th>
                        <th className="px-2 py-2 text-right text-gray-700 font-medium">Tổng doanh thu</th>
                    </tr>
                    </thead>
                    <tbody>
                      {movie?.moviesStats.map((movieItem, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-2 py-2 text-gray-600 max-w-[240px] flex-1 truncate">{movieItem.name}</td>
                          <td className="px-2 py-2 text-right text-gray-600">{movieItem.totalTickets}</td>
                          <td className="px-2 py-2 text-right text-gray-600">{movieItem.totalRevenue.toLocaleString()} VNĐ</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
                </div>
            </div>

            {/* Doanh thu theo rạp */}
            <div className="w-1/2 p-3 ml-2 bg-gray-100 rounded">
                <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-semibold">Doanh thu theo rạp</h5>
                <a href="#" className="text-blue-500 hover:underline">Xem tất cả</a>
                </div>
                <div className="overflow-hidden ">
                <table className="w-full table-auto bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-2 text-left text-gray-700 font-medium">Rạp chiếu</th>
                        <th className="px-2 py-2 text-right text-gray-700 font-medium">Tổng vé bán ra</th>
                        <th className="px-2 py-2 text-right text-gray-700 font-medium">Tổng doanh thu</th>
                    </tr>
                    </thead>
                    <tbody>
                    {CinemaSalesStatsData?.map((movie, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-2 py-2 text-gray-600 max-w-[240px] flex-1 truncate">{movie._id || "Unknown"}</td>
                        <td className="px-2 py-2 text-right text-gray-600">{movie.totalTickets}</td>
                        <td className="px-2 py-2 text-right text-gray-600">
                          {movie.totalRevenue.toLocaleString()} VNĐ
                        </td>
                      </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CinemaRevenue;
