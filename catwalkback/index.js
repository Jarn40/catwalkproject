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
        superMarketDescription: "2 Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
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
        superMarketAdditionalImages: ["path1", "path2","path1", "path2","path4"],
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
