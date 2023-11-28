const express = require("express")
const router = express.Router()

// Controller
const {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
} = require('../controllers/UserController');

//middlewares
const validate = require('../middleWares/handleValidation');
const {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
} = require('../middleWares/userValidations');
const authGuard = require('../middleWares/authGuard');
const { imageUpload } = require("../middleWares/imageUpload");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser );
router.put('/', authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update);
router.get("/:id", getUserById)


module.exports = router