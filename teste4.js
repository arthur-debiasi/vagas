const { writeFile } = require('./utils/fileUtils');

var data = require("./fakeData").fakeData;

module.exports = async function (req, res) {

  const id = Number(req.query.id);

  const index = data.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado." })
  }
  const user = {
    "id": id,
    "name": req.body.name,
    "job": req.body.job,
  };
  
  data[index] = user;

  const filePath = "./fakeData.json";
  const fileContent = JSON.stringify(data);

  try {
    await writeFile(filePath, fileContent);
    res.sendStatus(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar o usuário" });
  }

};