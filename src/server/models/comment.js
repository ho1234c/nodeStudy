export default (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment',
        {
            bid : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            content: {type: DataTypes.STRING, allowNull: false},
            like: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
        },
        {
            classMethods:{
                associate: function(models) {
                    Comment.belongsToMany(models.User,{
                        as: 'userFavor',
                        through: 'UserCommentFavor'
                    });
                    Comment.belongsTo(models.List)
                }
            }
        }
    );
    return Comment;
}

