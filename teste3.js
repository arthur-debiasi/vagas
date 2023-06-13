const { writeDataToFile, readDataFromFile } = require("./utils/fileUtils");

const deleteUser = async (req, res) => {
  const data = await readDataFromFile();
  const userName = req.query.name;

  const filteredData = data.filter((user) => user.name !== userName); 
  
  if (filteredData.length === data.length) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    await writeDataToFile(filteredData);
    return res.sendStatus(204); // Retorna o status 204 No Content
  } catch (err) {
    console.error("Error saving user:", err);
    return res.status(500).json({ error: "Error saving user." });
  }
};

module.exports = deleteUser;
