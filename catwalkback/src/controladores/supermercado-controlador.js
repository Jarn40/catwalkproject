const SupermercadoDao = require('../infra/supermercado-dao');
const db = require('../config/database');



class SupermercadoControlador {

    static rotas() {
        return {
            home: '/',
            insertOne: '/insertOne',
            deleteOne: '/deleteOne',
            idAction: '/:id'
        }
    }

    findAll() {
        return (req, res) => {
            const supermercadoDao = new SupermercadoDao(db)
            supermercadoDao.findAll()
                .then(doc => res.json(doc))
                .catch(err => console.log(err))
        }
    }

    findOne() {
        return (req, res) => {
            const supermercadoDao = new SupermercadoDao(db)
            supermercadoDao.findOne(req.params.id)
                .then(doc => res.json(doc))
                .catch(err => console.log(err))
        }
    }


    insertOne() {
        return (req, res) => {
            const supermercadoDao = new SupermercadoDao(db)
            console.log("Teste")
            console.log(req.body)
            res.json(req.body)
            // supermercadoDao.insertOne(req.body)
            //     .then(doc => {
            //         console.log("Supermercado Adicionado: " + doc["insertedId"])
            //         res.json(doc["insertedId"])
            //     })
            //     .catch(err => console.log(err))
        }

    }

    deleteOne() {
        return (req, res) => {
            const supermercadoDao = new SupermercadoDao(db)
            supermercadoDao.deleteOne(req.body.id)
                .then(doc => {
                    console.log("Supermercado Removido: " + req.body.id)
                    res.json(doc)
                })
                .catch(err => console.log(err))
        }
    }

    updateOne() {
        return (req, res) => {
            const supermercadoDao = new SupermercadoDao(db)
            supermercadoDao.updateOne(req.params.id, req.body.supermercado)
                .then(doc => {
                    console.log("Supermercado Editado: " + req.params.id)
                    res.json(doc)
                })
                .catch(err => console.log(err))
        }
    }

}

module.exports = SupermercadoControlador