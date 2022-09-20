const fs = require('fs');
const path = require("path");
const productsFilePath = path.join(__dirname, '../database/productosDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controladorProductos = {
  leer: (req, res) => {
    console.log('ProdutosController leer');
    res.render("productos");
  },
  listar: (req, res) => {
    console.log('ProdutosController listar');
    res.send("Bienvenido al producto " + req.params.idProducto);

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
    let productToEdit = products.find(producto => producto.id == id)
    res.render('product-edit-form', { productToEdit })
  },
  vino: (req, res) => {
    let categoria = 'vino';
    let producto = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].categoria == categoria) {
        producto = producto.concat(products[i]);
      }
    }
    console.log(producto);
    res.render("productos2", { producto: producto });
    res.send('Listado de vinos');
  },
  ron: (req, res) => {
    // let producto = listaProductos.find(producto => producto.categoria == "ron");
    let categoria = 'ron';
    let producto = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].categoria == categoria) {
        producto = producto.concat(products[i]);
      }
    }
    console.log(producto);
    res.render("productos2", { producto: producto });
    res.send('Listado de ron');
  },
  whisky: (req, res) => {
    let categoria = 'whisky';
    let producto = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].categoria == categoria) {
        producto = producto.concat(products[i]);
      }
    }
    console.log(producto);
    res.render("productos2", { producto: producto });
    res.send('Listado de whisky');
  },
  tequila: (req, res) => {
    let categoria = 'tequila';
    console.log('categoria');
    let producto = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].categoria == categoria) {
        producto = producto.concat(products[i]);
      }
    }
    console.log(producto);
    res.render("productos2", { producto: producto });
    res.send('Listado de tequila');
  },
  coctel: (req, res) => {
    let categoria = 'coctel';
    let producto = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].categoria == categoria) {
        producto = producto.concat(products[i]);
      }
    }
    console.log(producto);
    res.render("productos2", { producto: producto });
    res.send('Listado de coctel');
  },
  detalle: (req, res) => {
    //res.send("Receta  " + req.params.idProducto);
    let id = req.params.idProducto;
    let producto = products.find((producto) => producto.id == id);
    let categoria = producto.categoria;
    console.log(categoria);
    //res.render(rederizar);
    res.render("detalleproduct.ejs", { producto: producto });
  },
  // Delete - Delete one product from DB
  destroy: (req, res) => {
    let id = req.params.id;
    let finalProducts = products.filter(producto => producto.id != id);
    fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
    res.redirect('/productos');
  },
  store: (req, res) => {
		let img
		console.log(req.files);
		if(req.files[0] != undefined){
			img = req.files[0].filename
		} else {
			img = 'default-image.png'
		}
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			img: img
		};
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},
  update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id)
		let img

		if(req.files[0] != undefined){
			img = req.files[0].filename
		} else {
			img = productToEdit.img
		}

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			img: img,
		};

		let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		// res.redirect('/');
    res.render("product-response");
	}
};
module.exports = controladorProductos;
