// --- Day 4: Scratchcards ---
const { input } = require("./input.js");
let total1 = 0;

let inputs = input.split("\n");
let instances = Array.from({ length: inputs.length }, () => 1);

for (let lineIndex = 0; lineIndex < inputs.length; lineIndex++) {
  const line = inputs[lineIndex];
  const [cardId, cardsValues] = line.split(":");
  let [_, id] = cardId.split("Card");
  id = Number(id.trim());
  const cardsStringsValues = cardsValues.trim().replace(/[|\s]+/g, ",");
  const cardsNumberValues = cardsStringsValues.split(",").map(Number);
  const numbersCount = {};

  cardsNumberValues.forEach((value) => {
    numbersCount[value] = (numbersCount[value] || 0) + 1;
  });

  const quantityRepeatedPairs = Object.values(numbersCount).reduce(
    (total, count) => {
      return total + Math.floor(count / 2);
    },
    0
  );

  if (quantityRepeatedPairs > 0) {
    if (lineIndex < inputs.length) total1 += 2 ** (quantityRepeatedPairs - 1);
  }

  for (let i = 0; i < quantityRepeatedPairs; i++) {
    if (id + i < instances.length)
      instances[id + i] = instances[id + i] + instances[id - 1];
  }
}

const total2 = instances.reduce((total, instance) => total + instance, 0);
console.log(`Result part 1: ${total1} | Result part 2: ${total2}`);
