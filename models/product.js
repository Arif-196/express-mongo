const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
 

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

 async save() {
    const db = await getDb();
    let dbOp;
    if (this._id){
      dbOp = db.collection('products')
      .updateOne({_id:this._id}, {$set: this});
    } else {
      dbOp = db.collection('products')
      .insertOne(this);
    }
    return dbOp
      .then(result => {
        return  result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static async findById(prodId) {
    const db = await getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      })
  }
  static async deleteById (prodId) {
    const db = await getDb();
    return db
      .collection('products')
      .deleteOne({_id : new mongodb.ObjectId(prodId) })
      .then(result => {
          console.log("Deleted");
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = Product;