// --- Day 2: Cube Conundrum ---
const { input } = require("./input.js");

let control = {"red": 12, "green": 13, "blue": 14};
let p1Total = 0;
let p2Total = 0;

input.split("\n").forEach((line, lineIndex) => {
    let controlLine = { "red": 0, "green": 0, "blue": 0 };
    let isValid = true;
    line.split(":")[1].trim().replaceAll(";", ",").split(",").forEach((cube) => {
        cube = cube.trim();        

        Object.entries(control).forEach((color) => {
            const [colorText, colorLimit] = color;
            if (cube.includes(colorText)) {
                const value = Number(cube.replace(colorText, "").trim());

                // part 1
                if(value > colorLimit)
                    isValid = false;  

                // part 2
                if (value > controlLine[colorText])
                    controlLine[colorText] = value;
            }
        });
    }); 

    if(isValid)
     p1Total += lineIndex + 1;

    const totalLine = Object.entries(controlLine).reduce((accumulator, currentValue) => accumulator * currentValue[1], 1);
    p2Total += totalLine;
});

console.log(`Result part 1: ${p1Total} | Result part 2: ${p2Total}`);

