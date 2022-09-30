const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idusuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idusuario"
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
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "apellido"
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "correo"
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "password"
    },
    telefono: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "telefono"
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "direccion"
    },
    ciudad: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ciudad"
    },
    categoria: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "categoria"
    },
    idavatar: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idavatar",
      references: {
        key: "idavatar",
        model: "avatar_model"
      }
    },
    datatimeusuario: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "datatimeusuario"
    }
  };
  const options = {
    tableName: "usuario",
    timestamps: false,
    comment: "",
    indexes: [{
      name: "fk_avatar_usuario",
      unique: false,
      type: "BTREE",
      fields: ["idavatar"]
    }]
  };
  // const UsuarioModel = sequelize.define("usuario_model", attributes, options);
  const Usuario = sequelize.define("usuario", attributes, options);

  Usuario.associate = function(models){
    Usuario.hasOne(models.usuario, {
      foreignKey: "idavatar",
      as: "usuario"       
   })
  }

  return Usuario;
};