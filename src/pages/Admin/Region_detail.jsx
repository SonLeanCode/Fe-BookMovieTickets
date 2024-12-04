import { useParams } from 'react-router-dom';
import { useGetCinemasByRegionIdQuery } from '../../services/Cinema/cinema.service'; // Update with your API hook
import LoadingLocal from "../Loading/LoadingLocal";
const RegionDetails = () => {
  const { region_id } = useParams(); // Retrieve the region ID from URL
  const { data: cinemas, isLoading, error } = useGetCinemasByRegionIdQuery(region_id); // Fetch cinemas by region
  console.log(cinemas);
  

  if (isLoading) return <LoadingLocal />; // Loading component
  if (error) return <p>Could not load cinemas for this region.</p>;

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
        <h3 className="text-2xl font-bold">Danh sách rạp của khu vực : <span className='text-red-500'>{cinemas?.data[0].region_id.name}</span></h3>
        <h3 className="text-xl font-semibold">Tổng số rạp: <span className='text-green-400'>{cinemas?.data?.length}</span></h3>
        <div className="rounded-lg shadow-lg mt-2">
        <table className="w-full border-separate border-spacing-y-2 border-[#111111]">
          <thead className="bg-[#2d2d2d]">
            <tr>
              <th className="px-4 py-3 text-left text-white">Ảnh rạp</th>
              <th className="px-4 py-3 text-left text-white">Tên Rạp</th>
              <th className="px-4 py-3 text-center text-white">Địa chỉ</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
          {cinemas?.data?.map((cinema) => (
              <tr key={cinema?._id}>
                <td className="px-4 py-2"><img src={cinema?.image} alt="" /></td>
                <td className="px-4 py-2">{cinema?.name}</td>
                <td className="px-4 py-2 text-center">
                    {cinema?.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default RegionDetails;
