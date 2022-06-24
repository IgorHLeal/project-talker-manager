const fs = require('fs').promises;
const moment = require('moment');
const { readTalkers } = require('../services');

// Requisito 5
const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' }); 
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  
  next();
};

const validateWatched = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!moment(watchedAt, 'DD/MM/YYYY', true).isValid()) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!rate || rate === '') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const writeTalker = async (req, res) => {
  const { name, age, talk } = req.body;
    const talkers = await readTalkers();
    const id = talkers.length + 1;
    const newTalker = { name, age, talk, id };
    talkers.push(newTalker);
    await fs.writeFile('talker.json', JSON.stringify(talkers));
    res.status(201).json(newTalker);
};

module.exports = { 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatched,
  validateRate,
  writeTalker,
};

// ---------- REFERẼNCIAS ----------

// moment: https://momentjs.com/docs/
