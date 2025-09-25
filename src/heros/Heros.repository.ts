import { DataTypes, Sequelize } from "sequelize";
import Connection from "../config/db.config";
import Herois from "./heros.modal";

class HeroRepository {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Connection().sequelize;
  }

  static inicialize() {
    new HeroRepository().initHero();
  }

  initHero() {
    Herois.init(
      {
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
          defaultValue: 0,
        },
        derrotas: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize: this.sequelize,
        modelName: 'Hero',
        tableName: "hero",
        freezeTableName: true,
        timestamps: false,
      }
    );

    return Herois;
  }
}

export { HeroRepository };
