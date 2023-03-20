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

  async getLength(product) {
    return this.Adapter.getLength();
  }

  async getChunk(page, itemsPerPage, filter) {
    return this.Adapter.getChunk(page, itemsPerPage, filter);
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
