require('./redisAdapter');
 
 class Adapter {
  constructor() {
    this.Adapter = this.databaseSelectHandler(process.env.CURRENT_DB)
  }

  async getArtists() {
    return this.Adapter.getArtists(async (artist) => {

    });
  }

  async insertArtists(artist) {
    return this.Adapter.insertArtists(artist)
  }

  databaseSelectHandler(dbName) {
    if (dbName === 'mongodb') {
      return require('./mongodbAdapter')
    } else if (dbName === 'postgresql') {
      require('./postgresqlAdapter')
    } else {
      throw new Error('Wrong property "CURRENT_DB" inside of .env file!!!')
    }
  }
 }

 module.exports.Adapter = new Adapter();
