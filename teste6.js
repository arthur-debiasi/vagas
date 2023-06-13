const { comparePassword } = require('./auth/bcrypt');
const { generateJWT } = require('./auth/jwt');

const login = async (req, res) => {
  const { email: loginEmail, password: loginPassword } = req.body;
  const adminEmail = process.env.DB_USER;
  const adminHash = process.env.DB_PASSWORD;

  const validEmail = loginEmail === adminEmail;
  const validPassword = await comparePassword(loginPassword, adminHash)

  if (!validEmail) {
    return res.status(401).json({ error: 'Invalid email.' });
  }

  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid password.' });
  }


  const payload = {
    email: loginEmail,
  };

  const token = generateJWT(payload);

  res.status(200).json({ token });
}

module.exports = login;