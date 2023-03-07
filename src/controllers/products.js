const productsService = require('../services/products')

const getAll = (req, res) => {
  const products = productsService.getAll()

  res.send(products)
}

module.exports = {
  getAll,
}
