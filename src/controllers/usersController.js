const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
// const UsersFilePath = path.join(__dirname, '../database/usuariosDB.json');
// const users = JSON.parse(fs.readFileSync(UsersFilePath, 'utf-8'));

const db = require("../database/models");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const users = db.usuario;

const usersController = {
  register: (req, res) => {
    return res.render("register");
  },
  processRegister: async (req, res) => {
    console.log('process register');
    const validations = validationResult(req);
    let errors = validationResult(req);
    console.log("length" + validations.errors);
    if (!errors.isEmpty()) {
      return res.render(("register"), {
        errors: errors.errors, old: req.body
      });
    }
    let email = req.body.correo;
    let datatimeusuario = "1999-06-06";

    console.log(req.body.correo);
    let userInDB = await db.usuario.findAll({
      where: {
        correo: req.body.correo,
      },
    });

    console.log(userInDB);

    if (userInDB == []) {
      return res.render("register", {
        errors: {
          error: {
            msg: "Este email ya se encuentra registrado",
          },
        },
        old: req.body,
      });
      console.log('Este email ya se encuentra registrado');
    }
    console.log('Validando contraseñas');
    if (req.body.password !== req.body.re_password) {
      return res.render("register", {
        errors: {
          error: {
            msg: "Las contraseñas no coinciden",
          },
        },
        old: req.body,
      });
    }
    console.log(req.files);

    console.log('Listos para crear al usuario');

    let user = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      correo: req.body.correo,
      password: bcryptjs.hashSync(req.body.password, 10),
      telefono: Number(req.body.telefono),
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      categoria: req.body.categoria,
      img: req.file ? req.file.filename : "default-foto.png",
      datatimeusuario: datatimeusuario
    };

    users.create(user)
      .then((storedUser) => { res.render('login') })
      .catch(error => res.render(path.join(__dirname, '../views/register.ejs'), {
        errors: errors.mapped(),
        old: req.body
      }));
  },

  login: (req, res) => {
    return res.render("login");
  },

  processLogin: async (req, res) => {
    const resultValidation = validationResult(req);
    console.log('Process Login');
    console.log(req.body.password);
    console.log(req.body.correo);
    let usuario = await users.findOne({
      where: { correo: req.body.correo }
    })
    console.log(usuario);

    if (usuario) {
      console.log("______________________________222");
      let passwordOk = bcryptjs.compareSync(req.body.password, usuario.password);

      // bcryptjs.compareSync(        req.body.password,        usuario.password      );

      console.log('passsword: ' + passwordOk);

      if (passwordOk) {
        // delete usuario.password;
        req.session.userLogged = usuario;
        console.log('remember_user: ', req.body.remember_user);
        console.log(usuario);
        if (req.body.remember_user) {
          res.cookie("userEmail", req.body.correo, { maxAge: 1000 * 60 * 5 });
        }

        // if (usuario.category_id === 1) {
        //   return res.redirect("/admin/");
        // }
        return res.render("profile", { usuario });
      } else {
        console.log('Usuario o contraseña incorrecta');
        return res.render("login", {
          errors: {
            error: {
              msg: "Usuario o contraseña incorrecta",
            },
          },
        });
      }
    }

    return res.render("login", {
      errors: {
        error: {
          msg: "Este email no se encuentra registrado",
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
