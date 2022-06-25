const moment = require('moment');

const validationWatched = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!moment(watchedAt, 'DD/MM/YYYY', true).isValid()) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = { validationWatched };

// ---------- REFERẼNCIAS ----------

// moment: https://momentjs.com/docs/
// Lógica dos exercícios do dia 22.5 foi usada para resolver esses requisitos
