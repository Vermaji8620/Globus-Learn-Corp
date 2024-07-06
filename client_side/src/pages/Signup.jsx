import { Link } from "react-router-dom";
import signup from "../assets/signup.jpg";

const Signup = () => {
  return (
    <div className="w-full flex">
      <div className="w-1/2  m-10 flex justify-center">
        <div className="w-[80%]">
          <img src={signup} className="rounded-[50px]" alt="" />
        </div>
      </div>
      <div className="w-1/2 ">
        <div className="w-[90%] bg-white rounded-[50px] flex flex-col gap-10 m-10 p-32">
          <div className="text-center font-bold">Sign Up</div>
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="font-bold">
              Name
            </label>
            <input
              type="text"
              className="border border-gray-400 p-3 rounded-lg"
              placeholder="Enter your name"
            />
          </div>
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
            <button className="text-white">Sign Up</button>
          </div>
          <div className=" text-center font-bold">
            <p>
              Have an account?{" "}
              <Link to={"/login"} className="text-violet-700">
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
