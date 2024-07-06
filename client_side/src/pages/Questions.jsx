import { Link } from "react-router-dom";
import logofrocourse from "../assets/logoforcourse.jpg";
import EachQuestion from "../components/EachQuestion";

const Questions = () => {
  return (
    <div className="w-full flex">
      <div className="w-1/2  m-10 flex justify-center">
        <div className="flex flex-col gap-6">
          <img src={logofrocourse} className="rounded-[50px]" alt="" />
          <div className="pt-10 pl-6 bg-white rounded-[20px] pb-6 gap-6 flex-col flex">
            <p className="font-bold">Name of the course</p>
            <p className="font-bold">Description of the course</p>
            <p className="font-bold">By - </p>
            <p className="font-bold">$5000</p>
            <p className="font-bold">Rating</p>
            <p className="font-bold">Duration</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 ">
        <div className="w-[90%] bg-white rounded-[50px] flex flex-col gap-10 m-10 p-32">
          <div className="text-center font-bold text-3xl">Question Bank</div>

          <EachQuestion />
          <EachQuestion />
          <EachQuestion />
          <EachQuestion />
          <EachQuestion />
          <EachQuestion />

          <Link to={"/"} className="bg-violet-700 p-3 rounded-md">
            <button className="text-white text-xl font-bold">SUBMIT</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Questions;
