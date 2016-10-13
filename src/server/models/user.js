import bcrypt from 'bcryptjs'

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User',
        {
            id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            email: {type: DataTypes.STRING, allowNull: false},
            nickname: {type: DataTypes.STRING, allowNull: false},
            password: {type: DataTypes.VIRTUAL, allowNull: false},
            password_hash:{type: DataTypes.STRING}
        },
        {
            hooks:{
                beforeCreate: hashPasswordHook,
                beforeUpdate: hashPasswordHook
            },
            instanceMethods:{
                authenticate: function (password, callback) {
                    bcrypt.compare(password, this.password_hash, function(err, isMatch) {
                        if (err) return callback(err);
                        callback(null, isMatch);
                    })

                }
            },
            classMethods:{
                associate: function(models) {
                    User.belongsToMany(models.List, {
                        as: 'listFavor',
                        through: 'UserListFavor'
                    });
                    User.belongsToMany(models.Comment, {
                        as: 'commentFavor',
                        through: 'UserCommentFavor'
                    });
                    User.hasMany(models.List, {
                        foreignKey: {
                            name: 'makerId'
                        }
                    });
                    User.hasMany(models.Comment, {
                        foreignKey: {
                            name: 'writerId'
                        }
                    });
                }
            }
        }
    );
    return User
}

const hashPasswordHook = (user, options, callback) => {
    bcrypt.hash(user.get('password'), 10, (err, hash)=>{
        if (err){
            return callback(err)
        }
        user.set('password_hash', hash);
        return callback(null, options)
    })
};