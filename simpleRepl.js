//i have parsed variables from inputString and passed their values to the repl
//to test this, run the file and type "greeting" or "name" into the repl 
//to see the value that was parsed from the inputString

const repl = require("repl");

//the below variable "globalVariable" can be accessed from the repl (and anywhere)
global.globalVariable = "This can be accessed anywhere!";

//however, this is better way of doing it, declare local variables 
//and then expose those to the repl context (below)


// const name = "John Doe";

// const greeting = "whats up";

const Repl = repl.start("custom-repl => ")

// // exposing local variable to repl context
// Repl.context.name = name;
// Repl.context.greeting = greeting;

//i have parsed vars below from an input str, 
//and can access them now in the repl
const regexp = /(const|let|var)\s+\S+\s*=/g;
const str = 'const greeting = "hello"; const name = "john"';

const array = [...str.matchAll(regexp)];

// console.log('array', array);
// prints: [
//     [
//       'greeting =',
//       index: 6,
//       input: 'const greeting = "hello"; const name = "john"',
//       groups: undefined
//     ],
//     [
//       'name =',
//       index: 32,
//       input: 'const greeting = "hello"; const name = "john"',
//       groups: undefined
//     ]
//   ]

const variables = array.map(variable => {
    let cleaned = variable[0].replace(/(const|let|var)\s+/, "");
    let collected = cleaned.slice(0, cleaned.length-2)
    return collected;
})

const regexp2 = /=\s\S+/g;
const array2 = [...str.matchAll(regexp2)];

const values = array2.map(value => {
    let untrimmed = value[0]
    const regexp = /"\S+"/g;
    let trimmed = untrimmed.match(regexp)
    const final = trimmed[0].slice(1, trimmed[0].length - 1)
    return final;
})
//now i have an arr of variables and a corresponding arr of values
variables.forEach((variable, index) => {
    Repl.context[variable] = values[index];
})
