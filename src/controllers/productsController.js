const fs = require('fs');
const path = require("path");
// const productsFilePath = path.join(__dirname, '../database/productosDB.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const db = require("../database/models");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const Productos = db.producto;

const controladorProductos = {
  leer: (req, res) => {
    console.log('ProdutosController leer');
    res.render("productos");
  },
  listar: (req, res) => {
    console.log('ProdutosController listar');
    // res.send("Bienvenido al producto " + req.params.idProducto);
    let insert = [];
    let insertimage = [];
    for (let i = 0; i < products.length - 1; i++) {
      insert[i] = 'INSERT INTO `product` VALUES (' + products[i].id + ', "' + products[i].nombre + '", "' + products[i].descripcion + '", ' + products[i].precio + ', "' + products[i].descuento + '", "' + products[i].categoria + '", "' + products[i].tamano + '", "' + products[i].tipo + '", ' + products[i].id + ', "' + '1999-06-06' + '")';
      insertimage[i] = 'INSERT INTO `image` VALUES (' + products[i].id + ', "' + products[i].img + '")';
    }
    console.log(insert);
    console.log(insertimage);
    res.render("productos");
  },
  crear: (req, res) => {
    console.log('ESTAMOS EN EL CONTROLADOR DE CREAR');
    res.render('product-create-form')
  },
  eliminar: (req, res) => {
    res.send("Eliminacion de productos");
  },
  editar: (req, res) => {
    //res.send("producto  " + req.params.idProducto);
    let id = req.params.idProducto;
    let producto = products.find(producto => producto.id == id);
    console.log(producto);
    res.render("ron", { producto: producto });
    // res.send('Listado de producto');
  },
  edit: (req, res) => {
    let id = req.params.id
    console.log("id:" + id);
    // let productToEdit = products.find(producto => producto.id == id)
    Productos.findByPk(id)
      .then(function (producto) {
        console.log("Nos vamos a editar el producto")
        res.render("product-edit-form", { productToEdit: producto })
      })

    // res.render('product-edit-form', { productToEdit })
  },
  vino: (req, res) => {
    var producto = Productos.findAll({
      where: {
        categoria: {
          [Op.eq]: 'vino'
        }
      }
    })
      .then(producto => {
        console.log(producto);
        res.render("productos2_listar", { producto: producto });
      });

  },
  ron: (req, res) => {
    // let producto = listaProductos.find(producto => producto.categoria == "ron");
    // let categoria = 'ron';
    // let producto = [];
    // for (let i = 0; i < products.length; i++) {
    //   if (products[i].categoria == categoria) {
    //     producto = producto.concat(products[i]);
    //   }
    // }
    // console.log(producto);
    // res.render("productos2", { producto: producto });
    // res.send('Listado de ron');

    var producto = Productos.findAll({
      // include: {
      //   model: Imagen,
      //   as: 'imagen'
      // where: {
      //   idimagen: Sequelize.col('producto.idimagen')
      //   // }
      // },
      where: {
        categoria: {
          [Op.eq]: 'ron'
        }
      }
    })
      .then(producto => {
        console.log(producto);
        res.render("productos2_listar", { producto: producto });
      });
  },
  whisky: (req, res) => {
    var producto = Productos.findAll({
      where: {
        categoria: {
          [Op.eq]: 'whisky'
        }
      }
    })
      .then(producto => {
        console.log(producto);
        res.render("productos2_listar", { producto: producto });
      });

  },
  tequila: (req, res) => {
    let categoria = 'tequila';
    var producto = Productos.findAll({
      where: {
        categoria: {
          [Op.eq]: categoria
        }
      }
    })
      .then(producto => {
        console.log(producto);
        res.render("productos2_listar", { producto: producto });
      });
  },
  coctel: (req, res) => {
    let categoria = 'coctel';
    var producto = Productos.findAll({
      where: {
        categoria: {
          [Op.eq]: categoria
        }
      }
    })
      .then(producto => {
        console.log(producto);
        res.render("productos2_listar", { producto: producto });
      });
  },
  detalle: (req, res) => {
    //res.send("Receta  " + req.params.idProducto);
    let id = req.params.idProducto;
    Productos.findByPk(id)
      .then(function (producto) {
        console.log("Nos vamos al detalle del producto")
        res.render("detalleproduct.ejs", { producto: producto })

      })

  },
  // Delete - Delete one product from DB
  destroy: (req, res) => {
    console.log("Borrando un producto")
    Productos.destroy({
      where: {
        idproducto: req.params.id
      }
    })

    res.redirect('/products')
  },

  store: (req, res) => {
    let img
    console.log(req.files);
    console.log("Creando el producto")
    if (req.files[0] != undefined) {
      img = req.files[0].filename
    } else {
      img = 'default-image.png'
    }
    console.log(img);

    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render('product-create-form',
        {
          errors: resultValidation.mapped(),
          oldData: req.body
        });
    }
    let datatimeproducto = "1999-06-06";
    if (req.files) {
      console.log("Create");
      Productos.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        descuento: req.body.descuento,
        categoria: req.body.categoria,
        tamano: req.body.tamano,
        tipo: req.body.tipo,
        img: img,
        datatimeproducto: datatimeproducto
      }).then((product) => res.redirect('/products'))
      res.render('index')
    } else {
      res.render('index')
    }

  },
  update: (req, res) => {
    let id = req.params.id;
    var products = Productos.findByPk(id)
      .then(function (producto) {
        console.log("Actualizando el producto")
        // res.render("product-edit-form", { productToEdit: producto })
      })

    const resultValidation = validationResult(req);
    let datatimeproducto = "1999-06-06";
    Promise.any([products])
      .then(function (products) {
        if (resultValidation.errors.length > 0) {
          return res.render('EditProduct',
            {
              errors: resultValidation.mapped(),
              oldData: req.body,
              products: products
            });

        } else {
          Productos.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            descuento: req.body.descuento,
            categoria: req.body.categoria,
            tamano: req.body.tamano,
            tipo: req.body.tipo,
            img: req.body.img,
            datatimeproducto: req.body.datatimeproducto
          },
            {
              where: {
                idproducto: req.params.id
              }
            }).then((product) => res.redirect('/products'))
        }
      })

  }
};
module.exports = controladorProductos;
