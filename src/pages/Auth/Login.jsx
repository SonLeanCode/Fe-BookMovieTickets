import React from 'react';
import { Button, Input, Checkbox } from "react-daisyui";
import { useLoginMutation , useRegisterMutation } from "../../services/auth/authService";
import './Login.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      formData: {
        email: '',
        password: '',
        fullname: '',
      },
      rememberMe: false,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  }

  handleCheckboxChange(e) {
    this.setState({ rememberMe: e.target.checked });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { isLogin, formData } = this.state;
    const { login, register } = this.props;

    if (isLogin) {
      try {
        const response = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        console.log(response);
      } catch (error) {
        console.error("Login error:", error);
      }
    } else {
      try {
        const response = await register({
          email: formData.email,
          password: formData.password,
          fullname: formData.fullname
        }).unwrap();
        console.log(response);
      } catch (error) {
        console.error("Register error:", error);
      }
    }
  }

  render() {
    const { isLogin, formData } = this.state;

    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
  
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="flex items-center justify-center">
            <div className="logo flex items-center">
              <h1 className="text-5xl font-bold text-red-700">ST-FLIX</h1>
            </div>
          </div>
          <div className="flex-column">
            <label htmlFor="email">Gmail</label>
          </div>
          <div className="inputForm">
            <i class="fa-regular fa-envelope"></i>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={this.handleChange}
              className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
              placeholder="Email address"
            />
          </div>

          <div className="flex-column">
            <label htmlFor="password">Mật khẩu</label>
          </div>
          <div className="inputForm">
          {/* <FontAwesomeIcon icon="fa-solid fa-eye" style={{color: "#ffffff",}} /> */}
             <i class="fa-solid fa-eye"></i>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={this.handleChange}
              className="input input-bordered w-full text-white bg-gray-700 border-gray-700 placeholder-gray-500"
            />
          </div>

          {!isLogin && (
              <div className='inputForm'>
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

          <div className="flex-row">
            <div>
              <Checkbox
                id="rememberMe"
                checked={this.state.rememberMe}
                onChange={this.handleCheckboxChange}
              />
              <label htmlFor="rememberMe">Ghi nhớ tôi?</label>
            </div>
            <span className="span">Quên mật khẩu ?</span>
          </div>
          <Button type="submit" className="button-submit"> {isLogin ? "Đăng Nhập" : "Đăng Kí"}</Button>

          <p className="p">
            {isLogin ? "Bạn chưa có tài khoản ? Đăng kí" : "Bạn có tài khoản ? Đăng nhập"}</p>
          <p className="p line text-red-600">Hoặc</p>

          <div className="flex-row">
            <Button className="btn google">
              <img src="https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png" width={25} alt="" />
              Google
            </Button>
            <Button className="btn apple">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" width={25} alt="" />
              Apple
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Export with HOC for login and register mutations
export default function SignInWithMutations(props) {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  return <SignIn {...props} login={login} register={register} />;
}