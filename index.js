const express = require('express');
const bodyParser = require('body-parser');

const { validationTalker } = require('./midlewares/validationTalker');
const { validationTalkerId } = require('./midlewares/validationTalkerId');
const { generateToken } = require('./midlewares/generateToken');
const { validationLogin } = require('./midlewares/validationLogin');
const { validationToken } = require('./midlewares/validationToken');
const { validationName } = require('./midlewares/validationName');
const { validationAge } = require('./midlewares/validationAge');
const { validationTalk } = require('./midlewares/validationTalk');
const { validationWatched } = require('./midlewares/validationWatched');
const { validationRate } = require('./midlewares/validationRate');
const { validationEditTalkerId } = require('./midlewares/validationEditTalkerId');
const { deleteTalker } = require('./midlewares/deleteTalker');
const { writeTalker } = require('./midlewares/writeTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 01
app.get('/talker', validationTalker);

// Requisito 02
app.get('/talker/:id', validationTalkerId);

// Requisito 3
app.post('/login', validationLogin, generateToken);

// Requisito 05
app.post('/talker',
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatched,
  validationRate,
  writeTalker);

// Requisito 06
app.put('/talker/:id',
validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatched,
  validationRate,
  validationEditTalkerId);

// Requisito 07
app.delete('/talker/:id', validationToken, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
