const { readTalkers } = require('../services');

const searchEndpoint = async (req, res) => {
  const { q } = req.query;
  const search = q;
  const talkers = await readTalkers();

  if (!search || search === '') return res.status(200).json(talkers);

  const filterTalker = talkers.filter((talker) => talker.name.includes(search));
  res.status(200).json(filterTalker);
};

module.exports = { searchEndpoint };