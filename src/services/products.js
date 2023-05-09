// const Adapter = require('../adapters/index')
const { MongoClient } = require('mongodb');
const ProductModel = require('../models/product-model');
const ApiError = require('../exceptions/api-error');

class productsService {

  async getAll(callback) {
    try {
      // const products = productsService.collection('products').find();

      // for await (const product of products) {
      //   await callback(product)
      // }

      const products = ProductModel.find();

      for await (const product of products) {
        await callback(product)
      }
    } catch (error) {
      console.log(error)
      console.log('---mongo error !!!!!!!!!!!---')
    }
  }

  async getLength(filter, searchQuery) {

    if (filter.toString() === 'All') {
      // console.log('DATA', await ProductModel.find({ name: { $regex: searchQuery, $options: 'i' } }).exec())

      return await ProductModel
        .find({ name: { $regex: searchQuery, $options: 'i' } })
        .countDocuments();
    } else {
      return await ProductModel
        .find({ category: filter }, { name: { $regex: searchQuery, $options: 'i' } })
        .countDocuments();
    }
  }

  async getChunk(page, itemsPerPage, filter, searchQuery) {
    try {
      if (filter.toString() === 'All') {
        const products = await ProductModel
          .find({ name: { $regex: searchQuery, $options: 'i' } })
          .skip((page - 1) * itemsPerPage)
          .limit(+itemsPerPage)
          .exec();

        return products;
      } else {
        const products = await ProductModel
          .find({ category: { $regex: filter }, name: { $regex: searchQuery, $options: 'i' } })
          .skip((page - 1) * itemsPerPage)
          .limit(+itemsPerPage)
          .exec();

        return products;
      }
    } catch (error) {
      console.log(error)
      console.log('---mongo error !!!!!!!!!!!---')
    }
  }

  async addProduct(product) {

    try {
      // const newProduct = ProductModel.create(product)

      // return newProduct

      return ProductModel.updateMany({}, { $set: { count: 0 } })
    } catch (e) {
      ApiError.BadRequest(e.message)
    }
  }

  async increaseLikesCount(id) {
    try {
      const product = await ProductModel.findOne({ id: id })

      if (product) {
        product.likesCount += 1;
        product.save();
      }
    } catch (e) {
      ApiError.BadRequest(e.message)
    }
  };
}

module.exports = new productsService()