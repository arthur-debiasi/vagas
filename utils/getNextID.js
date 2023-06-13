const getNextID = (data) => {
  const lastID = Math.max(...data.map(({id}) => +id))
  return lastID + 1;
}

module.exports = getNextID;
