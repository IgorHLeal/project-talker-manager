const fs = require('fs').promises;
const { readTalkers } = require('../services');

// Requisito 07
const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talker = await readTalkers();
  const findTalker = talker.findIndex((elem) => elem.id === +id);
  await fs.writeFile('talker.json', JSON.stringify(findTalker));

  talker.splice(findTalker);
  res.status(204).end();
};

module.exports = { deleteTalker };

// ---------- REFERÊNCIAS ----------

// Para realizar este requisito foi usada a lógica do exemplo sobre delete do dia 22.4 sobre atualizar e deletar objetos através da API

// findIndex: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
// splice: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
