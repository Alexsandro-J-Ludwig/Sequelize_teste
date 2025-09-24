import { Model, Optional } from "sequelize";
import { HeroRepository } from "../repository/Heros.repository";

//Define os atributos de herois
interface HeroAttributes {
  id?: number; //ID pode receber null
  nome: string;
  poder: number;
  vitorias: number;
  derrotas: number;
}

//Define os atributos que podem ser opcionais para o herois
interface HeroCreationAttributes extends Optional<HeroAttributes, "id" | "vitorias" | "derrotas"> {}

/**
 * A seguir, criamos uma classe filha que estende a classe abstrata Model do Sequelize.
 *
 * - A interface `HeroAttributes` define os atributos obrigatórios e opcionais do modelo Hero.
 * - A interface `HeroCreationAttributes` estende `Optional` do Sequelize para declarar quais atributos são opcionais durante a criação de uma instância (exemplo: campos gerados automaticamente como id).
 * - A classe `Hero` implementa `HeroAttributes` e configura os campos e suas propriedades (tipos, se são obrigatórios, valores padrão) dentro do método `init`.
 * 
 * Isso garante tipagem forte e flexibilidade na criação e manipulação dos dados do modelo Hero.
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
}

export default Herois;