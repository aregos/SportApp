const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: async function(req, res, next) {
        const {email, login, password} = req.body;
        if (await userModel.findOne({"email" : req.body.email})) {
            res.status(500).json({
                message: 'email уже занят',
                data: req.body.email
            });
        }
        else if (await userModel.findOne({"login" : req.body.login})) {
            res.status(500).json({
                message: 'Имя уже занято',
                data: req.body.login
            });
        }
        else
        userModel.create({
                login : login,
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
                data: {login: req.body.login, email: req.body.email}
            })
        });
    },

    authenticate: function(req, res, next) {
        userModel.findOne({ login : req.body.login}, function(err, userInfo) {
            if (err) {
                next(err);
            } else {
                if ((userInfo != null) && bcrypt.compareSync(req.body.password, userInfo.password)) {

                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '1h'});

                    res.status(200).json({
                        status: 'успешно',
                        message: 'Вы вошли!',
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
    },

    update: function(req, res, next) {
        userModel.updateOne({login: req.body.login}, {name: req.body.name}, function(err, result) {
            if (err) {
                res.status(500).json({error: err})
            }
            else {
                res.status(500).json({result, name: req.body.name})
            }
        })
    }
};