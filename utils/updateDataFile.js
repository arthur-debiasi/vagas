const fs = require("fs").promises;

// Função para reescrever um arquivo
const updateDataFile = async (filePath, content) => {
  try {
    await fs.writeFile(filePath, content);
  } catch (err) {
    console.error("Erro ao escrever o arquivo: ", err);
    throw err;
  }
};

module.exports = updateDataFile;
