import { Link } from "react-router-dom";
import logofromcourse from "../assets/logoforcourse.jpg";

import PropTypes from "prop-types";

const EachCourse = ({
  name,
  description,
  price,
  rating,
  teacher,
  durationInHours,
  questions,
  id,
}) => {
  return (
    <div className="bg-white w-[25%] cursor-pointer rounded-lg p-2 flex flex-col gap-6">
      <img src={logofromcourse} className="" alt="" />
      <p className="text-center font-bold">{name}</p>
      <p className="text-center">{description}</p>
      <div className="flex justify-between">
        <div className="text-center font-bold">${price}</div>
        <div className="text-center font-bold">{rating}</div>
      </div>
      <Link to={`/quizlist/${id}`} className="text-center text-green-500 font-bold">
        Go to the questions
      </Link>
    </div>
  );
};

EachCourse.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  teacher: PropTypes.string.isRequired,
  durationInHours: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default EachCourse;
