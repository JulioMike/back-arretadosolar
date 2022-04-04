const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { connection } = require("./config/connect");
const app = express();

const project_routes = require('./routes/project_routes');
const users_router = require('./routes/users_routes');
const auth_router = require('./routes/auth_routes');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(project_routes);
app.use(users_router);
app.use(auth_router);

app.listen(process.env.PORT || 3333, ()=>{
    console.log("Servidor rodando.")
})