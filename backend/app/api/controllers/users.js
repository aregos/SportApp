const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: async function(req, res, next) {
        const {email, login, password} = req.body;
        if (await userModel.findOne({"email" : req.body.email})) {
            return res.json({status: 'error', message: 'there is user with this email', data: {email: email}})
        }
        else if (await userModel.findOne({"name" : req.body.name})) {
            return res.json({status: 'error', message: 'there is user with this name', data: {name: login}})
        }
        else
        userModel.create({
                name : login,
                email : email,
                password : password
            },
            function(err, result) {
            if (err) {
                next(err);
            }
            else
            res.json({status: 'success', message: 'User added successfully!', data: result})
        });
    },

    authenticate: function(req, res, next) {
        userModel.findOne({ email : req.body.email}, function(err, userInfo) {
            if (err) {
                next(err);
            } else {
                if ((userInfo != null) && bcrypt.compareSync(req.body.password, userInfo.password)) {

                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '1h'});

                    res.json({status: 'success', message: 'user found!', data: {user: userInfo, token: token}});
                }
                else {
                    
                    res.json({status: 'error', message: 'invalid email/password!', data: null});
                }
            }
        })
    }
}