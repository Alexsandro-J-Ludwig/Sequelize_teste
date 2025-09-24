import Herois from "../modals/heros.modal";
import Connection from "../config/db.config";
import Battles from "../modals/Battle.modal";
import { DataTypes, Sequelize } from "sequelize";

class HeroRepository {
  private sequelize: Sequelize;
  constructor() {
    this.sequelize = new Connection().sequelize;
  }

  static inicialize() {
    new HeroRepository().initHero();
  }

  initHero() {
    const Hero = this.sequelize.define(
      "hero",
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
        freezeTableName: true,
        tableName: "hero",

        timestamps: false,
      }
    );

    Herois.hasMany(Battles, { foreignKey: "id_heroi" });

    return Hero;
  }
}

export { HeroRepository }