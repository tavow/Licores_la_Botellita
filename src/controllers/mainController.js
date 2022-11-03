const listaRecetas = [
    {
        id: 1,
        titulo: "Mojito",
        descripcion:
            "Este cóctel tan famoso a nivel mundial hace patria de Cuba, el país que lo vio nacer",
        html: "mojito.html",
        ingredientes: [
            "5 cl de tequila",
            "2,5 cl de triple seco que es licor de naranja. Ejemplos de licores triple seco son Cointreau o Grand Marnier.",
            "2,5 cl de zumo de lima recién exprimido y un trocito de lima para mojar el borde de las copas.",
            "Sal",
            "Hielos",
        ],
        instrucciones: [
            "Coloca una rama de menta en cada vaso, agrega un caballito de ron, una cucharada de azúcar y un par de rodajas de limón.",
            "Aplasta con un pilón y después agrega el agua mineral y hielo",
        ],
        img: "mojito.jpg",
    },
    {
        id: 2,
        titulo: "Margarita",
        descripcion: "Es un cóctel originario de México",
        ingredientes: [
            "5 cl de tequila",
            "2,5 cl de triple seco que es licor de naranja. Ejemplos de licores triple seco son Cointreau o Grand Marnier.",
            "2,5 cl de zumo de lima recién exprimido y un trocito de lima para mojar el borde de las copas.",
            "Sal",
            "Hielos",
        ],
        instrucciones: [
            "Primero decoraremos el borde de sal. Cogemos un vaso ancho y ovalado (el clásico de margarita) lo mojamos en un poco de sirope de azúcar presionando y a continuación, lo pasamos por un plato con sal, colocamos la lima y reservamos",
            "Exprimimos las limas para extraer su zumo",
            "Vertemos en la coctelera el zumo de lima recién exprimido, el tequila, y el triple seco, en este orden",
            "Adicionamos cuatro o cinco cubos de hielo y agitamos bien durante unos 15 segundos",
            "Servimos el cóctel con ayuda del filtro de la propia coctelera",
        ],
        html: "margarita.html",
        img: "margarita.jpg",
    },
    {
        id: 3,
        titulo: "Martini",
        descripcion:
            "Martini, Dry Martini o Martini seco, un cóctel exquisito y sencillo",
        ingredientes: ["60 mL ginebra", "30 mL vermut seco"],
        instrucciones: [
            "En un vaso mezclador agregarla ginebra, vermut seco, e hielo.",
            "Revolver ingredientes por 20-25 segundos.",
            "Usando un colador Julep colar el cóctel y servir en la copa cupé.",
            "Adornar con una aceituna o un toque de limón",
        ],
        html: "martini.html",
        img: "martini.jpg",
    },
    {
        id: 4,
        titulo: "Daiquiri",
        descripcion: "El cóctel cubano por excelencia",
        ingredientes: [
            "50 ml de ron blanco",
            "25 ml de zumo de lima",
            "1/2 cucharadita de postre de azúcar glas o jarabe de azúcar",
            "5 Cubos de Hielo",
            "1 limón en rodajas",
        ],
        instrucciones: [
            "Exprime la lima para extraer su zumo y verter en la coctelera",
            "Adiciona el azúcar glas o el jarabe de azúcar y el ron blanco",
            "Añadimos los cubos de hielo",
            "Tapamos y agitamos la coctelera durante 15 segundos",
            "Vierte la bebida en la copa y decórala con una rodaja de lima",
        ],
        html: "daiquiri.html",
        img: "daiquiri.jpg",
    },
];


const fs = require("fs");
const path = require("path");

const mainController = {
    index: (req, res) => {
        return res.render('index')
        // },
        // about: (req, res) => {
        //     return res.render('main/about')
        // },
        // contact: (req, res) => {
        //     return res.render('main/contact')
        // },
        // questions: (req,res) => {
        //     return res.render ('main/questions')
    },
    receta: (req, res) => {
        // let plato = listaRecetas.find(plato => plato.id == req.params.menuId);
        // res.render("receta", { receta: receta });
        // res.send('Listado de Recetas pruebas');
        res.render("receta", { listaRecetas });
    },
    servicio: (req, res) => {
        res.render("receta", { listaRecetas });
    },
    edit: (req, res) => {
        //res.send("Receta  " + req.params.idReceta);
        let id = req.params.idReceta;
        let receta = listaRecetas.find((receta) => receta.id == id);
        let rederizar = receta.html;
        console.log(receta);
        //res.render(rederizar);
        res.render("cocteles", { receta: receta });
        // res.send('Listado de Recetas');
        //res.render("receta");
    },
    compras: (req, res) => {
        res.render("compras");
    },
}

module.exports = mainController;