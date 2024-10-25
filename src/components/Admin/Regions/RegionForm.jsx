import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import MultiSelectValues from "../MultiSelectWithCheckbox";

const RegionForm = ({ regionData, onSubmit, onCancel, isVisible }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    countries: [],
  });

  const [selectedCountries, setSelectedCountries] = useState(formData.countries);

  const handleSelectChange = (selectedOptions, name) => {
    setFormData({
      ...formData,
      [name]: selectedOptions.map((option) => option.value),
    });

    if (name === "countries") {
      setSelectedCountries(selectedOptions.map((option) => option.value));
    }
  };

  const modalRef = useRef(null);

  useEffect(() => {
    if (regionData) {
      setFormData({
        id: regionData._id,
        name: regionData.name,
        description: regionData.description,
        countries: regionData.countries || [],
      });
    }
  }, [regionData]);

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      countries: [],
    });
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!formData.id;
    const formDataToSend = { ...formData }; // Adjusted for simplicity

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
          {regionData ? "Cập nhật khu vực" : "Thêm khu vực"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-2">
              <label className="mb-1 block text-white">Tên khu vực: </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên khu vực"
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
                required
              />
            </div>
            <MultiSelectValues
              name="countries"
              options= "country"
              selectedValues={selectedCountries}
              handleSelectChange={handleSelectChange}
              label="Quốc gia"
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="mr-2 rounded-md bg-[#0728dd] p-2">
              {regionData ? "Cập nhật khu vực" : "Thêm khu vực"}
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

RegionForm.propTypes = {
  regionData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    countries: PropTypes.arrayOf(PropTypes.string),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default RegionForm;
