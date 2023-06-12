const fs = require("fs");
const path = require("path");
const { fakeData } = require("./fakeData");
const { writeFile } = require("./utils/fileUtils");

module.exports = async function (req, res) {
    const name = req.body.name;
    const job = req.body.job;

    const newUser = {
        id: fakeData.length + 1,
        name: name,
        job: job,
    };

    fakeData.push(newUser);

    const filePath = path.join(__dirname, "fakeData.json");
    const fileContent = JSON.stringify(fakeData);

    try {
        await writeFile(filePath, fileContent);
        res.sendStatus(204); // Retorna o status 204 No Content
      } catch (err) {
        res.status(500).json({ error: "Erro ao salvar o usuário" });
      }
};
