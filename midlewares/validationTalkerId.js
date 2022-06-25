const { readTalkers } = require('../services');

// Requisito 02

const validationTalkerId = async (req, res) => {
  const { id } = req.params;
  try {
    const talkerId = await readTalkers();
  
    if (talkerId) {
      const person = talkerId.find((element) => element.id === Number(id));
      
      if (person) return res.status(200).json(person);
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (error) {
      console.error('Erro na requisição');
  }
};

module.exports = { validationTalkerId };

// ---------- REFERÊNCIAS ----------
// Base para resolução do requisito retirada do conteúdo sobre Parâmetros de rota do dia 22.4
// try/catch retirado do conteúdo sobre aync/await do dia 22.2
