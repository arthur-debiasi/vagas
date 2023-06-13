const { writeDataToFile, readDataFromFile } = require("./utils/fileUtils");

const updateUserByID = async (req, res) => {
  const data = await readDataFromFile();
  const id = Number(req.query.id);

  const userIndex = data.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, job } = req.body;

  // se name e/ ou job não forem fornecidos em req.body, seus valores seguem os mesmos.
  const updatedUser = {
    ...data[userIndex],
    name: name || data[userIndex].name,
    job: job || data[userIndex].job,
  };

  data[userIndex] = updatedUser;

  try {
    await writeDataToFile(data);
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Error updating user." });
  }
};

module.exports = updateUserByID;
