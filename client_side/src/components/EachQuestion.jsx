import PropTypes from "prop-types";

const EachQuestion = ({ text }) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="" className="font-bold">
        {text}
      </label>
      <input
        type="text"
        className="border border-gray-400 p-3 rounded-lg"
        placeholder="Enter your answer"
      />
    </div>
  );
};

EachQuestion.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EachQuestion;
