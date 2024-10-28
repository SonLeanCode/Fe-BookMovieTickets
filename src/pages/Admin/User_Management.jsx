import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../Loading/LoadingLocal";
import LoadingPage from "../Loading/LoadingSpinner";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../services/User/user.services";
import { useRegisterMutation } from "../../services/Auth/auth.service";
import avatar_default from "../../assets/img/avatar_defaut/avatar_default.png";
import UserForm from "../../components/Admin/Users/UserForm";

const AccountManagement = () => {
  const {
    data: users,
    isLoading: userDataLoading,
    refetch,
  } = useGetAllUsersQuery();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addUser] = useRegisterMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [isUserFormVisible, setUserFormVisible] = useState(false);

  // State to manage selected users
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const handleAddUser = () => {
    setSelectedUserData(null); // Reset user data
    setUserFormVisible(true); // Open UserForm to add a user
  };

  const handleEditUser = (user) => {
    setSelectedUserData(user); // Set user data for editing
    setUserFormVisible(true); // Open UserForm to edit user
  };

  const handleCancel = () => {
    setUserFormVisible(false); // Close UserForm when canceled
  };

  const filteredUsers = users?.data.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredUsers?.length || 0) / usersPerPage);

  const handleSubmit = async (formData, isEdit) => {
    try {
      setLoading(true);
      if (isEdit) {
        // Gửi id và formData trực tiếp
        await updateUser({
          id: formData.get("id"),
          userData: formData,
        }).unwrap();
        refetch();
        Toastify("Phim đã được cập nhật:", 200);
      } else {
        // Thêm phim mới
        await addUser(formData).unwrap();
        refetch();
        Toastify("Phim mới đã được thêm:", 200);
      }
      // Đóng modal sau khi thành công
      handleCancel();
    } catch (error) {
      console.error("Có lỗi khi thực hiện thao tác:", error);
      Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      try {
        setLoading(true);
        await deleteUser(id).unwrap();
        refetch();
        Toastify("Tài khoản đã được xóa", 200);
      } catch (error) {
        console.error("Có lỗi khi xóa tài khoản:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteSelectedUsers = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa các tài khoản đã chọn?")) {
      try {
        setLoading(true);
        await Promise.all(selectedUserIds.map((id) => deleteUser(id).unwrap()));
        refetch();
        Toastify("Các tài khoản đã được xóa", 200);
      } catch (error) {
        console.error("Có lỗi khi xóa tài khoản:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
        setSelectedUserIds([]); // Reset selected user IDs
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id],
    );
  };

  const handleUsersPerPageChange = (e) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  if (userDataLoading) {
    return <LoadingLocal />;
  }
  if (loading) {
    return <LoadingPage loading={loading} />;
  }

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý tài khoản</h3>
        <Button
          className="flex rounded-md bg-red-600 p-2 hover:bg-red-700"
          onClick={handleAddUser}
        >
          + Thêm tài khoản
        </Button>
        {selectedUserIds.length > 0 && (
          <Button
            className="ml-2 rounded-md bg-red-600 p-2 hover:bg-red-700"
            onClick={handleDeleteSelectedUsers}
          >
            Xóa đã chọn
          </Button>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <label htmlFor="entries" className="mr-2 text-gray-400">
            Hiển thị
          </label>
          <select
            id="entries"
            className="rounded-md bg-[#2d2d2d] p-2 text-white"
            value={usersPerPage}
            onChange={handleUsersPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
        </div>
        <div className="flex items-center">
          <h2>Tìm kiếm:</h2>
          <AiOutlineSearch className="relative left-[12.5rem] size-5" />
          <Input
            type="text"
            placeholder="Search..."
            className="rounded-md bg-[#2d2d2d] p-2 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUserIds(filteredUsers.map((user) => user._id));
                    } else {
                      setSelectedUserIds([]);
                    }
                  }}
                  checked={
                    selectedUserIds.length === filteredUsers.length &&
                    filteredUsers.length > 0
                  }
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Tên tài khoản</th>
              <th className="px-4 py-3 text-left text-white">Email</th>
              <th className="px-4 py-3 text-start text-white">Ảnh đại diện</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedUsers?.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                  />
                </td>
                <td className="px-4 py-2">{user.fullname}</td>
                <td className="px-4 py-2">{user.email || ""}</td>
                <td className="px-4 py-2">
                  <img
                    src={user.avatar || avatar_default}
                    alt="Avatar"
                    className="h-12 w-12 rounded-full border-2 border-white"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <Button
                    className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    onClick={() => handleEditUser(user)}
                  >
                    Sửa
                  </Button>
                  <Button
                    className="mr-1 rounded-sm bg-[#ff2727] p-2 text-white"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <UserForm
        isVisible={isUserFormVisible}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        userData={selectedUserData}
      />
    </div>
  );
};

export default AccountManagement;
