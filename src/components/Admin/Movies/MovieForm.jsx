import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useGetAllActorsQuery } from "../../../services/Actor/actor.service";
import { useGetAllGenresQuery } from "../../../services/Genre/genre.service";
import MultiSelectValues from "../MultiSelectWithCheckbox";

const MovieForm = ({ movieData, onSubmit, onCancel, isVisible }) => {
  const [formData, setFormData] = useState({
    url_video: "",
    name: "",
    description: "",
    country: "",
    director: "",
    producer: "",
    duration: "",
    release_date: "",
    subtitles: "",
    age_limit: "",
    actors: [],
    genres: [],
  });

  const { data: actorsData } = useGetAllActorsQuery();
  const { data: genresData } = useGetAllGenresQuery();

  const actorOptions = actorsData?.data.map((actor) => ({
    value: actor._id,
    label: actor.name,
  }));

  const genreOptions = genresData?.data.map((genre) => ({
    value: genre._id,
    label: genre.name,
  }));

  const [selectedActors, setSelectedActors] = useState(formData.actors);
  const [selectedGenres, setSelectedGenres] = useState(formData.genres);

  const handleSelectChange = (selectedOptions, name) => {
    setFormData({
      ...formData,
      [name]: selectedOptions.map((option) => option.value),
    });

    if (name === "actors") {
      setSelectedActors(selectedOptions.map((option) => option.value));
    } else {
      setSelectedGenres(selectedOptions.map((option) => option.value));
    }
  };

  const modalRef = useRef(null);

  useEffect(() => {
    if (movieData) {
      setFormData({
        id: movieData._id,
        url_video: movieData.url_video,
        name: movieData.name,
        description: movieData.description,
        country: movieData.country,
        director: movieData.director,
        producer: movieData.producer,
        duration: movieData.duration,
        release_date: movieData.release_date,
        subtitles: movieData.subtitles,
        age_limit: movieData.age_limit,
        actors: movieData.actors || [],
        genres: movieData.genres || [],
      });
    }
  }, [movieData]);

  const handleClose = () => {
    setFormData({
      url_video: "",
      name: "",
      description: "",
      country: "",
      director: "",
      producer: "",
      duration: "",
      release_date: "",
      subtitles: "",
      age_limit: "",
      actors: [],
      genres: [],
    });
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!formData.id;
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formDataToSend.append(`${key}[]`, item));
      } else {
        formDataToSend.append(key, value);
      }
    });

    onSubmit(formDataToSend, isEdit);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onCancel]);

  const commonInputClasses =
    "input input-bordered w-full bg-[#171717] text-white border-gray-500";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${!isVisible ? "hidden" : "block"}`}
    >
      <div
        ref={modalRef}
        className="w-full max-w-4xl rounded-lg bg-[#202020] p-6 shadow-lg shadow-blue-500/50"
      >
        <h2 className="mb-4 text-xl font-bold uppercase text-white">
          {movieData ? "Cập nhật phim" : "Thêm phim"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-4">
            <div className="mb-2">
              <label className="mb-1 block text-white">Tên phim: </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên phim"
                className={commonInputClasses}
                required
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">URL Video</label>
              <input
                type="text"
                name="url_video"
                value={formData.url_video}
                onChange={handleChange}
                placeholder="URL Video"
                className={commonInputClasses}
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Quốc gia</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Quốc gia"
                className={commonInputClasses}
                required
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Đạo diễn</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                placeholder="Đạo diễn"
                className={commonInputClasses}
                required
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Nhà sản xuất</label>
              <input
                type="text"
                name="producer"
                value={formData.producer}
                onChange={handleChange}
                placeholder="Nhà sản xuất"
                className={commonInputClasses}
                required
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Thời lượng</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Thời lượng"
                className={commonInputClasses}
                required
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Ngày phát hành</label>
              <input
                type="date"
                name="release_date"
                value={formData.release_date}
                onChange={handleChange}
                className={commonInputClasses}
                required
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Phụ đề</label>
              <select
                name="subtitles"
                value={formData.subtitles}
                onChange={handleChange}
                className={`select select-bordered ${commonInputClasses}`}
                required
              >
                <option value="">Chọn phụ đề</option>
                <option value="Vietsub">Vietsub</option>
                <option value="Thuyết minh">Thuyết minh</option>
                <option value="Lồng tiếng">Lồng tiếng</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Giới hạn độ tuổi</label>
              <input
                type="number"
                name="age_limit"
                value={formData.age_limit}
                onChange={handleChange}
                placeholder="Giới hạn độ tuổi"
                className={commonInputClasses}
                min="0"
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Hình ảnh</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleChange}
                className={commonInputClasses}
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Hình ảnh video</label>
              <input
                type="file"
                name="img_video"
                accept="image/*"
                onChange={handleChange}
                className={commonInputClasses}
              />
            </div>
            <MultiSelectValues
              name="actors"
              options={actorOptions}
              selectedValues={selectedActors}
              handleSelectChange={handleSelectChange}
              label="Diễn viên"
            />
            <MultiSelectValues
              name="genres"
              options={genreOptions}
              selectedValues={selectedGenres}
              handleSelectChange={handleSelectChange}
              label="Thể loại"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-white">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả"
              className={`textarea textarea-bordered ${commonInputClasses}`}
              required
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="mr-2 rounded-md bg-[#0728dd] p-2">
              {movieData ? "Cập nhật phim" : "Thêm phim"}
            </button>
            <button
              type="button"
              className="rounded-md bg-red-600 p-2"
              onClick={handleClose}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

MovieForm.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    url_video: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
    director: PropTypes.string,
    producer: PropTypes.string,
    duration: PropTypes.number,
    release_date: PropTypes.string,
    subtitles: PropTypes.string,
    age_limit: PropTypes.number,
    actors: PropTypes.arrayOf(PropTypes.string),
    genres: PropTypes.arrayOf(PropTypes.string),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default MovieForm;
