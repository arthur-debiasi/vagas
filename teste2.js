const { writeDataToFile, readDataFromFile } = require("./utils/fileUtils");
const getNextID = require('./utils/getNextID');

const createUser = async (req, res) => {
    try {
    const data = await readDataFromFile();
    const { name, job } = req.body;

    const existingUser = data.find((user) => user.name === name);

    if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
    }

    const newUser = {
        id: getNextID(data), // garante que ids não se repetem
        name,
        job,
    };

    data.push(newUser);

        await writeDataToFile(data);
        return res.status(200).json(newUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error saving user." });
    }
};

module.exports = createUser;
