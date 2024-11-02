import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useGetUserQuery, usePatchUserMutation, usePatchProfileMutation, useUploadAvatarMutation } from '../../services/Auth/auth.service'
const Profile = () => {
    const { t } = useTranslation();
    const { userId } = useParams();
    const { data: userData } = useGetUserQuery(userId)
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEdiEmail, setIsEdiEmail] = useState(false);
    const [email, setEmail] = useState(userData?.data?.email || "");
    const [currentPassword, setCurrentPassword] = useState(userData?.data?.password || "")
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState()
    const [patchUser] = usePatchUserMutation();
    const [patchProfile] = usePatchProfileMutation();
    const [uploadAvatar] = useUploadAvatarMutation()



    // Cập nhật email khi userData thay đổi
    useEffect(() => {
        if (userData) {
            setEmail(userData.data.email);
        }
    }, [userData]);

    const handleEditClick = () => {
        setIsEditing(true);
        setCurrentPassword("");
    };
    const handleEmailClick = () => {
        setIsEdiEmail(true)
    }

    const handleSaveClick = async (e) => {
        e.preventDefault();
        if (email === userData?.data?.email) {
            alert(t("Bạn phải thay đổi địa chỉ email trước khi lưu."));
            return;
        }
        try {
            await patchUser({ userId, email }).unwrap();
            console.log("Cập nhật thành công");
            setIsEditing(false);
        } catch (err) {
            console.error("Lỗi khi cập nhật:", err);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert("Mật khẩu không khớp, vui lòng kiểm tra lại.");
            return;
        }
        try {
            await patchProfile({ userId, email, currentPassword, newPassword }).unwrap();
            console.log("Cập nhật all thành công");
            setIsEditing(false);
        }
        catch (err) {
            console.error("Lỗi khi cập nhật:", err);
        }
    }
    // image change 
    const handleOnClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // Hiển thị ảnh tạm thời

            // Gọi mutation để upload ảnh
            const formData = new FormData();
            formData.append('avatar', file);

            try {
                const data = await uploadAvatar({ userId, selectedFile: file }).unwrap();
                console.log('data', data);

                console.log('Avatar uploaded successfully');
            } catch (error) {
                console.error('Error uploading avatar:', error);
            }
        }
    };





    const [activeTab, setActiveTab] = useState('profile'); // Set default tab


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    return (
        <div className="p-28 px-20 text-white">
            <h1 className="text-3xl pb-4 uppercase font-semibold">{t("Thông tin cá nhân")}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="bg-slate-900 p-6 rounded-lg shadow-lg " style={{ boxShadow: '0 4px 20px rgba(255, 255, 255, 0.5)', }} >
                    <div className='flex items-center justify-center space-x-4'>
                        <div className="flex flex-col items-center">
                            <i className="fa-regular fa-pen-to-square ml-[100px]  w-4"
                                onClick={handleOnClick}></i>

                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            {userData && (
                                <img src={selectedImage || userData.data.avatar} alt="User" className="w-24 h-24 rounded-full mb-4" />
                            )}
                        </div>
                        {userData ? (
                            <div className="flex flex-col justify-center items-center">
                                <h4 className="text-lg font-semibold">{userData.data.fullname} </h4>
                                <h4 className="text-lg font-semibold">  Member </h4>
                            </div>
                        ) : (
                            <p>{t("Không tìm thấy thông tin người dùng.")}</p>
                        )}
                    </div>
                    <hr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', height: '1px' }} className="my-3" />
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">{t("Tổng chi tiêu 2024")}</h1>
                        <div className="text-orange-500 text-xl font-semibold">0 đ</div>
                    </div>
                    <div className="my-24 ">
                        <div className="relative m-10">
                            <div className="absolute left-0 -top-10 flex flex-col items-center">
                                <img src="https://www.galaxycine.vn/_next/static/media/bronze.6c2b2f39.png" alt="" className="w-5 h-8 mb-5" />
                                <div className="absolute left-0 w-1/3 h-full  rounded-full"></div>
                                <span className="text-xs mt-1">0 đ</span>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 flex flex-col items-center">
                                <img src="https://www.galaxycine.vn/_next/static/media/silver.6313aa20.png" alt="" className="w-7 h-10 mb-5" />
                                <div className="absolute left-1/3 w-2/3 h-full  rounded-full"></div>
                                <span className="text-xs mt-1">2.000.000 đ</span>
                            </div>
                            <div className="absolute right-0 -top-14 flex flex-col items-center">
                                <img src="https://www.galaxycine.vn/_next/static/media/gold.ff661579.png" alt="" className="w-8 h-12 mb-5" />
                                <div className="absolute right-0 w-1/3 h-full rounded-full"></div>
                                <span className="text-xs mt-1">4.000.000 đ</span>
                            </div>
                            <div className="relative w-full h-2 bg-gray-200 rounded-full">
                                <div className="absolute left-0 w-3 h-3 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-y-1/2"></div>
                                <div className="absolute left-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute right-6 w-3 h-3 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-y-1/2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <hr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', height: '1px' }} className="my-3" />
                        <div className="flex justify-between items-center py-5">
                            <div>
                                <span className="font-bold">{t("HOTLINE hỗ trợ")} </span>
                                <a href="tel:19002224" className="text-blue-600">19002224</a>
                                <span> (9:00 - 22:00)</span>
                            </div>
                        </div>
                        <hr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', height: '1px' }} className="my-3" />
                        <div className="flex justify-between items-center py-5">
                            <div>
                                <span className="font-bold">{t("Email")}: </span>
                                <a href="mailto:nqtuan1123@gmail.com" className="text-blue-600">nqtuan1123@gmail.com</a>
                            </div>
                            <div>
                                <span className="text-gray-400">&gt;</span>
                            </div>
                        </div>
                        <hr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', height: '1px' }} className="my-3" />
                        <div className="flex justify-between items-center py-5">
                            <div className="font-semibold">
                                {t("Câu hỏi thường gặp")}
                            </div>
                            <div>
                                <span className="text-gray-400">&gt;</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-2">
                    <div className="">
                        <ul className="flex flex-row justify-center space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-6 md:mb-0">
                            {['profile', 'history', 'whislist', 'Notification', 'gift'].map((tab) => (
                                <li key={tab} className="relative flex flex-col items-center">
                                    <a
                                        href="#"
                                        className={`inline-flex items-center text-xl ${activeTab === tab ? 'text-white' : 'text-gray-400'} rounded-lg`}
                                        onClick={() => handleTabChange(tab)}
                                    >
                                        {tab === 'profile' ? t('Thông tin') :
                                            tab === 'history' ? t('Lịch sử giao dịch') :
                                                tab === 'gift' ? t('Quà tặng') :
                                                    tab === 'whislist' ? t('Yêu thích') :
                                                        tab === 'Notification' ? t('Thông báo') :
                                                            tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </a>
                                    {activeTab === tab && (
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/4 h-0.5 bg-white rounded"></div>
                                    )}
                                </li>
                            ))}
                        </ul>



                        <hr className="border-t border-gray-300 my-3" />
                        {userData ? (
                            <div className="flex-1  rounded-lg p-2" style={{ boxShadow: '0 4px 20px rgba(255, 255, 255, 0.5)', }}>
                                {activeTab === 'profile' && (
                                    <div className=" p-6 bg-slate-900 shadow-lg rounded-lg">
                                        <form className="space-y-6">
                                            {/* Name and Date of Birth */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-white">{t("Họ và tên")}</label>
                                                    <div className="flex items-center mt-1 bg-gray-100 p-2 rounded">
                                                        <span className="material-icons text-gray-900"><i className="fa-solid fa-user"></i></span>
                                                        <input
                                                            type="text"
                                                            value={userData?.data?.fullname}
                                                            disabled
                                                            className="ml-2 flex-1 bg-transparent border border-gray-400 rounded-md text-gray-400 focus:outline-none "
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-white">{t("Date of Birth")}</label>
                                                    <div className="flex items-center mt-1 bg-gray-100 p-2 rounded">
                                                        <span className="material-icons text-gray-900"><i className="fa-regular fa-calendar"></i></span>
                                                        <input
                                                            type="text"
                                                            value={userData?.data?.brithDay}
                                                            disabled
                                                            className="ml-2 flex-1 bg-transparent border border-gray-400 rounded-md text-gray-400 focus:outline-none "
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Email and Phone Number */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-white">{t("Email")}</label>
                                                    <div className="flex items-center mt-1 bg-gray-100 p-2 rounded">
                                                        <span className="material-icons text-gray-900"><i className="fa-solid fa-envelope"></i></span>
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            disabled={!isEdiEmail}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="ml-2 flex-1 bg-transparent border border-gray-400 rounded-md text-gray-400 focus:outline-none "
                                                        />
                                                        {!isEdiEmail ? (
                                                            <button type="button" className="ml-2 text-orange-500 text-sm" onClick={handleEmailClick}>
                                                                {t("Thay đổi")}
                                                            </button>
                                                        ) : (
                                                            <button type="button" className="ml-2 text-green-500 text-sm" onClick={handleSaveClick}>
                                                                {t("Lưu")}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-white">{t("Điện thoại")}</label>
                                                    <div className="flex items-center mt-1 bg-gray-100 p-2 rounded">
                                                        <span className="material-icons text-gray-900"><i className="fa-solid fa-phone"></i></span>
                                                        <input
                                                            type="text"
                                                            value={userData?.data?.phone}
                                                            disabled
                                                            className="ml-2 flex-1 bg-transparent border border-gray-400 rounded-md text-gray-400 focus:outline-none "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Gender */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-white">{t("Giới tính")}</label>
                                                    <div className="flex mt-1 space-x-4">
                                                        <label className="flex items-center">
                                                            <input type="checkbox" name="gender" value="male" className=" h-5 w-5 border border-gray-300 bg-white text-blue-500 focus:ring-blue-500" />
                                                            <span className="ml-2">{t("Nam")}</span>
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input type="checkbox" name="gender" value="female" className=" h-5 w-5 border border-gray-300 bg-white text-blue-500 focus:ring-blue-500" />
                                                            <span className="ml-2">{t("Nữ")}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                {/* Password */}
                                                <div className="">
                                                    <div>
                                                        <label className="block text-sm font-medium text-white">{t("Mật khẩu")}</label>
                                                        <div className="flex items-center mt-1 bg-gray-100 p-2 rounded">
                                                            <span className="material-icons text-gray-500">
                                                                <i className="fa-solid fa-lock"></i>
                                                            </span>
                                                            {isEditing ? (

                                                                <input
                                                                    type="password"
                                                                    placeholder={t("Mật khẩu hiện tại")}
                                                                    value={currentPassword}
                                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                                    className="ml-2 flex-1 bg-transparent border border-gray-400 rounded-md p-2 text-gray-400 focus:outline-none"
                                                                />
                                                            ) : (
                                                                // Hiển thị ****** khi không chỉnh sửa
                                                                <input
                                                                    type="password"
                                                                    value="*********"
                                                                    disabled
                                                                    className="ml-2 flex-1 bg-transparent border border-gray-400 rounded-md text-gray-400 focus:outline-none"
                                                                />
                                                            )}
                                                            {!isEditing ? (
                                                                // Nút Thay đổi chỉ hiển thị khi không ở chế độ chỉnh sửa
                                                                <button
                                                                    className="ml-2 text-orange-500 text-sm absolute right-36"
                                                                    onClick={handleEditClick}
                                                                >
                                                                    {t("Thay đổi")}
                                                                </button>
                                                            ) : null}
                                                        </div>

                                                        {/* Các trường nhập liệu cho Mật khẩu mới và Xác nhận mật khẩu sẽ hiển thị khi isEditing là true */}
                                                        {isEditing && (
                                                            <div className="mt-4 space-y-3">
                                                                <input
                                                                    type="password"
                                                                    placeholder={t("Mật khẩu mới")}
                                                                    value={newPassword}
                                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                                    className="w-full bg-transparent border border-gray-400 rounded-md p-2 text-gray-400 focus:outline-none"
                                                                />
                                                                <input
                                                                    type="password"
                                                                    placeholder={t("Xác nhận mật khẩu")}
                                                                    value={confirmNewPassword}
                                                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                                    className="w-full bg-transparent border border-gray-400 rounded-md p-2 text-gray-400 focus:outline-none"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>



                                            {/* Update Button */}
                                            <div className="flex justify-end">
                                                <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded shadow hover:bg-orange-600" onClick={handleSave}>
                                                    {t("Cập nhập")}
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                )}
                                {activeTab === 'history' &&
                                    <div className=" shadow-sm overflow-hidden">
                                        <div className='flex bg-slate-100 rounded-sm mb-3'>
                                            <div className="w-2/12">
                                                <img
                                                    src="https://cdn.galaxycine.vn/media/2024/10/10/tee-yod-2-500_1728531355521.jpg"
                                                    alt="Movie Poster"
                                                    className="w-auto  m-auto p-2 "
                                                />
                                            </div>
                                            <div className="p-4 w-10/12">
                                                <h3 className="text-lg text-gray-800 font-semibold">Quỷ Ăn Tạng Phần 2</h3>
                                                <div className="mt-2 flex items-center">
                                                    <span className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">2D PHÙ ĐỀ</span>
                                                    <span className="bg-orange-600 text-white px-2 py-1 rounded">C13</span>
                                                </div>
                                                <div className="mt-2 text-gray-600">Galaxy Mipec Long Biên - Rạp 3</div>
                                                <div className="mt-1 text-gray-500"><span>14:15 - Chủ Nhật</span>, <span>13/12/2020</span></div>
                                            </div>
                                        </div>
                                        <div className='flex bg-slate-100 rounded-sm mb-3'>
                                            <div className="w-2/12">
                                                <img
                                                    src="https://cdn.galaxycine.vn/media/2024/10/10/tee-yod-2-500_1728531355521.jpg"
                                                    alt="Movie Poster"
                                                    className="w-auto  m-auto p-2 "
                                                />
                                            </div>
                                            <div className="p-4 w-10/12">
                                                <h3 className="text-lg text-gray-800 font-semibold">Quỷ Ăn Tạng Phần 2</h3>
                                                <div className="mt-2 flex items-center">
                                                    <span className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">2D PHÙ ĐỀ</span>
                                                    <span className="bg-orange-600 text-white px-2 py-1 rounded">C13</span>
                                                </div>
                                                <div className="mt-2 text-gray-600">Galaxy Mipec Long Biên - Rạp 3</div>
                                                <div className="mt-1 text-gray-500"><span>14:15 - Chủ Nhật</span>, <span>13/12/2020</span></div>
                                            </div>
                                        </div>
                                    </div>

                                }
                                {activeTab === 'whislist' && <div>Yêu thích của bạn</div>}
                                {activeTab === 'Notification' && <div>Thông báo</div>}
                                {activeTab === 'out' && <div>Đăng xuất ra ngoài</div>}
                            </div>
                        ) : (
                            <p>{t("Không tìm thấy thông tin người dùng.")}</p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
