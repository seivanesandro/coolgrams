const mongoose = require('mongoose');
//schema possui os modulos, get, post etc
const { Schema } = mongoose;

const photoSchema = new Schema(
    {
        image: String,
        title: String,
        likes: Array,
        comments: Array,
        userId: mongoose.ObjectId,
        userName: String,
    },
    {
        timestamps: true,
    }
);

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;