// const Adapter = require('../adapters/index')
const { MongoClient } = require('mongodb');

class productsService {
  constructor() {
    console.log('---mongo connecting---')
    console.log(process.env.MONGO_URL)

    this.client = new MongoClient(process.env.MONGO_URL);
    console.log('---mongo connected---')
  }

  async getAll(callback) {
    try {
      const products = productsService.collection('products').find();

      for await (const product of products) {
        await callback(product)
      }
    } catch (error) {
      console.log(error)
      console.log('---mongo error !!!!!!!!!!!---')
    }
  }

  async getLength(filter, searchQuery) {
    if (filter === 'All') {
      return await productsService
        .collection('products')
        .countDocuments({ name: { $regex: searchQuery, $options: 'i' } });
    } else {
      return await productsService
        .collection('products')
        .countDocuments({ category: filter }, { name: { $regex: searchQuery, $options: 'i' } })
    }
  }

  async getChunk(page, itemsPerPage, filter, searchQuery) {
    // return productsService.collection('products').find({ name: { $regex: searchQuery, $options: 'i' } }).toArray()

    try {
      if (filter === 'All') {
        const products = await productsService
          .collection('products')
          .find({ name: { $regex: searchQuery, $options: 'i' } })
          .skip((page - 1) * itemsPerPage)
          .limit(+itemsPerPage)
          .toArray();

        return products;
      } else {
        const products = await productsService
          .collection('products')
          .find({ category: filter }, { name: { $regex: searchQuery, $options: 'i' } })
          .skip((page - 1) * itemsPerPage)
          .limit(+itemsPerPage)
          .toArray();

        return products;
      }
    } catch (error) {
      console.log(error)
      console.log('---mongo error !!!!!!!!!!!---')
    }
  }

  static collection(name) {
    return new MongoClient(process.env.MONGO_URL).db(process.env.MONGO_DB_NAME).collection(name);
  }
}

module.exports = new productsService()