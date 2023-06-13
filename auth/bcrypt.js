const bcrypt = require('bcrypt');

// Função para gerar o hash da senha
const generateHash = async (password) => {
  const saltRounds = 10; // Número de rounds de salt (recomendado: 10)
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

// Função para comparar a senha fornecida com o hash armazenado
const comparePassword = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

module.exports = { generateHash, comparePassword };
