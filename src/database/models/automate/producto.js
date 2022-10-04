const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idproducto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idproducto"
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombre"
    },
    descripcion: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descripcion"
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precio"
    },
    descuento: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descuento"
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "categoria"
    },
    tamano: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tamano"
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tipo"
    },
    idimagen: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idimagen",
      references: {
        key: "idimagen",
        model: "imagen"
      }
    },
    datatimeproducto: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "datatimeproducto"
    }
  };
  const options = {
    tableName: "producto",
    timestamps: false,
    comment: "",
    indexes: [{
      name: "fk_imagen_producto",
      unique: false,
      type: "BTREE",
      fields: ["idimagen"]
    }, {
      name: "idproducto_idx",
      unique: false,
      type: "BTREE",
      fields: ["idproducto"]
    }]
  };
  // const ProductoModel = sequelize.define("producto_model", attributes, options);
  const Producto = sequelize.define("producto", attributes, options);

  Producto.associate = function(models){
    Producto.hasOne(models.imagen, {
      foreignKey: "idimagen",
      otherKey: 'idimagen',
      as: "imagen"       
   });
}

  return Producto ;
};