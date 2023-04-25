const { MongoClient } = require('mongodb');
const UserSchema = require('../models/user-model');
const TokenSchema = require('../models/token-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('../services/mail');
class MongoAdapter {
  constructor() {
    console.log('---mongo connecting---')
    console.log(process.env.MONGO_URL)

    this.client = new MongoClient(process.env.MONGO_URL);
    console.log('---mongo connected---')
  }

  async getProducts(callback) {
    // delete all from collection

    // await MongoAdapter.collection('products').deleteMany().then(() => {
    //   console.log('---mongo deleted---')
    // })

    const products = MongoAdapter.collection('products').find();

    for await (const product of products) {
      await callback(product)
    }
  }

  async getLength(filter, searchQuery) {
    if (filter === 'All') {
      return await MongoAdapter
        .collection('products')
        .countDocuments({ name: { $regex: searchQuery, $options: 'i' } });
    } else {
      return await MongoAdapter
        .collection('products')
        .countDocuments({ category: filter }, { name: { $regex: searchQuery, $options: 'i' } })
    }
  }

  async getChunk(page, itemsPerPage, filter, searchQuery) {
    let products;

    try {
      if (filter === 'All') {
        products = await MongoAdapter
          .collection('products')
          .find({ name: { $regex: searchQuery, $options: 'i' } })
          .skip((page - 1) * itemsPerPage)
          .limit(+itemsPerPage)
          .toArray();
      } else {
        products = await MongoAdapter
          .collection('products')
          .find({ category: filter }, { name: { $regex: searchQuery, $options: 'i' } })
          .skip((page - 1) * itemsPerPage)
          .limit(+itemsPerPage)
          .toArray();
      }
    } catch (error) {
      console.log(error)
      console.log('---mongo error !!!!!!!!!!!---')
    }

    return products;
  }

  async registration(name, email, password) {

    try {
      // console.log(UserSchema)

      // new MongoClient(process.env.MONGO_URL).db(process.env.MONGO_DB_NAME).createCollection('tokens', {
      //   validator: {
      //     $jsonSchema: TokenSchema
      //   }
      // });

      // console.log('---mongo created collection tokens---')



      const candidate = await MongoAdapter.collection('users').findOne({ email });

      if (candidate) {
        throw new Error(`User with this email ${email} already exists!`);
      }

      const hashedPassword = await bcript.hash(password, 3);
      const activationLink = uuid.v4();
      const user = await MongoAdapter
        .collection('users')
        .insertOne({ name, email, password: hashedPassword, role: 'user', activationLink });
      await MailService.sendActivationMail(email, activationLink);


    } catch (error) {
      console.error(error)
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await MongoAdapter.collection('tokens').findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await MongoAdapter.collection('tokens').updateOne({ user: userId }, { $set: tokenData });

      return tokenData;
    }

    await MongoAdapter.collection('tokens').insertOne({ user: userId, refreshToken });

    return tokenData;
  }
}

module.exports = new MongoAdapter();
