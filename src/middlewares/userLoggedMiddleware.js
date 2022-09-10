const fs = require("fs");
const path = require("path");
const UsersFilePath = path.join(__dirname, '../database/usuariosDB.json');
const users = JSON.parse(fs.readFileSync(UsersFilePath, 'utf-8'));

async function  userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail; 
    let userFromCookie;

    if (emailInCookie){
        let usuario = users.find(usuario => usuario.correo == emailInCookie);
        // userFromCookie =  await db.user.findOne({
        //     where: {
        //         email: emailInCookie
        //     }
        // }).catch(function () {
        //     console.log("Promise Rejected");
        // });

        userFromCookie =  await users.find(usuario => usuario.correo == emailInCookie);         
            
       console.log(userFromCookie.dataValues);
    }
    

    if (userFromCookie){
        req.session.userLogged = userFromCookie.dataValues;
        console.log(req.cookies.userEmail);
    }

    if (req.session && req.session.userLogged) {
        //res.locals.isLogged = true;
        res.locals.isLogged = req.session.userLogged;  /*paso lo que tengo en session a locals para después usarlo en la vista de nabvaruser*/
        console.log('res.locals.isLogged: ' + res.locals.isLogged);
    }

  
    next();
}

module.exports = userLoggedMiddleware;