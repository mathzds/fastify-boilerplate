import baseRepository from "../../common/utils/database/baseRepository";
import userEntity from "./models/entities/user";
import type handleDatabase from "../../common/database/typeorm";
import type { UserUpdateDTO } from "./models/dto/update-user";
import type { UserDTO } from "./models/dto/create-user";
import databaseError from "../../common/utils/database/databaseErrors";
import Errors from "../../common/utils/client/error";
import type JWTUtils from "../../common/utils/client/jwt";
import type { decode } from "../../common/utils/client/jwt";

export default class userRepository extends baseRepository<userEntity> {
	private jwtUtils: JWTUtils;

	constructor(dbHandler: handleDatabase, jwtUtils: JWTUtils) {
		super(userEntity, dbHandler);

		this.jwtUtils = jwtUtils;
	}

	async get(idenfier: string): Promise<userEntity> {
		return await this.repository?.findOneBy({ id: idenfier }).then((user) => {
			if (!user) {
				throw Errors.userNotFound();
			}
			return user;
		});
	}

	async create(data: userEntity): Promise<UserDTO> {
		try {
			const user = this.repository?.create(data);
			const savedUser = await this.repository?.save(user);
			return savedUser;
		} catch (error) {
			throw databaseError(error);
		}
	}

	async delete(idenfier: string): Promise<string> {
		return await this.repository?.delete(idenfier).then((rows) => {
			if (rows.affected === 0) {
				throw Errors.userNotFound();
			}
			return "Deleted";
		});
	}
	async update(idenfier: string, data: userEntity): Promise<UserUpdateDTO> {
		return await this.repository?.update(idenfier, data).then((rows) => {
			if (rows.affected === 0) {
				throw Errors.userNotFound();
			}
			return this.get(idenfier);
		});
	}

	async login(email: string, password: string): Promise<string> {
		const compare = await this.repository.findOneBy({ email });
		if (!compare) throw Errors.userNotFound();
		if (compare.password !== password) throw Errors.wrongPassword();

		const token = await this.jwtUtils.registerToken({ id: compare.id });

		return token;
	}

	async getMe(token: string): Promise<Omit<decode, "password"> | null> {
		const decode = await this.jwtUtils.decodeToken(token);
		if (!decode) throw Errors.wrongToken();

		return this.repository
			.findOneBy({ id: decode.id })
			.then((user) => {
				if (!user) throw Errors.userNotFound();
				return { id: user.id, username: user.username, email: user.email };
			})
			.catch((error) => {
				throw databaseError(error);
			});
	}
}
