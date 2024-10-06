import { Button } from "react-daisyui"
import { Link } from "react-router-dom"

const LandingPage = () => {
    return (
        <div>
            <div className="text-3xl text-red-500">LandingPage</div>
            <Link to="/auth/login">
                <Button className="mt-[200px] ml-[700px] bg-blue-600 text-white p-2 rounded-xl">Đăng nhập</Button>
            </Link>
        </div>
        
    )
}

export default LandingPage