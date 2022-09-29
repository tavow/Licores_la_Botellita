const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idimagen: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idimagen"
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombre"
    }
  };
  const options = {
    tableName: "imagen",
    comment: "",
    indexes: []
  };
  const ImagenModel = sequelize.define("imagen_model", attributes, options);
  return ImagenModel;
};