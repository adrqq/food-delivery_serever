const { MongoClient } = require('mongodb');

class MongoAdapter {
  constructor() {
    console.log('---mongo connecting---')
    console.log(process.env.MONGO_URL)

    this.client = new MongoClient(process.env.MONGO_URL);
    console.log('---mongo connected---')
  }

  async getProducts(callback) {
    // delete all from collection

    // await MongoAdapter.collection('products').deleteMany().then(() => {
    //   console.log('---mongo deleted---')
    // })

    const products = MongoAdapter.collection('products').find();

    for await (const product of products) {
      await callback(product)
    }
  }

  async getLength() {
    return await MongoAdapter.collection('products').countDocuments();
  }

  async getChunk(page, itemsPerPage, filter) {
    let products;

    if (filter === 'All') {
      products = await MongoAdapter.collection('products').find().skip((page - 1) * itemsPerPage).limit(+itemsPerPage).toArray();
    } else {
      products = await MongoAdapter.collection('products').find({ category: filter }).skip((page - 1) * itemsPerPage).limit(+itemsPerPage).toArray();
    }

    return products;
  }

  static collection(name) {
    console.log(this.client)
    // console.log(new MongoClient(process.env.MONGO_URL))

    return new MongoClient(process.env.MONGO_URL).db(process.env.MONGO_DB_NAME).collection(name);
  }
}

module.exports = new MongoAdapter();
