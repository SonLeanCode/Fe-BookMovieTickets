import React from "react";
import { useGetTicketsQuery } from "../../services/Ticket/ticket.serviecs"; // Import hook để lấy vé

const RevenueDashboard = () => {
  // Sử dụng hook từ Redux Toolkit để lấy dữ liệu vé
  const { data, error, isLoading } = useGetTicketsQuery();

  // Tính tổng doanh thu
  const totalRevenue = data ? data.allTickets.reduce((sum, ticket) => sum + ticket.price, 0) : 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6 ml-56 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Doanh thu bán vé</h1>
        <p className="text-lg text-gray-600">
          Tổng doanh thu:{" "}
          <span className="text-green-600 font-bold">
            {totalRevenue.toLocaleString()} VND
          </span>
        </p>
      </div>

      {/* Ticket List */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data?.allTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col items-center"
          >
            <div className="mb-4">
              <img
                src={ticket || "https://via.placeholder.com/150"}
                alt={ticket.name_movie}
                className="w-60 h-72 object-cover rounded-md"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {ticket.name_movie}
              </h2>
              <p className="text-gray-600 text-sm">{ticket.cinema_name}</p>
              <p className="text-gray-500 text-sm">{ticket.showtime}</p>
              <p className="text-gray-700 font-bold mt-2">
                Giá vé:{" "}
                <span className="text-blue-600">
                  {ticket.price.toLocaleString()} VND
                </span>
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Số ghế: <span className="font-medium">{ticket.seat_number}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueDashboard;
