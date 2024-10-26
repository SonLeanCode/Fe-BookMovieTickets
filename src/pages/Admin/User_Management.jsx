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
  });

  console.log(users?.data);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
                {`' `}Đã chọn {selectedUsers.length} mục{` '`}
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
                <td className="px-4 py-2">{user.email}</td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form
            className="relative w-[400px] rounded-lg bg-[#111111] p-8 text-white shadow-lg"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4 text-2xl font-semibold">
              {selectedUser ? "Sửa tài khoản" : "Thêm tài khoản"}
            </h2>

            <div className="mb-4">
              <label className="mb-1 block font-semibold">Tên:</label>
              <Input
                type="text"
                name="fullname" // Đổi tên từ "name" thành "fullname"
                value={formData.fullname} // Đổi thành formData.fullname
                onChange={handleInputChange}
                className="rounded-md bg-[#2d2d2d] p-2 text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block font-semibold">Email:</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-md bg-[#2d2d2d] p-2 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block font-semibold">Mật khẩu:</label>
              <Input
                type="password" // Đảm bảo trường này là password
                name="password"
                value={formData.password} // Đảm bảo rằng password nằm trong formData
                onChange={handleInputChange}
                className="rounded-md bg-[#2d2d2d] p-2 text-white"
                required // Bắt buộc nhập mật khẩu
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block font-semibold">Số điện thoại:</label>
              <Input
                type="text"
                name="phone"
                value={formData.phone} // Đảm bảo rằng phone cũng nằm trong formData
                onChange={handleInputChange}
                className="rounded-md bg-[#2d2d2d] p-2 text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block font-semibold">Vai trò:</label>
              <select
                name="role"
                value={formData.role} // Đảm bảo rằng role nằm trong formData
                onChange={handleInputChange}
                className="rounded-md bg-[#2d2d2d] p-2 text-white"
              >
                <option value="user">Khách hàng</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-1 block font-semibold">Avatar:</label>
              <Input
                type="text"
                name="avatar"
                value={formData.avatar} // Đảm bảo rằng avatar nằm trong formData
                onChange={handleInputChange}
                className="rounded-md bg-[#2d2d2d] p-2 text-white"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                onClick={handleCloseModal}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                {selectedUser ? "Lưu thay đổi" : "Thêm"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
