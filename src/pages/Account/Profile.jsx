import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Set default tab
  const [userInfo, setUserInfo] = useState({
    image: "",
    name: "",
    phone: "",
    fullName: "",
    email: "",
    gender: "Nam",
  });

  // Function to change tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({ ...userInfo, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="p-28 px-20">
      <h1 className="pb-4 text-3xl font-semibold uppercase">
        Thông tin cá nhân
      </h1>
      <div className="md:flex">
        <ul className="flex-column mb-4 space-y-4 text-sm font-medium text-gray-500 md:mb-0 md:me-4 dark:text-gray-400">
          {["profile", "whislist", "history", "order", "out"].map((tab) => (
            <li key={tab}>
              <a
                href="#"
                className={`inline-flex w-32 items-center px-4 py-3 ${activeTab === tab ? "bg-red-600 text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"} rounded-lg`}
                onClick={() => handleTabChange(tab)}
              >
                <i
                  className={`fa-solid fa-${tab === "profile" ? "user" : tab === "whislist" ? "heart" : tab === "history" ? "clock-rotate-left" : tab === "order" ? "truck" : "right-to-bracket"} pr-3`}
                ></i>
                {tab === "profile"
                  ? "Thông tin"
                  : tab === "out"
                    ? "Đăng xuất"
                    : tab === "whislist"
                      ? "Yêu thích"
                      : tab === "history"
                        ? "Lịch sử"
                        : tab === "order"
                          ? "Đơn hàng"
                          : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex-1 rounded-lg bg-slate-900 p-6">
          {activeTab === "profile" && (
            <div>
              {userInfo.image && (
                <img
                  src={userInfo.image}
                  alt="User"
                  className="mx-auto mb-4 h-24 w-24 rounded-full"
                />
              )}
              <label className="mx-auto flex w-32 cursor-pointer rounded-lg bg-slate-200 px-4 py-2 text-center text-sm font-semibold text-black shadow focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
                <i className="fa-regular fa-image pr-1"></i>
                Chọn ảnh
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mt-2 block">
                    Tên:
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded bg-gray-50 p-2 text-black"
                      placeholder="Nhập tên"
                    />
                  </label>
                </div>
                <div>
                  <label className="mt-2 block">
                    Họ:
                    <input
                      type="text"
                      name="fullName"
                      value={userInfo.fullName}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded bg-gray-50 p-2 text-black"
                      placeholder="Nhập họ và tên"
                    />
                  </label>
                </div>
              </div>
              <label className="mt-2 block">
                Số điện thoại:
                <input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded bg-gray-50 p-2 text-black"
                  placeholder="Nhập số điện thoại"
                />
              </label>
              <label className="mt-2 block">
                Email:
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded bg-gray-50 p-2 text-black"
                  placeholder="Nhập email"
                />
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mt-2 block">
                    Giới tính:
                    <select
                      name="gender"
                      value={userInfo.gender}
                      onChange={handleInputChange}
                      className="mt-1 h-10 w-full rounded bg-gray-50 p-2 text-black"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="mt-2 block">
                    Sinh nhật :
                    <input
                      type="date"
                      name="fullName"
                      value={userInfo.fullName}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded bg-gray-50 p-2 text-black"
                      placeholder="Nhập họ và tên"
                    />
                  </label>
                </div>
              </div>

              <a href="#">
                <button
                  type="button"
                  className="mt-5 w-36 rounded-lg bg-blue-700 p-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Xác nhận
                </button>
              </a>
            </div>
          )}
          {activeTab === "whislist" && <div>Yêu thích của bạn</div>}
          {activeTab === "history" && (
            <div>
              <h2 className="pb-4 text-2xl font-semibold">Lịch sử</h2>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Vé phim
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Số lượng
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Thể loại
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Giá
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Mã
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        Phim cám
                      </th>
                      <td className="px-6 py-4">2</td>
                      <td className="px-6 py-4">Kịch tính</td>
                      <td className="px-6 py-4">100.000 VND</td>
                      <td className="px-6 py-4">
                        <img
                          src="https://qrcode-gen.com/images/qrcode-default.png"
                          className="w-12"
                          alt=""
                        />
                      </td>
                    </tr>
                    <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        Phim cám
                      </th>
                      <td className="px-6 py-4">2</td>
                      <td className="px-6 py-4">Kịch tính</td>
                      <td className="px-6 py-4">100.000 VND</td>
                      <td className="px-6 py-4">
                        <img
                          src="https://qrcode-gen.com/images/qrcode-default.png"
                          className="w-12"
                          alt=""
                        />
                      </td>
                    </tr>
                    <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        Phim cám
                      </th>
                      <td className="px-6 py-4">2</td>
                      <td className="px-6 py-4">Kịch tính</td>
                      <td className="px-6 py-4">100.000 VND</td>
                      <td className="px-6 py-4">
                        <img
                          src="https://qrcode-gen.com/images/qrcode-default.png"
                          className="w-12"
                          alt=""
                        />
                      </td>
                    </tr>
                    <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        Phim cám
                      </th>
                      <td className="px-6 py-4">2</td>
                      <td className="px-6 py-4">Kịch tính</td>
                      <td className="px-6 py-4">100.000 VND</td>
                      <td className="px-6 py-4">
                        <img
                          src="https://qrcode-gen.com/images/qrcode-default.png"
                          className="w-12"
                          alt=""
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === "order" && <div>Đơn hàng</div>}
          {activeTab === "out" && <div>Đăng xuất ra ngoài</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
