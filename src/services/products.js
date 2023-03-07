const Adapter = require('../adapters/index')

const getAll = () => {
  return Adapter.getProducts()
}

const insert = () => {
  Adapter.insertProducts([{ john: doe }])
}

module.exports = {
  getAll,
  insert
}
