const Redis = require('ioredis');

 class RedisAdapter {
  constructor() {
    this.redis = new Redis()
    
    console.log('---redis connected---')
  }
 }

module.exports.RedisAdapter = new RedisAdapter()