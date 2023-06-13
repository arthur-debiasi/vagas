const { userFakeData: data } = require("./utils/data/fakeData");

module.exports = function (req, res) {
  const userName = req.query.name;

  try {
    const user = data.find(({ name }) => name === userName);

    if (!user) {
      return res.status(404).json({ error: "Usuário not found." });
    }

    const accessCount = user.access || 0;

    return res.status(200).json({ message: `O usuário ${userName} foi lido ${accessCount} vezes.` });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Error fetching user." });
  }
};
