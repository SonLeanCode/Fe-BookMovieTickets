import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { MdLock, MdMovie } from "react-icons/md";
import { useLoginMutation } from "../../services/auth/authService";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // Lưu token và user vào localStorage
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Điều hướng dựa vào vai trò người dùng
      navigate(response.user.role === "user" ? "/cinema" : "/admin");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <MdMovie className="mx-auto h-12 w-12 text-indigo-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">CineMax</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={handleChange}
              className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
              placeholder="Email address"
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={handleChange}
              className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
              placeholder="Password"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            disabled={isLoading}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <MdLock className="h-5 w-5 text-indigo-500" />
            </span>
            Sign in
          </Button>
        </form>
        <div className="text-white">
          Bạn chưa có tài khoản? <Link to="/register" className="text-blue-500">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;











// import { useState } from "react";
// import { Button, Input, Checkbox } from "react-daisyui";
// import { MdLock, MdMovie } from "react-icons/md";
// import { useRegisterMutation } from "../../services/auth/authService";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [register, { isLoading }] = useRegisterMutation();
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     terms: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     if (!formData.terms) {
//       alert("You must agree to the terms and conditions.");
//       return;
//     }

//     try {
//       const response = await register({
//         fullname: formData.fullname,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//       }).unwrap();
//       console.log("Registration successful:", response);
//     } catch (error) {
//       console.error("Registration error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//       <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
//         <div className="text-center">
//           <MdMovie className="mx-auto h-12 w-12 text-indigo-500" />
//           <h2 className="mt-6 text-3xl font-extrabold text-white">Create your account</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <Input
//               id="fullname"
//               name="fullname"
//               type="text"
//               required
//               onChange={handleChange}
//               className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
//               placeholder="Fullname"
//             />
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               required
//               onChange={handleChange}
//               className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
//               placeholder="Email address"
//             />
//             <Input
//               id="phone"
//               name="phone"
//               type="text"
//               required
//               onChange={handleChange}
//               className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
//               placeholder="Phone"
//             />
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               required
//               onChange={handleChange}
//               className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
//               placeholder="Password"
//             />
//             <Input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               required
//               onChange={handleChange}
//               className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
//               placeholder="Confirm Password"
//             />
//             <div className="flex items-center">
//               <Checkbox
//                 id="terms"
//                 name="terms"
//                 checked={formData.terms}
//                 onChange={handleChange}
//                 className="checkbox checkbox-primary border-gray-700 bg-gray-700"
//               />
//               <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
//                 I agree to the terms and conditions
//               </label>
//             </div>
//           </div>

//           <Button
//             type="submit"
//             className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             disabled={isLoading}
//           >
//             <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//               <MdLock className="h-5 w-5 text-indigo-500" />
//             </span>
//             Register
//           </Button>
//         </form>
//         <div className="text-white">Bạn đã có tài khoản? <Link to="/login" className="text-blue-500">Đăng nhập</Link></div>
//       </div>
//     </div>
//   );
// };

// export default Register;
