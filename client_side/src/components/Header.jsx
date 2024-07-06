import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div className="w-full flex justify-end p-5 bg-[#c895c8ec]">
      <div className="w-1/2">
        <Link to="/">
          <img src={logo} className="w-[100px] rounded-[50px]" alt="" />
        </Link>
      </div>
      <div className="w-1/2 justify-end gap-24 items-center flex">
        <Link
          to="/login"
          className={`text-lg ${
            location.pathname === "/login" ? "underline" : ""
          } w-fit font-semibold text-[#fff]`}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={`text-lg ${
            location.pathname === "/signup" ? "underline" : ""
          } w-fit font-semibold text-[#fff]`}
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Header;
