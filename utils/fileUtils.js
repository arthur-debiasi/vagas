const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, 'data', "userFakeData.json");

const readDataFromFile = async () => {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Erro ao ler o arquivo: ", err);
    throw err;
  }
};

const writeDataToFile = async (data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data));
  } catch (err) {
    console.error("Error writing file: ", err);
    throw err;
  }
};

module.exports = {
  readDataFromFile,
  writeDataToFile,
};
