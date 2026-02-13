import { CheckService } from "../domain/uses-cases/checks/check-service.ts";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.ts";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.ts";
import { CronService } from "./cron/cron-service.js";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);




export class Server {

    public static start() {

        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error),
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/posts');
            }
        );
    }

}
