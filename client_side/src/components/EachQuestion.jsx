const EachQuestion = () => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="" className="font-bold">
        Question
      </label>
      <input
        type="text"
        className="border border-gray-400 p-3 rounded-lg"
        placeholder="Enter your answer"
      />
    </div>
  );
};

export default EachQuestion;
