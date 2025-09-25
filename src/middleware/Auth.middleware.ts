import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class Auth {
    static async validate(req:Request, res:Response, next:NextFunction){
        const accessToken = req.headers.authorization
        const token = accessToken && accessToken.split("")[0];

        if(!token) return res.status(401).send({ msg:"Token não encontrado"})

        try {
            const validate = jwt.verify(token, process.env.SJWT || "chave");

            (req as any).user = validate

            next()
        } catch (err:any) {
            return res.status(500).send({ msg:err.message })
        }
        
    }
}

export { Auth }