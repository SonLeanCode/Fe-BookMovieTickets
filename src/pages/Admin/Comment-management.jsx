import { useState } from "react";
import { Button, Input, Modal, Textarea } from "react-daisyui";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  useFindAllCommentsQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../services/Comments/comments_user.service";

const CommentManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [movie, setMovie] = useState("");
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState("");
  const [movieImg, setMovieImg] = useState("");
  const [commentId, setCommentId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5; // Số lượng bình luận hiển thị trên mỗi trang

  const { data: comments } = useFindAllCommentsQuery();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const openEditModal = (id, userNameText, movieText, commentText, avatar, movieImg) => {
    setOpenModal(true);
    setUserName(userNameText);
    setMovie(movieText);
    setComment(commentText);
    setAvatar(avatar);
    setMovieImg(movieImg);
    setCommentId(id);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?");
    if (isConfirmed) {
      deleteComment(id)
        .unwrap()
        .then(() => {
          toast.success("Bình luận đã được xóa thành công!");
          window.location.href = '/admin/commentManagement';
        })
        .catch((error) => {
          toast.error("Có lỗi xảy ra khi xóa bình luận!");
          console.error("Error deleting comment: ", error);
        });
    }
  };

  const handleUpdateComment = () => {
    if (!comment.trim()) {
      toast.error("Bình luận không thể để trống!");
      return;
    }

    updateComment({ commentId, updatedData: { content: comment } })
      .unwrap()
      .then(() => {
        toast.success("Bình luận đã được cập nhật thành công!");
        window.location.href = '/admin/commentManagement';
        setOpenModal(false);
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra khi sửa bình luận!");
        console.error("Error updating comment: ", error);
      });
  };

  // Lấy dữ liệu cho trang hiện tại
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments?.responseData?.slice(indexOfFirstComment, indexOfLastComment) || [];

  const totalPages = Math.ceil((comments?.responseData?.length || 0) / commentsPerPage);

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý bình luận</h3>
      </div>

      <div className="mt-[-5%] flex items-center justify-end">
        <div className="flex items-center">
          <h2>Tìm kiếm:</h2>
          <AiOutlineSearch className="relative left-[12.5rem] size-5" />
          <Input type="text" placeholder="Search..." className="rounded-md bg-[#2d2d2d] p-1 text-white" />
        </div>
      </div>

      <div className="rounded-lg shadow-lg">
        <table className="w-full border-separate border-spacing-y-2 border-[#111111]">
          <thead className="bg-[#2d2d2d]">
            <tr>
              <th className="px-4 py-3 text-left text-white">Người bình luận</th>
              <th className="px-4 py-3 text-left text-white">Ảnh Phim</th>
              <th className="px-4 py-3 text-left text-white">Tên Phim</th>
              <th className="px-4 py-3 text-center text-white">Nội dung bình luận</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {currentComments.length > 0 ? (
              currentComments.map((commentItem) => (
                <tr key={commentItem._id}>
                  <td className="px-4 py-2">
                    {commentItem.idUser ? (
                      <div className="flex items-center">
                        <img
                          src={commentItem.idUser.avatar}
                          alt={commentItem.idUser.fullname}
                          className="w-8 h-8 object-cover rounded-full mr-2"
                        />
                        <span>{commentItem.idUser.fullname}</span>
                      </div>
                    ) : (
                      <span>Người dùng ẩn danh</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={commentItem.movieId.img}
                      alt={commentItem.movieId.name}
                      className="w-16 h-24 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">{commentItem.movieId.name}</td>
                  <td className="px-4 py-2 text-center">{commentItem.content}</td>
                  <td className="px-4 py-2 text-center">
                    <Button
                      onClick={() =>
                        openEditModal(
                          commentItem._id,
                          commentItem.idUser?.fullname || "Người dùng ẩn danh",
                          commentItem.movieId.name,
                          commentItem.content,
                          commentItem.idUser?.avatar || "",
                          commentItem.movieId.img
                        )
                      }
                      className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      onClick={() => handleDelete(commentItem._id)}
                      className="rounded-sm bg-[#ff2727] p-2 text-white"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">
                  Không có bình luận nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal - Form sửa bình luận */}
      <Modal open={openModal} onClose={closeModal} className="transition-opacity bg-black duration-300 ease-in-out">
        <Modal.Body className="rounded-lg p-4 max-w-md mx-auto shadow-[0_0_15px_2px_#00ffff]">
          <div className="flex flex-col items-center mb-6">
            {/* Hiển thị ảnh đại diện người dùng */}
            <img 
              src={avatar || 'https://i0.wp.com/top10dienbien.com/wp-content/uploads/2022/10/avatar-cute-11.jpg?w=960&ssl=1'}
              alt="Avatar" 
              className="w-20 h-20 rounded-full mb-4 shadow-lg" 
            />
            <div>
              <strong className="text-xl text-white">{userName}</strong>
            </div>
          </div>
          <hr />

          {/* Hiển thị ảnh phim */}
          <div className="mb-6 mt-4">
            <div className="flex items-center justify-start space-x-4">
              <img 
                src={movieImg} 
                alt={movie} 
                className="w-16 h-20 object-cover rounded-md shadow-md" 
              />
              <div>
                <h2 className="text-2xl font-bold text-white">{movie}</h2>
              </div>
            </div>
          </div>
          <hr />

          {/* Nội dung bình luận */}
          <div className="mb-6 mt-4">
            <label htmlFor="comment" className="block text-gray-300 text-lg font-semibold">Nội dung bình luận</label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nội dung bình luận"
              className="mt-4 w-full bg-[#444444] text-white p-4 rounded-lg shadow-md focus:ring-2 focus:ring-red-500 transition duration-200 placeholder-gray-400"
            />
          </div>
        </Modal.Body>

        <Modal.Actions className="flex justify-between mb-4 p-4">
          <Button
            onClick={handleUpdateComment}
            className="bg-[#1fff01] text-white hover:bg-[#16d701] transition-colors duration-200 px-6 py-2 rounded-lg"
          >
            Lưu thay đổi
          </Button>
          <Button 
            onClick={closeModal} 
            className="bg-[#ff2727] text-white hover:bg-[#ff4d4d] transition-colors duration-200 px-6 py-2 rounded-lg"
          >
            Hủy
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === index + 1 ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"
            }`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CommentManagement;
