import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { textGenerators } from "./utils/textGenerators";
import Form from "./components/Form";

const App = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState([]);
  const [type, setType] = useState("paragraphs");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let amount = parseInt(count);
    setTimeout(() => {
      setText(textGenerators[type](amount));
      setIsLoading(false);
      setIsCopied(false);
    }, 500);
  };

  const copyText = async () => {
    let textToCopy = "";
    if (type === "words") {
      textToCopy = text.join(" ");
    } else if (type === "sentences") {
      textToCopy = text.map((item) => item + ".").join("\n\n");
    } else {
      textToCopy = text.join("\n\n");
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.log("Failed to copy text: ", error);
    }
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
        {text.length > 0 && (
          <div className="copy-container">
            <button
              className={`btn copy-btn ${isCopied ? "copied" : ""}`}
              onClick={copyText}
              disabled={isCopied}
              aria-live="polite"
              aria-label={
                isCopied ? "Text copied to clipboard" : "Copy text to clipboard"
              }
            >
              {isCopied ? "Copied!" : "Copy Text"}
            </button>
          </div>
        )}
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
