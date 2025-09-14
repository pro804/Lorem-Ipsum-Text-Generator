import { useEffect, useState } from "react";
import data from "../src/data";
import { nanoid } from "nanoid";

const textGenerators = {
  paragraphs: (amount) => data.slice(0, amount),
  sentences: (amount) => {
    const allSentences = data.flatMap((paragraph) =>
      paragraph.split(". ").filter((sentence) => sentence.length > 0)
    );
    return allSentences.slice(0, amount);
  },
  words: (amount) => {
    const allWords = data.flatMap((paragraph) => paragraph.split(" "));
    return allWords.slice(0, amount);
  },
};

const App = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState([]);
  const [type, setType] = useState("paragraphs");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let amount = parseInt(count);
    setTimeout(() => {
      setText(textGenerators[type](amount));
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    setText([]);
  }, [type]);

  return (
    <section className="section-center" onSubmit={handleSubmit}>
      <h4>tired of boring lorem ipsum?</h4>
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
      <article className="lorem-text">
        {type === "words" ? (
          <p>{text.join(" ")}</p>
        ) : (
          text.map((item) => {
            const id = nanoid();
            if (type === "sentences") {
              return <p key={id}>{item}.</p>;
            } else {
              return <p key={id}>{item}</p>;
            }
          })
        )}
      </article>
    </section>
  );
};

export default App;
