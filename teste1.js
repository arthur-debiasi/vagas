const { userDict } = require("./fakeData");

const getUser = (req, res, next) => {
    const name = req.query.name;
    const user = userDict[name];
    // A utilização de userDict melhora o desempenho das buscas, pois evita percorrer
    // repetidamente todo o array fakeData. Agora, a consulta é feita diretamente pela 
    // chave correspondente ao nome do usuário
    // {
    //  'João Oliveira': { id: 1, name: 'João Oliveira', job: 'Desenvolvedor' }
    // }
    if (user) {
        return res.send(user);
    }

    return res.status(404).json({ error: "Usuário não encontrado" });
};

const getUsers = (req, res, next) => {

    res.send(data);

};

module.exports = {
    getUser,
    getUsers
};