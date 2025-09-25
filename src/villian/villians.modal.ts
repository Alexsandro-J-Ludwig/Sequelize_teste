import { Model, Optional } from "sequelize";

//Define os atributos de viloes
interface VilianAttribute{
    id?: number, //ID pode receber null
    nome: string,
    poder: number,
    vitorias: number,
    derrotas: number
}

//Define os atributos que podem ser opcionais para o vilão
interface VilianCreationAttibutes extends Optional<VilianAttribute, "id" | "vitorias" | "derrotas">{};

/**
 * A seguir, criamos uma classe filha que estende a classe abstrata Model do Sequelize.
 *
 * - A interface `VilianAttributes` define os atributos obrigatórios e opcionais do modelo Vilian.
 * - A interface `VilianCreationAttributes` estende `Optional` do Sequelize para declarar quais atributos são opcionais durante a criação de uma instância (exemplo: campos gerados automaticamente como id).
 * - A classe `Vilians` implementa `VilianAttributes` e configura os campos e suas propriedades (tipos, se são obrigatórios, valores padrão) dentro do método `init`.
 * 
 * Isso garante tipagem forte e flexibilidade na criação e manipulação dos dados do modelo Vilian.
 */

export class Vilians extends Model<VilianAttribute, VilianCreationAttibutes> implements VilianAttribute{
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

export default Vilians;