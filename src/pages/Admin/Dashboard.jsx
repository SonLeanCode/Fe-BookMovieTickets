import React, { useEffect, useState } from 'react';
import { useGetRevenueStatsQuery } from '../../services/RevenueStatistics/revenuestatistics.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Dashboard = () => {
  const [chartInstance, setChartInstance] = useState(null);
  const [timeUnit, setTimeUnit] = useState('day'); // Default to daily stats

  // Fetch revenue stats data using RTK Query
  const { data, isLoading, isError } = useGetRevenueStatsQuery(timeUnit);

  useEffect(() => {
    if (!data || isLoading || isError) return;

    const chartData = data.revenueStats.map((item) => ({
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
  }, [data, isLoading, isError, timeUnit]);

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6">
      <main className="main users chart-page">
        <div className="container mx-auto">



          {/* Chart Section */}
          <div className="bg-white w-[60%] p-6 shadow-lg rounded-lg">
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
            <canvas id="revenueChart" className=""></canvas> {/* Điều chỉnh chiều cao nhỏ hơn với Tailwind */}
          </div>

          {/* Error/Loading States */}
          {isLoading && <p className="text-white mt-4">Đang tải dữ liệu...</p>}
          {isError && <p className="text-red-500 mt-4">Không thể tải dữ liệu. Vui lòng thử lại sau.</p>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
