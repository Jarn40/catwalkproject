const app = require('express')();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');
const rotas = require('../rotas/rotas');

app.use(cors());
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({ extended: true }));


app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

rotas(app);

module.exports = app;