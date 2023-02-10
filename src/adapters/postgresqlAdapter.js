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

  async getArtists(callback) {
    const artists = pool.query("SELECT * FROM artists").rows;

    for await (const artist of artists) {
      await callback(artist)
    }
  }

  async insertArtists(artists) {
    // 
  }
 }

module.exports.PostgresAdapter = new PostgresAdapter()
