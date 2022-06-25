const fs = require('fs').promises;
const { readTalkers } = require('../services');

const validationTalkerId = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const talkers = await readTalkers();
  const editTalker = talkers.map((talker) => {
    if (talker.id === +id) return { id: +id, name, age, talk };
    return talker;
  });

  const newTalker = editTalker.find((talker) => talker.id === +id);

  await fs.writeFile('talker.json', JSON.stringify(editTalker));
  res.status(200).json(newTalker);
};

module.exports = { validationTalkerId };
