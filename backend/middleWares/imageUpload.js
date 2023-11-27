const multer = require('multer');
const path = require('path');

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '';

        if (req.baseUrl.includes('users')) {
            folder = 'users';
        } else if (
            req.baseUrl.includes('photos')
        ) {
            folder = "photos";
        }
        cb(null, `uploads/${folder}/`);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() +
                path.extname(file.originalname)
        );
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (
            !file.originalname.match(
                /\.(png|jpg)$/i 
                //  /\.(png|jpg)$/i   le ficheiros PNG E JPG em maiusculas e minusculas alternativa a 1 opçao
                // /\.(png|jpg|PNG|JPG)$/ le ficheiros PNG E JPG em maiusculas e minusculas
                // /\.(png|jpg)$/   apenas le ficheiro png e jpg em minusculas
            )
        ) {
            // upload only png and jpg format
            return cb(
                new Error(
                    'Por favor, envie apenas png ou jpg!'
                )
            );
        }
        cb(undefined, true);
    }
});

module.exports = { imageUpload };
