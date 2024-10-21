import { useState } from "react";
import { Button, Input } from "react-daisyui";
import {
  useGetAllActorsQuery,
  useAddActorMutation,
  useUpdateActorMutation,
  useDeleteActorMutation,
} from "../../services/Actor/actor.service";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../Loading/LoadingLocal";
import LoadingPage from "../Loading/LoadingSpinner";
import ActorModal from "../../components/Admin/Actor/ActorModal";

const Actor_Management = () => {
  const {
    data: actors,
    isLoading: actorDataLoading,
    refetch,
  } = useGetAllActorsQuery();

  const [loading, setLoading] = useState(false);
  const [selectedActor, setSelectedActor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [actorsPerPage, setActorsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addActor] = useAddActorMutation();
  const [updateActor] = useUpdateActorMutation();
  const [deleteActor] = useDeleteActorMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedActors, setSelectedActors] = useState([]);

  const filteredActors = actors?.data.filter((actor) =>
    actor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const totalPages = Math.ceil((filteredActors?.length || 0) / actorsPerPage);

  const handleSubmit = async (formData, isEdit) => {
    try {
      setLoading(true);
      if (isEdit) {
        await updateActor({ id: formData.get("id"), updatedData: formData }).unwrap();
        Toastify("Diễn viên đã được cập nhật:", 200);
      } else {
        await addActor(formData).unwrap();
        Toastify("Diễn viên mới đã được thêm:", 200);
      }
      refetch();
      handleCloseModal();
    } catch (error) {
      console.error("Có lỗi khi thực hiện thao tác:", error);
      Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
    } finally {
      setLoading(false);
    }
  };

  const handleEditActor = (id) => {
    const actorToEdit = actors?.data.find((actor) => actor._id === id);
    setSelectedActor(actorToEdit);
    setIsModalVisible(true);
  };

  const handleDeleteActor = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa diễn viên này?")) {
      try {
        setLoading(true);
        await deleteActor(id).unwrap();
        refetch();
        Toastify("Diễn viên đã được xóa:", 200);
      } catch (error) {
        console.error("Có lỗi khi xóa diễn viên:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteSelectedActors = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa những diễn viên đã chọn?")) {
      try {
        setLoading(true);
        await Promise.all(selectedActors.map((id) => deleteActor(id).unwrap()));
        refetch();
        Toastify("Các diễn viên đã được xóa:", 200);
        setSelectedActors([]);
      } catch (error) {
        console.error("Có lỗi khi xóa diễn viên:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedActor(null);
  };

  const handleActorsPerPageChange = (e) => {
    setActorsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleActorSelect = (id) => {
    setSelectedActors((prev) =>
      prev.includes(id)
        ? prev.filter((actorId) => actorId !== id)
        : [...prev, id],
    );
  };

  const paginatedActors = filteredActors?.slice(
    (currentPage - 1) * actorsPerPage,
    currentPage * actorsPerPage,
  );
  if (actorDataLoading) {
    return <LoadingLocal />;
  }
  if (loading) {
    return <LoadingPage loading={loading} />;
  }

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý danh sách diễn viên</h3>
        <Button
          className="flex rounded-md bg-red-600 p-2 hover:bg-red-700 hover:brightness-125"
          onClick={() => setIsModalVisible(true)}
        >
          + Thêm diễn viên
        </Button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <label htmlFor="entries" className="mr-2 text-gray-400">
            Hiển thị
          </label>
          <select
            id="entries"
            className="rounded-md bg-[#2d2d2d] p-2 text-white"
            value={actorsPerPage}
            onChange={handleActorsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedActors.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {`' `}Đã chọn {selectedActors.length} mục{` '`}
              </p>
              <Button
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-600"
                onClick={handleDeleteSelectedActors}
              >
                <FaTrash />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <h2>Tìm kiếm:</h2>
          <AiOutlineSearch className="relative left-[12.5rem] size-5" />
          <Input
            type="text"
            placeholder="Search..."
            className="rounded-md bg-[#2d2d2d] p-1 text-white"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="rounded-lg shadow-lg">
        <table className="w-full border-separate border-spacing-y-2 border-[#111111]">
          <thead className="bg-[#2d2d2d]">
            <tr>
              <th className="px-4 py-3 text-left text-white">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedActors(
                      e.target.checked
                        ? paginatedActors.map((actor) => actor._id)
                        : [],
                    )
                  }
                  checked={
                    paginatedActors?.length > 0 &&
                    selectedActors.length === paginatedActors.length
                  }
                  className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Diễn viên</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedActors?.map((actor) => (
              <tr key={actor._id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedActors.includes(actor._id)}
                    onChange={() => handleActorSelect(actor._id)}
                    className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                  />
                </td>
                <td className="px-4 py-2">{actor.name}</td>
                <td className="px-4 py-2 text-center">
                  <Button
                    className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    onClick={() => handleEditActor(actor._id)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className="rounded-sm bg-[#ff2727] p-2 text-white"
                    onClick={() => handleDeleteActor(actor._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isModalVisible && (
        <ActorModal
          actorData={selectedActor}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isVisible={isModalVisible}
        />
      )}
    </div>
  );
};

export default Actor_Management;
