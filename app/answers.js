export const answerData = {
    ansers: [
      "Já ouvi falar sobre isso {{name}}",
      "{{name}}, já falei que vai dar merda isso!",
      "Eu que te pergunto.",
      "já vi acontecer uma vez com um chimpanzé e um anão.",
      "sonhei com isso.",
      "Não quero saber, palmeiras não tem copinha e nem mundial.",
      "melhor isso não sair daqui em...",
      "depende",
      "onde já se viu!",
      "com certeza",
      "That's right mother fucker",
      "Say my name!",
      "essa fera meu"  
    ],
    randomInteractions: 
      [
        "😂😂😂",
        "aheuaheuaheuah",
        "kkkk", 
        "🧐",
        "😬",
        "🤦🏻‍♂️"
      ],
    intros: [
      "e aí fera?",
      "Firmeza {{name}}.",
      "fala {{name}}...",
      "Não to bom hoje {{name}}",
      "Suave {{name}}"
    ]
}

export const answerParser = (expression, valueObj) => {
 
  const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
  let text = expression.replace(templateMatcher, (substring, value, index) => {       
    value = valueObj[value.toString()];
    return value;
  });
  return text
}