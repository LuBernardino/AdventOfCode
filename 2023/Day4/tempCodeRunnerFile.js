        const resultado = numbers.filter((value, indice) =>  {
            if(numbers.indexOf(value) != numbers.lastIndexOf(value)){
                return value;
            }
            else if (numbers.indexOf(value) ==! numbers.lastIndexOf(value)) {
                return 0;
            }
        });

        console.log(resultado.length);