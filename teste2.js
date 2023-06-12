const path = require("path");
const data = require("./fakeData");
const updateDataFile = require("./utils/updateDataFile");

module.exports = async function (req, res) {
    const name = req.body.name;
    const job = req.body.job;

    const newUser = {
        id: data.length + 1,
        name: name,
        job: job,
    };

    data.push(newUser);

    const filePath = path.join(__dirname, "fakeData.json");
    const fileContent = JSON.stringify(data);

    try {
        await updateDataFile(filePath, fileContent);
        res.sendStatus(204); // Retorna o status 204 No Content
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Erro ao salvar o usuário" });
      }
};
