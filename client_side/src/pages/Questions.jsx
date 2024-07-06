import { useNavigate, useParams } from "react-router-dom";
import logofrocourse from "../assets/logoforcourse.jpg";
import EachQuestion from "../components/EachQuestion";
import { useEffect, useState } from "react";

const Questions = () => {
  const navigate = useNavigate();
  const [questionsarray, setQuestionsarray] = useState([]);
  const [specificCourse, setSpecificCourse] = useState({});
  const [answers, setAnswers] = useState({});
  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };
  const submitquestionform = async (e) => {
    e.preventDefault();
    console.log(answers);
    const userId = localStorage.getItem("id");
    for (const [questionId, answer] of Object.entries(answers)) {
      try {
        const payload = {
          text: answer,
          questionId,
          userId,
        };
        const data = await fetch("/answer/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const res = await data.json();
        console.log(res);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("id")) navigate("/login");
  }, [navigate]);
  const { courseId } = useParams();
  useEffect(() => {
    (async () => {
      const data = await fetch("/question/getquestions/" + courseId);
      const res = await data.json();
      setQuestionsarray(res);
      const coursedata = await fetch("/course/getcourse/" + courseId);
      const courseres = await coursedata.json();
      setSpecificCourse(courseres.course);
    })();
  }, [navigate, courseId]);
  return (
    <div className="w-full flex">
      <div className="w-1/2  m-10 flex justify-center">
        <div className="flex flex-col gap-6">
          <img src={logofrocourse} className="rounded-[50px]" alt="" />
          <div className="pt-10 pl-6 bg-white rounded-[20px] pb-6 gap-6 flex-col flex">
            <p>
              <span className="font-bold">Name of the course</span> -{" "}
              {specificCourse.name}
            </p>
            <p>
              <span className="font-bold">Description of the course</span> -{" "}
              {specificCourse.description}
            </p>
            <p>
              <span className="font-bold">By</span> - {specificCourse.teacher}
            </p>
            <p>
              <span className="font-bold">Price</span> - ${specificCourse.price}
            </p>
            <p>
              <span className="font-bold">Rating</span> -{" "}
              {specificCourse.rating}
            </p>
            <p>
              <span className="font-bold">Duration</span> -{" "}
              {specificCourse.durationInHours}
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 ">
        <div className="w-[90%] bg-white rounded-[50px] flex flex-col gap-10 m-10 p-32">
          <div className="text-center font-bold text-3xl">Question Bank</div>

          {questionsarray.map((question) => (
            <EachQuestion
              key={question._id}
              text={question.text}
              questionId={question._id}
              onInputChange={handleInputChange}
            />
          ))}

          <div
            onClick={submitquestionform}
            className="bg-violet-700 p-3 rounded-md"
          >
            <button className="text-white text-xl font-bold">SUBMIT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
