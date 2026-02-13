import type { LogDatasource } from "../../domain/datasources/log.datasource.ts";
import type { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.ts";
import { LogRepository } from "../../domain/repository/log.repository.ts";



export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly logDatasource: LogDatasource,  // <--- Dependency Injection of the LogDatasource
    ) {}


    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

}