import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ActorModal = ({ actorData, onSubmit, onCancel, isVisible }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date_of_birth: "",
    nationality: "",
  });

  const modalRef = useRef(null);

  useEffect(() => {
    if (actorData) {
      setFormData({
        id: actorData._id,
        name: actorData.name,
        description: actorData.description,
        date_of_birth: actorData.date_of_birth ? new Date(actorData.date_of_birth).toISOString().split("T")[0] : "",
        nationality: actorData.nationality,
      });
    }
  }, [actorData]);

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      date_of_birth:  "",
      nationality: "",
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
      formDataToSend.append(key, value);
    });

    onSubmit(formDataToSend, isEdit);
  };

  const commonInputClasses = "input input-bordered w-full bg-[#171717] text-white border-gray-500";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${!isVisible ? "hidden" : "block"}`}
    >
      <div
        ref={modalRef}
        className="w-full max-w-4xl rounded-lg bg-[#202020] p-6 shadow-lg shadow-blue-500/50"
      >
        <h2 className="mb-4 text-xl font-bold uppercase text-white">
          {actorData ? "Cập nhật diễn viên" : "Thêm diễn viên"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-2">
              <label className="mb-1 block text-white">Tên diễn viên:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên diễn viên"
                className={commonInputClasses}
                required
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mô tả"
                className={`textarea textarea-bordered ${commonInputClasses}`}
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Ngày sinh</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className={commonInputClasses}
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Quốc tịch</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Quốc tịch"
                className={commonInputClasses}
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-white">Hình ảnh</label>
              <input
                type="file"
                name="feature_img"
                accept="image/*"
                onChange={handleChange}
                className={commonInputClasses}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="mr-2 rounded-md bg-[#0728dd] p-2">
              {actorData ? "Cập nhật diễn viên" : "Thêm diễn viên"}
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

ActorModal.propTypes = {
  actorData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    date_of_birth: PropTypes.string,
    nationality: PropTypes.string,
    feature_img: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default ActorModal;