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
      id,
      name,
      description,
      price,
      weight,
      category,
      count,
      likesCount,
    } = req.body;

    try {
      await productsService.addProduct({
        id,
        name,
        description,
        price,
        weight,
        category,
        count,
        likesCount,
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
}

module.exports = new productsController();
