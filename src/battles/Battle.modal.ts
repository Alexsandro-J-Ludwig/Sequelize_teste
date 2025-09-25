import { Model, Optional } from "sequelize";

interface BattleAttributes{
    id?: number;
    id_heroi: number;
    id_vilao: number;
    nome_vencedor: string;
    nome_perdedor: string;
}

interface BattleCreationAttributes extends Optional<BattleAttributes, "id">{};

export class Battles extends Model<BattleAttributes, BattleCreationAttributes> implements BattleAttributes{
    public id?:number;
    public id_heroi!:number;
    public id_vilao!:number;
    public nome_vencedor!:string;
    public nome_perdedor!:string;

    // Campos gerenciados automaticamente pelo Sequelize para controlar timestamps de criação e atualização.
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Battles;