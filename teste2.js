const fs = require("fs");
const path = require("path");
const { fakeData } = require("./fakeData");

module.exports = function (req, res) {
    const name = req.body.name;
    const job = req.body.job; // corrije "jov" para "job"

    const newUser = {
        id: fakeData.length + 1, // adiciona o id do usuário
        name: name,
        job: job,
    };

    fakeData.push(newUser);

    const filePath = path.join(__dirname, "fakeData.json");
    const fileContent = JSON.stringify(fakeData); // Converte o array de dados para formato JSON

    fs.writeFile(filePath, fileContent, (error) => {
        if (error) {
            return res.status(500).json({ error: error.message }); // tratamento de erro
        }

    });
    res.send(newUser);
};