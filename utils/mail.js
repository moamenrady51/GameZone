const nodemailer = require('nodemailer');
const pug = require('pug');





module.exports = class Email{

    constructor(user , url){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = 'moamen.elmoharby.51@gmail.com'
    }

    newTransport(){
        return nodemailer.createTransport({
            host : "sandbox.smtp.mailtrap.io",
            auth :{
                user:"0f2877699e47e5",
                pass:"92e92e01eb01b4"
            }
        });
    };

    async send(template , subject){

        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug` , 
        {
            firstName: this.firstName,
            url: this.url,
            subject
        })
        const mailOptions = {
            from : this.from,
            to :this.to,
            subject:subject,
            html,
            text: "htmlToText.fromString(html)"
        };

        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome(){
        await this.send('welcome' , 'Welcome to GameZone');
    }
}

