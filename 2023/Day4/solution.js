// --- Day 4: Scratchcards ---
const { input } = require("./input.js");
let total = 0;
input.split("\n").forEach((line, lineIndex) => {
    const numerosString = line.split(":")[1].trim().replace(/[|\s]+/g, ',');
    const numerosArray = numerosString.split(',').map(Number);
    console.log(numerosArray);
    const contagemNumeros = {};

    numerosArray.forEach((numero) => {
        contagemNumeros[numero] = (contagemNumeros[numero] || 0) + 1;
    });
    
    const quantidadeParesRepetidos = Object.values(contagemNumeros).reduce((total, contagem) => {
        return total + Math.floor(contagem / 2);
    }, 0);
    
    if(quantidadeParesRepetidos > 0)
    {
        total += 2 ** (quantidadeParesRepetidos - 1);
    }
        
});

console.log(`Result part 1: ${total}`);
 