import { useState } from "react";
import { Button, Input, Checkbox } from "react-daisyui";
import { MdMovie, MdLock } from "react-icons/md";
import { useLoginMutation } from "../../services/auth/authService";
import { useRegisterMutation } from "../../services/auth/authService";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname:''

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        // Handle successful login, like storing token in localStorage
        console.log(response);
      } catch (error) {
        console.error("Login error:", error);
      }
    } else {
      try {
        const response = await register({
          email: formData.email,
          password: formData.password,
          fullname:formData.fullname
        }).unwrap();
        // Handle successful registration
        console.log(response);
      } catch (error) {
        console.error("Register error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <MdMovie className="mx-auto h-12 w-12 text-indigo-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            {isLogin ? "CineMax" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleChange}
                className={`input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500 ${
                  isLogin ? "rounded-t-md" : ""
                }`}
                placeholder="Email address"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
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
            {!isLogin && (
              <div>
                <label htmlFor="fullname" className="sr-only">
                  Fullname
                </label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  onChange={handleChange}
                  className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
                  placeholder="Fullname"
                />
              </div>
            )}
         
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
                className="checkbox checkbox-primary border-gray-700 bg-gray-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            {isLogin && (
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-500 hover:text-indigo-400">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoggingIn || isRegistering} // Disable button while processing
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <MdLock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              {isLogin ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="text-center">
          <Button
            onClick={() => setIsLogin(!isLogin)}
            className="btn btn-link text-indigo-500 hover:text-indigo-400"
          >
            {isLogin ? "Need an account? Register" : "Already have an account? Sign in"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
