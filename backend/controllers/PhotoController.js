const Photo = require("../models/Photo")

const mongoose = require("mongoose");
const User = require("../models/User");

// Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    // create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    });

    // If photo was created sucessfully, return data
    if (!newPhoto) {
        res.status(422).json({
            errors: [
                'Ocorreu um erro Interno, por favor tente novamente mais tarde.'
            ]
        });
        return;
    }

    res.status(201).json(newPhoto);
};

module.exports = {
    insertPhoto
};