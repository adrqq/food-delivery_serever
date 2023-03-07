// require('./redisAdapter');

class Adapter {
  constructor() {
    this.Adapter = this.databaseSelectHandler(process.env.CURRENT_DB)
  }

  async getProducts() {
    return this.Adapter.getProducts(async (product) => {

    });
  }

  async insertProducts(product) {
    return this.Adapter.insertProducts(product)
  }

  databaseSelectHandler(dbName) {
    if (dbName === 'mongodb') {
      return require('./mongodbAdapter')
    } else if (dbName === 'postgresql') {
      require('./postgresqlAdapter')
    } else {
      throw new Error('Wrong property "CURRENT_DB" inside of .env file!!!')
    }
  }
}

module.exports.Adapter = new Adapter();
