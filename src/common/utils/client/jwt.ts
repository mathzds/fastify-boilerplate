import type { FastifyInstance } from "fastify";
import { FastifyJWT } from "@fastify/jwt";

export interface payload {
	id: string;
}

export interface decode {
	id: string;
	username: string;
	email: string;
	password: string;
}

export default class JWTUtils {
	private server: FastifyInstance;

	constructor(server: FastifyInstance) {
		this.server = server;
	}

	async registerToken(payload: payload): Promise<string> {
		return this.server.jwt.sign(payload);
	}

	async decodeToken(token: string): Promise<decode | null> {
		return this.server.jwt.verify<decode>(token);
	}
}
