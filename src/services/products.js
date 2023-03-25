const Adapter = require('../adapters/index')

class productsService {
  constructor() {
    this.Adapter = Adapter
  }

  async getAll() {
    return this.Adapter.getProducts()
  }

  async getLength(filter, searchQuery) {
    return this.Adapter.getLength(filter, searchQuery)
  }

  async getChunk(page, itemsPerPage, filter, searchQuery) {
    return this.Adapter.getChunk(page, itemsPerPage, filter, searchQuery)
  }

  async search(query) {
    return this.Adapter.search(query)
  }
}

module.exports = new productsService()