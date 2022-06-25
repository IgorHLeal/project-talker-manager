const { readTalkers } = require('../services');

// Requisito 01
const validationTalker = async (_req, res) => {
  const talker = await readTalkers();

  if (talker) {
    res.status(200).json(talker);
  }
};

module.exports = { validationTalker };

// ---------- REFERÊNCIAS ----------
// Base para resolução do requisito retirada do dia 22.4
