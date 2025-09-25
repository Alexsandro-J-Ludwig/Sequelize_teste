import { Router } from 'express';
import  VillainController from "./vilians.controller.js"
import { Auth } from '@/middleware/Auth.middleware.js';

export class VilianRouter {
    private route:Router

    constructor(){
        this.route = Router()

        this.initRoute()
    }

    private initRoute(){
        this.route.post("/createVilian", 
            Auth.validate,
            VillainController.createVillain);
        this.route.get("/getVillian", 
            Auth.validate,
            VillainController.getVillain);
        this.route.put("/updateVillian", 
            Auth.validate,
            VillainController.updateVillain);
        this.route.delete("/deleteVillian", 
            Auth.validate,
            VillainController.deleteVillain);
    }

    public routes(): Router {
        return this.route; // retorna o Router
      }
}