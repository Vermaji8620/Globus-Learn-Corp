import { useEffect, useState } from "react";
import girl from "../assets/girl.png";
import EachCourse from "../components/EachCourse";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [coursearray, setCoursearray] = useState([]);
  useEffect(() => {
    try {
      (async () => {
        const data = await fetch("/course/getcourse");
        const res = await data.json();
        setCoursearray(res.courses);
      })();
    } catch (error) {
      console.log(error.message);
    }
  }, [navigate]);
  return (
    <div className="border border-red-400">
      <div className="bg-white flex ">
        <div className="w-1/2 flex justify-center items-center">
          <div className="m-40 flex flex-col gap-10">
            <h1 className="text-7xl font-bold">
              Explore Our <span className="text-violet-600">Courses</span>
            </h1>
            <h1 className="text-2xl font-bold">
              They are one of the best in the world
            </h1>
          </div>
        </div>
        <div className="w-1/2">
          <img src={girl} className="w-[70%]" alt="" />
        </div>
      </div>
      <h1 className="text-center font-bold pt-10 text-7xl text-white">
        OUR COURSES
      </h1>
      <div className="flex flex-wrap gap-24 w-[80%] mx-auto pt-16">
        {coursearray.map((course) => {
          return (
            <EachCourse
              key={course._id}
              name={course.name}
              description={course.description}
              price={course.price}
              rating={course.rating}
              teacher={course.teacher}
              durationInHours={course.durationInHours}
              questions={course.questions}
              id={course._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
