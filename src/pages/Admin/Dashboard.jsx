import React, { useEffect, useState } from 'react';
import { useGetRevenueStatsQuery, useGetTicketsStatsQuery } from '../../services/RevenueStatistics/revenuestatistics.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Dashboard = () => {
  const [chartInstance, setChartInstance] = useState(null);
  const [timeUnit, setTimeUnit] = useState('day'); // Default to daily stats

  // Fetch revenue stats data using RTK Query
  const { data: revenueData, isLoading: revenueLoading, isError: revenueError } = useGetRevenueStatsQuery(timeUnit);
  
  // Fetch ticket stats data using RTK Query
  const { data: ticketData, isLoading: ticketLoading, isError: ticketError } = useGetTicketsStatsQuery();
console.log(ticketData)
  useEffect(() => {
    if (!revenueData || revenueLoading || revenueError) return;

    const chartData = revenueData.revenueStats.map((item) => ({
      time: item.time,
      revenue: item.totalRevenue,
    }));

    const labels = chartData.map((item) => item.time);
    const revenues = chartData.map((item) => item.revenue);

    const ctx = document.getElementById('revenueChart').getContext('2d');

    if (chartInstance) {
      chartInstance.destroy(); // Destroy previous chart instance before re-rendering
    }

    const newChartInstance = new Chart(ctx, {
      type: 'bar', // Chuyển sang biểu đồ cột (bar chart)
      data: {
        labels,
        datasets: [
          {
            label: 'Doanh thu',
            data: revenues,
            backgroundColor: 'rgba(95, 46, 234, 0.6)', // Màu nền cho cột
            borderColor: 'rgba(95, 46, 234, 1)', // Màu viền cho cột
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Doanh thu theo ${timeUnit === 'day' ? 'ngày' : timeUnit === 'month' ? 'tháng' : 'năm'}`,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Thời gian',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Doanh thu (VNĐ)',
            },
            beginAtZero: true,
          },
        },
      },
    });

    setChartInstance(newChartInstance);

    // Clean up
    return () => {
      if (newChartInstance) newChartInstance.destroy();
    };
  }, [revenueData, revenueLoading, revenueError, timeUnit]);

  // Màu cho từng tỉ lệ ghế
  const getSeatTypeColor = (seatType) => {
    switch (seatType) {
      case 'Single':
        return 'bg-blue-500'; // Màu cho Single
      case 'Sweetbox':
        return 'bg-green-500'; // Màu cho Sweetbox
      case 'VIP':
        return 'bg-red-500'; // Màu cho VIP
      default:
        return 'bg-black-300';
    }
  };
  

  return (
    <div className="ml-64 mt-8 bg-blu bg-[#111111] p-6 min-h-screen">
      <main className="main users chart-page">
        <div className="container mx-auto flex flex-wrap gap-6">
          {/* Phần bên trái: Biểu đồ */}
          <div className="bg-white flex-1 p-2 shadow-lg rounded-lg">
            <h1 className="font-bold text-red-600 p-2 text-center text-2xl w-[100%]">BIỂU ĐỒ THỐNG KÊ DOANH THU</h1>
            {/* Time Filter */}
            <div className="flex justify-end mb-4">
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="px-4 py-2 border rounded-md text-gray-800"
              >
                <option value="day">Theo ngày</option>
                <option value="month">Theo tháng</option>
                <option value="year">Theo năm</option>
              </select>
            </div>
            {/* Biểu đồ */}
            <canvas id="revenueChart" className="h-64"></canvas>
          </div>

          {/* Phần bên phải: Thống kê vé SHOW */}
          <div className="bg-white flex-1 p-3 shadow-md rounded-lg">
            <h1 className="font-bold text-red-600 p-2 text-center text-2xl w-[100%]">BẢNG THỐNG KÊ VÉ ĐÃ ĐẶT</h1>
            {/* Tổng số ghế đã đặt */}
            <div className="text-center mb-6">
              {ticketLoading ? (
                <p className="text-white text-center mt-4">Đang tải dữ liệu...</p>
              ) : ticketError ? (
                <p className="text-red-500 text-center mt-4">Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
              ) : (
                <p className="text-lg font-semibold text-gray-700">
                  Tổng số ghế đã đặt: <span className="text-red-500 text-xl">{ticketData.totalBookedSeats}</span>
                </p>
              )}
            </div>
            {/* Chi tiết ghế */}
<div className="mb-6">
  <p className="text-lg font-semibold text-gray-700 mb-2">Loại ghế:</p>
  {ticketData ? (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left font-semibold text-gray-700">Tên ghế</th>
          <th className="px-4 py-2 text-left font-semibold text-gray-700">Số lượng</th>
          <th className="px-4 py-2 text-left font-semibold text-gray-700">Tỉ lệ (%)</th>
        </tr>
      </thead>
      <tbody>
        {/* Hiển thị thông tin các loại ghế */}
        {Object.keys(ticketData.data).map((seatType, index) => (
          <tr key={index} className="border-t border-gray-200">
            <td className="px-4 py-2 text-gray-600">{seatType}</td>
            <td className="px-4 py-2 font-bold text-gray-800">
              {ticketData.data[seatType]} ghế
            </td>
            <td className="px-4 py-2 font-bold text-gray-800">
              {ticketData.totalBookedSeats
                ? ((ticketData.data[seatType] / ticketData.totalBookedSeats) * 100).toFixed(2)
                : 0}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Đang tải thông tin loại ghế...</p>
  )}
</div>

{/* Tỉ lệ ghế đặt */}
<div className="mb-6">
  <p className="text-lg font-semibold text-gray-700 mb-4">Tỉ lệ ghế đặt:</p>
  <div className="flex items-center space-x-2">
    {ticketData ? (
      Object.keys(ticketData.data).map((seatType, index) => (
        <div
          key={index}
          className={`h-10 text-white text-center text-sm flex items-center justify-center ${getSeatTypeColor(seatType)}`}
          style={{
            width: `${((ticketData.data[seatType] / ticketData.totalBookedSeats) * 100).toFixed(2)}%`
          }}
        >
          {seatType}
        </div>
      ))
    ) : (
      <div className="h-6 bg-gray-300 w-full"></div>
    )}
  </div>
</div>

            {/* Gợi ý */}
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">Gợi ý:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Tăng số lượng ghế Single để đáp ứng nhu cầu.</li>
                <li>Cân nhắc khuyến mãi cho ghế VIP.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
