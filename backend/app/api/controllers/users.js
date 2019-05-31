const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: async function(req, res, next) {
        const {email, name, password} = req.body;
        if (await userModel.findOne({"email" : req.body.email})) {
            res.status(500).json({
                message: 'email уже занят',
                data: req.body.email
            });
        }
        else if (await userModel.findOne({"name" : req.body.name})) {
            res.status(500).json({
                message: 'Имя уже занято',
                data: req.body.name
            });
        }
        else
        userModel.create({
                name : name,
                email : email,
                password : password
            },
            function(err, result) {
            if (err) {
                res.status(500).json({error: err});
                next(err);
            }
            else
            res.status(200).json({
                message: 'Поздравляем, вы зарегистрированы!',
                data: {login: req.body.name, email: req.body.email}
            })
        });
    },

    authenticate: function(req, res, next) {
        userModel.findOne({ email : req.body.email}, function(err, userInfo) {
            if (err) {
                next(err);
            } else {
                if ((userInfo != null) && bcrypt.compareSync(req.body.password, userInfo.password)) {

                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '1h'});

                    res.status(200).json({
                        status: 'success',
                        message: 'user found!',
                        data: {user: userInfo, token: token}
                    });
                }
                else {
                    res.status(500).json({
                        status: 'error',
                        message: 'Неправильный логин/пароль!',
                    });
                }
            }
        })
    }
};