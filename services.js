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

module.exports = { 
  readTalkers,
  randomToken,
};

// ---------- REFERÊNCIAS ----------
// crypto.randomBytes: https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
// require crypto: https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
// toString('hex): https://stackoverflow.com/questions/55104802/nodejs-crypto-randombytes-to-string-hex-doubling-size
