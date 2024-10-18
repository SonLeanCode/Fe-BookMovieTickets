import logo from '../../assets/bocongthuong.png';
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

const FooterWeb = () => {
  return (
    <>    
    <footer className="bg-slate-950 text-white py-10 p-20">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Left section */}
          <div className="w-1/4 flex flex-col justify-between">
            <div>
              <h2 className="text-5xl font-bold text-red-600 mb-4">ST-FLIX</h2>
              <p> Vé phim giá rẻ, đa dạng thể loại, trải nghiệm giải trí tuyệt vời!</p>
            </div>
            <img src={logo} className="w-48 h-16" alt="" />
          </div>
          <div>
          </div>


             {/* speeddial  */}
        <div className="fixed end-6 bottom-6 z-50 w-full">
          <div className="absolute bottom-0 right-0">
            <SpeedDial>
              <SpeedDialHandler>
                <IconButton size="lg" className="rounded-full flex justify-center items-center">
                  <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                </IconButton>
              </SpeedDialHandler>
              <SpeedDialContent>
                <a href="/cinema">
                  <SpeedDialAction className="bg-gray-900 p-2 mb-3">
                    <HomeIcon className="h-5 w-5" />
                  </SpeedDialAction>
                </a>
                <SpeedDialAction className="bg-gray-900 p-2 mb-3">
                  <CogIcon className="h-5 w-5" />
                </SpeedDialAction>
                <SpeedDialAction className="bg-gray-900 p-2 mb-3">
                  <Square3Stack3DIcon className="h-5 w-5" />
                </SpeedDialAction>
              </SpeedDialContent>
            </SpeedDial>
          </div>
        </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-evenly w-3/4">
            {/* Products */}
            <div className="mr-10">
              <h3 className="font-semibold mb-6 text-xl border-b-4 pb-2 text-center border-red-500 uppercase rounded-b-xl">Sản phẩm</h3>
              <ul className='flex flex-col gap-2'>
                <li className="hover:text-red-400 transition-colors duration-300" >Hành động</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Đặc biệt</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Kịch tính <span className="text-xs bg-white text-black px-2 py-1 rounded-full ml-2">Mới</span></li>
                <li className="hover:text-red-400 transition-colors duration-300" >Tình cảm</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Hạnh phúc</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Hài hước</li>
              </ul>
            </div>
            
            {/* Business */}
            <div className="mr-10">
              <h3 className="font-semibold mb-6 text-xl border-b-4 pb-2 text-center border-red-500 uppercase rounded-b-xl">Doanh nghiệp</h3>
              <ul className='flex flex-col gap-2'>
                <li className="hover:text-red-400 transition-colors duration-300" >Xem thêm</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Nghề nghiệp</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Nhấn nhá</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Tin tức</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Truyền thông</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Liên hệ</li>
              </ul>
            </div>

            {/* Resources */}
            <div className="mr-10">
              <h3 className="font-semibold mb-6 text-xl border-b-4 pb-2 text-center border-red-500 uppercase rounded-b-xl">Tài nguyên</h3>
              <ul className='flex flex-col gap-2'>
                <li className="hover:text-red-400 transition-colors duration-300" >Báo chí</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Bản tin</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Sự kiện</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Trung tâm</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Hướng dẫn</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Giúp đỡ</li>
              </ul>
            </div>

            {/* Social */}
            <div className="mr-10">
              <h3 className="font-semibold mb-6 text-xl border-b-4 pb-2 text-center border-red-500 uppercase rounded-b-xl">Xã hội</h3>
              <ul className='flex flex-col gap-2'>
                <li className="hover:text-red-400 transition-colors duration-300" >Twitter</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Tiktok</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Facebook</li>
                <li className="hover:text-red-400 transition-colors duration-300" >GitHub</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Instagram</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Youtube</li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="ffont-semibold mb-6 text-xl border-b-4 pb-2 text-center border-red-500 uppercase rounded-b-xl">Chính sách</h3>
              <ul className='flex flex-col gap-2'>
                <li className="hover:text-red-400 transition-colors duration-300" >Điều khoản</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Chính sách</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Cookies</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Giấy phép</li>
                <li className="hover:text-red-400 transition-colors duration-300" >Cài đặt</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex justify-between items-center">
          <p>Copyright © 2024 S-FLIX - Web bán vé phim. All Rights Reserved. Design by StickerMovie</p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-dribbble"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default FooterWeb;
