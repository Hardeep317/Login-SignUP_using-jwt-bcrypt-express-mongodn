// const { response } = require('express');
const userModel = require('../Models/userModel');
const {encode, decode} = require('./bcrypt');
const {generateToken, verifyToken} = require('./jwt');

const userExists = async (email) => {
    const user = await userModel.findOne({"email":email});

    if(user){
        return user;
    }else{
        return false;
    }
}


async function register(req,res){
    const body = req.body;
    const response = await userExists(body.email);

    if(response){
        res.status(401).send({
            responseStatus: "Failed",
            data:null,
            message:"",
            error:"User already exists",
            request:"Ok"
        })
        return;
    }else{
        const enpass = encode(body.password);
        body.password = enpass;
        
        const response = await userModel.insertMany([body]);
        response[0].password = "";
        res.status(201).send({
            responseStatus:"Success",
            message:"User registered successfully",
            error:"",
            data:response,
            request:"Ok"
        })
    }
}


async function login(req,res){
    const body = req.body;
    const isUser = await userExists(body.email);

    if(!isUser){
        res.status(501).send({
            responseStatus:"Failed",
            request:"Ok",
            error:"User does not exist",
            token:null,
            message:"",
            data:null,
            _id:null
        })
        return;
    }

    const isPassOk = decode(body.password, isUser.password);
    if(isPassOk){
        let payload = {
            name:isUser.name,
            email:isUser.email,
            _id:isUser._id
        }
        const token = generateToken(payload);
        res.status(200).send({
            responseStatus:"Success",
            token:token,
            data:payload,
            request:"Ok",
            error:"",
            message:"Login successful",

        })
    }else{
        res.status(404).send({
            responseStatus:"Failed",
            error:"Incorrect password",
            message:"",
            token:null,
            data:null,
            request:"Ok"
        })
    }
}

module.exports = {login, register}