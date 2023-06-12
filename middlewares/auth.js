const { decodeJWT } = require('../auth/jwt');
const { email: adminEmail } = require('../data/loginFakeData.json')

module.exports = async (req, res, next) => {
  const { authorization: token } = req.headers;
  try {
    if (!token) return res.status(401).json({ error: 'Token não encontrado.' })
    const decode = decodeJWT(token);

    if (!decode) return res.status(401).json({ error: 'Token inválido ou expirado.' });
    const { payload: { email: loginEmail } } = decode
    if (adminEmail !== loginEmail) {
      return res.status(401).json({ error: 'Usuário sem privilégios' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: 'sla' });
  }
};