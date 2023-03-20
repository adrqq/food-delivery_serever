const Adapter = require('../adapters/index')

class productsService {
  constructor() {
    this.Adapter = Adapter
  }

  async getAll() {
    return this.Adapter.getProducts()
  }

  async getLength(product) {
    return this.Adapter.getLength()
  }

  async getChunk(page, itemsPerPage, filter) {
    return this.Adapter.getChunk(page, itemsPerPage, filter)
  }
}

module.exports = new productsService()