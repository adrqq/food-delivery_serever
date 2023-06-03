// const Adapter = require('../adapters/index')
const { MongoClient } = require('mongodb');
const ProductModel = require('../models/product-model');
const CartModel = require('../models/cart-model');
const ApiError = require('../exceptions/api-error');
const ImgModel = require('../models/img-model');
const fs = require('fs');

class productsService {

  async getAll(callback) {
    try {
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
      const count = await ProductModel.countDocuments({});
      const id = count + 1;

      return ProductModel.create({
        id: id,
        ...product,
      })
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

  async addProductToUserCart(userId, productId) {
    console.log('userId', userId, 'productId', productId)

    if (!userId || !productId) {
      throw ApiError.BadRequest('userId or productId is not defined')
    }

    try {
      const cart = await CartModel.findOne({ userId: userId });

      if (cart) {
        const item = cart.itemsData.find(item => item.productId === productId);

        if (item) {
          item.count += 1;
          cart.save();
        } else {
          cart.itemsData.push({
            productId: productId,
            count: 1,
          });
          cart.save();
        }
      } else {
        const cart = await CartModel.create({
          userId: userId,
          itemsData: [
            {
              productId: productId,
              count: 1,
            }
          ]
        });
      }
    } catch (e) {
      throw ApiError.BadRequest(e.message)
    }
  }

  async removeProductFromUserCart(userId, productId) {

    if (!userId || !productId) {
      throw ApiError.BadRequest('userId or productId is not defined')
    }

    try {
      const cart = await CartModel.findOne({ userId: userId });

      if (cart) {
        const item = cart.itemsData.find(item => item.productId === productId);

        if (item) {
          if (item.count > 1) {
            item.count -= 1;
            cart.save();
          } else {
            cart.itemsData = cart.itemsData.filter(item => item.productId !== productId);
            cart.save();
          }
        }
      }
    } catch (e) {
      ApiError.BadRequest(e.message)
    }
  }

  async getUserCart(userId) {

    if (!userId) {
      throw ApiError.BadRequest('userId is not defined')
    }

    console.log('userId', userId)

    try {
      const cart = await CartModel.findOne({ userId: userId });

      console.log('cart', cart)

      if (cart) {
        return cart;
      } else {
        throw ApiError.BadRequest('cart is not defined')
      }
    } catch (e) {
      ApiError.BadRequest(e.message)

      return [];
    }
  }

  async deleteProductFromUserCart(userId, productId) {

    if (!userId || !productId) {
      throw ApiError.BadRequest('userId or productId is not defined')
    }

    try {
      const cart = await CartModel.findOne({ userId: userId });

      if (cart) {
        cart.itemsData = cart.itemsData.filter(item => item.productId !== productId);
        cart.save();
      }
    } catch (e) {
      ApiError.BadRequest(e.message)
    }
  }

  // async clearUserCart(userId) {

  // }

  async uploadImage(name, file, productId) {
    try {
      const saveImg = new ImgModel({
        productId: productId,
        name: name,
        img: {
          data: fs.readFileSync('uploads/' + file.filename),
          contentType: 'image/png',
        }
      })

      saveImg.save()
    } catch (e) {
      ApiError.BadRequest(e.message)
    }
  }

  async getImage(productId) {
    try {
      const image = await ImgModel.findOne({ productId: productId });

      return image;
    } catch (e) {
      ApiError.BadRequest(e.message)
    }
  }
}

module.exports = new productsService()