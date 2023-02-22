const express = require('express');
const router = express.Router();

const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect'); 
const reportLog = require('../../Services/Functions/reportLog');
const notify = require('../../Services/Functions/sendMail')

const {body, validationResult} = require('express-validator');
const { Console } = require('console');


router.post('/new', async (req, res, next) => {  

    try{
        let user = req.headers;    
      
        reportLog(`Processo: Nova solicitação de cadastro`);
        reportLog(`Usário: ${user.email}`);
        reportLog(`Rota:   ${req.method}${req.originalUrl}`);

        if(user.inscricaofederal && user.email && user.nome){  
    
          let inscricaoFederal = user.inscricaofederal;
          let email = user.email;      
          let nome = user.nome;         

          //Valida e-mail
          var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ ;
          if(!reg.test(email)){
            let obj = {
              code: 406,
              url: req.originalUrl,
              message: 'Dados inválidos',
              ex: `O e-mail informado não é válido!`
            };
            res.status(406).send(obj);
            return;
          }

          var response = await execSQLDrogaleste(`EXEC API_NEW_USER_POST '${nome}', ${inscricaoFederal}, '${email}'`)
    
          if(response){
            if(JSON.parse(response).status == 1){

              const htmlUsuario = 
              `<div class="SlLx9 byzS1" style="margin-right: 20px; margin-left: 8px; padding: 0px 12px 12px; width: calc(100% - 53.5px);" tabindex="-1" aria-label="Mensagem de email">` +
              `<div>&nbsp;<span style="background-color: #0d4a8d;">&nbsp;</span></div>` +
              `<div class="XbIp4 jmmB7 GNqVo yxtKT allowTextSelection" tabindex="-1" role="region" aria-label="Corpo da mensagem">` +
              `<div class="rps_68f">` +
              `<div style="background-color: #0d4a8d;"><center>` +
              `<div class="R1UVb" style="height: 638px; width: 100%;">` +
              `<table id="x_bodyTable" style="transform: scale(0.85259, 0.85259); transform-origin: left top;" border="0" width="100%" cellspacing="0" cellpadding="0" align="center" bgcolor="#0d4a8d">` +
              `<tbody>` +
              `<tr>` +
              `<td id="x_bodyCell" style="padding-bottom: 60px;" align="center" valign="top"><span style="color: #ffe01b; display: none; font-size: 0px; height: 0px; visibility: hidden; width: 0px;">You're almost ready to get started!</span>` +
              `<table border="0" width="100%" cellspacing="0" cellpadding="0" align="center">` +
              `<tbody>` +
              `<tr>` +
              `<td style="background-color: #0d4a8d;" align="center" valign="top" bgcolor="#FFE01B">` +
              `<table class="x_emailContainer" style="max-width: 640px;" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">` +
              `<tbody>` +
              `<tr>` +
              `<td style="padding: 40px;" align="center" valign="top"><a style="text-decoration: none;" href="https://www.mailchimp.com/" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="0"><img style="border: 0; color: #ffffff; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 12px; font-weight: 400; height: auto; letter-spacing: -1px; padding: 0; outline: none; text-align: center; text-decoration: none; border-width: 0px; margin: 0px;" src="https://files.readme.io/694acc9-small-d15893cb-08b5-465e-8c5a-2d783f945adc.jpg" alt="Mailchimp" width="120" data-imagetype="External" /></a></td>` +
              `</tr>` +
              `<tr>` +
              `<td style="background-color: #ffffff; padding-top: 40px;">&nbsp;</td>` +
              `</tr>` +
              `</tbody>` +
              `</table>` +
              `</td>` +
              `</tr>` +
              `<tr>` +
              `<td align="center" valign="top">` +
              `<table class="x_emailContainer" style="background-color: #ffffff; max-width: 640px;" border="0" width="100%" cellspacing="0" cellpadding="0" align="center" bgcolor="#FFFFFF">` +
              `<tbody>` +
              `<tr>` +
              `<td style="padding-right: 40px; padding-bottom: 40px; padding-left: 40px;" align="center" valign="top" bgcolor="#FFFFFF">` +
              `<h1 style="color: #241c15; font-family: Georgia,Times,'Times New Roman',serif; font-size: 30px; font-style: normal; font-weight: 400; line-height: 42px; letter-spacing: normal; margin: 0; padding: 0; text-align: center;">Ol&aacute;, ${nome}!<br aria-hidden="true" />Suas credenciais foram geradas</h1>` +
              `</td>` +
              `</tr>` +
              `<tr>` +
              `<td style="padding-right: 40px; padding-bottom: 60px; padding-left: 40px; text-align: left;" align="center" valign="middle">` +
              `<p><strong><span style="background-color: #0d4a8d; color: #ffffff;">clientId:</span>&nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp;${JSON.parse(response).clientId}</p>` +
              `<p><strong><span style="background-color: #0d4a8d; color: #ffffff;">clientSecret:</span></strong>&nbsp; &nbsp;${JSON.parse(response).clientSecret}</p>` +
              `</td>` +
              `</tr>` +
              `<tr>` +
              `<td style="padding-right: 40px; padding-bottom: 40px; padding-left: 40px;" align="center" valign="top">` +
              `<p style="color: #6a655f; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 16px; font-style: normal; font-weight: 400; line-height: 42px; letter-spacing: normal; margin: 0; padding: 0; text-align: center;">(Aguarde o prazo de at&eacute; 24 horas para ativa&ccedil;&atilde;o do seu usu&aacute;rio.)</p>` +
              `</td>` +
              `</tr>` +
              `<tr>` +
              `<td class="x_footerContent" style="border-top: 2px solid #EFEEEA; color: #6a655f; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 12px; font-weight: 400; line-height: 24px; padding-top: 40px; padding-bottom: 40px; text-align: center;" align="center" valign="top">&nbsp;</td>` +
              `</tr>` +
              `</tbody>` +
              `</table>` +
              `</td>` +
              `</tr>` +
              `</tbody>` +
              `</table>` +
              `</td>` +
              `</tr>` +
              `</tbody>` +
              `</table>` +
              `</div>` +
              `</center></div>` +
              `</div>` +
              `</div>` ;
              
              let headerUsuario = {
                emails: email + 'junioroliveira.la@hotmail.com, bruno.santana@rededrogaleste.com.br',
                titulo: 'Drogaleste - Credenciais',
                corpoMensagem: htmlUsuario
              }              
              var sendUsuario = await notify(headerUsuario);


              let client = JSON.parse(response).clientId;

              // let htmlCopy = 
              // `<h2>API Drogaleste</h2>` +
              // `<p><span style="color: #808080;">Solicita&ccedil;&atilde;o de acesso</span></p>` +
              // `<p><span style="color: #808080;">Nome: ${nome}</span></p>` +
              // `<p><span style="color: #808080;">Email: ${email}</span></p>` +
              // `<p><span style="color: #808080;">Cnpj: ${inscricaoFederal}</span></p>` +
              // `<p><a href="​http://apidrogaleste.ddns.net:7150/api/user/authorize/${client}" style="border-radius: 0; border: 1px solid #0d4a8d; color: #ffffff; display: inline-block; font-size: 16px; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-weight: 400; letter-spacing: .3px; padding: 20px; text-decoration: none;" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="1">Ativar usu&aacute;rio</a></p>`;
            
              
              // let headerCopy = {
              //   emails: 'junioroliveira.la@hotmail.com' ,
              //   titulo: 'Drogaleste - Credenciais',
              //   corpoMensagem: htmlCopy
              // }   
              // var sendUsuario = await notify(headerCopy);
            
            }
            
            res.status(200).send({ cod: 200, message: JSON.parse(response).mensagem});
              
            reportLog(`Status: Retornou com exito`);
          }else{
            
            let obj = {
              code: 404,
              url: req.originalUrl,
              message: 'Não encontrado',
              ex: `Nenhum dado encontrado com o valor *promocao: ${'promocao'}, loja: ${'loja'}`
            };
            
            res.status(404).send(obj);
    
            reportLog(`Status: Nenhum dado foi encontrado`);
          }   
        }else{     
    
          let obj = {
            code: 400,
            url: req.originalUrl,
            message: 'Solicitação incorreta',
            ex: `Erro na definição de campos do Header`
          };
          
          res.status(404).send(obj);
    
          reportLog(`Status: Nenhum dado foi encontrado`);
    
        }       
    
      }catch(erro){
        let obj = {
          code: 404,
          url: req.originalUrl,
          message: 'Solicitação incorreta',
          ex: erro.message
        };
    
        reportLog(`Status: Erro no retorno dos dados`);
        res.status(404).send(obj);
      }
    
      console.log('');
    
});

  
//Autoriza usuário
router.post('/authorize/:clientId', async (req, res, next) => {    

  try{    
  
    let clientId = req.params.clientId;

    var response = await execSQLDrogaleste(`UPDATE DL_INTEGRACOES_API_USUARIOS SET SITUACAO = 'Ativo' WHERE CLIENT_ID = '${clientId}'`)
    res.status(200).send(JSON.parse('Ativado'));

  }catch(erro){
    let obj = {
      code: 404,
      url: req.originalUrl,
      message: 'Solicitação incorreta',
      ex: erro.message
    };

    reportLog(`Status: Erro no retorno dos dados`);
    res.status(404).send(obj);
  }
  
  console.log('');

});

module.exports = router;