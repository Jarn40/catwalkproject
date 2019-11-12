const app = require('express')()
const methodOverride = require('method-override');

app.use(require('express').json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

const rotas = require('../rotas/rotas');
rotas(app);

app.use(function (req, resp, next) {
    return resp.status(404)
});

app.use(function (erro, req, resp, next) {
    return resp.status(500)
});

module.exports = app;