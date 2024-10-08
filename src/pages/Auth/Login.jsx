import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { FaFacebook, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginMutation, useGoogleLoginMutation } from "../../services/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation(); // Thêm dòng này
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate(response.user.role === "user" ? "/cinema" : "/admin");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await googleLogin({
        id_token: credentialResponse.credential, // Sử dụng id_token để gọi API
      }).unwrap();

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate(response.user.role === "user" ? "/cinema" : "/admin");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  // const clientIdGG = "335914895163-emkf2s3kn9o029bfuf2sq95j1a7bpocf.apps.googleusercontent.com"
  const clientIDGoogle = "322233958303-v9dm4kkg4ceta8buk4qvgdo55asir2uj.apps.googleusercontent.com"
  return (
    <GoogleOAuthProvider clientId={clientIDGoogle}>
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
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email:
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  className="w-full p-1 pl-3 text-black rounded-md mt-2 pr-10"
                  placeholder="Email address"
                />
                <FaEnvelope className="absolute right-2 top-9 text-black" />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Mật Khẩu:
                </label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="w-full p-1 pl-3 text-black rounded-md mt-2 pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-9 text-black"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600"
              disabled={isLoading}
            >
              Đăng Nhập
            </Button>
            <div className="text-white text-center">
              Bạn chưa có tài khoản? <Link to="/auth/register" className="text-blue-500">Đăng ký</Link>
            </div>
          </form>
          <div className="flex flex-col space-y-4 text-white items-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess} // Sử dụng hàm xử lý mới
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
            <Button className="w-full p-2 bg-blue-600 flex items-center justify-center transition-none">
              <FaFacebook className="mr-2" />
              Đăng Nhập với Facebook
            </Button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;