import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { FaFacebook, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginMutation, useGoogleLoginMutation, useFacebookLoginMutation } from "../../services/Auth/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FacebookProvider, LoginButton } from "react-facebook";
import Toastify from "../../helper/Toastify";
const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [facebookLogin] = useFacebookLoginMutation();

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
      localStorage.setItem("user", JSON.stringify(response?.data));
      Toastify(response.message, 200)
      navigate(response?.data.role === "user" ? "/cinema" : "/admin");
    } catch (error) {
      console.error("Login error:", error);
      Toastify(error.data.message, error.status)
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await googleLogin({
        token: credentialResponse.credential,
      }).unwrap();

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response?.data));
      navigate(response?.data.role === "user" ? "/cinema" : "/admin");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleFacebookResponse = async (response) => {
    try {
      if (response.status === "connected") {
        const { accessToken } = response.authResponse;
        const fbResponse = await facebookLogin({token: accessToken}).unwrap(); // Send token to the backend

        localStorage.setItem("accessToken", fbResponse.accessToken);
        localStorage.setItem("user", JSON.stringify(fbResponse?.data));
        navigate(fbResponse?.data.role === "user" ? "/cinema" : "/admin");
      } else {
        console.error("Facebook login failed:", response);
      }
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  const clientIDGoogle = "322233958303-v9dm4kkg4ceta8buk4qvgdo55asir2uj.apps.googleusercontent.com";
  const appIDFacebook = "505675705675206";

  return (
    <GoogleOAuthProvider clientId={clientIDGoogle}>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("https://t4.ftcdn.net/jpg/06/89/49/95/360_F_689499531_MeYeI1VVavgYQRzz0S3JxkQ9VxzgYZQh.jpg")',
        }}
      >
        <div className="max-w-md w-full space-y-8 p-8 bg-black bg-opacity-80 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50">
          <div className="text-center">
            <h2 className="mt-6 text-5xl font-extrabold text-red-600">ST-FLIX</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-white">Email:</label>
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
                <label htmlFor="password" className="block text-sm font-medium text-white">Mật Khẩu:</label>
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
            <GoogleLogin className="w-[600px]"
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
            <FacebookProvider appId={appIDFacebook}>
              <LoginButton
                scope="email"
                onSuccess={handleFacebookResponse}  
                onError={(error) => {
                  console.error("Facebook login error:", error);
                }}  
              >
                <Button className="w-full p-2 bg-blue-600 flex items-center justify-center transition-none">
                  <FaFacebook className="mr-2" />
                  Đăng Nhập với Facebook
                </Button>
              </LoginButton>
            </FacebookProvider>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
