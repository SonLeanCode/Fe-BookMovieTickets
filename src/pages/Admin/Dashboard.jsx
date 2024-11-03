import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Dashboard = () => {
  useEffect(() => {
    // Initialize the Visitor Statistics Chart (Bar Chart)
    const ctx = document.getElementById('myChart');
    let myChart;

    if (ctx) {
      const myCanvas = ctx.getContext('2d');

      // Destroy any existing chart instance to avoid the "Canvas is already in use" error
      if (myChart) {
        myChart.destroy();
      }

      // Create a new Chart instance (Bar Chart)
      myChart = new Chart(myCanvas, {
        type: 'bar', // Bar chart
        data: {
          labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Last 6 months',
              data: [100, 27, 40, 15, 30, 25, 45],
              backgroundColor: 'rgba(95, 46, 234, 0.7)', // Added transparency for better visibility
              borderColor: 'rgba(95, 46, 234, 1)',
              borderWidth: 2,
            },
            {
              label: 'Previous',
              data: [20, 36, 16, 45, 29, 32, 10],
              backgroundColor: 'rgba(75, 222, 151, 0.7)', // Added transparency for better visibility
              borderColor: 'rgba(75, 222, 151, 1)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              min: 0,
              max: 100,
              ticks: { stepSize: 25 },
              grid: { display: true },
            },
            x: { grid: { color: '#e5e5e5' } },
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 8,
                boxHeight: 8,
                usePointStyle: true,
                font: { size: 12, weight: '500' },
              },
            },
            title: {
              display: true,
              text: ['Visitor statistics', 'Nov - July'],
              align: 'start',
              color: '#ffffff ',
              font: { size: 16, family: 'Inter', weight: '600', lineHeight: 1.4 },
            },
          },
        },
      });
    }

    // Initialize the Revenue Chart (Pie Chart)
    const revenueCtx = document.getElementById('revenueChart');
    let revenueChart;

    if (revenueCtx) {
      const revenueCanvas = revenueCtx.getContext('2d');
      if (revenueChart) {
        revenueChart.destroy();
      }
      revenueChart = new Chart(revenueCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Product A', 'Product B', 'Product C'],
          datasets: [
            {
              label: 'Revenue',
              data: [300, 200, 100],
              backgroundColor: [
                'rgba(95, 46, 234, 0.7)',
                'rgba(75, 222, 151, 0.7)',
                'rgba(255, 206, 86, 0.7)',
              ],
              borderColor: [
                'rgba(95, 46, 234, 1)',
                'rgba(75, 222, 151, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: { size: 10, weight: '500' },
              },
            },
            title: {
              display: true,
              text: 'Revenue Distribution',
              align: 'start',
              color: '#171717',
              font: { size: 16, family: 'Inter', weight: '600', lineHeight: 1.4 },
            },
          },
        },
      });
    }

    // Clean up the chart instances on component unmount
    return () => {
      if (myChart) {
        myChart.destroy();
      }
      if (revenueChart) {
        revenueChart.destroy();
      }
    };
  }, []);

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6">
      <main className=" main users chart-page" id="skip-target">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">Dashboard</h2>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4  shadow-lg rounded-lg flex items-center space-x-4">
              {/* Icon */}
              <div className="bg-blue-100 p-2 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3m4-3v3m-8-3v3m8-3V9M8 21V5m8 16V13M4 4h16M4 8h16"></path>
                </svg>
              </div>

              {/* Content */}
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
            <div className="bg-white px-4 shadow-lg rounded-lg flex flex-col items-center " style={{ height: '200px' }}>
              {/* <h3 className="text-xl font-semibold mb-4">Revenue</h3> */}
              <canvas
                id="revenueChart"
                aria-label="Revenue distribution"
                role="img" style={{ height: '200px' }}
              ></canvas>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">doanh</h3>
              <p className="text-2xl font-bold">1,478,286</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Doanh thu trong tuần</h3>
              <p className="text-2xl font-bold">1,478,286</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-wrap -mx-4">
            {/* Left Section */}
            <div className="w-full px-4">
              <div className="text-white p-6 shadow-lg rounded-lg mb-6" style={{background:'#222235', height: '550px', width:'100%' }}>
                <canvas
                  id="myChart"
                  aria-label="Site statistics"
                  role="img"
                  style={{ }} 
                ></canvas>
              </div>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
