'use srtict'

let bigText = 
`В диалоге учавствует Собеседник1 (С1) и Собеседник2 (С2).
С1: 'Привет';
С2: 'Hello';
С1: 'Давай писать регулярку, которая заменит все одинарные кавчки в нашем диалоге на двойные';
С2: 'let's go!';
С1: 'В твоем предложении есть кавычка внутри кавычек. Нужно это учесть';
С2: 'I'm understand it';  
С1: 'А что, если написать так: z'z'z'z'...';
С2: 'I think we can solve it';  
С1: 'Приступим!';
С2: 'OK';`;

let re = /'(.*)'/g;
let newBigText = bigText.replace(re, '"$1"');
console.log(newBigText);

console.log(newBigText);