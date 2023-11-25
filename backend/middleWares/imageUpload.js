//multer funçao de upload de arquivos
const multer = require("multer");
const path = require("path");

// destinaton to store image
const imageStorage = multer.diskStorage({
    //alterar o destino padrao
    destination: (req, file, cb) =>{
        let folder = "";

        if(req.baseUrl.includes("users")){
            folder = "users"
        } else if(req.baseUrl.includes("photos")){
            folder = "photos"
        }

        //destinate of image
        cb(null, `uploads/${folder}`)

    },
    //tratar o nome do arquivo
    filename: (req, file, cb) => {
        cb(null, date.now() + path.extname(file.originalname))  
    }
});

//fazer uma validaçao a imagem e aonde a imagem vai ser guardada
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){

        //upload only png and jpg formts
        return cb(new Error("o formato das imagens devem ser apenas de png e jpg"))
         }
         cb(undefined, true);
    }
});
module.exports = { imageUpload };