import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import userRoutes from "../../modules/user/routes";
import type handleDatabase from "../../common/database/typeorm";

interface RoutesOptions {
	dbHandler: handleDatabase;
}

const routesHandler: FastifyPluginAsync<RoutesOptions> = async (fastify: FastifyInstance, options: RoutesOptions) => {
	const { dbHandler } = options;
	await userRoutes(fastify, dbHandler);
};

export default routesHandler;
