const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const errorValidation = validationResult(req)
        if (!errorValidation.isEmpty()) {
            const error = new Error('please input required information')
            error.statusCode = 422;
            error.validation = errorValidation.array();
            throw error;
        }

        const exitmail = await User.findOne({ email: email })
        if (exitmail) {
            const error = new Error('this Email is not avaliable')
            error.statusCode = 403;
            throw error;
        }

        //const user = await User.find();
        let user = new User
        user.name = name
        user.email = email
        user.password = await user.encryptPassword(password)

        await user.save()
        res.status(201).json({
            data: user
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user =  await User.findOne({email:email})
        if (!user) {
            const error = new Error('Email not found')
            error.statusCode = 401
            throw error
        }
        const validPassword = await user.validPassword(password)
        if (!validPassword) {
            const error = new Error('Password or Email Incorrect')
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({id:user.id,role:user.role},config.JWT_SECRET,{expiresIn: '5 days'});

        const expiresIn = jwt.decode(token)

        return  res.json({
            access_token: token,
            expires_in: expiresIn,
            token_type: 'Bearer',
            message: 'logined'
        });

    } catch (error) {
        next(error)
    }
}

exports.me = async (req,res,next) => {
     res.json({
         user:{
             id:req.user.id,
             name:req.user.name,
             email:req.user.email,
             role:req.user.role
         }
     });
}