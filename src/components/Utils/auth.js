import jwtDecode from "jwt-decode";

export const getUserByIdFormToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const decoded = jwtDecode(token)
        return decoded.userId;
    } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
        return null;
    }
}