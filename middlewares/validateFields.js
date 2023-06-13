const validateQueryName = (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "The field 'name' is required" });
  }
  next();
};

const validateNameJob = (req, res, next) => {
  const { job, name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "The field 'name' is required" });
  }
  if (!job) {
    return res.status(400).json({ error: "The field 'job' is required" });
  }
  next();
};

const validateQueryId = (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "The field 'id' is required" });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "The field 'email' is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "The field 'password' is required" });
  }
  next();
};

module.exports = {
  validateQueryName,
  validateNameJob,
  validateQueryId,
  validateLogin,
};