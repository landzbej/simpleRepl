const repl = require("repl");

//the below variable "globalVariable" can be accessed from the repl (and anywhere)
global.globalVariable = "This can be accessed anywhere!";

//however, this is better way of doing it, declare local variables 
//and then expose those to the repl context (below)
const name = "John Doe";

const greeting = "whats up";

const Repl = repl.start("custom-repl => ")

// exposing local variable to repl context
Repl.context.name = name;
Repl.context.greeting = greeting;
