const productsService = require('../services/products')

const getAll = (req, res) => {
  // const products = productsService.getAll()

  res.send({ key: 123})
}

module.exports = {
  getAll,
}
