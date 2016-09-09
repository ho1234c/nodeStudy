export default (sequelize, DataTypes) => {
    const Song = sequelize.define('Song',
        {
            _id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            info: {type: DataTypes.STRING, allowNull: false},
        },
        {
            classMethods:{
                associate: function(models) {
                    Song.belongsTo(models.User, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            allowNull: false
                        }
                    });
                    Song.belongsTo(models.List, {
                        foreignKey: {
                            allowNull: true
                        }
                    });
                }
            }
        }
    );
    return Song
}
