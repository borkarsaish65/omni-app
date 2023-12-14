const sequelize = require('sequelize');
const Sequelize = require('../services/db');
const userModel = require('../model/user')(Sequelize, sequelize);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

function validatePassword(password) {
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    return passwordRegex.test(password);
}

function validateNameId(name_id) {
    // alphanumeric string between 3 to 15 characters
    const nameIdRegex = /^[a-zA-Z0-9]{3,15}$/;

    return nameIdRegex.test(name_id);
}


class UserController {

    signUp = async (req, res, next) => {

        console.log(req.body)

        let {
            name_id,
            password
        } = req.body;

        console.log(name_id, password);
        if (!name_id || !password) {
            return res.status(400).json({
                error: 'name_id and password are required.'
            });
        }

        let existingRecord = await userModel.findOne({
            where: {
                name_id
            },
            raw: true
        })

        if (existingRecord) {
            return res.status(400).json({
                error: 'user with that name_id already exists.'
            });
        }

        let isPasswordValid = validatePassword(password);
        let isNameIdValid = validateNameId(name_id);

        if (!isPasswordValid) {
            return res.status(400).json({
                error: 'Password does not meet the criteria.Need minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number'
            });
        }

        if (!isNameIdValid) {
            return res.status(400).json({
                error: 'name_id does not meet the criteria.Need minimum 3 characters, maximum 15 character and alphanumeric string.'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        let createUserStatus = await userModel.create({
            name_id,
            password: hashedPassword
        })

        if (createUserStatus) {
            return res.status(200).send({
                message: 'Account successfully created!'
            })
        }

        res.status(500).send({
            message: 'Internal Server Error'
        })

    }
    login = async (req, res, next) => {

        console.log(req.body)

        let {
            name_id,
            password
        } = req.body;

        console.log(name_id, password);
        if (!name_id || !password) {
            return res.status(400).json({
                error: 'name_id and password are required.'
            });
        }

        let userRecord = await userModel.findOne({
            where: {
                name_id
            },
            raw: true
        })

        if (!userRecord) {
            return res.status(400).json({
                error: 'name_id or password is invalid!'
                 // The generic error message is used intentionally for security reasons.
                // It prevents hackers from pinpointing the exact issue and helps protect user accounts. 
            });
        }

        let isPasswordValid = await bcrypt.compare(password,userRecord.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                error: 'name_id or password is invalid!'   
                // The generic error message is used intentionally for security reasons.
                // It prevents hackers from pinpointing the exact issue and helps protect user accounts. 
            });
        }

        const token = jwt.sign({ id:userRecord.id,name_id }, jwtSecret, { expiresIn: '1h' });

        res.status(200).send({
            token
        })

    }
    getAllUsers = async(req,res,next)=>{

    let listOfAllUsers = await userModel.findAll({
        attributes:['name_id','id'],
        raw:true
    })        

    res.status(200).send({
        listOfAllUsers
    })


    }
}

module.exports = new UserController;