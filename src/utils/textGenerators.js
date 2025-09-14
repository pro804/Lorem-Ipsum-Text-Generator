import data from "../data";

export const textGenerators = {
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
