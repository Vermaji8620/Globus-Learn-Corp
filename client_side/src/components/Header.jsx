import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logoutfunc = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/user/${localStorage.getItem("id")}`, {
        method: "POST",
      });
      navigate("/");
      localStorage.removeItem("id");
    } catch (err) {
      console.log(err);
    }
  };

  const location = useLocation();
  return (
    <div className="w-full flex justify-end p-3 bg-[#c895c8ec]">
      <div className="w-1/2">
        <Link to="/">
          <img src={logo} className="w-[100px] rounded-[50px]" alt="" />
        </Link>
      </div>
      <div
        className={`w-1/2 ${
          localStorage.getItem("id") ? "hidden" : ""
        } justify-end gap-24 items-center flex`}
      >
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
      <div
        className={`w-1/2 ${
          localStorage.getItem("id") ? "" : "hidden"
        } justify-end gap-24 items-center flex`}
      >
        <Link
          to="/"
          onClick={logoutfunc}
          className={`text-lg ${
            location.pathname === "/signup" ? "underline" : ""
          } w-fit font-semibold text-[#fff]`}
        >
          LogOut
        </Link>
      </div>
    </div>
  );
};

export default Header;
