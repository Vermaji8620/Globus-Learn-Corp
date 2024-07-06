import { Link } from "react-router-dom";
import login from "../assets/login.jpg";

const Login = () => {
  return (
    <div className="w-full flex">
      <div className="w-1/2  m-10 flex justify-center">
        <div className="w-[80%]">
          <img src={login} className="rounded-[50px]" alt="" />
        </div>
      </div>
      <div className="w-1/2 ">
        <div className="w-[90%] bg-white rounded-[50px] flex flex-col gap-10 m-10 p-44">
          <div className="text-center font-bold">Log In</div>
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="font-bold">
              Email Address
            </label>
            <input
              type="text"
              className="border border-gray-400 p-3 rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="font-bold">
              {" "}
              Password
            </label>
            <input
              type="text"
              className="border border-gray-400 p-3 rounded-lg"
              placeholder="Enter password"
            />
          </div>

          <div className="bg-violet-700 p-3 rounded-md">
            <button className="text-white">Log In</button>
          </div>
          <div className=" text-center font-bold">
            <p>
              Dont have an account?{" "}
              <Link to={"/signup"} className="text-violet-700">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
