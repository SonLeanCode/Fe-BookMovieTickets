import { useGetRegionQuery } from "../../services/auth/authService";

const BuyTickets = () => {
  // Sử dụng hook để fetch dữ liệu region
  const { data, error, isLoading } = useGetRegionQuery();

  // Log dữ liệu regions để kiểm tra\

  // Xử lý trong trường hợp dữ liệu đang được load hoặc có lỗi
  if (isLoading) return <p>Loading regions...</p>;
  if (error) return <p>Error loading regions</p>;

  return (
    <div className="">
      <h1 className="text-xl font-bold bg-white">Trang mua vé</h1>
      <div>
        <h2 className="text-lg">Chọn Vùng:</h2>
        <ul>
        {data?.regions.map((region) => (
            <li key={region._id} className="p-2 border-b">
              {region.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BuyTickets;
