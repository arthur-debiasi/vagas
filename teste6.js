const { generateJWT, decodeJWT } = require('./auth/jwt');
const { loginFakeData } = require('./data/fakeData');

module.exports = (req, res) => {
  const { email: loginEmail, password: loginPassword } = req.body;
  const { email: adminEmail, password: adminPassword } = loginFakeData;

  if (loginEmail !== adminEmail || loginPassword !== adminPassword) {
    return res.status(404).json({ error: 'Usuário inválido' });
  }

  const payload = {
    email: loginEmail,
  };

  const token = generateJWT(payload);

  res.status(200).json({ token });
}