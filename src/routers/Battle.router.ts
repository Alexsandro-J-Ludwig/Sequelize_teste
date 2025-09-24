import { Router } from "express";
import { BattleController } from "../controllers/Battle.controller";

class HeroController{
    private route:Router;

    constructor(){
        this.route = Router()

        this.initRoute();
    }

    private initRoute(){
        this.route.post("/createHero", BattleController.battle);
        this.route.get("/getAllBattles", BattleController.getAllBattles);
        this.route.get("/getBattle/:id", BattleController.getBattle);
        this.route.delete("/deleteBattle", BattleController.deleteBattle);
    }

    public routes(): Router {
        return this.route; // retorna o Router
      }
}

export default HeroController;