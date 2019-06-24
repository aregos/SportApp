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

    updateUserInfo: function(req, res, next) {
        userModel.updateOne({login: req.body.login}, {...req.body.updateInfo}, function(err, result) {
            if (err) {
                res.status(500).json({error: err});
                next(err);
            }
            else {
                res.status(200).json({result, ...req.body.updateInfo})
            }
        })
    },

    getUserInfo: function(req, res, next) {
        userModel.findOne({login: req.body.login}, function(err, result) {
            if (err) {
                res.status(500).json({error: err, message: 'Никого не найдено?'});
                next(err);
            }
            else {
                res.status(200).json({user: result})
            }
        })
    },

    updateSettingsList: function(req, res, next) {
        userModel.updateOne({login: req.body.login}, {settingsList: req.body.settingsList}, function(err, result) {
            if (err) {
                res.status(500).json({error: err, message: 'Не найден пользователь или не удалось обновить список настроек'});
                next(err);
            }
            else {
                res.status(200).json({settingsList: req.body.settingsList});
                next(result);
            }
        })
    },

    getSettingsList: function(req, res, next) {
        if (req.body.login) {
            userModel.findOne({login: req.body.login}, function(err, result) {
                if (err) {
                    res.status(500).json({
                        error: err,
                        message: 'Не удалось получить данные настроек пользователя, загружаем стандартные'
                    });
                    next(err);
                } else {
                    res.status(200).json({settingsList: result.settingsList})
                }
            })
        }
        else res.status(500).json({message: 'Не удалось получить логин пользователя'})
    },

    searchFriends: function(req, res, next) {
        if (req.body.name) {
            userModel.find({name: req.body.name}, function(err, result) {
                if (err) {
                    res.status(500).json({message: `не найдено пользователей с именем ${req.body.name}`});
                    next(err)
                } else {
                    //возвращаем id, name, surName найденных пользователей
                    let peopleList = [...result].map(item => {
                        return {
                            id: item._id,
                            name : item.name,
                            surName: item.surName
                        }
                    });
                    res.status(200).json({peopleList})
                }
            })
        } else {
            res.status(500).json({message: `не задано имя`})
        }
    },

    addFriend: function(req, res, next) {
        userModel.findById(req.body.id, function(err, result) {
            if (err) {
                res.status(500).json({error: err, message: 'Не удалось найти профиль'})
            }
            else {
                const friendsOutRequests = [...result.friendsOutRequests];
                if (friendsOutRequests.includes(req.body.friendId)) {
                    res.status(500).json({message: 'Вы уже отправили заявку этому пользователю'})
                } else {
                    userModel.findOneAndUpdate({_id: req.body.id}, {friendsOutRequests: req.body.friendId}, function(err, result) {
                        if (err) {
                            res.status(500).json({error: err, message: 'Произошла ошибка при попытке добавления в друзья'})
                        } else {
                            userModel.findOneAndUpdate({_id: req.body.friendId}, {friendsInRequests: req.body.id}, function(err, result) {
                                if (err) {
                                    res.status(500).json({err, message: 'Произошла ошибка при попытке добавления в друзья'})
                                } else {
                                    res.status(200).json({message: 'Заявка на добавление в друзья отправлена'})
                                }
                            });
                        }
                    })
                }
            }
        }
        )
    },

    getFriendsInRequests: function(req, res, next) {
        userModel.findById(req.body.id, function(err, result) {
            if (err) {
                res.status(500).json({error: err, message: 'Не найден пользователь'});
            } else {
                res.status(200).json({friendsRequests: result.friendsInRequests});
            }
        })
    }
};