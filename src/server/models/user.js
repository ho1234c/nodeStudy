import bcrypt from 'bcryptjs'

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User',
        {
            _id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
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
                    bcrypt.compare(password, this.password_hash, (err, isValid) => {
                        if(err){
                            return callback(err)
                        } else{
                            return callback(null, isValid)
                        }
                    })
                }
            },
            classMethods:{
                associate: function(models) {
                    User.hasMany(models.Song);
                    User.hasMany(models.List);

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