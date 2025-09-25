import Vilians from "./villians.modal";
import Connection from "../config/db.config";
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
    Vilians.init(
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
        modelName: 'Villian',
        tableName: "villian",
        freezeTableName: true,
        timestamps: false,
      }
    );

    return Vilians;
  }
}

export { VillianRepository };
