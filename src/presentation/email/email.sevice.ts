import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin.ts';
import type { LogRepository } from '../../domain/repository/log.repository.ts';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity.ts';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}



export class EmailService {
  
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() {}


    async sendEmail(options: SendMailOptions):Promise<boolean> {
    
        const { to, subject, htmlBody, attachments = [] } = options;


        try {

            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachments,
            });

            // console.log(sendInformation);

            return true;
        } catch (error) {   
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(
        to: string | string[],
    ) {
        const subject = 'File System Logs (Log del servidor)'
        const htmlBody = `
        <h1>File System Logs</h1>
        <p>Attached are the logs from the server's file system.</p>
        <p>Ver logs Adjuntos</p>
        `;

        const attachments: Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })

    }

}
