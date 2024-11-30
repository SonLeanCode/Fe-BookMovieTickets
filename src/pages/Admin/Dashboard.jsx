import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetRevenueStatsQuery,
  useGetTicketsStatsQuery,
  useGetTotalRevenueQuery,
  useGetMoviesStatsQuery,
} from "../../services/RevenueStatistics/revenuestatistics.service";
import { useGetTicketsQuery } from "../../services/Ticket/ticket.serviecs";
import { Chart, registerables } from "chart.js";
import {
  CurrencyDollarIcon,
  UserIcon,
  CreditCardIcon,
} from "@heroicons/react/20/solid";

Chart.register(...registerables);

const Dashboard = () => {
  const [chartInstance, setChartInstance] = useState(null);
  const [revenueChartInstance, setRevenueChartInstance] = useState(null);
  const [timeUnit, setTimeUnit] = useState("day"); // Default to daily stats

  const { data, isLoading, isError } = useGetRevenueStatsQuery(timeUnit);
  const {
    data: ticketData,
    isLoading: ticketLoading,
    isError: ticketError,
  } = useGetTicketsStatsQuery();
  const {
    data: totalRevenues,
    isLoading: totalRevenueLoading,
    isError: totalRevenueError,
  } = useGetTotalRevenueQuery();
  const {
    data: movie
  } = useGetMoviesStatsQuery();
  const {
    data: ticketRecent
  } = useGetTicketsQuery();
  // console.log('tổng doamh thu',totalRevenues);
  // console.log("movie nè", movie);
  console.log("vé nè", ticketRecent);

  useEffect(() => {
    if (!data || isLoading || isError) return;

    // Initialize the Visitor Statistics Chart (Bar Chart)
    const ctx = document.getElementById("myChart");
    let myChart;

    if (ctx) {
      const myCanvas = ctx.getContext("2d");

      // Destroy any existing chart instance to avoid the "Canvas is already in use" error
      if (chartInstance) {
        chartInstance.destroy();
      }

      const chartData = data.revenueStats.map((item) => ({
        time: item.time,
        revenue: item.totalRevenue,
      }));

      const labels = chartData.map((item) => item.time);
      const revenues = chartData.map((item) => item.revenue);

      // Create a new Chart instance (Line Chart)
      myChart = new Chart(myCanvas, {
        type: "bar", // Bar chart
        data: {
          labels: labels,
          datasets: [
            {
              label: `Doanh thu theo ${timeUnit === "day" ? "ngày" : timeUnit === "month" ? "tháng" : "năm"}`,
              data: revenues,
              backgroundColor: "rgba(95, 46, 234, 0.7)",
              borderColor: "rgba(95, 46, 234, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Doanh thu theo ${timeUnit === "day" ? "ngày" : timeUnit === "month" ? "tháng" : "năm"}`,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Thời gian",
              },
            },
            y: {
              title: {
                display: true,
                text: "Doanh thu (VNĐ)",
              },
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(myChart);
    }

    // Initialize the Revenue Distribution Chart (Pie Chart)
    const revenueCtx = document.getElementById("revenueChart");
    let revenueChart;

    if (revenueCtx) {
      const revenueCanvas = revenueCtx.getContext("2d");
      if (revenueChartInstance) {
        revenueChartInstance.destroy();
      }

      // Kiểm tra dữ liệu ticketData và trạng thái
      if (ticketData && !ticketLoading && !ticketError) {
        console.log("biểu đồ tròn", ticketData);

        // Lấy các loại ghế và số ghế đã đặt
        const labels = Object.keys(ticketData.data);
        const dataValues = Object.values(ticketData.data);
        const totalSeats = ticketData.totalBookedSeats;

        // Cập nhật biểu đồ doughnut với dữ liệu ghế
        revenueChart = new Chart(revenueCanvas, {
          type: "doughnut",
          data: {
            labels: labels, // Các loại ghế: Single, Sweetbox, VIP
            datasets: [
              {
                label: "Tickets by Seat Type",
                data: dataValues, // Dữ liệu số ghế đã bán
                backgroundColor: [
                  "rgba(95, 46, 234, 0.7)",
                  "rgba(75, 222, 151, 0.7)",
                  "rgba(255, 206, 86, 0.7)",
                ],
                borderColor: [
                  "rgba(95, 46, 234, 1)",
                  "rgba(75, 222, 151, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  font: { size: 10 },
                  padding: 10,
                  boxWidth: 10,
                },
              },
              title: {
                display: true,
                text: `Số lượng ghế đã bán: ${totalSeats}`, // Hiển thị tổng số ghế đã bán
              },
            },
          },
        });

        // Lưu instance biểu đồ nếu cần
        setRevenueChartInstance(revenueChart);
      }
    }

    // Simulate fetching ticket data (replace with actual API call)

    // Cleanup function for charts
    return () => {
      if (myChart) {
        myChart.destroy();
      }
      if (revenueChart) {
        revenueChart.destroy();
      }
    };
  }, [
    data,
    isLoading,
    isError,
    ticketData,
    ticketLoading,
    ticketError,
    timeUnit,
  ]);

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6">
      <main className="main users chart-page" id="skip-target">
        <div className="container mx-auto">
          {/* Stats Section */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex rounded-md bg-white shadow-lg">
              <div
                className="flex items-center rounded-s-md p-3"
                style={{ background: "#F77A9E" }}
              >
                <UserIcon className="h-6 w-6 rounded-full p-[0.5] text-slate-50 ring-2 ring-slate-50" />
              </div>

              <div
                className="w-full rounded-e-md p-3"
                style={{ background: "#F14F7B" }}
              >
                <p className="text-gray-100">Người dùng</p>
                <p className="text-xl font-bold text-white">1,478,286</p>
                <div className="flex items-center space-x-1">
                  <svg
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <p className="text-sm text-green-300">4.07%</p>
                  <p className="text-sm text-gray-100">Last month</p>
                </div>
              </div>
            </div>
            <div className="flex rounded-md bg-white shadow-lg">
              <div
                className="flex items-center rounded-s-md p-3"
                style={{ background: "#9592C5" }}
              >
                <UserIcon className="h-6 w-6 rounded-full p-[0.5] text-slate-50 ring-2 ring-slate-50" />
              </div>
                
              <div
                className="w-full rounded-e-md p-3"
                style={{ background: "#726CB0" }}
              >
              <Link to="../CinemaRevenueManagement" >
                <p className="text-gray-100">Tổng Doanh thu Rạp</p>
                <p className="text-xl font-bold text-white">1,478,286</p>
                <div className="flex items-center space-x-1">
                  <svg
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <p className="text-sm text-green-300">4.07%</p>
                  <p className="text-sm text-gray-100">Last month</p>
                </div>
              </Link>
              </div>

            </div>
            {/* <div className="bg-white px-4 shadow-lg rounded-lg flex flex-col items-center" style={{ height: '200px' }}>
                <canvas id="revenueChart" aria-label="Revenue distribution" role="img" style={{ height: '200px' }}></canvas>
              </div> */}
            <div className="flex rounded-md bg-white shadow-lg">
              <div
                className="flex items-center rounded-s-md p-3"
                style={{ background: "#65C4E9" }}
              >
                <CreditCardIcon className="h-6 w-6 rounded-full p-[1px] text-slate-50 ring-2 ring-slate-50" />
              </div>

              <div
                className="w-full rounded-e-md p-3"
                style={{ background: "#32B1E1" }}
              >
                <p className="text-gray-100">Tổng doanh thu</p>
                {totalRevenueLoading ? (
                  <p>Loading...</p>
                ) : totalRevenueError ? (
                  <p>Error loading data</p>
                ) : (
                  <p className="flex items-center text-xl font-bold text-white">
                    {totalRevenues?.totalRevenue
                      ? new Intl.NumberFormat().format(
                          totalRevenues.totalRevenue,
                        ) + " VNĐ"
                      : "0 VNĐ"}{" "}
                  </p>
                )}
                <div className="flex items-center space-x-1">
                  <svg
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <p className="text-sm text-green-300">4.07%</p>
                  <p className="text-sm text-gray-100">Last month</p>
                </div>
              </div>
            </div>

            <div className="flex rounded-md bg-white shadow-lg">
              <div
                className="flex items-center rounded-s-md p-3"
                style={{ background: "#6CD0D2" }}
              >
                <CurrencyDollarIcon className="h-6 w-6 rounded-full p-[1px] text-slate-50 ring-2 ring-slate-50" />
              </div>

              <div
                className="w-full rounded-e-md p-3"
                style={{ background: "#3CC1C4" }}
              >
                <p className="text-gray-100">Doanh thu trong tháng</p>
                {totalRevenueLoading ? (
                  <p>Loading...</p>
                ) : totalRevenueError ? (
                  <p>Error loading data</p>
                ) : (
                  <p className="flex items-center text-xl font-bold text-white">
                    {totalRevenues?.monthlyRevenue
                      ? new Intl.NumberFormat().format(
                          totalRevenues.monthlyRevenue,
                        ) + " VNĐ"
                      : "0 VNĐ"}
                  </p>
                )}
                <div className="flex items-center space-x-1">
                  <svg
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <p className="text-sm text-green-300">4.07%</p>
                  <p className="text-sm text-gray-100">Last month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="-mx-5 flex flex-wrap">
            {/* Left Section */}
            <div className="w-3/4 px-4">
              <div
                className="mb-6 rounded-lg p-6 text-white shadow-lg"
                style={{ background: "#ffffff" }}
              >
                <div className="mb-4 flex justify-end">
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="rounded-md border px-4 py-2 text-gray-800"
                  >
                    <option value="day">Theo ngày</option>
                    <option value="month">Theo tháng</option>
                    <option value="year">Theo năm</option>
                  </select>
                </div>

                <canvas
                  id="myChart"
                  aria-label="Site statistics"
                  role="img"
                ></canvas>
              </div>

              <div className="rounded-lg bg-white p-5">
                <h4 className="mb-4 text-xl font-semibold">Vé gần đây</h4>
                <table className="w-full table-auto text-left">
                  <thead>
                    <tr>
                      <th className="border-b px-4 py-2">Người dùng</th>
                      <th className="border-b px-4 py-2">Phim</th>
                      <th className="border-b px-4 py-2">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketRecent?.allTickets
                      ?.slice(0, 5)
                      .map((ticket) => (
                        <tr key={ticket?.user_id?._id}>
                          <td className="border-b px-4 py-2">
                            {ticket?.user_id?.email}
                          </td>
                          <td className="border-b px-4 py-2">
                            {ticket?.name_movie}
                          </td>
                          <td className="px-4 py-2">{ticket.price.toLocaleString()} VNĐ</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-1/4 pl-1 pr-5">
              <div className="mb-5 flex flex-col items-center rounded-lg bg-white px-4 shadow-lg">
                <canvas
                  id="revenueChart"
                  aria-label="Revenue distribution"
                  role="img"
                ></canvas>
              </div>
              <div className="rounded-lg bg-white shadow-lg">
                <h1 className="text-center text-xl font-bold">Top phim</h1>
                <div className="">
                  {/* Display top 3 movies */}
                  {movie?.moviesStats.map((movieItem, index) => (
                    <div
                      key={movieItem._id}
                      className="mb-2 flex items-center justify-between p-1"
                    >
                      {/* Thông tin giá nằm bên trái */}
                      <img
                        src={movieItem.img}
                        alt={movieItem.name}
                        className="ml-4 w-10 rounded-md"
                      />
                      <div className="max-w-xs flex-1 truncate">
                        {" "}
                        {/* Thêm max-w-xs để giới hạn chiều rộng */}
                        <p className="font-semibold">
                          {index + 1}. {movieItem.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Doanh thu:{" "}
                          {new Intl.NumberFormat().format(
                            movieItem.totalRevenue,
                          )}{" "}
                          VNĐ
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
