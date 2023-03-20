const productsService = require('../services/products')
class productsController {
  async getAll(req, res) {
    const products = await productsService.getAll()

    // console.log(products)

    res.send(products)
  }

  async getLength(req, res) {
    const length = await productsService.getLength()

    res.send(length.toString())
  }

  async getChunk(req, res) {
    const { page, itemsPerPage, filter } = req.query

    console.log(page, itemsPerPage, filter)

    const products = await productsService.getChunk(page, itemsPerPage, filter)

    res.send(products)
  }
}

module.exports = new productsController()
