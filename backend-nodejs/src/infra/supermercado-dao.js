const AWS = require('./s3_upload')
const isBase64 = require('is-base64')
// const putter_send = require('./file-upload')
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
    async insertOne(supermercado) {
        var mainImg = ""
        if(isBase64(supermercado.superMarketMainImage[0], {allowMime: true})){
            await AWS.imageUpload(supermercado.superMarketMainImage[0])
                .then(location => {
                    mainImg = location
                })
        }
        supermercado.superMarketMainImage = mainImg

        var additional = []
        for (let key in supermercado.superMarketAdditionalImages) {
            await AWS.imageUpload(supermercado.superMarketAdditionalImages[key])
                .then(location => {
                    additional.push(location)
                })
        }
        supermercado.superMarketAdditionalImages = additional
        
        return new Promise((resolve, reject) => {
            this._db.insertOne(supermercado, (err, doc) => {
                if (err) {
                    return reject(console.log(err))
                }
                return resolve(doc)
            })

        })
    }
    
    
    async updateOne(id, supermercado) {
        if(isBase64(supermercado.superMarketMainImage[0], {allowMime: true})){
             await AWS.imageUpload(supermercado.superMarketMainImage[0])
                .then(location => {
                    supermercado.superMarketMainImage = location
                })
        }else{
            supermercado.superMarketMainImage = supermercado.superMarketMainImage[0]
        }
  
        var additional = []
        for (let key in supermercado.superMarketAdditionalImages) {
            if(isBase64(supermercado.superMarketAdditionalImages[key], {allowMime: true})){
                 await AWS.imageUpload(supermercado.superMarketAdditionalImages[key])
                    .then(location => {
                        additional.push(location)
                    })
            }else{
                additional.push(supermercado.superMarketAdditionalImages[key])
            }
        }
        supermercado.superMarketAdditionalImages = additional
        return new Promise((resolve, reject) => {

        this._db.findOne(id, (err, doc) => {
            let deleteList = []
            if (err) {console.log("ERRO DESCONHECIDO UPDATE")}
            for (let item in doc[0]["superMarketAdditionalImages"]){
                if(!supermercado.superMarketAdditionalImages.includes(doc[0]["superMarketAdditionalImages"][item])){
                    deleteList.push(doc[0]["superMarketAdditionalImages"][item])
                }
            }
            if(deleteList.length > 0){
                AWS.deleteItems(deleteList)
            }
            
                this._db.updateOne(id, supermercado, (err, doc) => {
                    if (err) {
                        return reject(console.log(err))
                    }
                    return resolve(doc)
                })
            })
        })
    }

    deleteOne(id) {
        return new Promise((resolve, reject) => {
            this._db.findOne(id, (err, doc) => {
                if (err) {console.log("ERRO DESCONHECIDO DELETE")}

                doc[0]["superMarketAdditionalImages"].push(doc[0]["superMarketMainImage"])

                AWS.deleteItems(doc[0]["superMarketAdditionalImages"])
                    this._db.deleteOne(id, (err, doc) => {
                        if (err) {
                            return reject(console.log(err))
                        }
                        return resolve(doc)
                })
            })
        })
    }



}

module.exports = SupermercadoDAO