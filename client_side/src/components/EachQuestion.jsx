import PropTypes from "prop-types";

const EachQuestion = ({ text, questionId, onInputChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="" className="font-bold">
        {text}
      </label>
      <input
        type="text"
        className="border border-gray-400 p-3 rounded-lg"
        onChange={(e) => onInputChange(questionId, e.target.value)}
        placeholder="Enter your answer"
      />
    </div>
  );
};

EachQuestion.propTypes = {
  text: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default EachQuestion;
