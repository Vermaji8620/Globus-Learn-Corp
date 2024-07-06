import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import login from "../assets/login.jpg";

const Login = () => {
  const [emailstate, setEmailstate] = useState("");
  const [passwordstate, setPasswordstate] = useState("");
  const navigate  = useNavigate();
  const submitfunc = async (e) => {
    e.preventDefault();
    try {
      const loginsent = await fetch("/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailstate,
          password: passwordstate,
        }),
      });
      const res = await loginsent.json();
      localStorage.setItem("id", res.user._id);
      console.log("Login Sent", res);
      setEmailstate("");
      setPasswordstate("");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Submitted");
  };
  return (
    <div className="w-full flex">
      <div className="w-1/2  m-10 flex justify-center">
        <div className="w-[80%]">
          <img src={login} className="rounded-[50px]" alt="" />
        </div>
      </div>
      <div className="w-1/2 ">
        <form
          onSubmit={submitfunc}
          className="w-[90%] bg-white rounded-[50px] flex flex-col gap-10 m-10 p-44"
        >
          <div className="text-center font-bold">Log In</div>
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="font-bold">
              Email Address
            </label>
            <input
              type="email"
              value={emailstate}
              onChange={(e) => setEmailstate(e.target.value)}
              className="border border-gray-400 p-3 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="font-bold">
              Password
            </label>
            <input
              type="password"
              value={passwordstate}
              onChange={(e) => setPasswordstate(e.target.value)}
              className="border border-gray-400 p-3 rounded-lg"
              placeholder="Enter password"
              minLength="5"
              required
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
        </form>
      </div>
    </div>
  );
};

export default Login;
