import Battles from "../modals/Battle.modal";
import { DataTypes, Sequelize } from "sequelize";
import Herois from "../modals/heros.modal";
import Vilians from "../modals/villians.modal";
import Connection from "../config/db.config";

class BattleRepository {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Connection().sequelize;
  }

  static inicialize() {
    new BattleRepository().initBattle();
  }

  initBattle() {
    const Battle =this.sequelize.define(
      "battle",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_heroi: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_vilao: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nome_vencedor: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nome_perdedor: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: "battle",

        timestamps: false,
      }
    );

    Vilians.hasMany(Battles, { foreignKey: "id_vilao" });
    Herois.hasMany(Battles, { foreignKey: "id_heroi" });

    return Battle
  }
}

export { BattleRepository }