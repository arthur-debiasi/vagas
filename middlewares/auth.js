const { decodeJWT } = require('../auth/jwt');
const adminEmail = process.env.DB_USER;

module.exports = async (req, res, next) => {
  const { authorization: token } = req.headers;

  try {
    if (!token) {
      return res.status(401).json({ error: 'Token not found.' });
    }

    const decode = decodeJWT(token);

    if (!decode) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    const { payload: { email: loginEmail } } = decode;

    if (adminEmail !== loginEmail) {
      return res.status(403).json({ error: 'User without privileges' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal error.' });
  }
};