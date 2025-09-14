const Form = ({ type, setType, count, setCount, isLoading }) => {
  return (
    <form className="lorem-form">
      <label htmlFor="amount">
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          className="select-container"
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
      </label>
      <input
        type="number"
        name="amount"
        id="amount"
        min="1"
        max={type === "paragraphs" ? "9" : "30"}
        step="1"
        value={count}
        onChange={(e) => {
          setCount(e.target.value);
        }}
      />
      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
};

export default Form;
