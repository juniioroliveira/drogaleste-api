const nodemailer = require('nodemailer');
const config = require('../../../Bin/config.json');
const reportLog = require('../../Services/Functions/reportLog');

let outlook = config.hostMail.find(item => item.email === 'webmail');
// console.log(outlook);
//Definindo email que enviará as mensagens
const transporter = nodemailer.createTransport({
    host: outlook.host,
    port: outlook.port,
    secure: outlook.secure, 
    auth:{
        user: outlook.auth.user,
        pass: outlook.auth.pass
    },
    tls: {rejectUnauthorized: false}
});


 async function sendMail(header){
    // reportLog(`Usuário autenticado: ${outlook.auth.user} *${header.emails}`);
    reportLog(`Enviando notificação para e-mail *${header.emails}`);

    // Definir email que será recebido as mensagens
    const mailOptions = {
        from: outlook.auth.user,
        to: header.emails,///`${header.emails}, ${outlook.copy}`,
        subject: header.titulo,
        text: header.corpoMensagem,
        html: header.corpoMensagem
    };
    
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
            reportLog(`Status: Erro ao enviar notificação via e-mail`);
            return false
        } else {        
                 
            reportLog(`Status: Credenciais enviadas no e-mail ${mailOptions.to}`);                   
            return true;
        }
    });
                
    return header;
  }

module.exports = sendMail;
