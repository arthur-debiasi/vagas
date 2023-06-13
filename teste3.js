const { writeDataToFile, readDataFromFile } = require("./utils/fileUtils");

const deleteUser = async (req, res) => {
  try {
    const data = await readDataFromFile();
    const userName = req.query.name;
    const filteredData = data.filter((user) => user.name !== userName); 

    if (filteredData.length === data.length) {
      return res.status(404).json({ error: "User not found" });
    }

    await writeDataToFile(filteredData);
    return res.sendStatus(204);
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: "Error deleting user." });
  }
};

module.exports = deleteUser;
