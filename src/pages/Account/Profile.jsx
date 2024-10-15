import React, { useState } from 'react';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile'); // Set default tab
    const [userInfo, setUserInfo] = useState({
        image: 'https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg',
        name: '',
        phone: '',
        fullName: '',
        email: '',
        gender: 'Nam',
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
            <h1 className="text-3xl pb-4 uppercase font-semibold">Thông tin cá nhân</h1>
            <div className="md:flex">
                <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    {['profile', 'whislist', 'history', 'order', 'out'].map(tab => (
                        <li key={tab}>
                            <a
                                href="#"
                                className={`inline-flex items-center w-32 px-4 py-3 ${activeTab === tab ? 'text-white bg-red-600' : 'text-gray-500 bg-gray-50 hover:bg-gray-100'} rounded-lg`}
                                onClick={() => handleTabChange(tab)}
                            >
                                <i className={`fa-solid fa-${tab === 'profile' ? 'user' : tab === 'whislist' ? 'heart' : tab === 'history' ? 'clock-rotate-left' : tab === 'order' ? 'truck' : 'right-to-bracket'} pr-3`}></i>
                                {tab === 'profile' ? 'Thông tin' : tab === 'out' ? 'Đăng xuất' : tab === 'whislist' ? 'Yêu thích' : tab === 'history' ? 'Lịch sử' : tab === 'order' ? 'Đơn hàng' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex-1 bg-slate-900 rounded-lg p-6">
                    {activeTab === 'profile' &&
                        <div>
                            {userInfo.image && <img src={userInfo.image} alt="User" className="w-24 h-24 rounded-full mb-4 mx-auto" />}
                            <label
                                className="cursor-pointer bg-slate-200 text-black mx-auto text-center flex w-32 font-semibold text-sm py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
                                <i class="fa-regular fa-image pr-1"></i>
                                Chọn ảnh
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mt-2">
                                        Tên:
                                        <input
                                            type="text"
                                            name="name"
                                            value={userInfo.name}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 w-full rounded text-black bg-gray-50"
                                            placeholder="Nhập tên"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block mt-2">
                                        Họ:
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={userInfo.fullName}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 w-full rounded text-black bg-gray-50"
                                            placeholder="Nhập họ và tên"
                                        />
                                    </label>
                                </div>
                            </div>
                            <label className="block mt-2">
                                Số điện thoại:
                                <input
                                    type="text"
                                    name="phone"
                                    value={userInfo.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full rounded text-black bg-gray-50"
                                    placeholder="Nhập số điện thoại"
                                />
                            </label>
                            <label className="block mt-2">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full rounded text-black bg-gray-50"
                                    placeholder="Nhập email"
                                />
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mt-2">
                                        Giới tính:
                                        <select
                                            name="gender"
                                            value={userInfo.gender}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 h-10 w-full rounded text-black bg-gray-50"
                                        >
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <label className="block mt-2">
                                        Sinh nhật :
                                        <input
                                            type="date"
                                            name="fullName"
                                            value={userInfo.fullName}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 w-full rounded text-black bg-gray-50"
                                            placeholder="Nhập họ và tên"
                                        />
                                    </label>
                                </div>
                            </div>

                            <a href="#"><button type='button' class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-5 w-36'>Xác nhận</button></a>
                        </div>
                    }
                    {activeTab === 'whislist' && <div>Yêu thích của bạn</div>}
                    {activeTab === 'history' && <div>

                        <h2 className='text-2xl font-semibold pb-4'>Lịch sử</h2>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Vé phim
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Số lượng
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Thể loại
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Giá
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Mã
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Phim cám
                                        </th>
                                        <td class="px-6 py-4">
                                            2
                                        </td>
                                        <td class="px-6 py-4">
                                            Kịch tính
                                        </td>
                                        <td class="px-6 py-4">
                                            100.000 VND
                                        </td>
                                        <td class="px-6 py-4">
                                            <img src="https://qrcode-gen.com/images/qrcode-default.png" className='w-12' alt="" />
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Phim cám
                                        </th>
                                        <td class="px-6 py-4">
                                            2
                                        </td>
                                        <td class="px-6 py-4">
                                            Kịch tính
                                        </td>
                                        <td class="px-6 py-4">
                                            100.000 VND
                                        </td>
                                        <td class="px-6 py-4">
                                            <img src="https://qrcode-gen.com/images/qrcode-default.png" className='w-12' alt="" />
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Phim cám
                                        </th>
                                        <td class="px-6 py-4">
                                            2
                                        </td>
                                        <td class="px-6 py-4">
                                            Kịch tính
                                        </td>
                                        <td class="px-6 py-4">
                                            100.000 VND
                                        </td>
                                        <td class="px-6 py-4">
                                            <img src="https://qrcode-gen.com/images/qrcode-default.png" className='w-12' alt="" />
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Phim cám
                                        </th>
                                        <td class="px-6 py-4">
                                            2
                                        </td>
                                        <td class="px-6 py-4">
                                            Kịch tính
                                        </td>
                                        <td class="px-6 py-4">
                                            100.000 VND
                                        </td>
                                        <td class="px-6 py-4">
                                            <img src="https://qrcode-gen.com/images/qrcode-default.png" className='w-12' alt="" />
                                        </td>
                                    </tr>
                                
                                </tbody>
                            </table>
                        </div>

                    </div>}
                    {activeTab === 'order' && <div>Đơn hàng</div>}
                    {activeTab === 'out' && <div>Đăng xuất ra ngoài</div>}
                </div>
            </div>
        </div>
    );
};

export default Profile;