import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const RegionModal = ({ regionData, onSubmit, onCancel, isVisible }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country_code: "",
    population: "",
    feature_img: null,
  });

  const modalRef = useRef(null);

  useEffect(() => {
    if (regionData) {
      setFormData({
        id: regionData._id,
        name: regionData.name || "",
      });
    }
  }, [regionData]);

  const handleClose = () => {
    setFormData({
      name: "",

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
      if (value) formDataToSend.append(key, value);
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
          {regionData ? "Cập nhật Vùng" : "Thêm Vùng"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-2">
              <label className="mb-1 block text-white">Tên vùng:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên vùng"
                className={commonInputClasses}
                required
              />
            </div>
            
          </div>
          <div className="flex justify-end">
            <button type="submit" className="mr-2 rounded-md bg-[#0728dd] p-2">
              {regionData ? "Cập nhật Vùng" : "Thêm Vùng"}
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

RegionModal.propTypes = {
  regionData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    country_code: PropTypes.string,
    population: PropTypes.number,
    feature_img: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default RegionModal;
