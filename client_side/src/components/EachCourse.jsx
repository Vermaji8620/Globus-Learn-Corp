import logofromcourse from "../assets/logoforcourse.jpg";

const EachCourse = () => {
  return (
    <div className="bg-white w-[25%] cursor-pointer rounded-lg p-2 flex flex-col gap-6">
      <img src={logofromcourse} className="" alt="" />
      <p className="text-center font-bold">Name of the course</p>
      <p className="text-center">Description of the course</p>
      <div className="flex justify-between">
        <div className="text-center font-bold">Price</div>
        <div className="text-center font-bold">Rating</div>
      </div>
    </div>
  );
};

export default EachCourse;
