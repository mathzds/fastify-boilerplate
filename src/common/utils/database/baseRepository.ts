import type { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import type handleDatabase from "../../database/typeorm";

export default abstract class baseRepository<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    constructor(
        private readonly entity: EntityTarget<T>,
        private dbHandler: handleDatabase,
    ) {
        this.repository = this.dbHandler.getRepository(entity);
    }
}
