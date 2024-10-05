import { Button, Hero } from 'react-daisyui';
import { Link } from 'react-router-dom';
import notFoundImage from '../../assets/img/404/404.png';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Hero
        className="h-full w-full bg-cover bg-no-repeat bg-center relative"
        style={{
          backgroundImage: `url(${notFoundImage})`,
          backgroundPosition: 'center top'
        }}
      >
        <div className="absolute inset-0 pointer-events-none"></div>

        <Hero.Content className="text-center text-white z-10">
          <div className="max-w-lg mx-auto mt-[360px]">
            <div className="flex items-center justify-center gap-4">
              <Link to="/">
                <Button
                  className="px-6 py-2 text-lg rounded-xl bg-green-500 hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out"
                >
                  Trang chủ
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  className="px-6 py-2 text-lg rounded-xl bg-blue-500 hover:bg-blue-600 hover:scale-105 transition duration-300 ease-in-out"
                >
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </Hero.Content>
      </Hero>
    </div>
  );
};

export default NotFound;
