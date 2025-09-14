import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { textGenerators } from "./utils/textGenerators";
import Form from "./components/Form";

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
      <Form
        type={type}
        setType={setType}
        count={count}
        setCount={setCount}
        isLoading={isLoading}
      />
      <article className="lorem-text">
        {type === "words" && text.length > 0 ? (
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
