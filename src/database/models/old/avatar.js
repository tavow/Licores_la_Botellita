module.exports = (sequelize, DataTypes) =>{
    let alias = 'Avatars';
    let cols =  {
        idAvatar:{
            type: DataTypes.INTEGER, 
            primarykey: true
            },
        AvatarName:{
            type: DataTypes.STRING(100)
            }
    };
    let config ={
        tableName: 'avatar',
        timestamps: false
    }
    let image = sequelize.define(alias,cols, config);

    return image;
}
