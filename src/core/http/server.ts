import Fastify, { type FastifyInstance } from "fastify";
import clientConfig from "../../common/utils/client/config";
import routesHandler from "./routes";
import handleDatabase from "../../common/database/typeorm";
import fastifyJwt from "@fastify/jwt";
import JWTUtils from "../../common/utils/client/jwt";


export default class Server {
	private server: FastifyInstance;
	private config: typeof clientConfig;
	private database: handleDatabase;
	private jwtUtils: JWTUtils;

	constructor() {
		this.server = Fastify({ logger: true });
		this.config = clientConfig;
		this.database = new handleDatabase();
		this.jwtUtils = new JWTUtils(this.server);
	}

	async register() {
		await this.server.register(fastifyJwt, {
			secret: this.config.secret,
		});

		await this.server.register(routesHandler, {
			dbHandler: this.database,
			prefix: "/api/v1",
		});
	}

	async start() {
		await this.database.create();
		await this.register();
		this.server
			.listen({
				port: this.config.hostPort,
			})
			.then(() => {
				console.log(`Server listening on port ${this.config.hostPort}`);
			})
			.catch((error) => {
				console.error(error);
				process.exit(1);
			});
	}
}
