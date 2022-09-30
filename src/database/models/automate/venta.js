const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idventa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idventa"
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
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descuento"
    },
    precioventa: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precioventa"
    },
    idusuario: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idusuario",
      references: {
        key: "idusuario",
        model: "usuario_model"
      }
    },
    datatimeventa: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "datatimeventa"
    }
  };
  const options = {
    tableName: "venta",
    comment: "",
    indexes: [{
      name: "venta_usuario_idusuario_idx",
      unique: false,
      type: "BTREE",
      fields: ["idusuario"]
    }]
  };
  const VentaModel = sequelize.define("venta_model", attributes, options);
  return VentaModel;
};