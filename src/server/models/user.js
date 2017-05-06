import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            email: { type: DataTypes.STRING, allowNull: false },
            nickname: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.VIRTUAL, allowNull: true },
            password_hash:{ type: DataTypes.STRING }
        },
        {
            hooks:{
                beforeBulkCreate: hashPasswordHook,
                beforeCreate: hashPasswordHook,
                beforeUpdate: hashPasswordHook
            },
            instanceMethods:{
                authenticate: function (password, callback) {
                    bcrypt.compare(password, this.password_hash, function(err, isMatch) {
                        if (err) {
                            callback(err);
                        }
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
                        foreignKey: 'makerId'
                    });
                    User.hasMany(models.Comment, {
                        foreignKey: 'writerId'
                    });
                }
            }
        }
    );
    return User
}

const hashPasswordHook = (user, options, callback) => {
    let userList = user.length ? user : [user];
    Promise.all(userList.map(userObj => {
        const pwd = userObj.get('password');
        if(!pwd) return null;
        return hashPromise(pwd, 10);
    }))
        .then(hash => {
            for(let i=0; i<userList.length; i++){
                userList[i].set('password_hash', hash[i]);
            }
            return callback(null, options)
        });
};

const hashPromise = (password, salt = 10) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return reject(err);
            resolve(hash)
        })
    })
};