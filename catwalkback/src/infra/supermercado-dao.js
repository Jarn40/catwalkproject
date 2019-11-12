class SupermercadoDAO {

    constructor(db) {
        this._db = db
    }

    findAll() {
        return new Promise((resolve, reject) => {
            this._db.findAll((err, doc) => {
                if (err) {
                    return reject(console.log(err))
                }
                return resolve(doc)
            })
        })
    }

    findOne(id) {
        return new Promise((resolve, reject) => {
            this._db.findOne(id, (err, doc) => {
                if (err) {
                    return reject(console.log(err))
                }
                return resolve(doc)
            })
        })
    }

    insertOne(supermercado) {
        return new Promise((resolve, reject) => {
            this._db.insertOne(supermercado, (err, doc) => {
                if (err) {
                    return reject(console.log(err))
                }
                return resolve(doc)
            })
        })
    }

    updateOne(id, supermercado) {
        return new Promise((resolve, reject) => {
            this._db.updateOne(id, supermercado, (err, doc) => {
                if (err) {
                    return reject(console.log(err))
                }
                return resolve(doc)
            })
        })
    }

    deleteOne(id) {
        return new Promise((resolve, reject) => {
            this._db.deleteOne(id, (err, doc) => {
                if (err) {
                    return reject(console.log(err))
                }
                return resolve(doc)
            })
        })
    }



}

module.exports = SupermercadoDAO