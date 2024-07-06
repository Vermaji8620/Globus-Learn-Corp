import { Link, useNavigate } from "react-router-dom";
import signup from "../assets/signup.jpg";
import { useEffect, useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [nameState, setNameState] = useState("");
  const [emailstate, setEmailstate] = useState("");
  const [passwordstate, setPasswordstate] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      navigate("/");
    }
  }, [navigate]);
  const submitfunc = async (e) => {
    e.preventDefault();
    try {
      const signupsent = await fetch("/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameState,
          email: emailstate,
          password: passwordstate,
        }),
      });
      setNameState("");
      setEmailstate("");
      setPasswordstate("");
      navigate("/");
      const res = await signupsent.json();
      localStorage.setItem("id", res.user._id);
      console.log("Signup Sent", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="w-full flex">
      <div className="w-1/2  m-10 flex justify-center">
        <div className="w-[80%]">
          <img src={signup} className="rounded-[50px]" alt="" />
        </div>
      </div>
      <div className="w-1/2 ">
        <form
          onSubmit={submitfunc}
          className="w-[90%] bg-white rounded-[50px] flex flex-col gap-10 m-10 p-32"
        >
          <div className="text-center font-bold">Sign Up</div>
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="font-bold">
              Name
            </label>
            <input
              type="text"
              value={nameState}
              className="border border-gray-400 p-3 rounded-lg"
              onChange={(e) => setNameState(e.target.value)}
              placeholder="Enter your name"
              minLength="2"
              required
              pattern="[A-Za-z]+"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="font-bold">
              Email Address
            </label>
            <input
              type="email"
              value={emailstate}
              className="border border-gray-400 p-3 rounded-lg"
              onChange={(e) => setEmailstate(e.target.value)}
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
              className="border border-gray-400 p-3 rounded-lg"
              onChange={(e) => setPasswordstate(e.target.value)}
              placeholder="Enter password"
              minLength="5"
              required
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
        </form>
      </div>
    </div>
  );
};

export default Signup;
