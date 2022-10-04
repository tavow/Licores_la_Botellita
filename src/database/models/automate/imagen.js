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
    nombreimagen: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombreimagen"
    }
  };
  const options = {
    tableName: "imagen",
    timestamps: false,
    comment: "",
    indexes: []
  };
  // const ImagenModel = sequelize.define("imagen_model", attributes, options);
  const Imagen = sequelize.define("imagen", attributes, options);

  Imagen.associate = function(models){
    Imagen.belongsTo(models.producto, {
      foreignKey: "idimagen",
      as: "producto"       
   })
  }

  return Imagen;
};