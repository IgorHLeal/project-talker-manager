const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers, randomToken, validLogin } = require('./services');
// const { validLogin } = require('./login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 01
// Base para resolução do requisito retirada do dia 22.4
app.get('/talker', async (_req, res) => {
  const talker = await readTalkers();

  if (talker) {
    res.status(200).json(talker);
  }
});

// Requisito 02
// Base para resolução do requisito retirada do conteúdo sobre Parâmetros de rota do dia 22.4
// try/catch retirado do conteúdo sobre aync/await do dia 22.2
app.get('/talker/:id', async (req, res) => {
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
});

// Requisito 3
app.post('/login', validLogin, (_req, res) => {
  const token = randomToken();
  res.status(200).json({ token });
});

// Outra forma de resolver o requisito 3
// Referência: https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
/* app.post('/login', (_req, res) => {
  function geraStringAleatoria(tamanho) {
    let stringAleatoria = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < tamanho; index += 1) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
  }
  const token = geraStringAleatoria(16);
  res.status(200).json({ token });
}); */

app.listen(PORT, () => {
  console.log('Online');
});
