import { useState } from 'react';
import {
  useGetAllCinemasQuery,
  useAddCinemaMutation,
  useUpdateCinemaMutation,
  useDeleteCinemaMutation,
} from '../../../services/Cinema/cinema.service'; 
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useGetAllRegionsQuery } from '../../../services/Regions/regions.service';
const CinemaAdmin = () => {
  const { data: cinemas, isLoading: loadingCinemas, isError: errorCinemas, refetch } = useGetAllCinemasQuery();
  const { data: regions, isLoading: loadingRegions, isError: errorRegions } = useGetAllRegionsQuery(); // Gọi API lấy khu vực
  const [addCinema] = useAddCinemaMutation();
  const [updateCinema] = useUpdateCinemaMutation();
  const [deleteCinema] = useDeleteCinemaMutation();

  const [editingCinema, setEditingCinema] = useState(null);
  const [newCinema, setNewCinema] = useState({ name: '', address: '', region_id: '' });
    console.log(cinemas)
  // Handle form submission for creating/updating cinema
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCinema) {
      await updateCinema({ id: editingCinema._id, updatedData: newCinema });
    } else {
      await addCinema(newCinema);
    }
    setNewCinema({ name: '', address: '', region_id: '' });
    setEditingCinema(null);
    refetch(); // Tải lại dữ liệu sau khi thêm hoặc sửa
  };

  // Handle editing cinema
  const handleEdit = (cinema) => {
    setEditingCinema(cinema);
    setNewCinema({ name: cinema.name, address: cinema.address, region_id: cinema.region_id._id });
  };

  // Handle deleting cinema
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cinema?')) {
      await deleteCinema(id);
      refetch(); // Tải lại dữ liệu sau khi xóa
    }
  };

  return (
    <div className="ml-64 mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Cinema Management</h2>

      {/* Form for adding/editing cinema */}
      <form onSubmit={handleSubmit} className="mb-6 text-black">
        <input
          className="input input-bordered mb-2 w-full"
          type="text"
          placeholder="Cinema Name"
          value={newCinema.name}
          onChange={(e) => setNewCinema({ ...newCinema, name: e.target.value })}
        />
        <input
          className="input input-bordered mb-2 w-full"
          type="text"
          placeholder="Address"
          value={newCinema.address}
          onChange={(e) => setNewCinema({ ...newCinema, address: e.target.value })}
        />
        
        {/* Dropdown for selecting region */}
        <select
          className="select select-bordered mb-2 w-full"
          value={newCinema.region_id}
          onChange={(e) => setNewCinema({ ...newCinema, region_id: e.target.value })}
        >
          <option value="" disabled>Select Region</option>
          {loadingRegions ? (
            <option>Loading regions...</option>
          ) : errorRegions ? (
            <option>Error loading regions!</option>
          ) : (
            regions?.data.map((region) => (
              <option key={region._id} value={region._id}>
                {region.name}
              </option>
            ))
          )}
        </select>
        
        <button className="btn btn-primary text-white" type="submit">
          {editingCinema ? (
            <>
              <FaEdit className="mr-2" /> Update Cinema
            </>
          ) : (
            <>
              <FaPlus className="mr-2" /> Add Cinema
            </>
          )}
        </button>
        {editingCinema && (
          <button
            className="btn btn-secondary ml-2"
            type="button"
            onClick={() => {
              setEditingCinema(null);
              setNewCinema({ name: '', address: '', region_id: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Display cinemas list */}
      {loadingCinemas ? (
        <p>Loading cinemas...</p>
      ) : errorCinemas ? (
        <p>Error loading cinemas!</p>
      ) : (
        <table className="table-auto w-full bg-white shadow-md rounded mb-4 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Cinema Name</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Region</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cinemas?.data.map((cinema, index) => (
              <tr key={cinema._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{cinema.name}</td>
                <td className="border px-4 py-2">{cinema.address}</td>
                <td className="border px-4 py-2">{cinema.region_id.name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => handleEdit(cinema)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(cinema._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CinemaAdmin;
