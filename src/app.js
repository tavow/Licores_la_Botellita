const path = require("path");
const express = require("express");
const app = express();
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const session = require('express-session'); /*agregué session*/

const cookieParser = require('cookie-parser');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));


app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: "shh, It's a secret",  /*agregué session con app.use para que corra por todos lados*/
    resave: false,
    saveUninitialized: false,
}));
app.use(cookieParser());

const routesMain = require('./routes/main');
app.use('/', routesMain);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});