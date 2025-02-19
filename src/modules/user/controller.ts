import type { FastifyReply, FastifyRequest } from "fastify";
import userRepository from "./repository";
import { plainToClass } from "class-transformer";
import { UserDTO } from "./models/dto/create-user";
import { mapDtoToEntity, mapUpdateDtoToEntity } from "./mappers/mapper";
import type handleDatabase from "../../common/database/typeorm";
import { UserUpdateDTO } from "./models/dto/update-user";
import Errors from "../../common/utils/client/error";
import type JWTUtils from "../../common/utils/client/jwt";

export default class userController {
	private repository: userRepository;
	private jwtUtils: JWTUtils

	constructor(dbHandle: handleDatabase, jwtUtils: JWTUtils) {
		this.repository = new userRepository(dbHandle, jwtUtils);
		this.jwtUtils = jwtUtils
	}

	async create(request: FastifyRequest, reply: FastifyReply) {
		try {
			const dto = plainToClass(UserDTO, request.body);
			const userEntity = await mapDtoToEntity(dto);
			const createdUser = await this.repository.create(userEntity);
			return reply.status(201).send({ message: "ok", user: createdUser });
		} catch (error) {
			if (error instanceof Errors) {
				return reply.status(error.statusCode).send({
					error: {
						code: error.code,
						message: error.message
					}
				});
			}
			return reply.status(400).send({ errors: error });
		}
	}

	async get(request: FastifyRequest<{ Params : { id: string }}>, reply: FastifyReply) {
		const id = request.params.id
		const user = await this.repository.get(id);
		return reply.status(200).send({ message: "ok", user: user });
	}

	async delete(request: FastifyRequest<{ Params : { id: string }}>, reply: FastifyReply){
		const id = request.params.id
		await this.repository.delete(id);
		return reply.status(200).send({ message: "ok" });
	}

	async update(request: FastifyRequest<{ Params : { id: string }}>, reply: FastifyReply){
		const id = request.params.id
		const data = request.body;

		const dto = plainToClass(UserUpdateDTO, data);
		try {
			const userEntity = await mapUpdateDtoToEntity(dto);
			const updatedUser = await this.repository.update(id, userEntity);
			return reply.status(200).send({ message: "ok", user: { username: updatedUser.username, password: updatedUser.password} });
		} catch (error) {
			return reply.status(400).send({ errors: error });
		}
	}

	async login(request: FastifyRequest<{ Body: { email: string, password: string }}>, reply: FastifyReply) {
		try {
			const email = request.body.email;
			const password = request.body.password;
			const user = await this.repository.login(email, password);
	
			return reply.status(200).send({ message: "ok", user: user });
		} catch (error) {
			if (error instanceof Errors) {
				return reply.status(error.statusCode).send({
					error: {
						code: error.code,
						message: error.message
					}
				});
			}
			return reply.status(400).send({ errors: error });
		}
	}

	async me(request: FastifyRequest<{ Headers: { Authorization: string }}>, reply: FastifyReply){
		try {
			const token = request.headers.authorization.split(" ")[1];
			const decoded = await this.repository.getMe(token);
			
			return reply.status(200).send({ message: "ok",  decoded });

		} catch (error) {
			if (error instanceof Errors) {
				return reply.status(error.statusCode).send({
					error: {
						code: error.code,
						message: error.message
					}
				});
			}
			return reply.status(400).send({ errors: error });
		}
	}
}
