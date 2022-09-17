const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const UsersFilePath = path.join(__dirname, '../database/usuariosDB.json');
const users = JSON.parse(fs.readFileSync(UsersFilePath, 'utf-8'));

// const db = require("../database/models");
// const { Sequelize } = require("sequelize");
//  const Op = Sequelize.Op;

const usersController = {
  register: (req, res) => {
    return res.render("register");
  },
  processRegister: async (req, res) => {
    console.log('process register');
    const validations = validationResult(req);
    console.log("length" + validations.errors);
    // if (validations.errors.length > 0) {
    //   return res.render("register", {
    //     errors: validations.mapped(),
    //     old: req.body,
    //   });
    // }
    // let producto = products.find(producto => producto.id == id);
    let usuario = users.find(item => item.correo == req.body.correo);
    let userInDB = users.find(user =>  user.correo == req.body.correo);
    // let userInDB = await db.user.findAll({
    //   where: {
    //     email: req.body.email,
    //   },
    // });
    console.log(req.body.correo);
    console.log(usuario);
    let email = req.body.correo;
    console.log('users.userInDB: ');
    console.log('Resultado busqueda email en json');

    if (userInDB !== undefined) {
      return res.render("register", {
        errors: {
          email: {
            msg: "Este email ya se encuentra registrado",
          },
        },
        old: req.body,
      });
      console.log('Este email ya se encuentra registrado');
    }

    if (req.body.password !== req.body.re_password) {
      return res.render("register", {
        errors: {
          re_password: {
            msg: "Las contraseñas no coinciden",
          },
        },
        old: req.body,
      });
    }
    console.log(req.files);
		if(req.body.img != undefined){
			img = req.body.img
		} else {
			img = 'default-foto.png'
		}
    console.log('Listos para crear al usuario');
    let userToCreate = {
        id: users[users.length - 1].id + 1,
        ...req.body,
              password: bcryptjs.hashSync(req.body.password, 10),
              re_password: bcryptjs.hashSync(req.body.password, 10),
        img: img
      };
      users.push(userToCreate)
      fs.writeFileSync(UsersFilePath, JSON.stringify(users, null, ' '));
      res.redirect('/user/register');
      
  },

  login: (req, res) => {
    return res.render("login");
  },

  processLogin: async (req, res) => {
    const resultValidation = validationResult(req);
    console.log('Process Login');
    console.log(req.body.password);
    console.log(req.body.correo);
    let usuario = users.find(item => item.correo == req.body.correo);
    console.log(usuario);

    // if (resultValidation.errors.length > 0) {
    //   console.log(resultValidation.errors.length);
    //   return res.render("login", {
    //     errors: resultValidation.mapped(),
    //     old: req.body,
    //   });
    // }

    // let userToLogin = await db.user.findOne({
    //   where: {
    //     email: req.body.email,
    //   }
    // });

    if (usuario) {
      // let passwordOk = false; 
      let passwordOk = bcryptjs.compareSync(
        req.body.password,
        usuario.password
      );
      // if (req.body.password == usuario.password) {
      //   console.log('Todo bien'); 
      //   passwordOk = true; 
      // };
      console.log('passsword: ' + passwordOk);
      if (passwordOk) {
        // delete usuario.password;
        req.session.userLogged = usuario;
        console.log('remember_user: ',req.body.remember_user);
        console.log(usuario);
        if (req.body.remember_user) {
          res.cookie("userEmail", req.body.correo, { maxAge: 1000 * 60 * 5 });
        }

        // if (usuario.category_id === 1) {
        //   return res.redirect("/admin/");
        // }
        return res.render("profile",{usuario});
      }
      console.log('Usuario o contraseña incorrecta');
      return res.render("login", {
        errors: {
          generico: {
            msg: "Usuario o contraseña incorrecta",         
          },
        },
      });
    }

    return res.render("login", {
      errors: {
        email: {
          msg: "Este mail no se encuentra registrado",
        },
      },
    });
  },

  edit: async (req, res) => {
    let user = await db.user.findOne({
      where: {
        id: req.params.id,
      },
    });

    return res.render("userEdit", { user });
  },
  processEdit: async (req, res) => {
    db.user.update(
      {
        name: req.body.name,
        phone: req.body.phone,
        avatar: req.file ? req.file.filename : "avatar1.jpg"
      },
      {
        where: { 
          email: req.body.email
        },
      }
    ).then(() => {
      return res.redirect('/profile');
    });

  },

  profile: (req, res) => {
    console.log("Profile");
    return res.render("profile", {
      usuario: req.session.userLogged /*usé user en la vista de profile*/,
    });
  },
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = usersController;
