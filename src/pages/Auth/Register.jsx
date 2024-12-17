import { useState } from "react";
import { Button, Input, Checkbox } from "react-daisyui";
import { FaLock, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { useRegisterMutation } from "../../services/Auth/auth.service";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "../../helper/Toastify";
import emailjs from "@emailjs/browser";

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const sendWelcomeEmail = async () => {
    try {
      await emailjs.send(
        "service_rr8onnr", // Replace with your EmailJS Service ID
        "template_52f6cnf", // Replace with your EmailJS Template ID
        {
          to_name: formData.fullname,
          email: formData.email,
          pass: formData.password,
        },
        "T-40Y2VIg_EwqFB77" // Replace with your EmailJS Public Key
      );
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Toastify("Mật khẩu nhập chưa khớp với mật khẩu xác nhận","400");
      return;
    }
    if (formData.password.length < 6) {
      Toastify("Mật khẩu cần ít nhất 6 kí tự","400");
      return;
    }
    if (!formData.terms) {
      Toastify("Bạn phải đồng ý với các điều khoản và điều kiện.","400");
      return;
    }

    try {
      await register({
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }).unwrap();

      Toastify("Đăng kí thành công , vui lòng kiểm tra Email", "success");
      await sendWelcomeEmail(); // Gửi email chào mừng
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
      Toastify(error.data.message, "error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://t4.ftcdn.net/jpg/06/89/49/95/360_F_689499531_MeYeI1VVavgYQRzz0S3JxkQ9VxzgYZQh.jpg")',
      }}
    >
      <div className="max-w-md w-full space-y-8 p-8 bg-black bg-opacity-80 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50">
        <div className="text-center">
          <h2 className="mt-6 text-5xl font-extrabold text-red-600">ST-FLIX</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <label htmlFor="fullname" className="block text-sm font-medium text-white">
                Họ và tên:
              </label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                required
                onChange={handleChange}
                className="w-full p-1 pl-3 text-black rounded-md mt-2 pr-10"
                placeholder="Fullname"
              />
              <FaUser className="absolute right-2 top-9 text-black" />
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email:
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full p-1 pl-3 text-black rounded-md mt-2 pr-10"
                placeholder="Email address"
              />
              <FaEnvelope className="absolute right-2 top-9 text-black" />
            </div>
            <div className="relative">
              <label htmlFor="phone" className="block text-sm font-medium text-white">
                Số điện thoại:
              </label>
              <Input
                id="phone"
                name="phone"
                type="text"
                required
                onChange={handleChange}
                className="w-full p-1 pl-3 text-black rounded-md mt-2 pr-10"
                placeholder="Phone"
              />
              <FaPhone className="absolute right-2 top-9 text-black" />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Mật khẩu:
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="w-full p-1 pl-3 text-black rounded-md mt-2 pr-10"
                placeholder="Password"
              />
              <FaLock className="absolute right-2 top-9 text-black" />
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Nhập lại mật khẩu:
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                onChange={handleChange}
                className="w-full p-1 pl-3 text-black rounded-md mt-2 pr-10"
                placeholder="Confirm Password"
              />
              <FaLock className="absolute right-2 top-9 text-black" />
            </div>
            <div className="flex items-center mt-4">
              <Checkbox
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-white">
                Tôi đồng ý với các điều khoản và điều kiện
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600"
            disabled={isLoading}
          >
            Đăng Ký
          </Button>
        </form>
        <div className="text-white text-center mt-4">
          Bạn đã có tài khoản? <Link to="/auth/login" className="text-blue-500">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
