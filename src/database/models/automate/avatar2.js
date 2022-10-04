const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idavatar: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idavatar"
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
    tableName: "avatar",
    comment: "",
    indexes: []
  };
  // const AvatarModel = sequelize.define("avatar_model", attributes, options);
  const Avatar = sequelize.define("avatar", attributes, options);

  Avatar.associate = function(models){
    Avatar.belongsTo(models.usuario, {
      foreignKey: "idavatar",
      as: "usuario"       
   })
  }


  return Avatar;
};