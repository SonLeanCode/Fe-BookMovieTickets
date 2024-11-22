  import React, { useEffect, useState } from 'react';
  import { useGetRevenueStatsQuery,useGetTicketsStatsQuery, useGetTotalRevenueQuery  } from '../../services/RevenueStatistics/revenuestatistics.service';
  import { Chart, registerables } from 'chart.js';
  import { ArrowUpIcon } from '@heroicons/react/20/solid';

  Chart.register(...registerables);

  const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);
    const [revenueChartInstance, setRevenueChartInstance] = useState(null);
    const [timeUnit, setTimeUnit] = useState('day'); // Default to daily stats

    const { data, isLoading, isError } = useGetRevenueStatsQuery(timeUnit);
    const { data: ticketData, isLoading: ticketLoading, isError: ticketError } = useGetTicketsStatsQuery();
    const { data: totalRevenues, isLoading: totalRevenueLoading, isError: totalRevenueError } = useGetTotalRevenueQuery();
    console.log('tổng doamh thu',totalRevenues);
    
    useEffect(() => {
      if (!data || isLoading || isError) return;
    
      // Initialize the Visitor Statistics Chart (Line Chart)
      const ctx = document.getElementById('myChart');
      let myChart;
    
      if (ctx) {
        const myCanvas = ctx.getContext('2d');
    
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
          type: 'bar', // Bar chart
          data: {
            labels: labels,
            datasets: [
              {
                label: `Doanh thu theo ${timeUnit === 'day' ? 'ngày' : timeUnit === 'month' ? 'tháng' : 'năm'}`,
                data: revenues,
                backgroundColor: 'rgba(95, 46, 234, 0.7)',
                borderColor: 'rgba(95, 46, 234, 1)',
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
    
        setChartInstance(myChart);
      }
    
      // Initialize the Revenue Distribution Chart (Pie Chart)
      const revenueCtx = document.getElementById('revenueChart');
      let revenueChart;
    
      if (revenueCtx) {
        const revenueCanvas = revenueCtx.getContext('2d');
        if (revenueChartInstance) {
          revenueChartInstance.destroy();
        }
    
        // Use ticket data for the pie chart
        if (ticketData && !ticketLoading && !ticketError) {
          console.log('biểu đồ tròn',ticketData);
          const seatTypes = ticketData || {};
          const labels = Object.keys(seatTypes);
          const dataValues = Object.values(seatTypes);
    
          revenueChart = new Chart(revenueCanvas, {
            type: 'doughnut',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Tickets by Seat Type',
                  data: dataValues,
                  backgroundColor: [
                    'rgba(95, 46, 234, 0.7)',
                    'rgba(75, 222, 151, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(255, 99, 132, 0.7)', // Add more colors if needed
                  ],
                  borderColor: [
                    'rgba(95, 46, 234, 1)',
                    'rgba(75, 222, 151, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    font: { size: 12 },
                  },
                },
                title: {
                  display: true,
                  text: 'Số lượng loại ghế đã bán',
                },
              },
            },
          });
        }
        setRevenueChartInstance(revenueChart);
      }
    
      // Simulate fetching ticket data (replace with actual API call)
      const fetchTickets = () => {
        const recentTickets = [
          { id: 1, customer: 'John Doe', movie: 'Inception', date: '2024-11-01', amount: '$12.00' },
          { id: 2, customer: 'Jane Smith', movie: 'Avatar', date: '2024-11-02', amount: '$15.00' },
          { id: 3, customer: 'Alice Johnson', movie: 'Titanic', date: '2024-11-03', amount: '$10.00' },
          // Add more tickets as needed
        ];
        setTickets(recentTickets);
      };
    
      fetchTickets();
    
      // Cleanup function for charts
      return () => {
        if (myChart) {
          myChart.destroy();
        }
        if (revenueChart) {
          revenueChart.destroy();
        }
      };
    }, [data, isLoading, isError, ticketData, ticketLoading, ticketError, timeUnit]);
    

    return (
      <div className="ml-64 mt-8 bg-[#111111] p-6">
        <main className="main users chart-page" id="skip-target">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">Dashboard</h2>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 shadow-lg rounded-lg flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3m4-3v3m-8-3v3m8-3V9M8 21V5m8 16V13M4 4h16M4 8h16"></path>
                  </svg>
                </div>

                <div>
                  <p className="text-2xl font-bold">1,478,286</p>
                  <p className="text-gray-500">Total visits</p>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-green-500 text-sm">4.07%</p>
                    <p className="text-gray-500 text-sm">Last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white px-4 shadow-lg rounded-lg flex flex-col items-center" style={{ height: '200px' }}>
                <canvas id="revenueChart" aria-label="Revenue distribution" role="img" style={{ height: '200px' }}></canvas>
              </div>
              <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4">Tổng doanh thu</h3>
                {totalRevenueLoading ? (
                <p>Loading...</p>
              ) : totalRevenueError ? (
                <p>Error loading data</p>
              ) : (
                <p className="text-2xl flex items-center  font-bold">
                <ArrowUpIcon className="w-6 h-6 text-green-500" />
                {totalRevenues?.totalRevenue  ? <span className="text-green-500 text-xl">{new Intl.NumberFormat().format(totalRevenues.totalRevenue)}</span>  : '0'} VNĐ</p>
              )}
              </div>
              <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4">Doanh thu trong tháng</h3>
                {totalRevenueLoading ? (
    <p>Loading...</p>
  ) : totalRevenueError ? (
    <p>Error loading data</p>
  ) : (
    <p className="text-2xl font-bold">
      {totalRevenues?.monthlyRevenue 
        ? new Intl.NumberFormat().format(totalRevenues.monthlyRevenue) + ' VNĐ' 
        : '0 VNĐ'}
    </p>
  )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-wrap -mx-5">
              {/* Left Section */}
              <div className="w-3/4 px-4">
                <div className="text-white p-6 shadow-lg rounded-lg mb-6" style={{ background: '#ffffff' }}>
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

                  <canvas id="myChart" aria-label="Site statistics" role="img"></canvas>
                </div>

                <div className='bg-white'>
              <h4 className="text-xl font-semibold mb-4">Recent Tickets</h4>
                  <table className="w-full text-left table-auto">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Customer</th>
                        <th className="py-2 px-4 border-b">Movie</th>
                        <th className="py-2 px-4 border-b">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td className="py-2 px-4 border-b">{ticket.customer}</td>
                          <td className="py-2 px-4 border-b">{ticket.movie}</td>
                          <td className="py-2 px-4 border-b">{ticket.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
            </div>
              </div>

              {/* Right Section */}
              <div className="w-1/4 pr-5 pl-1">
                <div className="p-6 bg-white shadow-lg rounded-lg">
                  
                </div>
              </div>
              
            </div>
            
          </div>
        </main>
      </div>
    );
  };

  export default Dashboard;
