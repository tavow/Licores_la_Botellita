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
    if (validations.errors.length > 0) {
      return res.render("register", {
        errors: validations.mapped(),
        old: req.body,
      });
    }
    // let producto = products.find(producto => producto.id == id);
    let userInDB = users.find(users =>  users.correo == req.body.email);
    // let userInDB = await db.user.findAll({
    //   where: {
    //     email: req.body.email,
    //   },
    // });
    console.log(req.body.email);
    console.log('users.correo: ' + users.correo);
    console.log('Resultado busqueda email en json'+ userInDB);

    // if (userInDB.length > 0) {
    //   return res.render("users/register", {
    //     errors: {
    //       email: {
    //         msg: "Este email ya se encuentra registrado",
    //       },
    //     },
    //     old: req.body,
    //   });
    // }

    if (req.body.password !== req.body.re_password) {
      return res.render("users/register", {
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
    let userToCreate = {
        id: users[users.length - 1].id + 1,
        ...req.body,
              password: bcryptjs.hashSync(req.body.password, 10),
        img: img
      };
      users.push(userToCreate)
      fs.writeFileSync(UsersFilePath, JSON.stringify(users, null, ' '));
      res.redirect('/users/register');
      
  },

  login: (req, res) => {
    return res.render("login");
  },

  processLogin: async (req, res) => {
    const resultValidation = validationResult(req);
    console.log('Process Login');
    console.log(req.body.password);
    console.log(req.body.email);
    // console.log(users);
    let usuario = users.find(usuario => usuario.correo == req.body.email);
    console.log(usuario);

    if (resultValidation.errors.length > 0) {
      return res.render("users/login", {
        errors: resultValidation.mapped(),
        old: req.body,
      });
    }

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
      if (req.body.password == usuario.password) {
        console.log('Todo bien'); 
        passwordOk = true; 
      };
      console.log('passsword: ' + passwordOk);
      if (passwordOk) {
        delete usuario.password;
        req.session.userLogged = usuario;
        console.log(usuario);
        if (req.body.check_login) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 5 });
        }

        // if (usuario.category_id === 1) {
        //   return res.redirect("/admin/");
        // }
        return res.redirect("/users/profile");
      }

      return res.render("users/login", {
        errors: {
          generico: {
            msg: "Usuario o contraseña incorrecta",
          },
        },
      });
    }

    return res.render("users/login", {
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

    return res.render("users/userEdit", { user });
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
      return res.redirect('/users/profile');
    });

  },

  profile: (req, res) => {
    return res.render("users/userProfile", {
      user: req.session.userLogged /*usé user en la vista de profile*/,
    });
  },
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = usersController;
