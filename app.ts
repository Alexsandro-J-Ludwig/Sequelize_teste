import "dotenv/config"

import express, { Application } from "express";
import cors from 'cors';

import Connection from "./src/config/db.config.ts";

import { HeroRouter } from "./src/heros/Hero.router.ts";
import { VilianRouter } from "./src/villian/Villian.router.ts";

import { BattleRepository } from "./src/battles/Battle.repository.ts";
import { HeroRepository } from "./src/heros/Heros.repository.ts";
import { VillianRepository } from "./src/villian/Villian.repository.ts";

class Server {
    private app:Application;
    private connetion: Connection;

    constructor(){
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());

        this.connetion = new Connection();

        // Instancia as associações
        BattleRepository.inicialize();
        HeroRepository.inicialize();
        VillianRepository.inicialize();

        this.initRoutes();
    }

    private initRoutes(){
        this.app.use("/hero", new HeroRouter().routes());
        this.app.use("/villian", new VilianRouter().routes());
    }

    public async start(){
        try {
            await this.connetion.sequelize.authenticate();
            await this.connetion.sequelize.sync({ alter: true });
            console.log("Banco de dados conectado");

            const port = process.env.APP_PORT || 3000;

            this.app.listen(port, () => {
                console.log(`Servidor conectado na porta: ${port}`);
            });
            
        } catch (err) {
            console.error(`Falha de conexão com o banco de dados: ${err}`);  
        }
    }
}

new Server().start();