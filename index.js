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

const pickOne = (array)=>array[Math.floor(Math.random() * array.length)];

const randomInteractions = (userName)=>{
  const answ = pickOne(answerData.randomInteractions); 
  return answerParser(answ, {user: userName})
}

const randomAnswerHandler = (userName)=>{   
  const answ = pickOne(answerData.ansers); 
  return answerParser(answ, {user: userName})
}

bot.launch() // start

//console.log(answerParser('my name is {{name}} and age is {{age}}', {name: 'Tom', age:100}));
console.log("Opa! Falante saindo da tumba...")
console.warn("se fechar essa janela eu morro.")

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))