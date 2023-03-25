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

  async getLength(filter, searchQuery) {
    if (filter === 'All') {
      return await MongoAdapter
        .collection('products')
        .countDocuments({ name: { $regex: searchQuery, $options: 'i' } });
    } else {
      return await MongoAdapter
        .collection('products')
        .countDocuments({ category: filter }, { name: { $regex: searchQuery, $options: 'i' } })
    }
  }

  async getChunk(page, itemsPerPage, filter, searchQuery) {
    let products;

    try {
      if (filter === 'All') {
        products = await MongoAdapter
          .collection('products')
          .find({ name: { $regex: searchQuery, $options: 'i' } })
          .skip((page - 1) * itemsPerPage)
          .limit(+itemsPerPage)
          .toArray();
      } else {
        products = await MongoAdapter
          .collection('products')
          .find({ category: filter }, { name: { $regex: searchQuery, $options: 'i' } })
          .skip((page - 1) * itemsPerPage)
          .limit(+itemsPerPage)
          .toArray();
      }
    } catch (error) {
      console.log(error)
      console.log('---mongo error !!!!!!!!!!!---')
    }

    return products;
  }

  async search(query) {
    try {
      const products = await MongoAdapter
        .collection('products')
        .find({ name: { $regex: query, $options: 'i' } })
        .toArray();

      return products;
    } catch (error) {
      console.log(error)
    }
  }

  static collection(name) {
    console.log(this.client)
    // console.log(new MongoClient(process.env.MONGO_URL))

    return new MongoClient(process.env.MONGO_URL).db(process.env.MONGO_DB_NAME).collection(name);
  }
}

module.exports = new MongoAdapter();
