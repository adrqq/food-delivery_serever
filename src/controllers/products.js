const productsService = require('../services/products');
class productsController {
  async getAll(req, res) {
    const products = [];

    await productsService.getAll(async (product) => {
      products.push(product);
    });

    res.send(products);
  }

  async getLength(req, res) {
    const { filter, searchQuery } = req.query;

    try {
      const length = await productsService.getLength(filter, searchQuery);

      res.status(200)
      res.send(length.toString());
    } catch (error) {
      console.log(error)
      res.status(500).send('Server error');
    }
  }

  async getChunk(req, res) {
    const { page, itemsPerPage, filter, searchQuery } = req.query;

    console.log('page', page, 'itemsPerPage', itemsPerPage, 'filter', filter, 'searchQuery', searchQuery);

    try {
      const products = await productsService.getChunk(page, itemsPerPage, filter, searchQuery);

      res.status(200).send(products);
    } catch (error) {
      console.log(error)
      res.status(500).send('Server error');
    }
  }

  async addProduct(req, res) {
    const {
      name,
      description,
      price,
      weight,
      category,
      count,
      likesCount,
      packageCost,
    } = req.body;

    try {
      await productsService.addProduct({
        name,
        description,
        price,
        weight,
        category,
        count,
        likesCount,
        packageCost
      });

      res.status(200).send('Product added');
    } catch (error) {
      console.log(error)
      res.status(500).send('Server error');
    }
  }

  async increaseLikesCount(req, res) {
    const { id } = req.query;

    try {
      await productsService.increaseLikesCount(id);

      res.status(200).send('Likes count increased');
    } catch (error) {
      console.log(error)
      res.status(500).send('Server error');
    }
  }

  async search(req, res) {
    const { query } = req.query;

    const products = await productsService.search(query);

    res.send(products);
  }

  async addProductToUserCart(req, res) {
    try {
      const { userId, productId } = req.body;

      await productsService.addProductToUserCart(userId, productId);

      res.send('Product added to cart');
    } catch (error) {
      console.log(error)
      res.status(500).send('Server error');
    }
  }

  async removeProductFromUserCart(req, res) {
    try {
      const { userId, productId } = req.body;

      await productsService.removeProductFromUserCart(userId, productId);

      res.send('Product removed from cart');
    } catch (error) {
      console.log(error)
      res.status(500).send('Server error');
    }
  }

  async getUserCart(req, res) {
    const { userId } = req.query;

    const cart = await productsService.getUserCart(userId);

    res.send(cart);
  }

  async deleteProductFromUserCart(req, res) {
    const { userId, productId } = req.body;

    await productsService.deleteProductFromUserCart(userId, productId);

    res.send('Product deleted from cart');
  }
}

module.exports = new productsController();
