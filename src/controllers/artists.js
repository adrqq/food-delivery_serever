const artistsService = require('../services/artists')

const getAll = (req, res) => {
  const artists = artistsService.getAll()

  res.send(artists)
}

module.exports = {
  getAll,
}
