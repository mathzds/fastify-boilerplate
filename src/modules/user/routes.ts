import type { FastifyInstance } from "fastify";
import type handleDatabase from "../../common/database/typeorm";
import userController from "./controller";
import JWTUtils from "../../common/utils/client/jwt";

export default async function userRoutes(fastify: FastifyInstance, dbHandler: handleDatabase) {
    const jwtUtils = new JWTUtils(fastify);
    const controller = new userController(dbHandler, jwtUtils); 

    fastify.get("/user/:id", controller.get.bind(controller));
    fastify.post("/user", controller.create.bind(controller));
    fastify.delete("/user/:id", controller.delete.bind(controller));
    fastify.put("/user/:id", controller.update.bind(controller));

    fastify.post("/user/login", controller.login.bind(controller)); 
    
    fastify.get("/user/me", controller.me.bind(controller));
}
