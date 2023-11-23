require('dotenv').config()

const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT;

const app = express();

// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//solve CORS
//nota: este URL e o original, caso seja migrado para um novo ambiente esta URL deve ser mudada
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//DB connections
require("./config/db.js");

//routes
const router = require("./routes/Router.js");
app.use(router);

app.listen(port, ( ) => { 
    console.log(`'aplicaçao em exibiçao na porta ${port}'`)
});

