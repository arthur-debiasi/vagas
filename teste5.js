const { userFakeData: data } = require("./data/fakeData");

module.exports = function (req, res) {

    const userName = req.query.name;
    const user = data.find(({ name }) => name === userName);

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const access = user.access || 0;
    res.status(200).json({ message: `Usuário ${userName} foi lido ${access} vezes.` });
};