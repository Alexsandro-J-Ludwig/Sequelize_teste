import { Router } from 'express';
import  VillainController from "../controllers/vilians.controller.ts"

export class VilianRouter {
    private route:Router

    constructor(){
        this.route = Router()

        this.initRoute()
    }

    private initRoute(){
        this.route.post("/createVilian", VillainController.createVillain);
        this.route.get("/getVillian", VillainController.getVillain);
        this.route.put("/updateVillian", VillainController.updateVillain);
        this.route.delete("/deleteVillian", VillainController.deleteVillain);
    }

    public routes(): Router {
        return this.route; // retorna o Router
      }
}