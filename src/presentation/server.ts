import { SendEmailLogs } from "../domain/uses-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.sevice";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);
const emailService = new EmailService();



export class Server {

    public static start() {

        console.log('Server started....');

        //todo: Mandar Email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['nedcito21top@gmail.com', 'josugonzal21@gmail.com']
        // )
        // emailService.sendEmailWithFileSystemLogs(
        //     ['nedcito21top@gmail.com', 'josugonzal21@gmail.com']
        // );

        /*CronService.createJob(*/
            // '*/5 * * * * *',
            /*() => {
                const url = 'https://google.com';
                new CheckService(
                    fileSystemLogRepository,j
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error),
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/posts');
            }
        );*/
    }

}
