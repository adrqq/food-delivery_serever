const { MongoClient } = require('mongodb');

class MongoAdapter {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URL);
    console.log('---mongo connected---')
  }

  async getArtists(callback) {
    const artists = MongoAdapter.collection('Artists').find();

    for await (const artist of artists) {
      await callback(artist)
    }
  }

  async insertArtists(artists) {
    collection('Artists').insertMany(artists)
  }

  static collection(name) {
    return this.client.db(process.env.MONGO_DB_NAME).collection(name);
  }
}

module.exports.MongoAdapter = new MongoAdapter();
