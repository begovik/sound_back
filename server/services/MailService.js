import nodemailer from "nodemailer"

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            // debug: true,
            secure: true,
            greetingTimeout: 10000,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            // tls: {
            //     // do not fail on invalid certs
            //     rejectUnauthorized: false,
            // }
        })

        // console.log("EHLO?");
        // this.transporter.verify(function (error, success) {
        //     console.log("Check mail-server configuration...");
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("Server is ready to take our messages");
        //     }
        // })
    }

    async sendActivationMail(to, link) {

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div> 
                
                `
        })
    }
}

export default new MailService()