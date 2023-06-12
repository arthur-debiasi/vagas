const data = require("./fakeData").fakeData;
const path = require("path");
const { writeFile } = require("./utils/fileUtils");

module.exports = async function (req, res) {
  const name = req.query.name;
  let deleted = false;

  for (let i = 0; i < data.length; i++) {
    if (data[i].name === name) {
      data.splice(i, 1); // Remove o elemento do array na posição i
      deleted = true;
      break;
    }
  }

  if (deleted) {
    const filePath = path.join(__dirname, "fakeData.json");
    const fileContent = JSON.stringify(data);

    try {
      await writeFile(filePath, fileContent);
      res.sendStatus(204); // Retorna o status 204 No Content
    } catch (err) {
      res.status(500).json({ error: "Erro ao salvar o usuário" });
    }
  } else {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
};
