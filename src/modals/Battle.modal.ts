import Connection from "../config/db.config";
import { DataTypes, Model, Optional } from "sequelize";
import Herois from "./heros.modal";
import Vilians from "./villians.modal";

interface BattleAttibute{
    id?: number;
    id_heroi: number;
    id_vilao: number;
    nome_vencedor: string
}

interface BattleCreationAttributes extends Optional<BattleAttibute, "id">{};

export class Battles extends Model<BattleAttibute, BattleCreationAttributes> implements BattleAttibute{
    public id:number;
    public id_heroi:number;
    public id_vilao:number;
    public nome_vencedor:string;

    static inicialize(){
        const connection = new Connection().sequelize;

        Battles.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id_heroi: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            id_vilao: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            nome_vencedor: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize: connection,
            tableName: "battle",

            timestamps: false
        });
    }
}
Battles.inicialize();

Battles.belongsTo(Herois, { foreignKey: "id_heroi" });
Battles.belongsTo(Vilians, { foreignKey: "id_vilao" });

export default Battles;