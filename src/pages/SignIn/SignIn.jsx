import { useState } from "react"
import { Button, Input, Checkbox } from "react-daisyui"
import { MdMovie, MdLock, MdPerson } from "react-icons/md"

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <MdMovie className="mx-auto h-12 w-12 text-indigo-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">CineMax</h2>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
                  placeholder="Username"
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
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
                className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
                placeholder="Password"
              />
            </div>
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
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLogin ? (
                  <MdLock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                ) : (
                  <MdPerson className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                )}
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
  )
}

export default SignIn