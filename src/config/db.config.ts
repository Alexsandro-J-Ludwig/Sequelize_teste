import { Sequelize } from "sequelize";

class Connection{
    sequelize: Sequelize;
    
    constructor(){
        if(!process.env.DATABASE || !process.env.USER || !process.env.PASSWORD){
            throw new Error("Variavesi de ambiente em falta")
        }

        const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5432;

        this.sequelize = new Sequelize({
            host: process.env.HOST,
            database: process.env.DATABASE,
            username: process.env.USER,
            password: process.env.PASSWORD,
            port: port,
            dialect: 'postgres',

        });

        this.connectAlert()
    }

    async connectAlert(){
        console.log("Conectado ao banco de dados");
    }
}

export default Connection;