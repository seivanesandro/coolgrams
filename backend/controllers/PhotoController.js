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


//delete a photo from bd
const deletePhoto = async(req, res) => {
    const { id } = req.params;

    const reqUser = req.user;

    try {
        const photo = await Photo.findById(
            new mongoose.Types.ObjectId(id)
        );

        // Check if photo exists
        if (!photo) {
            res.status(404).json({
                errors: ['Foto não encontrada!']
            });
            return;
        }

        // Check if photo belongs to user
        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({
                errors: [
                    'Ocorreu um erro, tente mais tarde'
                ]
            });
            return;
        }

        await Photo.findByIdAndDelete(photo._id);

        res.status(200).json({
            id: photo._id,
            message: 'A Foto foi excluída.'
        });
    } catch (error) {
        res.status(404).json({
            errors: ['A Foto não foi encontrada!']
        });
        return;
    }
};

// get all photos
const getAllPhotos = async(req, res) => {

    const photos = await Photo.find({}).sort([["createAt", -1]]).exec()

    return res.status(200).json(photos);
}

// Get user photos
const getUserPhotos = async(req, res) => {

    const {id} = req.params
    const photos = await Photo.find({ userId: id })
        .sort([['createdAt', -1]])
        .exec();

    return res.status(200).json(photos);
}

//get photo by id
const getPhotoById = async (req, res) => {
    const { id } = req.params;

    /* const photo = await Photo.findById(
        new mongoose.Types.ObjectId(id)
    ); */

    const photo = await Photo.findById(id);

    // Check if photo exists
    if (!photo) {
        res.status(404).json({
            errors: ['Foto não encontrada!']
        });
        return;
    }

    res.status(200).json(photo);
};

// Update a photo
const updatePhoto = async(req, res) => {

    const {id} = req.params
    const {title} = req.body

    let image;

    if(req.file) {
        image = req.file.filename;
    }

    const reqUser = req.user
    const photo = await Photo.findById(id);

    // check if photo exists
    if(!photo){
        res.status(404).json({
            errors: ['Foto não encontrada!']
        });
        return;
    }

    // check if photo belongs to user
    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({
            errors: [
                "Lamentamos, ocorreu um erro inesperado, tente novamente por favor!"
            ]
        });
        return;
    };

    if(title){
        photo.title = title;
    }

    if (image) {
        photo.image = image;
    }

    await photo.save();

    res.status(200).json({
        photo,
        message: 'Foto atualizada, com sucesso!'
    });
};

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto
};