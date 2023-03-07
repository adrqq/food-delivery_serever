const { MongoClient } = require('mongodb');

class MongoAdapter {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URL);
    console.log('---mongo connected---')
  }

  async getProducts(callback) {
    const artists = MongoAdapter.collection('Products').find();

    for await (const product of products) {
      await callback(product)
    }
  }

  async insertProducts(products) {
    collection('Products').insertMany(products)
  }

  static collection(name) {
    return this.client.db(process.env.MONGO_DB_NAME).collection(name);
  }
}

module.exports.MongoAdapter = new MongoAdapter();
