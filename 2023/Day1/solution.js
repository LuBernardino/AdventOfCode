// --- Day 1: Trebuchet?! ---
const { input } = require("./input.js");

function isNumber(char) {
  return /^\d$/.test(char);
}

const digitAsText = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let p1Result = [];
let p2Result = [];
let p1Total = 0;
let p2Total = 0;
input.split("\n").forEach((line) => {
  line.split("").forEach((character, characterIndex) => {
    if (isNumber(character)) {
      let characterNumber = Number(character);
      p1Result.push(characterNumber);
      p2Result.push(characterNumber);
    }
    digitAsText.forEach((digit, digitIndex) => {
      if (line.substring(characterIndex).startsWith(digit)) {
        p2Result.push(digitIndex + 1);
      }
    });
  });

  p1Total += Number(`${p1Result[0]}${p1Result[p1Result.length - 1]}`);
  p2Total += Number(`${p2Result[0]}${p2Result[p2Result.length - 1]}`);

  p1Result = [];
  p2Result = [];
});

console.log(`Result part 1: ${p1Total} | Result part 2: ${p2Total}`);