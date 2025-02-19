import { DataSource, type Repository, type EntityTarget, type ObjectLiteral } from "typeorm";
import userEntity from "../../modules/user/models/entities/user";

export default class handleDatabase {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = new DataSource({
            type: "sqlite",
            database: "database.sqlite",
            synchronize: true,
            logging: true,
            entities: [userEntity],
        });
    }

    async create(): Promise<DataSource> {
		try {
			await this.dataSource.initialize();
			console.log("Data Source has been initialized!");
			return this.dataSource;
		} catch (error) {
			console.error("Error during Data Source initialization:", error);
			throw error; 
		}
	}
	

    async close(): Promise<void> {
        if (this.dataSource.isInitialized) {
            await this.dataSource.destroy();
            console.log("Data Source has been closed!");
        }
    }

    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
        return this.dataSource.getRepository(entity);
    }
}
