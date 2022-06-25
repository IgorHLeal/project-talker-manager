const { generateRandomToken } = require('../services');

const generateToken = (req, res) => {
  const token = generateRandomToken();
  res.status(200).json({ token });
};

module.exports = { generateToken };

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
