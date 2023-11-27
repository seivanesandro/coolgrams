const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose");
//const mongoose = require("mongoose")


const jwtSecret = process.env.JWT_SECRET

// Generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    })
}

// Register user and sign in
const register = async (req, res) => {
    const { name, email, password} = req.body;
    //check if user exists
    const user = await User.findOne({email})

    if(user){
        res.status(422).json({errors: ["por favor, utilize outro e-mail"]})
        return
    }

    //Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //create user in sistem
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    });

    //if user was created successfully, return the token
    if(!newUser){
        res.status(422).json({errors: ['lamentamos, ocorreu um erro inesperado, tente mais tarde por favor!']})
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};

//sign user in 
const login = async ( req, res ) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    //check if user existes
    if(!user) {
        res.status(404).json({erros: ["email ainda nao se encontra registado!"]})
        return
    }


    //check if password matches
    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors: ["password inválida!"]})
        return
    }

    // Return user with token (profileImage pode ser usado no front end ex imagem do usuario)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });
};

//get current logged in user
const getCurrentUser = async(req, res) => {
    const user = req.user;

    res.status(200).json(user)
};

//update an user
const update = async (req, res) => {
   
    const { name, password, bio } = req.body;

    let profileImage = null;

    if (req.file) {
        profileImage = req.file.filename
    }

    const reqUser = req.user;

     const user = await User.findById(
        new mongoose.Types.ObjectId(reqUser._id)
     ).select('-password');

    if(name){
        user.name = name;
    }

    if (password) {
        //Generate password hash
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(
            password,
            salt
        );

        user.password = passwordHash;
    }

    if(profileImage){
        user.profileImage = profileImage;
    }

    if(bio){
        user.bio = bio;
    }

    //metodo para salvar objecto na mongobd
    await user.save();
    res.status(200).json(user);


}


module.exports = {
    register,
    login,
    getCurrentUser,
    update
};