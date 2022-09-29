module.exports = (sequelize, dataTypes) => {
    let alias = 'Users'; // siempre al incio en mayus, y plural //

    let columns = {
        idUser: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(100)
        },
        apellido: {
            type: dataTypes.STRING(100)
        },
        correo: {
            type: dataTypes.STRING(100)
        },
        password: {
            type: dataTypes.STRING(100)
        },
        telefono: {
            type: dataTypes.STRING(100)
        },
        direccion: {
            type: dataTypes.STRING(255)
        },
        ciudad: {
            type: dataTypes.STRING(100)
        },
        categoria: {
            type: dataTypes.TINYINT
        },
        datatimeProduct: {
            type: dataTypes.DATE
        },
        IdImageUser: {
            type: dataTypes.INTEGER
        }


        //user.removeAttribute('id')
    };

    let config = {
        tableName: 'user',
        timestamps: false
    }
    let user = sequelize.define(alias, columns, config); // nombre de let debe ser igual al return. //

    return user;
}
