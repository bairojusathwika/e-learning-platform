const express = require("express");
const router = express.Router();


const home = async (req,res) =>{
    try {
        res.status(200).json({ message: "welcome" });
    } catch (error) {
        console.log(error);
    }
}

const register = async (req,res) =>{
    try {
        console.log(req.body)
        res.status(200).json({ message: req.body });
    } catch (error) {
        console.log(error);
    }  

}

const login = async (req,res) =>{
    try {
        console.log(req.body)
        res.status(200).json({message: req.body});
    } catch (error) {
       console.log(error); 
    }
}

const profile = async (req,res) =>{
    try {
        console.log(req.body)
        res.status(200).json({message: req.body})
    } catch (error) {
        console.log(error);
    }
}

const course = async(req,res) =>{
    try {
        console.log(req.body)
        res.status(200).json({message: req.body});
    } catch (error) {
        console.log(error);
    }
}

const enrolled = (req,res) =>{
    try {
        console.log(req.body)
        res.status(200).json({message: req.body})
    } catch (error) {
        console.log(error);
    }
}


module.exports = {home,register,login,profile,course,enrolled};