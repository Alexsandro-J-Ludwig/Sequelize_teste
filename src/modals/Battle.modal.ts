import { Model, Optional } from "sequelize";

interface BattleAttibute{
    id?: number;
    id_heroi: number;
    id_vilao: number;
    nome_vencedor: string
    nome_perdedor: string
}

interface BattleCreationAttributes extends Optional<BattleAttibute, "id">{};

export class Battles extends Model<BattleAttibute, BattleCreationAttributes> implements BattleAttibute{
    public id?:number;
    public id_heroi!:number;
    public id_vilao!:number;
    public nome_vencedor!:string;
    public nome_perdedor!:string

}

export default Battles;