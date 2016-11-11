export default (sequelize, DataTypes) => {
    const List = sequelize.define('List',
        {
            id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: DataTypes.STRING, allowNull: false},
            detail: {type: DataTypes.STRING, allowNull: false, defaultValue: 'No description'},
            like: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
            songInfo: {type: DataTypes.TEXT, allowNull: false},
            thumbnail: {type: DataTypes.STRING, defaultValue: 'default.png'}
        },
        {
            classMethods:{
                associate: function(models) {
                    List.belongsTo(models.User, {
                        foreignKey: 'makerId',
                    });
                    List.belongsToMany(models.User, {
                        as: 'favor',
                        through: 'UserListFavor'
                    });
                    List.hasMany(models.Comment)
                }
            }
        }
    );
    return List;
}
