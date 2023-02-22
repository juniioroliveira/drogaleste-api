const express = require('express');
const router = express.Router();

const notify = require('../Services/Functions/sendMail')
const htmlNofify = require('./generateCredentials');

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

  router.get('/send', async (req, res, next) => {  
    
    let user = req.headers;   

    let htmlGenerate = await htmlNofify();
    console.log(htmlGenerate);

    // Definir email que será recebido as mensagens
    const mailOptions = {
        from: outlook.auth.user,
        to: user.email,///`${header.emails}, ${outlook.copy}`,
        subject: 'Enviado via function',
        // text: header.htmlGenerate,
        html: htmlGenerate
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
            reportLog(`Status: Erro ao enviar notificação via e-mail`);
            res.status(404).json(error);
            return false
        } else {        
                
            reportLog(`Status: Credenciais enviadas no e-mail`); 
            res.status(200).json(response);                  
            return true;
        }
    });
    

  });


  module.exports = router;