import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { FaEdit, FaTrash } from "react-icons/fa";
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

const AccountManagement = () => {
  const {
    data: users,
    isLoading: userDataLoading,
    refetch,
  } = useGetAllUsersQuery();
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addUser] = useRegisterMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "", // Thêm trường avatar
  });

  
  console.log(users?.data);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Tạo URL cho file để hiển thị
      const imageUrl = URL.createObjectURL(file);
      // Cập nhật formData.avatar với URL của hình ảnh
      setFormData((prevData) => ({
        ...prevData,
        avatar: imageUrl, // Cập nhật với URL hình ảnh
      }));
    }
  };
  

  const filteredUsers = users?.data.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredUsers?.length || 0) / usersPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (selectedUser) {
        // Update user
        await updateUser({
          id: selectedUser._id,
          updatedData: formData,
        }).unwrap();
        Toastify("Tài khoản đã được cập nhật", 200);
      } else {
        // Add new user
        await addUser(formData).unwrap();
        Toastify("Tài khoản mới đã được thêm", 200);
      }
      refetch();
      handleCloseModal();
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (id) => {
    const userToEdit = users?.data.find((user) => user._id === id);
    setSelectedUser(userToEdit);
    setFormData({
      name: userToEdit.name,
      email: userToEdit.email,
    });
    setIsModalVisible(true);
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
        await Promise.all(selectedUsers.map((id) => deleteUser(id).unwrap()));
        refetch();
        Toastify("Các tài khoản đã được xóa", 200);
        setSelectedUsers([]);
      } catch (error) {
        console.error("Có lỗi khi xóa tài khoản:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    setFormData({ name: "", email: "" });
  };

  const handleUsersPerPageChange = (e) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  console.log(users);

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
          onClick={() => setIsModalVisible(true)}
        >
          + Thêm tài khoản
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
            value={usersPerPage}
            onChange={handleUsersPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedUsers.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {' }Đã chọn {selectedUsers.length} mục{ '}
              </p>
              <Button
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-600"
                onClick={handleDeleteSelectedUsers}
              >
                <FaTrash />
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <h2>Tìm kiếm:</h2>
          <AiOutlineSearch className="relative left-4" />
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
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
              <th className="px-4 py-3 text-center text-white">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers?.length}
                  onChange={() => {
                    if (selectedUsers.length === filteredUsers?.length) {
                      setSelectedUsers([]);
                    } else {
                      setSelectedUsers(filteredUsers?.map((user) => user._id));
                    }
                  }}
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
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => {
                      if (selectedUsers.includes(user._id)) {
                        setSelectedUsers(
                          selectedUsers.filter((id) => id !== user._id),
                        );
                      } else {
                        setSelectedUsers([...selectedUsers, user._id]);
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-2">{user.fullname}</td>
                <td className="px-4 py-2">{user.email || ""}</td>
                <td className="px-4 py-2"><img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border-2 border-white"
                /></td>
                <td className="px-4 py-2 text-center">
                  <Button
                    className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    onClick={() => handleEditUser(user._id)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className="mr-1 rounded-sm bg-[#ff2727] p-2 text-white"
                    onClick={() => handleDeleteUser(user._id)}
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
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

{isModalVisible && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-300 ease-in-out">
    <form
      className="relative w-full max-w-[900px] transform overflow-hidden rounded-lg bg-gradient-to-br from-purple-400 via-gray-900 to-gray-800 p-10 shadow-2xl transition-all duration-500 ease-out scale-105"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-10 text-center text-4xl font-bold text-white animate-fadeIn">
        {selectedUser ? "SỬA TÀI KHOẢN" : "THÊM TÀI KHOẢN"}
      </h2>

      <div className="flex justify-center mb-5">
        <img
          src={formData.avatar || 'https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png'} // Nếu không có avatar, sử dụng ảnh mặc định
          alt="Avatar"
          className="w-32 h-32 rounded-full border-4 border-white object-cover"
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Tên */}
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 text-white px-2 rounded-md font-semibold transition-transform duration-300">
            Tên
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            className="w-full rounded-md bg-transparent border-2 border-gray-400 p-3 text-white focus:border-indigo-500 placeholder-transparent"
            placeholder=" "
            required
          />
        </div>

        {/* Email */}
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 text-white px-2 rounded-md font-semibold transition-transform duration-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-md bg-transparent border-2 border-gray-400 p-3 text-white focus:border-indigo-500 placeholder-transparent"
            placeholder=" "
            required
          />
        </div>

        {/* Mật khẩu */}
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 text-white px-2 rounded-md font-semibold transition-transform duration-300">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full rounded-md bg-transparent border-2 border-gray-400 p-3 text-white focus:border-indigo-500 placeholder-transparent"
            placeholder=" "
            required
          />
        </div>

        {/* Số điện thoại */}
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 text-white px-2 rounded-md font-semibold transition-transform duration-300">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full rounded-md bg-transparent border-2 border-gray-400 p-3 text-white focus:border-indigo-500 placeholder-transparent"
            placeholder=" "
            required
          />
        </div>

        {/* Vai trò */}
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 text-white px-2 rounded-md font-semibold transition-transform duration-300">
            Vai trò
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full rounded-md bg-transparent border-2 border-gray-400 p-3 text-blue-500 focus:border-indigo-500 placeholder-transparent"
          >
            <option value="user">Khách hàng</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>

        {/* Chọn file cho Avatar */}
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 text-white px-2 rounded-md font-semibold transition-transform duration-300">
            Chọn file Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-4 rounded-md bg-transparent text-white"
          />
        </div>
      </div>

      {/* Nút hành động */}
      <div className="mt-10 flex justify-end space-x-5">
        <button
          type="button"
          className="rounded-lg bg-gray-600 px-5 py-2 text-base font-medium text-white hover:bg-gray-700 transition duration-300 transform hover:scale-110"
          onClick={handleCloseModal}
        >
          Hủy
        </button>
        <button
          type="submit"
          className="rounded-lg bg-red-500 px-5 py-2 text-base font-medium text-white transition duration-300 transform hover:scale-110"
        >
          {selectedUser ? "Lưu thay đổi" : "Thêm"}
        </button>
      </div>
    </form>
  </div>
)}



    </div>
  );
};

export default AccountManagement;