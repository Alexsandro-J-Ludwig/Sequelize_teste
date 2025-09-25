import { Router } from 'express';
import HeroController from "./heros.controller"
import { Auth } from '@/middleware/Auth.middleware';

export class HeroRouter {
    private route:Router;

    constructor(){
        this.route = Router()

        this.initRoute();
    }

    private initRoute(){
        this.route.post("/createHero", 
            Auth.validate,
            HeroController.createHero);
        this.route.get("/getAllHeros", 
            Auth.validate,
            HeroController.getAllHeros);
        this.route.get("/getHero/:nome", 
            Auth.validate,
            HeroController.createHero);
        this.route.put("/updateHero", 
            Auth.validate,
            HeroController.updateHero);
        this.route.delete("/deleteHero", 
            Auth.validate,
            HeroController.deleteHero);
    }

    public routes(): Router {
        return this.route; // retorna o Router
      }
}