const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idusuario: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100)
    },
    apellido: {
      type: DataTypes.STRING(100)
    },
    correo: {
      type: DataTypes.STRING(100)
    },
    password: {
      type: DataTypes.STRING(100)
    },
    telefono: {
      type: DataTypes.INTEGER(11)
    },
    direccion: {
      type: DataTypes.STRING(255)
    },
    ciudad: {
      type: DataTypes.STRING(100)
    },
    categoria: {
      type: DataTypes.INTEGER(4)
    },
    img: {
      type: DataTypes.STRING(100)
    },
    datatimeusuario: {
      type: DataTypes.DATE
    }
  };
  const options = {
    tableName: "usuario",
    timestamps: false,
    comment: "",
    indexes: [{
      name: "idusuario_idx",
      unique: false,
      type: "BTREE",
      fields: ["idusuario"]
    }]
  };
  const Usuario = sequelize.define("usuario", attributes, options);
  return Usuario;
};