//fazer a connecçao ao mongoBD
//username mongo: seivanesandro
//pdw: WxaDnkGV2lTz9jo6
//mongodb+srv://seivanesandro:<password>@cluster0.k7r50fh.mongodb.net/?retryWrites=true&w=majority


const mongoose = require('mongoose');

//connection
const dbUser = process.env.BD_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
    try {

        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.k7r50fh.mongodb.net/?retryWrites=true&w=majority`
        );

        //testar connecção
        console.log('connecção ao mongoDB realizada com sucesso!')

        return dbConn;

    } catch (error) {

        console.log('ERROR:', error)
    }
}

conn()
module.exports = conn;

