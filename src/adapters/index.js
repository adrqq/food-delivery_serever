// require('./redisAdapter');

class Adapter {
  constructor() {
    this.Adapter = this.databaseSelectHandler(process.env.CURRENT_DB);
  }

  async getProducts() {
    const products = [];

    await this.Adapter.getProducts(async (product) => {
      products.push(product);
    });

    return products;
  }

  async getLength(filter, searchQuery) {
    return this.Adapter.getLength(filter, searchQuery);
  }

  async getChunk(page, itemsPerPage, filter, searchQuery) {
    return this.Adapter.getChunk(page, itemsPerPage, filter, searchQuery);
  }

  async search(query) {
    return this.Adapter.search(query);
  }

  databaseSelectHandler(dbName) {
    console.log(dbName);

    if (dbName === 'mongodb') {
      return require('./mongodbAdapter')
    } else if (dbName === 'postgresql') {
      require('./postgresqlAdapter');
    } else {
      throw new Error('Wrong property "CURRENT_DB" inside of .env file!!!');
    };
  }
}

module.exports = new Adapter();
