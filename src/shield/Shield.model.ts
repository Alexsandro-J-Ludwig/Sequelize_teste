import { Model, Optional } from "sequelize";

interface ShieldAttributes{
    id?: number;
    nome: string;
    senha: string;
}

interface ShieldCreateAttribute extends Optional<ShieldAttributes, "id">{};

export class Agentes extends Model<ShieldAttributes, ShieldCreateAttribute> implements ShieldAttributes{
    public id?:number;
    public nome!:string;
    public senha!:string;

    // Campos gerenciados automaticamente pelo Sequelize para controlar timestamps de criação e atualização.
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Agentes;