import dotenv from "dotenv";
dotenv.config();

import express from "express";

import Connection from "./src/config/db.config.ts";

const app = express();
app.use(express.json());

const connetion = new Connection()

connetion.sequelize.authenticate()
    .then(() => {
        console.log("Banco de dados conenctado");

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Servidor rodando na porta: ${process.env.PORT || 3000}`);
    })
})
.catch((err) => {
    console.error(`Falha na conexão com o banco de dados: ${err}`);
    
})
//Entrada das rotas:
//////////////////



