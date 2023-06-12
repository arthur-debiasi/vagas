const path = require("path");
const updateDataFile = require('./utils/updateDataFile');
const { userFakeData: data } = require("./data/fakeData");

module.exports = async function (req, res) {

  const id = Number(req.query.id);

  const userIndex = data.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado." })
  }
  const user = {
    "id": id,
    "name": req.body.name,
    "job": req.body.job,
    "access": data[userIndex].access
  };

  data[userIndex] = user;

  const filePath = path.join(__dirname + '/data/', "userFakeData.json");
  const fileContent = JSON.stringify(data);

  try {
    await updateDataFile(filePath, fileContent);
    res.sendStatus(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar o usuário" });
  }

};