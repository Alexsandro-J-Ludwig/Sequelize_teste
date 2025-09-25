import { Router } from 'express';
import { ShieldController } from "./Shield.controller"
import { Auth } from '@/middleware/Auth.middleware';

export class VilianRouter {
    private route:Router

    constructor(){
        this.route = Router()

        this.initRoute()
    }

    private initRoute(){
        this.route.post("/createAgent", 
            Auth.validate,
            ShieldController.createAgent);
        this.route.post("/getAgent", 
            Auth.validate,
            ShieldController.getAgent);
    }

    public routes(): Router {
        return this.route; // retorna o Router
      }
}