const findUserByName = (userName, data) => {
  return data.find(({ name }) => name === userName);
};

module.exports = { findUserByName };
