const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idventaproducto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idventaproducto"
    },
    idproducto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idproducto",
      references: {
        key: "idproducto",
        model: "producto_model"
      }
    },
    idventa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idventa",
      references: {
        key: "idventa",
        model: "venta_model"
      }
    }
  };
  const options = {
    tableName: "ventaproducto",
    comment: "",
    indexes: [{
      name: "ventaproducto_venta_idventa_idx",
      unique: false,
      type: "BTREE",
      fields: ["idventa"]
    }, {
      name: "ventaproducto_producto_idproducto_idx",
      unique: false,
      type: "BTREE",
      fields: ["idproducto"]
    }]
  };
  const VentaproductoModel = sequelize.define("ventaproducto_model", attributes, options);
  return VentaproductoModel;
};