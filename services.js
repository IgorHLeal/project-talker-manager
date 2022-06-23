const fs = require('fs').promises;
const crypto = require('crypto');

// Requisito 01
const readTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const response = JSON.parse(talkers);
  return response;
};

// Requisito 3
const randomToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

// Requisito 4
const validLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  const emailRegex = /\S+@\S+\.\S+/;
  const validEmail = emailRegex.test(email);
  if (!validEmail) {
    return res.status(400).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    ); 
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json(
        { message: 'O "password" deve ter pelo menos 6 caracteres' },
      ); 
  }
  next();
};

module.exports = { 
  readTalkers,
  randomToken,
  validLogin,
};

// ---------- REFERÊNCIAS ----------
// crypto.randomBytes: https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
// require crypto: https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
// toString('hex): https://stackoverflow.com/questions/55104802/nodejs-crypto-randombytes-to-string-hex-doubling-size

// Regex: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
// .test: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
