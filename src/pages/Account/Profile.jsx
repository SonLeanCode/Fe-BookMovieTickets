import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useGetUserQuery, usePatchUserMutation, usePatchProfileMutation, useUploadAvatarMutation } from '../../services/Auth/auth.service';
import { useGetAllFavouriteQuery } from '../../services/MovieFavourite/moviesFavourite_service'
import { useGetTicketsByUserIdQuery } from '../../services/Ticket/ticket.serviecs'
import { useGetVoucherUserQuery } from "../../services/Voucher/voucher.service"
import { useDeleteVoucherMutation } from "../../services/Voucher/voucher.service"
import {checkVoucherStatus} from "../../utils/formatTimeVoucher"
import Toastify from '../../helper/Toastify';

const Profile = () => {
    const { t } = useTranslation();
    const { userId } = useParams();
    console.log('Uid', userId)
    const { data: userData } = useGetUserQuery(userId)
    const { data: idTicketData, } = useGetTicketsByUserIdQuery(userId)
    console.log('đsff', idTicketData)

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
    const [uploadAvatar] = useUploadAvatarMutation();

    const { data: movieFavourite } = useGetAllFavouriteQuery(userId);
    const { data: codeVoucherUser } = useGetVoucherUserQuery(userId);
    const [ delVoucherUser ] = useDeleteVoucherMutation()

    const codeVoucherUserArray = Array.isArray(codeVoucherUser)
        ? codeVoucherUser
        : codeVoucherUser?.data || [];
    console.log(codeVoucherUserArray)


    const formatDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng. Nhớ cộng 1 vì tháng bắt đầu từ 0
        const year = date.getFullYear(); // Lấy năm

        return `${day}/${month}/${year}`; // Định dạng DD/MM/YYYY
    };


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
            Toastify("Email cập nhập thành công!", 200);
        } catch (err) {
            console.error("Lỗi khi cập nhật:", err);
            Toastify("Email chưa được cập nhập", 400);
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
            Toastify("Cập nhập tất cả thành công!", 200);
        }
        catch (err) {
            console.error("Lỗi khi cập nhật:", err);
            Toastify("Vui lòng cập nhập lại !", 400);
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
                // Hiển thị thông báo thành công
                Toastify("Ảnh đại diện thay đổi thành công!", 200);
            } catch (error) {
                console.error('Error uploading avatar:', error);
                Toastify("Lỗi khi tải ảnh lên. Vui lòng thử lại.", 400);
            }
        }
    };





    const [activeTab, setActiveTab] = useState('profile'); // Set default tab


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    const handleDeleteVoucher = async ({ voucherId }) => {
        console.log('delVou', voucherId);

        if (!voucherId) return;

        try {
            const response = await delVoucherUser(voucherId).unwrap();
            if (response.success) {
                alert('Voucher deleted successfully:', response.message);
            } else {
                console.error('Error deleting voucher:', response.message);
            }
        } catch (error) {
            console.error('Error during delete:', error.message || error);
        }
    }


    return (
        <div className="p-28 px-20 text-white">
            <h1 className="text-3xl pb-4 uppercase font-semibold">{t("Thông tin cá nhân")}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="bg-black p-6 rounded-lg shadow-lg " style={{ boxShadow: '0 4px 20px rgba(255, 255, 255, 0.5)', }} >
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
                    {(idTicketData && idTicketData.tickets && idTicketData.tickets.length > 0) ? (
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-bold">{t("Tổng chi tiêu 2024")}</h1>
                            <div className="text-orange-500 text-xl font-semibold">
                                {idTicketData.tickets.reduce(
                                    (total, ticket) => total + ticket.price,
                                    0
                                ).toLocaleString()} đ
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-bold">{t("Tổng chi tiêu 2024")}</h1>
                            <div className="text-orange-500 text-xl font-semibold">
                                0 đ
                            </div>
                        </div>
                    )}

                    <div className="my-24">
                        <div className="relative m-10">
                            {/* Cột mốc 0 đ */}
                            <div className={`absolute left-0 -top-10 flex flex-col items-center ${idTicketData && idTicketData.tickets.reduce((total, ticket) => total + ticket.price, 0) > 0 ? 'opacity-100' : 'opacity-50'}`}>
                                <img
                                    src="https://www.galaxycine.vn/_next/static/media/bronze.6c2b2f39.png"
                                    alt=""
                                    className="w-5 h-8 mb-5"
                                />
                                <div className="absolute left-0 w-1/3 h-full rounded-full"></div>
                                <span className="text-xs mt-1">0 đ</span>
                            </div>

                            {/* Cột mốc 70.000 đ */}
                            <div className={`absolute left-1/3 transform -translate-x-1/2 -top-12 flex flex-col items-center ${idTicketData && idTicketData.tickets.reduce((total, ticket) => total + ticket.price, 0) >= 70000 ? 'opacity-100' : 'opacity-50'}`}>
                                <img
                                    src="https://www.galaxycine.vn/_next/static/media/silver.6313aa20.png"
                                    alt=""
                                    className="w-7 h-10 mb-5"
                                />
                                <div className="absolute left-1/3 w-2/3 h-full rounded-full"></div>
                                <span className="text-xs mt-1">70.000 đ</span>
                            </div>

                            {/* Cột mốc 100.000 đ */}
                            <div className={`absolute right-0 -top-14 flex flex-col items-center ${idTicketData && idTicketData.tickets.reduce((total, ticket) => total + ticket.price, 0) >= 100000 ? 'opacity-100' : 'opacity-50'}`}>
                                <img
                                    src="https://www.galaxycine.vn/_next/static/media/gold.ff661579.png"
                                    alt=""
                                    className="w-8 h-12 mb-5"
                                />
                                <div className="absolute right-0 w-1/3 h-full rounded-full"></div>
                                <span className="text-xs mt-1">100.000 đ</span>
                            </div>

                            {/* Thanh timeline */}
                            <div className="relative w-full h-2 bg-gray-200 rounded-full">
                                {/* Thanh nền màu xanh di động */}
                                <div
                                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                    style={{
                                        width: `${Math.min(
                                            100, // Đảm bảo không vượt quá 100%
                                            (idTicketData && idTicketData.tickets.reduce(
                                                (total, ticket) => total + ticket.price,
                                                0
                                            ) / 100000) * 100
                                        )}%`, // Phần đã chi tiêu (background color)
                                        transition: 'width 0.5s ease-in-out', // Thêm hiệu ứng chuyển động
                                    }}
                                ></div>

                                {/* Dấu mốc 0 đ */}
                                <div className="absolute left-0 w-3 h-3 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-y-1/2"></div>

                                {/* Dấu mốc 70.000 đ */}
                                <div className="absolute left-1/3 w-3 h-3 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                                {/* Dấu mốc 100.000 đ */}
                                <div className="absolute right-6 w-3 h-3 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-y-1/2"></div>

                                {/* Dấu mốc di động */}
                                <div
                                    className="absolute top-[-5px] w-6 h-6 rounded-full"
                                    style={{
                                        left: `${Math.min(
                                            100,
                                            (idTicketData && idTicketData.tickets.reduce(
                                                (total, ticket) => total + ticket.price,
                                                0
                                            ) / 100000) * 100
                                        )}%`,
                                    }}
                                >
                                    <img
                                        src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-cho-co-nang-nghien-tra-sua.jpg"
                                        alt="Icon milestone"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
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

                    </div>

                </div>
                <div className="col-span-2">
                    <div className="">
                        <ul className="flex flex-row justify-center space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-6 md:mb-0">
                            {['profile', 'history', 'whislist', 'gift'].map((tab) => (
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
                                    <div className=" p-6 bg-black shadow-lg rounded-lg">
                                        <form className="space-y-6">
                                            {/* Name and Date of Birth */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-white">{t("Họ và tên")}</label>
                                                    <div className="flex items-center mt-1 bg-gray-100 rounded">
                                                        <span className="material-icons ml-2 text-gray-900"><i className="fa-solid fa-user"></i></span>
                                                        <input
                                                            type="text"
                                                            value={userData?.data?.fullname}
                                                            disabled
                                                            className=" flex-1 bg-transparent border-hidden  border-gray-400 rounded-md text-gray-400 focus:outline-none "
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-white">{t("Ngày sinh")}</label>
                                                    <div className="flex items-center mt-1 bg-gray-100 rounded">
                                                        <span className="material-icons ml-2 text-gray-900"><i className="fa-regular fa-calendar"></i></span>
                                                        <input
                                                            type="text"
                                                            value={formatDate(userData?.data?.brithDay)}
                                                            disabled
                                                            className="flex-1 bg-transparent border-hidden  border-gray-400 rounded-md text-gray-400 focus:outline-none "
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Email and Phone Number */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-white">{t("Email")}</label>
                                                    <div className="flex items-center mt-1 bg-gray-100 rounded">
                                                        <span className="material-icons ml-2 text-gray-900"><i className="fa-solid fa-envelope"></i></span>
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            disabled={!isEdiEmail}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="flex-1 bg-transparent border-hidden  border-gray-400 rounded-md text-gray-400 focus:outline-none "
                                                        />
                                                        {!isEdiEmail ? (
                                                            <button type="button" className="mr-2 text-orange-500 text-sm" onClick={handleEmailClick}>
                                                                {t("Thay đổi")}
                                                            </button>
                                                        ) : (
                                                            <button type="button" className="mr-2 text-green-500 text-sm" onClick={handleSaveClick}>
                                                                {t("Lưu")}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-white">{t("Điện thoại")}</label>
                                                    <div className="flex items-center mt-1 bg-gray-100 rounded">
                                                        <span className="material-icons ml-2 text-gray-900"><i className="fa-solid fa-phone"></i></span>
                                                        <input
                                                            type="text"
                                                            value={userData?.data?.phone}
                                                            disabled
                                                            className="flex-1 bg-transparent border-hidden  border-gray-400 rounded-md text-gray-400 focus:outline-none "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Gender */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                                {/* Password */}
                                                <div className="">
                                                    <div>
                                                        <label className="block text-sm font-medium text-white">{t("Mật khẩu")}</label>
                                                        <div className="flex items-center mt-1 bg-gray-100 rounded">
                                                            <span className="material-icons ml-2 text-gray-900">
                                                                <i className="fa-solid fa-lock"></i>
                                                            </span>
                                                            {isEditing ? (

                                                                <input
                                                                    type="password"
                                                                    placeholder={t("Mật khẩu hiện tại")}
                                                                    value={currentPassword}
                                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                                    className="ml-2 flex-1 bg-transparent border-hidden border-gray-400 rounded-md p-2 text-gray-400 focus:outline-none"
                                                                />
                                                            ) : (
                                                                // Hiển thị ****** khi không chỉnh sửa
                                                                <input
                                                                    type="password"
                                                                    value="*********"
                                                                    disabled
                                                                    className="flex-1 bg-transparent border-hidden  border-gray-400 rounded-md text-gray-400 focus:outline-none"
                                                                />
                                                            )}
                                                            {!isEditing ? (
                                                                // Nút Thay đổi chỉ hiển thị khi không ở chế độ chỉnh sửa
                                                                <button
                                                                    className="mr-2 text-orange-500 text-sm"
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
                                                                    className="w-full bg-white border border-gray-400 rounded-md p-2 text-gray-400 focus:outline-none"
                                                                />
                                                                <input
                                                                    type="password"
                                                                    placeholder={t("Xác nhận mật khẩu")}
                                                                    value={confirmNewPassword}
                                                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                                    className="w-full bg-white border border-gray-400 rounded-md p-2 text-gray-400 focus:outline-none"
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
                                    <div>
                                        {idTicketData?.tickets?.length > 0 ? (
                                            <div className="shadow-sm overflow-hidden">
                                                {idTicketData.tickets.map((ticket) => (
                                                    <div key={ticket._id} className="flex bg-slate-100 rounded-sm mb-3">
                                                        <div className="w-2/12">
                                                            <img
                                                                src={ticket.showtime_id.movie_id.img || "default_poster_url.jpg"}
                                                                alt={ticket.movieTitle || "Movie Poster"}
                                                                className="w-auto m-auto p-2"
                                                            />
                                                        </div>
                                                        <div className="p-4 w-10/12">
                                                            <h3 className="text-2xl text-red-700 font-semibold">{ticket.name_movie}</h3>
                                                            <div className="mt-2 flex items-center">
                                                                <span className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                                                    {ticket.subtitles}
                                                                </span>
                                                                <span className="bg-orange-600 text-white px-2 py-1 rounded">
                                                                    {ticket.age_limit}
                                                                </span>
                                                            </div>
                                                            <div className="mt-2 font-bold text-black">{ticket.cinema_name}</div>
                                                            <div className="mt-2 text-gray-600">{ticket.address_cinema}</div>
                                                            <div className="mt-2 text-gray-600">Suất chiếu: {ticket.showtime}</div>
                                                            <div className="mt-1 font-bold text-red-600">
                                                                <span>Ghế: {ticket.seat_number}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>Bạn chưa đặt vé.</p>
                                        )}
                                    </div>
                                }
                                {activeTab === 'whislist' && <div >
                                    <div className="text-red-400 font-bold text-lg uppercase">BỘ PHIM YÊU THÍCH </div>
                                    <div className="max-h-[500px] overflow-y-auto">
                                        {movieFavourite && movieFavourite.length > 0 ? (
                                            movieFavourite.map((fav, index) => (
                                                <div className="shadow-sm overflow-hidden mt-2" key={index}>
                                                    <div className="flex bg-slate-100 rounded-sm mb-3">
                                                        <div className="w-2/12">
                                                            <img
                                                                src={fav.movie.img}
                                                                alt={fav.movie.name}
                                                                className="w-auto m-auto p-2"
                                                            />
                                                        </div>
                                                        <div className="p-4 w-10/12">
                                                            <h3 className="text-lg text-gray-800 font-semibold">{fav.movie.name}</h3>
                                                            <div className="mt-2 flex items-center">
                                                                <span className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">{fav.movie.subtitles}</span>
                                                                <span className="bg-orange-600 text-white px-2 py-1 rounded">{fav.movie.country}</span>
                                                            </div>
                                                            <div className="mt-2 text-gray-600 w-[70ch] break-words">
                                                                Ngày phát hành: {new Date(fav.movie.release_date).toLocaleDateString()}
                                                            </div>
                                                            <div className="mt-2 text-gray-600 w-[70ch] break-words">
                                                                Thể loại:{" "}
                                                                {fav.movie.genres.map((genre, index) => (
                                                                    <span key={genre._id}>
                                                                        {genre.name}
                                                                        {index < fav.movie.genres.length - 1 && ", "}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="mt-1 text-gray-500">
                                                                <span>Đạo diễn: {fav.movie.director}</span> - <span>Nhà sản xuất: {fav.movie.producer}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center text-gray-600 mt-10">
                                                Bạn chưa có bộ phim yêu thích nào.
                                            </div>
                                        )}
                                    </div>

                                </div>}
                                {/* gift */}
                                {activeTab === 'gift' && <div>
                                    <div className="text-red-400 font-bold text-lg uppercase">Quà tặng</div>
                                    <div className="max-h-[500px] overflow-y-auto">
                                        {codeVoucherUserArray && codeVoucherUserArray.length > 0 ? (
                                            codeVoucherUserArray.map((voucher, index) => (
                                                <div className="shadow-sm overflow-hidden mt-2" key={index}>
                                                    {voucher.idVoucher && ( // Kiểm tra nếu idVoucher không null
                                                        <div className="flex bg-slate-100 rounded-sm mb-3 relative">
                                                            <div className="w-2/12 relative flex items-center justify-center">
                                                                <img
                                                                    src={voucher.idVoucher?.img}
                                                                    className="w-auto m-auto p-2"
                                                                    alt="Voucher"
                                                                />
                                                            </div>

                                                            <button
                                                                className="absolute top-2 right-2 text-red-500 font-bold uppercase bg-white p-1 rounded-full"
                                                                onClick={() => handleDeleteVoucher({ voucherId: voucher._id })} // Gọi hàm xóa khi nhấn nút
                                                            >
                                                                Xóa
                                                            </button>

                                                            <div className="p-4 w-10/12">
                                                                <div className="mt-1 text-gray-800">
                                                                    <h3 className="font-bold uppercase">Giảm {voucher.idVoucher?.discount_percent}%</h3>
                                                                </div>

                                                                <div className="mt-2 flex items-center">
                                                                    <span className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">{voucher.idVoucher?.name}</span>
                                                                </div>
                                                                <div className="mt-1 text-gray-500">
                                                                    <span>{checkVoucherStatus(voucher.idVoucher?.valid_from,voucher.idVoucher?.valid_until)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                            ))
                                        ) : (
                                            <div className="text-center text-gray-600 mt-10">
                                                Bạn chưa nhận quà tặng.
                                            </div>
                                        )}
                                    </div>

                                </div>}

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
