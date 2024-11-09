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
  EnvelopeIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next'
const FooterWeb = () => {
  const { t } = useTranslation();
  return (
    <>    
    <footer className="bg-slate-950 text-white py-10 md:p-20 p-10">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Left section */}
          <div className="md:w-1/4 w-full flex flex-col justify-between">
            <div>
              <h2 className="text-5xl font-bold text-red-600 mb-4">ST-FLIX</h2>
              <p>{t("Vé phim giá rẻ, đa dạng thể loại, trải nghiệm giải trí tuyệt vời!")} </p>
            </div>
            <img src={logo} className="w-48 h-16 md:block hidden" alt="" />
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
                
                <a href='/cinema/contact'>
                  <SpeedDialAction className="bg-gray-900 p-2 mb-3">
                    <EnvelopeIcon className="h-5 w-5" />
                  </SpeedDialAction>
                </a>

                <a href='/cinema/setting'>
                  <SpeedDialAction className="bg-gray-900 p-2 mb-3">
                    <CogIcon className="h-5 w-5" />
                  </SpeedDialAction>
                </a>
                

              </SpeedDialContent>
            </SpeedDial>
          </div>
        </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-between text-center md:text-start md:w-3/4 w-full mt-5 md:mt-0">
            {/* Products */}
            <div className="mr-10">
              <h3 className="font-semibold mb-6 text-xl border-b-4 pb-2 text-center border-red-500 uppercase rounded-b-xl">{t("Sản phẩm")}</h3>
              <ul className='flex flex-col gap-2'>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/genrefilm">{t("Hành động")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/genrefilm">{t("Đặc biệt")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/genrefilm">{t("Kịch tính Mới")}</a> <span className="text-xs bg-white text-black px-2 py-1 rounded-full ml-2">Mới</span></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/genrefilm">{t("Tình cảm")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/genrefilm">{t("Hạnh phúc")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/genrefilm">{t("Hài hước")}</a></li>
              </ul>
            </div>
            
            {/* Business */}
            <div className="md:mr-10">
              <h3 className="font-semibold mb-6 text-xl border-b-4 pb-2 text-center border-red-500 uppercase rounded-b-xl">{t("Doanh nghiệp")}</h3>
              <ul className='flex flex-col gap-2'>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/business">{t("Doanh nghiệp")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/business">{t("Xem thêm")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" >{t("Nghề nghiệp")}</li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/business">{t("Nhấn nhá")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/business">{t("Truyền thông")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/contact">{t("Liên hệ")}</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="mr-10 mt-7 md:mt-0">
              <h3 className="font-semibold mb-6 text-xl border-b-4 pb-2 text-center border-red-500 uppercase rounded-b-xl">{t("Tài nguyên")}</h3>
              <ul className='flex flex-col gap-2'>
                <li className="hover:text-red-400 transition-colors duration-300" >{t("Tài nguyên")}</li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/voucher">{t("Báo chí")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/voucher">{t("Bản tin")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" >{t("Trung tâm")}</li>
                <li className="hover:text-red-400 transition-colors duration-300" >{t("Hướng dẫn")}</li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/contact">{t("Giúp đỡ")}</a></li>
              </ul>
            </div>

            {/* Social */}
            <div className="mr-10 mt-7 md:mt-0">
              <h3 className="font-semibold mb-6 text-xl border-b-4 pb-2 text-center border-red-500 uppercase rounded-b-xl">{t("Xã hội")}</h3>
              <ul className='flex flex-col gap-2'>
                <li className="hover:text-red-400 transition-colors duration-300" >{t("FaceBook")}</li>
                <li className="hover:text-red-400 transition-colors duration-300" >{t("Twitter")}</li>
                <li className="hover:text-red-400 transition-colors duration-300" >{t("Tiktok")}</li>
                <li className="hover:text-red-400 transition-colors duration-300" >{t("GitHub")}</li>
                <li className="hover:text-red-400 transition-colors duration-300" >{t("Instagram")}</li>
                <li className="hover:text-red-400 transition-colors duration-300" >{t("Youtube")}</li>
              </ul>
            </div>

            {/* Policies */}
            <div className='mt-7 md:mt-0'>
              <h3 className="ffont-semibold mb-6 text-xl border-b-4 pb-2 text-center border-red-500 uppercase rounded-b-xl">{t("Chính sách")}</h3>
              <ul className='flex flex-col gap-2'>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/policy">{t("Chính sách")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/policy">{t("Điều khoản")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/setting">{t("Chính sách Cookies")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/license">{t("Giấy phép")}</a></li>
                <li className="hover:text-red-400 transition-colors duration-300" ><a href="/cinema/setting">{t("Cài đặt")}</a></li>
              </ul>
              <img src={logo} className="mt-7 md:mt-0 w-48 h-16 md:hidden" alt="" />

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
