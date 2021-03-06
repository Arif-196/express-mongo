const mongodb = require('mongodb');
const getDb = require('../util/database').getDb();

const ObjectId = mongodb.ObjectId

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;

    }

    async save() {
       const  db = await getDb();
       return db.collection('users')
        .insertOne(this)
        //    .then(result => {

        //    })
        //    .catch(err => {
        //        console.log(err);
        //    });
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .findOne({_id : new ObjectId(userId)})
            .next();
    }
}

module.exports = User;