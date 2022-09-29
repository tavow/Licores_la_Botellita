module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let columns = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(100)
        },
        descripcion: {
            type: dataTypes.STRING(200)
        },
        precio: {
            type: dataTypes.DOUBLE
        },
        descuento: {
            type: dataTypes.STRING(100)
        },
        categoria: {
            type: dataTypes.STRING(100)
        },
        tamano: {
            type: dataTypes.STRING(100)
        },
        tipo: {
            type: dataTypes.STRING(100)
        },
        idImage: {
            type: dataTypes.INTEGER
        },
        datatimeProduct: {
            type: dataTypes.DATE
        }
    };

    let config = {
        tableName: 'product',
        timestamps: false
    }
    let product = sequelize.define(alias, columns, config);

    return product;
}
