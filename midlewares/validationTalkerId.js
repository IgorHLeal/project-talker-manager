const fs = require('fs').promises;

const { readTalkers } = require('../services');

const writeTalkerId = async (req, res) => {
  const { name, age, talk } = req.body;
    const talkers = await readTalkers();
    const id = talkers.length + 1;
    const newTalker = { name, age, talk, id };
    talkers.push(newTalker);
    await fs.writeFile('talker.json', JSON.stringify(talkers));
    res.status(200).json(newTalker);
};

module.exports = { 
  writeTalkerId,
};

// ---------- REFERẼNCIAS ----------

// moment: https://momentjs.com/docs/
