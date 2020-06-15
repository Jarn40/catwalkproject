
const SupermercadoControlador = require('../controladores/supermercado-controlador')
supermercadoControlador = new SupermercadoControlador()

module.exports = (app) => {
    app.get(SupermercadoControlador.rotas().home, supermercadoControlador.findAll())

    app.post(SupermercadoControlador.rotas().insertOne, supermercadoControlador.insertOne())

    app.route(SupermercadoControlador.rotas().idAction)
        .get(supermercadoControlador.findOne())
        .put(supermercadoControlador.updateOne())
        .delete(supermercadoControlador.deleteOne())
}