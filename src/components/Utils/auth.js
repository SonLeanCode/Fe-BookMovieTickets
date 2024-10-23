import {jwtDecode} from "jwt-decode";

export const getUserByIdFormToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
        const decoded = jwtDecode(token)
        console.log(decoded)
        return decoded.userId;
    } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
        return null;
    }
}