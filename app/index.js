import { Telegraf } from 'telegraf'
import {answerData, answerParser} from './answers.js';
import dotenv from 'dotenv';

dotenv.config()


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('ola! eu sou o Falante.')) // display Welcome text when we start bot
bot.hears('falante', (ctx) => ctx.reply('Diga')) // listen and handle when user type hi text

bot.on('text', (ctx) => {  

  const text = (ctx.message.text).toLocaleLowerCase();

  if (text.search("falante") !== -1) {

    if (findWords(["oi", "olá", "bom dia", "boa tade", "boa noite", "fala"])) {
      ctx.reply(randomIntroHandler(user))
      return
    }

    if (text.search("verdade") !== -1 || text.search("mentira") !== -1 ) {
      ctx.reply(Math.random() < 0.5 ? "verdade!" : "mentira!")
      return
    }

    if (text.search("dolar") !== -1) {
      ctx.reply("https://www.xe.com/currencycharts/?from=USD&to=BRL")
      return
    }   

    const user = ctx.message.from.first_name;
    
    ctx.reply(randomAnswerHandler(user))
  }   else {
    const r = Math.random()
    if (r <= 0.1) {
      ctx.reply(randomInteractions())
    }
    
  }
  
})

const findWords = (words, text) => {
  words.forEach(element => {
    if (text.search(element) !== -1) {
      return true
    }
  });

  return false;
}

const pickOne = (array)=>array[Math.floor(Math.random() * array.length)];

const randomInteractions = (userName)=>{
  const answ = pickOne(answerData.randomInteractions);
  console.log({user: userName}) 
  return answerParser(answ, {name: userName})
}

const randomAnswerHandler = (userName)=>{   
  const answ = pickOne(answerData.ansers); 
  return answerParser(answ, {name: userName})
}

const randomIntroHandler = (userName)=>{   
  const answ = pickOne(answerData.intros); 
  return answerParser(answ, {name: userName})
}

const greeting = (hora) => {
  switch (hora) {
      case 7:
        ctx.reply("Bom dia!!")
          break;
      case 18:
        ctx.reply("Boa tardee!")
          break;
      case 21:
        ctx.reply("Boa noite!")
          break;

      default:
          break;
  }
}
const politeTime = (greeting) => {
  (function loop() {
      var now = new Date();
      console.log(now.getHours())
      if (now.getHours() === 7 || now.getHours() === 18 || now.getHours() === 21) {
          greeting(now.getHours());
      }
      now = new Date();
      const interval = 60 * 60000
      var delay = interval - (now % interval);        
      setTimeout(loop, delay);
  })();
}

politeTime(greeting)



bot.launch() // start

//console.log(answerParser('my name is {{name}} and age is {{age}}', {name: 'Tom', age:100}));
console.log("Opa! Falante saindo da tumba...")
console.warn("se fechar essa janela eu morro.")

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))