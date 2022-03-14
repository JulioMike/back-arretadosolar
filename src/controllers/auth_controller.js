const mongoose = require("mongoose");
const Auth = require("../config/auth");

const Users = require("../models/users_model");

module.exports ={
    registerUsers: async (req, res, next) =>{
        try{
            console.log(req.body)
            const users = new Users(req.body);
            const result = await users.save();
            const {senha, ...user} = result.toObject();

            const token = Auth.Sign({user: user.id});

            res.send({user, token});
        }catch(err){
            console.log(err.message);
            if(err.name === "ValidationError"){
                res.status(422).json({erro: err.message});
                return;
            }
            next(err);
        }
    },
    loginUsers: async (req, res, next) =>{
        const [, hash] = req.headers.authorization.split(" ");
        const [email, senha] = Buffer.from(hash, "base64").toString().split(":");

        try{
            const user = await Users.findOne({email, senha});

            if(!user){
                res.status(401).json({msg: "Usuario não Existe...."});
            }

            const token = Auth.Sign({user: user.id});

            res.send({user,token});
        }catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                next(res.status(400).json({mensagem: "Usuario não existe..."}));
                return;
            }
            next(error);
        }
    },
    userOn: async (req,res,next) =>{
        res.send(req.auth);
    }
}