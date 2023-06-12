const data = require("./fakeData").fakeData;
const path = require("path");
const { writeFile } = require('./utils/fileUtils');

const getUser = async (req, res, next) => {
    const userName = req.query.name;
    const index = data.findIndex(({ name }) => name === userName);
    // o findIndex não melhora desempenho, mas melhora legibilidade

    if(index === -1) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const user = data[index];
    if(!user.access) {
        user.access = 1;
    } else {
        user.access += 1;
    }
    data[index] = user;
    const filePath = path.join(__dirname, "fakeData.json");
    const fileContent = JSON.stringify(data);
    console.log(fileContent);

    try {
        await writeFile(filePath, fileContent);
        return res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Erro interno" });
    }

};

const getUsers = (_req, res, _next) => {
    return res.status(200).json(data);
};

module.exports = {
    getUser,
    getUsers
};