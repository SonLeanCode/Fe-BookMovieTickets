import { useState } from 'react';
import {
  useGetAllRegionsQuery,
  useAddRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} from '../../../services/Regions/regions.service';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

const RegionAdmin = () => {
  const { data, isLoading, isError, refetch } = useGetAllRegionsQuery();
  const [addRegion] = useAddRegionMutation();
  const [updateRegion] = useUpdateRegionMutation();
  const [deleteRegion] = useDeleteRegionMutation();

  const [editingRegion, setEditingRegion] = useState(null);
  const [newRegion, setNewRegion] = useState({ name: '' });

  // Handle form submission for creating/updating region
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingRegion) {
      await updateRegion({ id: editingRegion._id, updatedData: newRegion });
    } else {
      await addRegion(newRegion);
    }
    setNewRegion({ name: '' });
    setEditingRegion(null);
    refetch()
  };

  // Handle editing region
  const handleEdit = (region) => {
    setEditingRegion(region);
    setNewRegion({ name: region.name });
    refetch()
  };

  // Handle deleting region
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this region?')) {
      await deleteRegion(id);
      refetch()
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Region Management</h2>

      {/* Form for adding/editing region */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="input input-bordered mb-2 w-full text-black"
          type="text"
          placeholder="Region Name"
          value={newRegion.name}
          onChange={(e) => setNewRegion({ ...newRegion, name: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">
          {editingRegion ? (
            <>
              <FaEdit className="mr-2" /> Update Region
            </>
          ) : (
            <>
              <FaPlus className="mr-2" /> Add Region
            </>
          )}
        </button>
        {editingRegion && (
          <button
            className="btn btn-secondary ml-2"
            type="button"
            onClick={() => {
              setEditingRegion(null);
              setNewRegion({ name: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Display regions list */}
      {isLoading ? (
        <p>Loading regions...</p>
      ) : isError ? (
        <p>Error loading regions!</p>
      ) : (
        <table className="table-auto w-full bg-white shadow-md rounded mb-4 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Region Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.regions.map((region, index) => (
              <tr key={region._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{region.name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => handleEdit(region)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(region._id)}
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

export default RegionAdmin;
