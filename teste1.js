const { userFakeData: data } = require("./data/fakeData");
const path = require("path");
const updateDataFile = require('./utils/updateDataFile');

const getUser = async (req, res, _next) => {
    const { name: userName } = req.query;
    // o findIndex não melhora desempenho, mas melhora legibilidade
    const userIndex = data.findIndex(({ name }) => name === userName);

    // esta é a lógica para quando o usuário não é encontrado
    if (userIndex === -1) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // esta é a lógica para atualizar a contagem de acessos
    const user = data[userIndex];
    if (!user.access) {
        user.access = 1;
    } else {
        user.access += 1;
    }
    data[userIndex] = user;
    console.log(data);
    const filePath = path.join(__dirname + '/data/', "userFakeData.json");
    const fileContent = JSON.stringify(data);

    try {
        await updateDataFile(filePath, fileContent);
        return res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
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