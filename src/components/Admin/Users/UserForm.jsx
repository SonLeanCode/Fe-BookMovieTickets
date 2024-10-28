import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const UserForm = ({ userData, onSubmit, onCancel, isVisible }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  // Define fixed role options

  const modalRef = useRef(null);

  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData._id,
        fullname: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role || "user",
      });
    }
  }, [userData]);

  const handleClose = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    });
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: files[0],
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
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
    "w-full rounded-md border-2 border-gray-400 bg-transparent p-3 text-white placeholder-transparent focus:border-indigo-500";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${!isVisible ? "hidden" : "block"}`}
    >
      <div
        ref={modalRef}
        className="w-full max-w-4xl rounded-lg bg-[#202020] p-6 shadow-lg shadow-blue-500/50"
      >
        <h2 className="mb-4 text-xl font-bold uppercase text-white">
          {userData ? "Cập nhật người dùng" : "Thêm người dùng"}
        </h2>
        <form
          className="relative w-full max-w-[900px] scale-105 transform overflow-hidden rounded-lg bg-gradient-to-br from-purple-400 via-gray-900 to-gray-800 p-10 shadow-2xl transition-all duration-500 ease-out"
          onSubmit={handleSubmit}
        >
          <h2 className="animate-fadeIn mb-10 text-center text-4xl font-bold text-white">
            {userData ? "SỬA TÀI KHOẢN" : "THÊM TÀI KHOẢN"}
          </h2>

          <div className="mb-5 flex justify-center">
            <img
              src={
                formData.avatar
                  ? URL.createObjectURL(formData.avatar)
                  : "https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png"
              }
              alt="Avatar"
              className="h-32 w-32 rounded-full border-4 border-white object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Tên */}
            <div className="relative">
              <label className="absolute -top-3 left-4 rounded-md bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 px-2 font-semibold text-white transition-transform duration-300">
                Tên
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.name}
                onChange={handleChange}
                className={commonInputClasses}
                placeholder=" "
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label className="absolute -top-3 left-4 rounded-md bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 px-2 font-semibold text-white transition-transform duration-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={commonInputClasses}
                placeholder=" "
                required
              />
            </div>

            {/* Mật khẩu */}
            <div className="relative">
              <label className="absolute -top-3 left-4 rounded-md bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 px-2 font-semibold text-white transition-transform duration-300">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={commonInputClasses}
                placeholder=" "
                required
              />
            </div>

            {/* Số điện thoại */}
            <div className="relative">
              <label className="absolute -top-3 left-4 rounded-md bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 px-2 font-semibold text-white transition-transform duration-300">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={commonInputClasses}
                placeholder=" "
                required
              />
            </div>

            {/* Vai trò */}
            <div className="relative">
              <label className="absolute -top-3 left-4 rounded-md bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 px-2 font-semibold text-white transition-transform duration-300">
                Vai trò
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-md border-2 border-gray-400 bg-transparent p-3 text-blue-500 placeholder-transparent focus:border-indigo-500"
              >
                <option value="user">Khách hàng</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </div>

            {/* Chọn file cho Avatar */}
            <div className="relative">
              <label className="absolute -top-3 left-4 rounded-md bg-gradient-to-r from-red-600 via-pink-500 to-purple-400 px-2 font-semibold text-white transition-transform duration-300">
                Chọn file Avatar
              </label>
              <input
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-4 rounded-md bg-transparent text-white"
              />
            </div>
          </div>

          {/* Nút hành động */}
          <div className="mt-10 flex justify-end space-x-5">
            <button
              type="button"
              className="transform rounded-lg bg-gray-600 px-5 py-2 text-base font-medium text-white transition duration-300 hover:scale-110 hover:bg-gray-700"
              onClick={handleClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="transform rounded-lg bg-gradient-to-r from-red-600 to-purple-600 px-5 py-2 text-base font-medium text-white transition duration-300 hover:scale-110"
            >
              {userData ? "Cập nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes for component validation
UserForm.propTypes = {
  userData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default UserForm;
