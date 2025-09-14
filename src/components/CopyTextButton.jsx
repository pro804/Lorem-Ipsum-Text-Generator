const CopyTextButton = ({ isCopied, copyText }) => {
  return (
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
  );
};

export default CopyTextButton;
