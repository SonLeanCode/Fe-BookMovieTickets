import { useState, useEffect } from "react";
import { Button, Input } from "react-daisyui";
import { FaImage } from "react-icons/fa";
import PropTypes from "prop-types"; // Import PropTypes
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from "../../../services/Banner/banner.service";
import Toastify from "../../../helper/Toastify";
import { useGetAllMoviesQuery } from "../../../services/Movies/movies.services";
import LoadingLocal from "../../../pages/Loading/LoadingLocal";
import Select from "react-select"; // Import react-select
import LoadingPage from "../../../pages/Loading/LoadingSpinner";

const BannerForm = ({ banner, isModalVisible, onClose, refetch }) => {
  const [img, setImg] = useState(null);  // Store file object for the image
  const [movieId, setMovieId] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: movieData, isLoading: movieDataLoading } =
    useGetAllMoviesQuery();
  const [addBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  // Nếu là chỉnh sửa, điền sẵn dữ liệu vào form
  useEffect(() => {
    if (banner) {
      setImg(banner?.img || null); // Reset image file on edit
      setMovieId(banner?.movie_id?._id || "");
    }
  }, [banner]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("movie_id", movieId);

    if (img) {
      formData.append("img", img);  // Append the selected image file
    }

    try {
      if (banner) {
        // Chỉnh sửa banner
        await updateBanner({ id: banner._id, updatedData: formData }).unwrap();
        Toastify("Banner đã được cập nhật", 200);
      } else {
        // Thêm mới banner
        await addBanner(formData).unwrap();
        Toastify("Banner đã được thêm", 200);
      }
      refetch();
      setImg(null);
      setMovieId("")
      onClose(); // Đóng modal sau khi thành công
    } catch (error) {
      console.error("Có lỗi khi thực hiện thao tác:", error);
      Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
    } finally {
      setLoading(false);
    }
  };

  if (!isModalVisible) return null;

  if (movieDataLoading) {
    return <LoadingLocal />;
  }

  if (loading) {
    return <LoadingPage loading={loading} />;
  }

  // Prepare movie options for the react-select dropdown
  const movieOptions = movieData?.data.map((movie) => ({
    value: movie._id,
    label: (
      <div className="flex items-center text-black">
        <img
          src={movie.img}
          alt={movie.name}
          className="mr-2 h-10 w-10 rounded-md"
        />
        {movie.name}
      </div>
    ),
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-[#111111] p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-bold text-white">
          {banner ? "Sửa Banner" : "Thêm Banner"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="movie_id" className="block text-gray-400">
              Chọn phim:
            </label>
            <Select
              id="movie_id"
              value={movieOptions?.find((option) => option.value === movieId)}
              onChange={(selectedOption) => setMovieId(selectedOption.value)}
              options={movieOptions}
              className="mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="img" className="block text-gray-400">
              Hình ảnh banner:
            </label>
            <div className="mt-2">
              <Input
                type="file"
                id="img"
                onChange={(e) => setImg(e.target.files[0])} // Handle file input
                className="rounded-md bg-[#2d2d2d] text-white"
                required
              />
              {img && (
                <div className="mt-2 flex items-center">
                  <FaImage className="mr-2 text-xl text-gray-400" />
                  <img
                    src={img || URL.createObjectURL(img)} // Show preview of the uploaded file
                    alt="Banner Preview"
                    className="h-20 w-20 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </Button>
            <Button
              type="button"
              className="ml-2 bg-red-500 text-white hover:bg-red-600"
              onClick={onClose}
            >
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes validation
BannerForm.propTypes = {
  banner: PropTypes.shape({
    _id: PropTypes.string,
    img: PropTypes.string,
    movie_id: PropTypes.shape({
      _id: PropTypes.string,
    }),
  }),
  isModalVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default BannerForm;
