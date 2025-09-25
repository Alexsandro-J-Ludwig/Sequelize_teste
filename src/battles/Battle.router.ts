import { Router } from "express";
import { BattleController } from "./Battle.controller"
import { Auth } from "@/middleware/Auth.middleware";

class HeroController {
    private route: Router;

    constructor() {
        this.route = Router()

        this.initRoute();
    }

    private initRoute() {
        this.route.post("/createHero",
            Auth.validate,
            BattleController.battle);
        this.route.get("/getAllBattles",
            Auth.validate,
            BattleController.getAllBattles);
        this.route.get("/getBattle/:id",
            Auth.validate,
            BattleController.getBattle);
        this.route.delete("/deleteBattle",
            Auth.validate,
            BattleController.deleteBattle);
    }

    public routes(): Router {
        return this.route; // retorna o Router
    }
}

export default HeroController;