const Adapter = require('../adapters/index')

const getAll = () => {
  return Adapter.getArtists()
}

const insert = () => {
  Adapter.insertArtists([{john: doe}])
}

module.exports = { 
  getAll,
  insert
}