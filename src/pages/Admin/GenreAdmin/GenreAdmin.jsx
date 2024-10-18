import { useState } from 'react';
import {
  useGetAllGenresQuery,
  useAddGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} from '../../../services/Genre/genre.service';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const GenreAdmin = () => {
  const { data: genres, error, isLoading, refetch } = useGetAllGenresQuery();
  const [addGenre] = useAddGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const [genreName, setGenreName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Thêm mới genre
  const handleAddGenre = async () => {
    if (!genreName) return alert('Tên thể loại không được để trống!');
    try {
      await addGenre({ name: genreName }).unwrap();
      setGenreName(''); // Xóa input sau khi thêm
      refetch()
    } catch (error) {
      console.error('Lỗi khi thêm thể loại:', error);
    }
  };

  // Chỉnh sửa genre
  const handleEditGenre = async () => {
    if (!selectedGenre || !genreName) return alert('Vui lòng nhập tên thể loại mới!');
    try {
      await updateGenre({ id: selectedGenre._id, updatedData: { name: genreName } }).unwrap();
      setGenreName(''); // Xóa input sau khi chỉnh sửa
      setSelectedGenre(null); // Bỏ chọn thể loại sau khi cập nhật
      setIsEditMode(false); // Chuyển lại chế độ thêm
      refetch()
    } catch (error) {
      console.error('Lỗi khi chỉnh sửa thể loại:', error);
    }
  };

  // Xóa genre
  const handleDeleteGenre = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thể loại này?')) {
      try {
        await deleteGenre(id).unwrap();
        refetch()
      } catch (error) {
        console.error('Lỗi khi xóa thể loại:', error);
      }
    }
  };

  // Chuyển sang chế độ chỉnh sửa
  const handleSelectGenreForEdit = (genre) => {
    setSelectedGenre(genre);
    setGenreName(genre.name); // Hiển thị tên genre trong input
    setIsEditMode(true); // Chuyển sang chế độ chỉnh sửa
  };

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p>Đã xảy ra lỗi khi tải thể loại</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý Thể loại</h2>

      {/* Form để thêm hoặc chỉnh sửa thể loại */}
      <div className="mb-4 text-black">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Tên thể loại"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
        />
        <button
          className={`mt-2 p-2 rounded ${isEditMode ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}
          onClick={isEditMode ? handleEditGenre : handleAddGenre}
        >
          {isEditMode ? 'Cập nhật thể loại' : 'Thêm thể loại'}
        </button>
      </div>

      {/* Danh sách các thể loại */}
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tên Thể loại</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {genres?.genres.map((genre) => (
            <tr key={genre._id}>
              <td className="border px-4 py-2">{genre.name}</td>
              <td className="border px-4 py-2">
                <button
                  className="mr-2 text-yellow-500"
                  onClick={() => handleSelectGenreForEdit(genre)}
                >
                  <AiFillEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteGenre(genre._id)}
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenreAdmin;
