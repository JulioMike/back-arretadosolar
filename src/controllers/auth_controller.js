const mongoose = require("mongoose");
const Auth = require("../config/auth");

const Users = require("../models/users_model");

module.exports ={
    registerUsers: async (req, res, next) =>{
        try{
            const users = new Users(req.body);
            const result = await users.save();
            const {senha, ...user} = result.toObject();

            const token = Auth.Sign({user: user.id});

            res.send({user, token});
        }catch(err){
            console.log(error.message);
            if(error.name === "ValidationError"){
                res.status(422).json({erro: error.message});
                return;
            }
            next(error);
        }
    },
    loginUsers: async (req, res, next) =>{

    },
    userOn: async (req,res,next) =>{

    }
}