import React, { useState } from "react";
import { Button, Input, Modal, Textarea, Select } from "react-daisyui"; // Thêm Modal và Textarea từ react-daisyui
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const CommentManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userName, setUserName] = useState(""); // Tên người dùng
  const [movie, setMovie] = useState(""); // Tên phim
  const [comment, setComment] = useState(""); // Nội dung bình luận
  const [selectedMovie, setSelectedMovie] = useState(""); // Chọn phim

  // Hàm mở modal để thêm bình luận
  const openAddModal = () => {
    setIsEdit(false);
    setOpenModal(true);
    setUserName(""); // Làm sạch tên khi mở form thêm mới
    setMovie(""); // Làm sạch phim khi mở form thêm mới
    setComment(""); // Làm sạch bình luận khi mở form thêm mới
  };

  // Hàm mở modal để sửa bình luận
  const openEditModal = (userNameText, movieText, commentText) => {
    setIsEdit(true);
    setOpenModal(true);
    setUserName(userNameText); // Chuyển tên người dùng vào form sửa
    setMovie(movieText); // Chuyển tên phim vào form sửa
    setComment(commentText); // Chuyển nội dung bình luận vào form sửa
  };

  // Hàm đóng modal
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý bình luận</h3>
        <Button
          onClick={openAddModal}
          className="flex rounded-md bg-red-600 p-2 hover:bg-red-700 hover:brightness-125"
        >
          + Thêm bình luận
        </Button>
      </div>

      {/* Tùy chọn hiển thị */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <label htmlFor="entries" className="mr-2 text-gray-400">
            Hiển thị
          </label>
          <select id="entries" className="rounded-md bg-[#2d2d2d] p-2 text-white">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
        </div>

        {/* Tìm kiếm bình luận */}
        <div className="flex items-center">
          <h2>Tìm kiếm:</h2>
          <AiOutlineSearch className="relative left-[12.5rem] size-5" />
          <Input type="text" placeholder="Search..." className="rounded-md bg-[#2d2d2d] p-1 text-white" />
        </div>
      </div>

      {/* Bảng bình luận */}
      <div className="rounded-lg shadow-lg">
        <table className="w-full border-separate border-spacing-y-2 border-[#111111]">
          <thead className="bg-[#2d2d2d]">
            <tr>
              <th className="px-4 py-3 text-left text-white">
                <input type="checkbox" className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500" />
              </th>
              <th className="px-4 py-3 text-left text-white">Tên</th>
              <th className="px-4 py-3 text-left text-white">Phim</th>
              <th className="px-4 py-3 text-left text-white">Bình luận</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            <tr>
              <td className="px-4 py-2">
                <input type="checkbox" className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500" />
              </td>
              <td className="px-4 py-2">Nguyễn Văn A</td>
              <td className="px-4 py-2">
                <img src="https://via.placeholder.com/100" alt="Phim 1" className="w-16 h-24 object-cover rounded-md" />
              </td>
              <td className="px-4 py-2">Bình luận 1</td>
              <td className="px-4 py-2 text-center">
                <Button
                  onClick={() => openEditModal("Nguyễn Văn A", "Phim 1", "Bình luận 1")}
                  className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                >
                  <FaEdit />
                </Button>
                <Button className="rounded-sm bg-[#ff2727] p-2 text-white">
                  <FaTrash />
                </Button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <input type="checkbox" className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500" />
              </td>
              <td className="px-4 py-2">Trần Thị B</td>
              <td className="px-4 py-2">
                <img src="https://via.placeholder.com/100" alt="Phim 2" className="w-16 h-24 object-cover rounded-md" />
              </td>
              <td className="px-4 py-2">Bình luận 2</td>
              <td className="px-4 py-2 text-center">
                <Button
                  onClick={() => openEditModal("Trần Thị B", "Phim 2", "Bình luận 2")}
                  className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                >
                  <FaEdit />
                </Button>
                <Button className="rounded-sm bg-[#ff2727] p-2 text-white">
                  <FaTrash />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-4">
        <Button className="bg-blue-600 p-2 text-white">Trang trước</Button>
        <span className="mx-4 text-white">Trang 1 / 10</span>
        <Button className="bg-blue-600 p-2 text-white">Trang sau</Button>
      </div>

       {/* Modal - Form thêm/sửa bình luận */}
       <Modal open={openModal} onClose={closeModal} className="transition-opacity duration-300 ease-in-out">
        <Modal.Header className="text-2xl text-center font-semibold text-gray-200 bg-[#222222] p-6 rounded-t-lg shadow-lg">
          {isEdit ? "Sửa bình luận" : "Thêm bình luận"}
        </Modal.Header>
        <Modal.Body className="bg-[#333333] rounded-b-lg p-6 shadow-lg">
          <div>
            <label htmlFor="userName" className="block text-gray-300 text-lg font-semibold">Tên người dùng</label>
            <Input
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nhập tên người dùng"
              className="mt-4 w-full bg-[#444444] text-white p-4 rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition duration-200"
            />
          </div>
          <div className="mt-6">
            <label htmlFor="movie" className="block text-gray-300 text-lg font-semibold">Phim</label>
            <Select
              id="movie"
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
              className="mt-4 w-full bg-[#444444] text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition duration-200"
            >
              <option value="Phim 1">Phim 1</option>
              <option value="Phim 2">Phim 2</option>
            </Select>
          </div>
          <div className="mt-6">
            <label htmlFor="comment" className="block text-gray-300 text-lg font-semibold">Bình luận</label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập bình luận..."
              className="mt-4 w-full bg-[#444444] text-white rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition duration-200"
            />
          </div>
        </Modal.Body>
        <Modal.Actions className="flex justify-end bg-[#222222] rounded-b-lg p-4 shadow-lg">
          <Button
            onClick={closeModal}
            className="bg-red-600 text-white hover:bg-red-700 transition duration-200 px-6 py-3 rounded-lg shadow-md"
          >
            Đóng
          </Button>
          <Button
            onClick={() => {
              // Xử lý lưu dữ liệu thêm/sửa tại đây
              closeModal();
            }}
            className="bg-green-600 text-white hover:bg-green-700 transition duration-200 px-6 py-3 rounded-lg shadow-md ml-4"
          >
            {isEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CommentManagement;
