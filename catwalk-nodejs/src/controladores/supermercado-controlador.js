const SupermercadoDao = require('../infra/supermercado-dao');
const db = require('../config/database');



class SupermercadoControlador {

    static rotas() {
        return {
            home: '/',
            insertOne: '/insertOne',
            idAction: '/:id'
        }
    }

    findAll() {
        return (req, res) => {
            const supermercadoDao = new SupermercadoDao(db)
            supermercadoDao.findAll()
                .then(doc => res.status(200).json(doc))
                .catch(err => console.log(err))
        }
    }

    findOne() {
        return (req, res) => {
            const supermercadoDao = new SupermercadoDao(db)
            supermercadoDao.findOne(req.params.id)
                .then(doc => res.status(200).json(doc[0]))
                .catch(err => console.log(err))
        }
    }


    insertOne() {
        return (req, res) => {
            const supermercadoDao = new SupermercadoDao(db)
            supermercadoDao.insertOne(req.body)
                .then(doc => {
                    console.log("Supermercado Adicionado: " + doc["insertedId"])
                    res.status(201).json(doc["insertedId"])
                })
                .catch(err => res.send(err))
        }

    }

    deleteOne() {
        return (req, res) => {
            const supermercadoDao = new SupermercadoDao(db)
            supermercadoDao.deleteOne(req.params.id)
                .then(doc => {
                    console.log("Supermercado Removido: " + req.params.id)
                    res.status(202).json("Supermercado Removido: " + req.params.id)
                })
                .catch(err => res.send(err))
        }
    }

    updateOne() {
        return (req, res) => {
            const supermercadoDao = new SupermercadoDao(db)
            supermercadoDao.updateOne(req.params.id, req.body)
                .then(doc => {
                    console.log("Supermercado Editado: " + req.params.id)
                    res.status(202).json(doc)
                })
                .catch(err => console.log(err))
        }
    }

}

module.exports = SupermercadoControlador