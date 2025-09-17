import Connection from "../config/db.config";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";

//Define os atributos de viloes
interface HeroAttributes {
  id?: number; //ID pode receber null
  nome: string;
  poder: number;
  vitorias: number;
  derrotas: number;
}

//Define os atributos que podem ser opcionais para o vilão
interface HeroCreationAttributes extends Optional<HeroAttributes, "id" | "vitorias" | "derrotas"> {}

/**
 * A seguir, criamos uma classe filha que estende a classe abstrata Model do Sequelize.
 *
 * - A interface `VilianAttributes` define os atributos obrigatórios e opcionais do modelo Vilian.
 * - A interface `VilianCreationAttributes` estende `Optional` do Sequelize para declarar quais atributos são opcionais durante a criação de uma instância (exemplo: campos gerados automaticamente como id).
 * - A classe `Vilians` implementa `VilianAttributes` e configura os campos e suas propriedades (tipos, se são obrigatórios, valores padrão) dentro do método `init`.
 * 
 * Isso garante tipagem forte e flexibilidade na criação e manipulação dos dados do modelo Vilian.
 */

export class Herois extends Model<HeroAttributes, HeroCreationAttributes> implements HeroAttributes {
    public id!: number;
    public nome!: string;
    public poder!: number;
    public vitorias!: number;
    public derrotas!: number;

    // Campos gerenciados automaticamente pelo Sequelize para controlar timestamps de criação e atualização.
    // São somente leitura (readonly) e do tipo Date.
    // O operador '!' informa ao TypeScript que esses campos serão definidos em tempo de execução pelo ORM.
    //São campos genericos, uteis para logs
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // O modificador 'static' indica que este método pertence à própria classe, e não às suas instâncias.
    // Isso permite chamar o método diretamente pela classe, sem precisar criar um objeto com 'new'.
    static inicialize(){
        const connection = new Connection().sequelize;

        Herois.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        poder: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        vitorias: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        derrotas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
        }, {
        sequelize: connection,
        modelName: "Heroi",
        tableName: "herois",

        // Permite a criação de createdAt e updateAt, de forma padrão este campo sempre é true
        timestamps: true,
        });
    }
}



export default Herois;