const app = require('express')()
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



const path = require('path')

// então, criamos uma rota para '/'
app.get('/', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente

    mock = [{
        superMarketName: "TodoAno",
        superMarketMainImage: "assets/img/aton.png",
        superMarketAdditionalImages: ["path1", "path2"],
        superMarketLocation: {
            street: "Ulysses Guimarães",
            number: 4648,
            district: "Sussuarana",
            city: "Salvador",
            state: "Bahia",
            country: "Brasil",
            zip: 41213000,
        },
        superMarketDescription: "Mercado de servicos web",
        superMarketPhone: 7133524300
    }, {
        superMarketName: "TodoMes",
        superMarketMainImage: "assets/img/aton2.jpg",
        superMarketAdditionalImages: ["path1", "path2"],
        superMarketLocation: {
            street: "Ulysses Guimarães",
            number: 4648,
            district: "Sussuarana",
            city: "Salvador",
            state: "Bahia",
            country: "Brasil",
            zip: 41213000,
        },
        superMarketDescription: "Mercado de servicos de Vigilancia",
        superMarketPhone: 7133524300
    }, {
        superMarketName: "TodoAno",
        superMarketMainImage: "assets/img/aton.png",
        superMarketAdditionalImages: ["path1", "path2"],
        superMarketLocation: {
            street: "Ulysses Guimarães",
            number: 4648,
            district: "Sussuarana",
            city: "Salvador",
            state: "Bahia",
            country: "Brasil",
            zip: 41213000,
        },
        superMarketDescription: "Mercado de servicos web",
        superMarketPhone: 7133524300
    }, {
        superMarketName: "TodoMes",
        superMarketMainImage: "assets/img/aton2.jpg",
        superMarketAdditionalImages: ["path1", "path2"],
        superMarketLocation: {
            street: "Ulysses Guimarães",
            number: 4648,
            district: "Sussuarana",
            city: "Salvador",
            state: "Bahia",
            country: "Brasil",
            zip: 41213000,
        },
        superMarketDescription: "Mercado de servicos de Vigilancia",
        superMarketPhone: 7133524300
    }, {
        superMarketName: "TodoAno",
        superMarketMainImage: "assets/img/aton.png",
        superMarketAdditionalImages: ["path1", "path2"],
        superMarketLocation: {
            street: "Ulysses Guimarães",
            number: 4648,
            district: "Sussuarana",
            city: "Salvador",
            state: "Bahia",
            country: "Brasil",
            zip: 41213000,
        },
        superMarketDescription: "Mercado de servicos web",
        superMarketPhone: 7133524300
    }, {
        superMarketName: "TodoMes",
        superMarketMainImage: "assets/img/aton2.jpg",
        superMarketAdditionalImages: ["path1", "path2"],
        superMarketLocation: {
            street: "Ulysses Guimarães",
            number: 4648,
            district: "Sussuarana",
            city: "Salvador",
            state: "Bahia",
            country: "Brasil",
            zip: 41213000,
        },
        superMarketDescription: "Mercado de servicos de Vigilancia",
        superMarketPhone: 7133524300
    }]

    res.json(mock)
})

// no fim, iniciamos o serviço na porta 8001
app.listen(8001)
console.log('8001 é a porta mágica!')
