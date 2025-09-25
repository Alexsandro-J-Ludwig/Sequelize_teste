import Battles from "./Battle.modal";
import { DataTypes, Sequelize } from "sequelize";
import Herois from "../heros/heros.modal";
import Vilians from "../villian/villians.modal";
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
    // Debug: verificar se os modelos estão corretos
    console.log('Vilians model:', Vilians);
    console.log('Herois model:', Herois);
    console.log('Sequelize instance:', this.sequelize);

    Battles.init({
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
    }, {
      sequelize: this.sequelize,
      modelName: 'Battle',
      tableName: 'battle',
      freezeTableName: true,
      timestamps: false,
    });

    return Battles;
  }
}

export { BattleRepository };