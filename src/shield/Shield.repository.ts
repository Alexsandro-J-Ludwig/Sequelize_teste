import Agentes from "./Shield.model";
import Connection from "../config/db.config";
import { DataTypes, Sequelize } from "sequelize";

class ShieldRepository {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Connection().sequelize;
  }

  static inicialize(){
    new ShieldRepository().initAgente();
  }

  initAgente() {
    Agentes.init(
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
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
      },
      {
        sequelize: this.sequelize,
        modelName: 'Agentes',
        tableName: "Agentes",
        freezeTableName: true,
        timestamps: false,
      }
    );

    return Agentes;
  }
}

export { ShieldRepository };
