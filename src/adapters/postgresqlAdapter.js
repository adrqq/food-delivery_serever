const { Pool } = require('pg')

class PostgresAdapter {
  constructor() {
    this.pool = new Pool({
      user: process.env.PG_USER,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASS,
      port: process.env.PG_PORT,
      host: 'localhost',
    })

    console.log('---postgres connected---')
  }

  async getProducts(callback) {
    const products = pool.query("SELECT * FROM products").rows;

    for await (const product of products) {
      await callback(product)
    }
  }

  async insertProducts(products) {
    // 
  }
}

module.exports.PostgresAdapter = new PostgresAdapter()
