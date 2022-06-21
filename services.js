const fs = require('fs').promises;

// Requisito 01
const readTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const response = JSON.parse(talkers);
  return response;
};

module.exports = { readTalkers };
