// Requisito 4
const validationLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  const emailRegex = /\S+@\S+\.\S+/;
  const validEmail = emailRegex.test(email);
  if (!validEmail) {
    return res.status(400).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    ); 
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json(
        { message: 'O "password" deve ter pelo menos 6 caracteres' },
      ); 
  }
  next();
};

module.exports = { validationLogin };

// ---------- REFERẼNCIAS ----------

// Regex: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
// .test: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
