import { Router } from 'express';
import HeroController from '../controllers/heros.controller.ts';

export class HeroRouter {
    private route:Router;

    constructor(){
        this.route = Router()

        this.initRoute();
    }

    private initRoute(){
        this.route.post("/createHero", HeroController.createHero);
        this.route.get("/getAllHeros", HeroController.getAllHeros);
        this.route.get("/getHero/:nome", HeroController.createHero);
        this.route.put("/updateHero", HeroController.updateHero);
        this.route.delete("/deleteHero", HeroController.deleteHero);
    }

    public routes(): Router {
        return this.route; // retorna o Router
      }
}