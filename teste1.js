const { readDataFromFile, writeDataToFile } = require('./utils/fileUtils');
const { findUserByName } = require('./utils/findUserByName');

const getUser = async (req, res) => {
    try {
        const data = await readDataFromFile();
        const { name } = req.query;

        const user = findUserByName(name, data);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.access) {
            user.access = 1;
        } else {
            user.access += 1;
        }

        const userIndex = data.findIndex(({ name }) => name === user.name);
        data[userIndex] = user;

        await writeDataToFile(data);
        return res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal error" });
    }
};


const getUsers = async (_req, res) => {
    try {
        const userData = await readDataFromFile();
        return res.status(200).json(userData);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Erro interno" });
    }
};

module.exports = { getUser, getUsers };
