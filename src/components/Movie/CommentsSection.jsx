import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import PropTypes from 'prop-types';
import { getUserByIdFormToken } from "../Utils/auth";
import { useGetCommentsQuery, usePostCommentsMutation } from "../../services/Comments/comments_user.service";
const socket = io("http://localhost:4003");

const CommentsSection = ({ movieId }) => {
  console.log('IdMOVIE',movieId);
  
  const { data: comments, refetch } = useGetCommentsQuery(movieId);
  console.log('du lieu',comments);
  
  const [postComments] = usePostCommentsMutation();
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(comments?.data || []);

  useEffect(() => {
    // Khởi tạo `allComments` từ dữ liệu ban đầu nếu có
    if (comments && Array.isArray(comments.data)) {
      setAllComments(comments.data);
    } else {
      setAllComments([]);
    }
  }, [comments]);
  
  // Lắng nghe sự kiện từ socket cho các bình luận mới
  useEffect(() => {
    const handleNewComment = (comment) => {
      console.log('comment get api', comment)
      // Cập nhật bình luận mới nhận từ socket (của người dùng khác)
      if(movieId.comment === movieId){
        console.log('Bình luận hợp lệ cho bộ phim này:', comment);
      
      setAllComments((prevComments) => [...prevComments, comment]);
      }else{
        console.log('Bình luận không thuộc bộ phim này');
      }
    };
  
    socket.on("postComment", handleNewComment);
  
    return () => {
      socket.off("postComment", handleNewComment);
    };
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      console.log("Bình luận trống, không gửi.");
      return;
    }
    // Lấy userId từ token
    const userId = getUserByIdFormToken();
    if (!userId) {
      console.error("Không thể gửi bình luận: userId không tồn tại");
      return;
    }
  
    // Tạo dữ liệu bình luận
    const commentData = {
      userId,
      movieId,
      content: newComment,
      time: new Date().toLocaleTimeString(),
    };
  
    try {
      // Gửi bình luận qua API
      const response = await postComments(commentData);
      if (response.error) {
        console.error("Error:", response.error);

      } else {
        socket.emit("postComment", response.data);
        setAllComments((prevComments) => [...prevComments, response.data]);
  
        // Reset input field
        setNewComment("");
      }
      refetch()
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };
   return (
    <div className="px-5 md:px-0">
      <h2 className="mb-4 text-2xl font-bold">Bình luận</h2>
      <form onSubmit={handleSubmit}>
        <label className="sr-only">Nhập tin nhắn của bạn</label>
        <div className="flex items-center rounded-lg bg-gray-900 px-3 py-2">
          <textarea
            id="chat"
            rows="1"
            className="mx-4 block w-full rounded-lg border bg-gray-900 p-2.5 text-sm text-white"
            placeholder="Nhập tin nhắn của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600"
          >
            <svg
              className="h-5 w-5 rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M17.914 18.594l-8-18a1 1 0 00-1.828 0l-8 18a1 1 0 001.157 1.376L8 18.281V9a1 1 0 012 0v9.281l6.758 1.689a1 1 0 001.156-1.376z" />
            </svg>
            <span onClick={(e) => setNewComment(e.target.value)} className="sr-only">Gửi tin nhắn</span>
          </button>
        </div>
      </form>
      <div>
  {Array.isArray(allComments) && allComments.length > 0 ? (
    allComments.map((comment, index) => (
      <div key={comment._id || index} className="mt-5 flex items-start gap-2.5">
        <img className="h-12 w-14 rounded-full" src={comment.idUser?.avatar || "default-avatar-url"} alt="" />
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-white">{comment.idUser?.fullname || 'Người dùng ẩn danh'}</span>
            <span className="text-sm font-normal text-gray-500">{comment.time}</span>
          </div>
          <div className="leading-1.5 flex flex-col rounded-e-xl bg-gray-900 p-4">
            <p className="text-sm text-white">{comment.content}</p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500">Chưa có bình luận nào.</p>
  )}
</div>


    </div>
  );
};

CommentsSection.propTypes={
  movieId:PropTypes.string.isRequired,
}
export default CommentsSection;
