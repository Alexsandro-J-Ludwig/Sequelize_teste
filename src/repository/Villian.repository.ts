import Vilians from "../modals/villians.modal";
import Connection from "../config/db.config";
import Battles from "../modals/Battle.modal";
import { DataTypes, Sequelize } from "sequelize";

class VillianRepository {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Connection().sequelize;
  }

  static inicialize(){
    new VillianRepository().initVillian();
  }

  initVillian() {
    const Villian = this.sequelize.define(
      "villian",
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
        tableName: "villian",

        timestamps: false,
      }
    );

    Vilians.hasMany(Battles, { foreignKey: "id_vilao" });

    return Villian;
  }
}

export { VillianRepository };
