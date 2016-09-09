export default (sequelize, DataTypes) => {
    const List = sequelize.define('List',
        {
            _id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: DataTypes.STRING, allowNull: false},
            like: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
        },
        {
            classMethods:{
                associate: function(models) {
                    List.hasMany(models.Song);
                    List.belongsTo(models.User, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        }
    );
    return List;
}
