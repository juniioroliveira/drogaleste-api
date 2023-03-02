const express = require('express');
const router = express.Router();

const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect'); 
const reportLog = require('../../Services/Functions/reportLog');
const notify = require('../../Services/Functions/sendMail')

const {body, validationResult} = require('express-validator');
const { Console } = require('console');

const html = require('../../Homolog/email.html') 


router.post('/new', async (req, res, next) => {  
  
  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Autenticação']
    #swagger.description = 'Solicita o cadastro de usuário'
     swagger.parameters['produto'] = { 
                                    in: 'headers', 
                                    type: 'integer', 
                                    description: 'código do produto.', 
                                    required: true
                                  }
     swagger.parameters['loja'] = { 
                                    in: 'headers', 
                                    type: 'integer', 
                                    description: 'código da loja.', 
                                    required: true
                                  }
    swagger.responses[200] = { 
                                schema: { $ref: "#/definitions/Cliente/purchasehistoric" },
                                description: 'Usuário encontrado.'
                              }
                               
  */

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

          // var response = await execSQLDrogaleste(`EXEC API_NEW_USER_POST '${nome}', ${inscricaoFederal}, '${email}'`)

          let response = {status: 1};

          const {status} = response;
          if(status == 1){
            // if(status == 1){

              // const htmlUsuario = 
              // `<div class="SlLx9 byzS1" style="margin-right: 20px; margin-left: 8px; padding: 0px 12px 12px; width: calc(100% - 53.5px);" tabindex="-1" aria-label="Mensagem de email">` +
              // `<div>&nbsp;<span style="background-color: #0d4a8d;">&nbsp;</span></div>` +
              // `<div class="XbIp4 jmmB7 GNqVo yxtKT allowTextSelection" tabindex="-1" role="region" aria-label="Corpo da mensagem">` +
              // `<div class="rps_68f">` +
              // `<div style="background-color: #0d4a8d;"><center>` +
              // `<div class="R1UVb" style="height: 638px; width: 100%;">` +
              // `<table id="x_bodyTable" style="transform: scale(0.85259, 0.85259); transform-origin: left top;" border="0" width="100%" cellspacing="0" cellpadding="0" align="center" bgcolor="#0d4a8d">` +
              // `<tbody>` +
              // `<tr>` +
              // `<td id="x_bodyCell" style="padding-bottom: 60px;" align="center" valign="top"><span style="color: #ffe01b; display: none; font-size: 0px; height: 0px; visibility: hidden; width: 0px;">You're almost ready to get started!</span>` +
              // `<table border="0" width="100%" cellspacing="0" cellpadding="0" align="center">` +
              // `<tbody>` +
              // `<tr>` +
              // `<td style="background-color: #0d4a8d;" align="center" valign="top" bgcolor="#FFE01B">` +
              // `<table class="x_emailContainer" style="max-width: 640px;" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">` +
              // `<tbody>` +
              // `<tr>` +
              // `<td style="padding: 40px;" align="center" valign="top"><a style="text-decoration: none;" href="https://www.mailchimp.com/" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="0"><img style="border: 0; color: #ffffff; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 12px; font-weight: 400; height: auto; letter-spacing: -1px; padding: 0; outline: none; text-align: center; text-decoration: none; border-width: 0px; margin: 0px;" src="https://files.readme.io/694acc9-small-d15893cb-08b5-465e-8c5a-2d783f945adc.jpg" alt="Mailchimp" width="120" data-imagetype="External" /></a></td>` +
              // `</tr>` +
              // `<tr>` +
              // `<td style="background-color: #ffffff; padding-top: 40px;">&nbsp;</td>` +
              // `</tr>` +
              // `</tbody>` +
              // `</table>` +
              // `</td>` +
              // `</tr>` +
              // `<tr>` +
              // `<td align="center" valign="top">` +
              // `<table class="x_emailContainer" style="background-color: #ffffff; max-width: 640px;" border="0" width="100%" cellspacing="0" cellpadding="0" align="center" bgcolor="#FFFFFF">` +
              // `<tbody>` +
              // `<tr>` +
              // `<td style="padding-right: 40px; padding-bottom: 40px; padding-left: 40px;" align="center" valign="top" bgcolor="#FFFFFF">` +
              // `<h1 style="color: #241c15; font-family: Georgia,Times,'Times New Roman',serif; font-size: 30px; font-style: normal; font-weight: 400; line-height: 42px; letter-spacing: normal; margin: 0; padding: 0; text-align: center;">Ol&aacute;, ${nome}!<br aria-hidden="true" />Suas credenciais foram geradas</h1>` +
              // `</td>` +
              // `</tr>` +
              // `<tr>` +
              // `<td style="padding-right: 40px; padding-bottom: 60px; padding-left: 40px; text-align: left;" align="center" valign="middle">` +
              // `<p><strong><span style="background-color: #0d4a8d; color: #ffffff;">clientId:</span>&nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp;${JSON.parse(response).clientId}</p>` +
              // `<p><strong><span style="background-color: #0d4a8d; color: #ffffff;">clientSecret:</span></strong>&nbsp; &nbsp;${JSON.parse(response).clientSecret}</p>` +
              // `</td>` +
              // `</tr>` +
              // `<tr>` +
              // `<td style="padding-right: 40px; padding-bottom: 40px; padding-left: 40px;" align="center" valign="top">` +
              // `<p style="color: #6a655f; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 16px; font-style: normal; font-weight: 400; line-height: 42px; letter-spacing: normal; margin: 0; padding: 0; text-align: center;">(Aguarde o prazo de at&eacute; 24 horas para ativa&ccedil;&atilde;o do seu usu&aacute;rio.)</p>` +
              // `</td>` +
              // `</tr>` +
              // `<tr>` +
              // `<td class="x_footerContent" style="border-top: 2px solid #EFEEEA; color: #6a655f; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 12px; font-weight: 400; line-height: 24px; padding-top: 40px; padding-bottom: 40px; text-align: center;" align="center" valign="top">&nbsp;</td>` +
              // `</tr>` +
              // `</tbody>` +
              // `</table>` +
              // `</td>` +
              // `</tr>` +
              // `</tbody>` +
              // `</table>` +
              // `</td>` +
              // `</tr>` +
              // `</tbody>` +
              // `</table>` +
              // `</div>` +
              // `</center></div>` +
              // `</div>` +
              // `</div>` ;

              const htmlUsuario = 
              '<div style="margin: 0; padding: 0;"> ' +
              '      <div style="background-color: #0d4a8d; padding: 10px;"> ' +
              '          <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iR3JvdXBfMzIxIiBkYXRhLW5hbWU9Ikdyb3VwIDMyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTI5LjU0OSA0My42NyI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogI2ZiZmZmZjsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiAjZWIzMDNhOwogICAgICAgIGZpbGwtcnVsZTogZXZlbm9kZDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBhdGggaWQ9IlBhdGhfNDg0IiBkYXRhLW5hbWU9IlBhdGggNDg0IiBjbGFzcz0iY2xzLTEiIGQ9Ik02Ny4wMzksODIuNjY3aDBjMS44NDIsMCwzLjU1Ny0xLjMsMy41NTctNC40NDYsMC0yLjE5MS0xLjE0My00LjM4My0zLjQ5NC00LjM4My0xLjkzNywwLTMuNTU3LDEuNTg4LTMuNTU3LDQuNDE1LDAsMi42NjgsMS40MjksNC40MTUsMy40OTQsNC40MTVtLS4zMTgtMTAuODk0QTQuMjIsNC4yMiwwLDAsMSw3MC41NjQsNzMuOUg3MC42YTUuNjMyLDUuNjMyLDAsMCwxLS4wNjQtLjgyNlY2Ny45OTRhLjY5NC42OTQsMCwwLDEsLjc5NC0uNzk0aC43NjJhLjY5NC42OTQsMCwwLDEsLjc5NC43OTRWODMuNjJhLjY5NC42OTQsMCwwLDEtLjc5NC43OTRoLS42MzVjLS41NCwwLS43OTQtLjI1NC0uNzk0LS43NjJ2LS43YTIuNzQ2LDIuNzQ2LDAsMCwxLC4wNjQtLjZINzAuNjZhNC40MzQsNC40MzQsMCwwLDEtNC4xLDIuMzgyYy0zLjMzNSwwLTUuNDYzLTIuNjM2LTUuNDYzLTYuNDc5QzYxLjEzMiw3NC4zMTQsNjMuNDUsNzEuNzczLDY2LjcyMiw3MS43NzNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDEuNjk1IC00NS44NTcpIi8+CiAgPHBhdGggaWQ9IlBhdGhfNDg1IiBkYXRhLW5hbWU9IlBhdGggNDg1IiBjbGFzcz0iY2xzLTEiIGQ9Ik0xMDYuNyw4My4wODlhLjcwNi43MDYsMCwwLDEsLjc5NC0uNzk0aC43YS42OTQuNjk0LDAsMCwxLC43OTQuNzk0djEuNDI5YTYuNzU4LDYuNzU4LDAsMCwxLS4wNjQuOTIxaC4wNjRjLjU0LTEuNjUyLDEuOTM3LTMuMjQsMy43NzktMy4yNC41NzIsMCwuNzk0LjI1NC43OTQuNzk0di43YzAsLjU0LS4zMTguNzk0LS44ODkuNzk0LTIuNDE0LDAtMy41ODksMi42LTMuNTg5LDUuMDV2NC4yODhhLjY5NC42OTQsMCwwLDEtLjc5NC43OTRoLS43NjJhLjcwNi43MDYsMCwwLDEtLjc5NC0uNzk0VjgzLjA4OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03Mi44MTIgLTU2LjA5MykiLz4KICA8cGF0aCBpZD0iUGF0aF80ODYiIGRhdGEtbmFtZT0iUGF0aCA0ODYiIGNsYXNzPSJjbHMtMSIgZD0iTTEzNS40NTcsOTIuNDk0aDBhNC40NTMsNC40NTMsMCwxLDAtNC00LjQ0Niw0LjE2Miw0LjE2MiwwLDAsMCw0LDQuNDQ2bTAtMTAuODk0YTYuNDgzLDYuNDgzLDAsMSwxLTYuMjU3LDYuNDQ3QTYuMjM1LDYuMjM1LDAsMCwxLDEzNS40NTcsODEuNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04OC4xNjYgLTU1LjY4NCkiLz4KICA8cGF0aCBpZD0iUGF0aF80ODciIGRhdGEtbmFtZT0iUGF0aCA0ODciIGNsYXNzPSJjbHMtMSIgZD0iTTE4Mi4yNzQsODcuNzU3aDBjMC0zLjI0LTEuNTg4LTQuMTkyLTMuNDMtNC4xOTItMi4yMjMsMC0zLjQzLDEuNTU2LTMuNDMsNCwwLDIuNjY4LDEuMzM0LDQuNDE1LDMuNTU3LDQuNDE1LDEuNzE1LDAsMy4zLTEuMDE2LDMuMy00LjIyNG0tNi42MzgsOC45NTZhNi45Nyw2Ljk3LDAsMCwwLDIuNy41NGMyLjEsMCwzLjg3NS0uOTUzLDMuODc1LTMuNDYydi0xLjA4YTYuMDc3LDYuMDc3LDAsMCwxLC4wNjQtLjc5NGgtLjA2NGEzLjg1MSwzLjg1MSwwLDAsMS0zLjY1MiwyLjFjLTMuNDYyLDAtNS41NTgtMi43MzEtNS41NTgtNi4zNTIsMC0zLjUyNSwxLjk2OS02LjE2MSw1LjUyNi02LjE2MSwzLjA0OSwwLDMuODc1LDIuMDY0LDMuODc1LDIuMDY0aC4wNjRhMS4xMjUsMS4xMjUsMCwwLDEtLjA2NC0uMzgxdi0uN2MwLS40MTMuMjU0LS43Ljc5NC0uN2guNTcyYS42OTQuNjk0LDAsMCwxLC43OTQuNzk0VjkzLjYzMmMwLDQuMS0zLjExMiw1LjY1My02LjEzLDUuNjUzYTguODE1LDguODE1LDAsMCwxLTMuNTg5LS43LjcxNS43MTUsMCwwLDEtLjQxMy0xLjA4bC4xNTktLjQxM0EuNzM0LjczNCwwLDAsMSwxNzUuNjM2LDk2LjcxM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTguMDU1IC01NS42MTYpIi8+CiAgPHBhdGggaWQ9IlBhdGhfNDg4IiBkYXRhLW5hbWU9IlBhdGggNDg4IiBjbGFzcz0iY2xzLTEiIGQ9Ik0yMTkuNCw5Mi42NTJoMGMyLjA2NCwwLDMuMzM1LTIuMSwzLjMzNS0zLjkzOHYtLjU0SDIyMi4xYy0xLjc0NywwLTUuMDE4LjE1OS01LjAxOCwyLjQ3N2EyLjEsMi4xLDAsMCwwLDIuMzE4LDJtMi43LTYuMDM0aC42MzVWODYuM2EyLjQsMi40LDAsMCwwLTIuNy0yLjcsNS44NTksNS44NTksMCwwLDAtMi43OTUuNzk0Ljc2My43NjMsMCwwLDEtMS4xMTItLjI4NmwtLjE5MS0uMzQ5YS43NS43NSwwLDAsMSwuMjU0LTEuMTEyLDguMTQzLDguMTQzLDAsMCwxLDQtMS4wNDhjMy4wODEsMCw0Ljg1OSwxLjcxNSw0Ljg1OSw0LjgyOHY3LjAxOWEuNzA2LjcwNiwwLDAsMS0uNzk0Ljc5NGgtLjU3MmEuNzA2LjcwNiwwLDAsMS0uNzk0LS43OTR2LS43M2EzLjg3MiwzLjg3MiwwLDAsMSwuMDY0LS43NjJoLS4wNjRhNC41ODIsNC41ODIsMCwwLDEtNC4wMzQsMi42Yy0yLjE2LDAtNC4xNjEtMS4zMzQtNC4xNjEtMy42NTJDMjE0LjcsODcuMDMxLDIxOS41MjgsODYuNjE4LDIyMi4xLDg2LjYxOFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNDYuNTExIC01NS42ODQpIi8+CiAgPHBhdGggaWQ9IlBhdGhfNDg5IiBkYXRhLW5hbWU9IlBhdGggNDg5IiBjbGFzcz0iY2xzLTIiIGQ9Ik0yNTUuMyw2Ny44MTZhLjkwNy45MDcsMCwwLDEsMS4wMTYtMS4wMTZoMS4wOGEuOTIuOTIsMCwwLDEsMS4wMTYsMS4wMTZ2MTIuMmMwLDEuMjA3LjUwOCwxLjQyOS45ODUsMS40OTNhLjgwOC44MDgsMCwwLDEsLjc2Mi44ODl2LjgyNmEuOTE2LjkxNiwwLDAsMS0xLjAxNiwxLjA0OGMtMS42NTEsMC0zLjc3OS0uNDQ1LTMuNzc5LTRWNjcuODE2WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3NC4yMTcgLTQ1LjU4NCkiLz4KICA8cGF0aCBpZD0iUGF0aF80OTAiIGRhdGEtbmFtZT0iUGF0aCA0OTAiIGNsYXNzPSJjbHMtMiIgZD0iTTI4MS40NjYsODYuMzgyaDBhMi41NDQsMi41NDQsMCwwLDAtMi41MDktMi43NjMsMy4wNzUsMy4wNzUsMCwwLDAtMy4wMTcsMi43NjNaTTI3OS4wMiw4MS4zYzMuNTU3LDAsNS41MjYsMi41MDksNS41MjYsNS45MzlhMS4wODUsMS4wODUsMCwwLDEtMS4wOCwxLjA0OGgtNy41OTFhMy41NzUsMy41NzUsMCwwLDAsMy43NDgsMy40Myw1LjQ0LDUuNDQsMCwwLDAsMi43LS43OTRjLjYtLjI4NiwxLjA0OC0uMjIyLDEuMzY2LjM0OWwuMjg2LjQ3NmEuOTI5LjkyOSwwLDAsMS0uMzQ5LDEuMzY2LDcuOTI5LDcuOTI5LDAsMCwxLTQuMjI0LDEuMjM5LDYuMzkxLDYuMzkxLDAsMCwxLTYuNy02LjUxMUMyNzIuNyw4My45NjgsMjc1LjI3Myw4MS4zLDI3OS4wMiw4MS4zWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4Ni4wOSAtNTUuNDc5KSIvPgogIDxwYXRoIGlkPSJQYXRoXzQ5MSIgZGF0YS1uYW1lPSJQYXRoIDQ5MSIgY2xhc3M9ImNscy0yIiBkPSJNMzEzLjExMyw5MS42MTdsLjI4Ni0uNDQ1YS45NDguOTQ4LDAsMCwxLDEuNC0uMjU0LDUuNTc5LDUuNTc5LDAsMCwwLDIuNzk1Ljg1OGMxLjA4LDAsMS43NDctLjQ3NiwxLjc0Ny0xLjI3LDAtMi4wMzMtNi4xOTMtMS4yNy02LjE5My01LjU1OCwwLTIuNDQ2LDIuMTYtMy43NDgsNC43NjQtMy43NDhhNy4xNzUsNy4xNzUsMCwwLDEsMy40NjIuODg5LjkzMS45MzEsMCwwLDEsLjM4MSwxLjM2NmwtLjI1NC40NDVjLS4yODYuNTcyLS43NjIuNjY3LTEuMzY2LjM4MWE1LjQsNS40LDAsMCwwLTIuMzgyLS42Yy0xLjA4LDAtMS42ODMuNDQ1LTEuNjgzLDEuMjA3LDAsMi4wNjQsNi4xOTMsMS4yMzksNi4xOTMsNS40OTQsMCwyLjE5MS0xLjg0MiwzLjg0My00LjczMiwzLjg0M2E3LjM3Myw3LjM3MywwLDAsMS00LjE2MS0xLjI3Yy0uNTcyLS4yNTQtLjYtLjc5NC0uMjU0LTEuMzM0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjEzLjUxMyAtNTUuNDExKSIvPgogIDxwYXRoIGlkPSJQYXRoXzQ5MiIgZGF0YS1uYW1lPSJQYXRoIDQ5MiIgY2xhc3M9ImNscy0yIiBkPSJNMzQ2LjE4Myw3Ny42aC0uNjY3YS45MDcuOTA3LDAsMCwxLTEuMDE2LTEuMDE2di0uNDEzYS45MDcuOTA3LDAsMCwxLDEuMDE2LTEuMDE2aC43VjcyLjYxNmEuOTIuOTIsMCwwLDEsMS4wMTYtMS4wMTZoLjk4NWEuOTIuOTIsMCwwLDEsMS4wMTYsMS4wMTZ2Mi41NDFoMS44MWEuOTIuOTIsMCwwLDEsMS4wMTYsMS4wMTZ2LjQxM2EuOTA3LjkwNywwLDAsMS0xLjAxNiwxLjAxNkgzNDkuMlY4Mi40M2EyLjA0MSwyLjA0MSwwLDAsMCwyLDIuMzE4Yy43NjIuMDY0LDEuMDE2LjMxOCwxLjAxNiwxLjAxNnYuNzYyYzAsLjczLS40MTMsMS4wMTYtMS4yNywxLjAxNi0yLjIyMywwLTQuODU5LTEuMjA3LTQuODU5LTQuNTczVjc3LjZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1LjA4NyAtNDguODYpIi8+CiAgPHBhdGggaWQ9IlBhdGhfNDkzIiBkYXRhLW5hbWU9IlBhdGggNDkzIiBjbGFzcz0iY2xzLTIiIGQ9Ik0zNzkuMzY2LDg2LjM4MmgwYTIuNTQ0LDIuNTQ0LDAsMCwwLTIuNTA5LTIuNzYzLDMuMDc1LDMuMDc1LDAsMCwwLTMuMDE3LDIuNzYzWk0zNzYuOTIsODEuM2MzLjU1NywwLDUuNTI2LDIuNTA5LDUuNTI2LDUuOTM5YTEuMDg1LDEuMDg1LDAsMCwxLTEuMDgsMS4wNDhoLTcuNTkxYTMuNTc1LDMuNTc1LDAsMCwwLDMuNzQ4LDMuNDMsNS40NCw1LjQ0LDAsMCwwLDIuNy0uNzk0Yy42LS4yODYsMS4wNDgtLjIyMiwxLjM2Ni4zNDlsLjI4Ni40NzZhLjkyOS45MjksMCwwLDEtLjM0OSwxLjM2Niw3LjkyOSw3LjkyOSwwLDAsMS00LjIyNCwxLjIzOSw2LjM5MSw2LjM5MSwwLDAsMS02LjctNi41MTFDMzcwLjYsODMuOTY4LDM3My4xNzMsODEuMywzNzYuOTIsODEuM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTIuODk3IC01NS40NzkpIi8+CiAgPHBhdGggaWQ9IlBhdGhfNDk0IiBkYXRhLW5hbWU9IlBhdGggNDk0IiBjbGFzcz0iY2xzLTEiIGQ9Ik0xLjE3NSwwaDkuMjc0YTEyLjk1OCwxMi45NTgsMCwwLDEsMCwyNS45MTZIMS4xNzVBMS4xOTMsMS4xOTMsMCwwLDEsMCwyNC43NDFWMTYuMkg2LjQ3OXY1LjRhMS4wNzEsMS4wNzEsMCwwLDAsMS4wOCwxLjA4aDQuMjg4YTEuMDcxLDEuMDcxLDAsMCwwLDEuMDgtMS4wOFYxMC44M2ExLjA3MSwxLjA3MSwwLDAsMC0xLjA4LTEuMDhIMFYxLjE3NUExLjE5MywxLjE5MywwLDAsMSwxLjE3NSwwIi8+CiAgPHBhdGggaWQ9IlBhdGhfNDk1IiBkYXRhLW5hbWU9IlBhdGggNDk1IiBjbGFzcz0iY2xzLTIiIGQ9Ik0yMS40OCwyMy4xNThIMzIuMjQ2YTEuMDcxLDEuMDcxLDAsMCwwLDEuMDgtMS4wOFYxNy43NTlhMS4wNzEsMS4wNzEsMCwwLDAtMS4wOC0xLjA4aC01LjR2LTUuNGExLjA3MSwxLjA3MSwwLDAsMC0xLjA4LTEuMDhIMjEuNDhhMS4wNzEsMS4wNzEsMCwwLDAtMS4wOCwxLjA4VjIyLjA0NmExLjEsMS4xLDAsMCwwLDEuMDgsMS4xMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMy45MjEgLTYuOTYpIi8+Cjwvc3ZnPgo=" alt="Criando Mágica de E-mail" width="300" height="230"  ' +
              '              style="display: block; height: 40px; width: auto;" /> ' +
              '      </div> ' +
              '      <div style="background-color: #ffff; padding: 10px;"> ' +
              '          Olá Usuário!<br/> ' +
              '          Suas credenciais foram geradas.    ' +     
              '      </div> ' +
              '      <div style="padding: 30px;"> ' +
              '          <table align="center" border="1" cellpadding="0" cellspacing="0" width="500" style="border-collapse: collapse;"> ' +
              '              <tr style="background-color: #0d4a8d; color: white;"> ' +
              '                  <td style="padding: 10px;"> ' +
              '                      Credenciais ' +
              '                  </td> ' +
              '              </tr> ' +
              '          </table> ' +
              '          <table align="center" border="0" cellpadding="0" cellspacing="0" width="500" style="border-collapse: collapse;">             ' +
              '              <tr> ' +
              '                  <td width="250" valign="top" style="background-color: lightgray; padding: 10px;"> ' +
              '                      clientId ' +
              '                  </td> ' +
              '                  <td width="230" valign="top" style="padding: 10px; font-size: 10px; width: 260px; background-color: whitesmoke;"> ' +
              '                      <table border="1" cellpadding="0" cellspacing="0" width="100%"> ' +
              '                          <tr> ' +
              '                          <td> ' +
              '                            <img src="images/right.gif" alt="" width="100%" height="140" style="display: block;" /> ' +
              '                          </td> ' +
              '                          </tr> ' +
              '                          <tr> ' +
              '                          <td style="padding: 25px 0 0 0;"> ' +
              '                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat. ' +
              '                          </td> ' +
              '                          </tr> ' +
              '                      </table> ' +
              '                      agB1AG4AaQBvAHIAbwBsAGkAdgBlAGkAcgBhAC4AbABhAEAAaABvAHQAbQBhAGkAbAAuAGMAbwBtAA== ' +
              '                  </td> ' +
              '              </tr> ' +
              '              <tr> ' +
              '                  <td width="250" valign="top" style="background-color: lightgray; padding: 10px;"> ' +
              '                      clientSecret ' +
              '                  </td> ' +
              '                  <td width="230" valign="top" style="padding: 10px; font-size: 10px; background-color: whitesmoke;"> ' +
              '                      <table border="1" cellpadding="0" cellspacing="0" width="100%"> ' +
              '                          <tr> ' +
              '                          <td> ' +
              '                            <img src="images/right.gif" alt="" width="100%" height="140" style="display: block;" /> ' +
              '                          </td> ' +
              '                          </tr> ' +
              '                          <tr> ' +
              '                          <td style="padding: 25px 0 0 0;"> ' +
              '                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat. ' +
              '                          </td> ' +
              '                          </tr> ' +
              '                      </table> ' +
              '                      MAA1ADcAMQA3ADMANQA0ADUAMgA1AEoAdQBuAGkAbwByACAAbwBsAGkAdgBlAGkAcgBhAA== ' +
              '                  </td> ' +
              '              </tr> ' +
              '          </table> ' +
                        
              '     </div> ' +
              '     <div class="d-none d-lg-block"> ' +
              '         <footer class="d-flex" style="background-color:#0d4a8d ;height:70px"> ' +
              '             <div class="container d-flex align-self-center"> ' +
              '                 <p class="m-0 text-white pt-1"> ' +
              '                     © <!-- -->2023<!-- --> DrogaLeste |  ' +
              '                     <a class="text-white" href="/lgpd/"> ' +
              '                         Política de Privacidade |  ' +
              '                     </a> ' +
              '                     Siga-nos nas redes sociais: ' +
              '                 </p>               ' +          
              '                 <a href="https://pt-br.facebook.com/drleste/" target="_blank" rel="noopener noreferrer"> ' +
              '                     <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzIDI2QzIwLjE3OTcgMjYgMjYgMjAuMTc5NyAyNiAxM0MyNiA1LjgyMDMgMjAuMTc5NyAwIDEzIDBDNS44MjAzIDAgMCA1LjgyMDMgMCAxM0MwIDIwLjE3OTcgNS44MjAzIDI2IDEzIDI2WiIgZmlsbD0iIzNCNTk5OCIvPgo8cGF0aCBkPSJNMTYuMjY4MiAxMy41MDg4SDEzLjk0ODVWMjIuMDA3MUgxMC40MzRWMTMuNTA4OEg4Ljc2MjQ0VjEwLjUyMjJIMTAuNDM0VjguNTg5NDlDMTAuNDM0IDcuMjA3NDEgMTEuMDkwNSA1LjA0MzIxIDEzLjk3OTggNS4wNDMyMUwxNi41ODMxIDUuMDU0MVY3Ljk1MzE0SDE0LjY5NDJDMTQuMzg0NCA3Ljk1MzE0IDEzLjk0ODcgOC4xMDc5NCAxMy45NDg3IDguNzY3MjNWMTAuNTI1SDE2LjU3NTJMMTYuMjY4MiAxMy41MDg4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" width="25px" class="ml-2"> ' +
              '                 </a> ' +
              '                 <a href="https://www.instagram.com/drogaleste/" target="_blank" rel="noopener noreferrer"> ' +
              '                     <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMTMiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8zMDJfMTQ2KSIvPgo8cGF0aCBkPSJNMTAuMTE0NyAxMy4yMTY5QzEwLjExNDcgMTEuNzQxMSAxMS4zMTE0IDEwLjU0NDQgMTIuNzg4MSAxMC41NDQ0QzE0LjI2NDcgMTAuNTQ0NCAxNS40NjIxIDExLjc0MTEgMTUuNDYyMSAxMy4yMTY5QzE1LjQ2MjEgMTQuNjkyNiAxNC4yNjQ3IDE1Ljg4OTMgMTIuNzg4MSAxNS44ODkzQzExLjMxMTQgMTUuODg5MyAxMC4xMTQ3IDE0LjY5MjYgMTAuMTE0NyAxMy4yMTY5Wk04LjY2OTEzIDEzLjIxNjlDOC42NjkxMyAxNS40OTA0IDEwLjUxMzIgMTcuMzMzMyAxMi43ODgxIDE3LjMzMzNDMTUuMDYzIDE3LjMzMzMgMTYuOTA3IDE1LjQ5MDQgMTYuOTA3IDEzLjIxNjlDMTYuOTA3IDEwLjk0MzMgMTUuMDYzIDkuMTAwNCAxMi43ODgxIDkuMTAwNEMxMC41MTMyIDkuMTAwNCA4LjY2OTEzIDEwLjk0MzMgOC42NjkxMyAxMy4yMTY5Wk0xNi4xMDc1IDguOTM3MThDMTYuMTA3NCA5LjEyNzQ1IDE2LjE2MzggOS4zMTM0NiAxNi4yNjk1IDkuNDcxN0MxNi4zNzUyIDkuNjI5OTUgMTYuNTI1NSA5Ljc1MzMxIDE2LjcwMTMgOS44MjYxOUMxNi44NzcyIDkuODk5MDcgMTcuMDcwNyA5LjkxODIgMTcuMjU3NSA5Ljg4MTE1QzE3LjQ0NDIgOS44NDQxMSAxNy42MTU4IDkuNzUyNTYgMTcuNzUwNCA5LjYxODA3QzE3Ljg4NTEgOS40ODM1OSAxNy45NzY4IDkuMzEyMjEgMTguMDE0MSA5LjEyNTYyQzE4LjA1MTMgOC45MzkwMiAxOC4wMzIzIDguNzQ1NTkgMTcuOTU5NSA4LjU2OTc4QzE3Ljg4NjcgOC4zOTM5NyAxNy43NjM0IDguMjQzNjcgMTcuNjA1MiA4LjEzNzlDMTcuNDQ2OSA4LjAzMjE0IDE3LjI2MDggNy45NzU2NCAxNy4wNzA0IDcuOTc1NTZIMTcuMDcwMUMxNi44MTQ5IDcuOTc1NjggMTYuNTcwMiA4LjA3NzAyIDE2LjM4OTcgOC4yNTczMkMxNi4yMDkyIDguNDM3NjIgMTYuMTA3NyA4LjY4MjE0IDE2LjEwNzUgOC45MzcxOFpNOS41NDczOSAxOS43NDIyQzguNzY1MzMgMTkuNzA2NiA4LjM0MDI1IDE5LjU3NjQgOC4wNTc3NyAxOS40NjY1QzcuNjgzMjYgMTkuMzIwNyA3LjQxNjA1IDE5LjE0NzIgNy4xMzUxMSAxOC44NjY4QzYuODU0MTYgMTguNTg2NCA2LjY4MDI2IDE4LjMxOTYgNi41MzUxIDE3Ljk0NTNDNi40MjQ5OCAxNy42NjMyIDYuMjk0NzEgMTcuMjM4MiA2LjI1OTE2IDE2LjQ1NjZDNi4yMjAyNyAxNS42MTE2IDYuMjEyNTEgMTUuMzU3OCA2LjIxMjUxIDEzLjIxNjlDNi4yMTI1MSAxMS4wNzYxIDYuMjIwOTIgMTAuODIzIDYuMjU5MTYgOS45NzcyM0M2LjI5NDc4IDkuMTk1NjQgNi40MjYwMSA4Ljc3MTUyIDYuNTM1MSA4LjQ4ODVDNi42ODA5IDguMTE0MjIgNi44NTQ1NSA3Ljg0NzE3IDcuMTM1MTEgNy41NjYzOUM3LjQxNTY3IDcuMjg1NjIgNy42ODI2MiA3LjExMTgyIDguMDU3NzcgNi45NjY3NUM4LjM0MDEzIDYuODU2NjkgOC43NjUzMyA2LjcyNjUgOS41NDczOSA2LjY5MDk3QzEwLjM5MjkgNi42NTIxMSAxMC42NDY5IDYuNjQ0MzUgMTIuNzg4MSA2LjY0NDM1QzE0LjkyOTIgNi42NDQzNSAxNS4xODM1IDYuNjUyNzUgMTYuMDI5NyA2LjY5MDk3QzE2LjgxMTggNi43MjY1NyAxNy4yMzYxIDYuODU3NzIgMTcuNTE5MyA2Ljk2Njc1QzE3Ljg5MzggNy4xMTE4MiAxOC4xNjEgNy4yODYgMTguNDQyIDcuNTY2MzlDMTguNzIyOSA3Ljg0Njc5IDE4Ljg5NjIgOC4xMTQyMiAxOS4wNDIgOC40ODg1QzE5LjE1MjEgOC43NzA2OSAxOS4yODI0IDkuMTk1NjQgMTkuMzE3OSA5Ljk3NzIzQzE5LjM1NjggMTAuODIzIDE5LjM2NDYgMTEuMDc2MSAxOS4zNjQ2IDEzLjIxNjlDMTkuMzY0NiAxNS4zNTc4IDE5LjM1NjggMTUuNjEwOSAxOS4zMTc5IDE2LjQ1NjZDMTkuMjgyMyAxNy4yMzgyIDE5LjE1MTQgMTcuNjYzIDE5LjA0MiAxNy45NDUzQzE4Ljg5NjIgMTguMzE5NiAxOC43MjI1IDE4LjU4NjcgMTguNDQyIDE4Ljg2NjhDMTguMTYxNCAxOS4xNDY5IDE3Ljg5MzggMTkuMzIwNyAxNy41MTkzIDE5LjQ2NjVDMTcuMjM3IDE5LjU3NjUgMTYuODExOCAxOS43MDY3IDE2LjAyOTcgMTkuNzQyMkMxNS4xODQyIDE5Ljc4MTEgMTQuOTMwMiAxOS43ODg5IDEyLjc4ODEgMTkuNzg4OUMxMC42NDU5IDE5Ljc4ODkgMTAuMzkyNyAxOS43ODExIDkuNTQ3MzkgMTkuNzQyMlpNOS40ODA5NyA1LjI0ODc0QzguNjI3MDQgNS4yODc2MSA4LjA0MzUyIDUuNDIyOTMgNy41MzM5NCA1LjYyMTFDNy4wMDYxOSA1LjgyNTc1IDYuNTU5NDIgNi4xMDAzMSA2LjExMjk4IDYuNTQ1NzhDNS42NjY1NCA2Ljk5MTI1IDUuMzkyNTIgNy40Mzg0NSA1LjE4Nzc1IDcuOTY1ODhDNC45ODk0NiA4LjQ3NTQ4IDQuODU0MDYgOS4wNTgzMyA0LjgxNTE3IDkuOTExNzVDNC43NzU2NCAxMC43NjY1IDQuNzY2NTkgMTEuMDM5OCA0Ljc2NjU5IDEzLjIxNjlDNC43NjY1OSAxNS4zOTM5IDQuNzc1NjQgMTUuNjY3MiA0LjgxNTE3IDE2LjUyMkM0Ljg1NDA2IDE3LjM3NTUgNC45ODk0NiAxNy45NTgyIDUuMTg3NzUgMTguNDY3OEM1LjM5MjUyIDE4Ljk5NSA1LjY2NjYgMTkuNDQyNyA2LjExMjk4IDE5Ljg4NzlDNi41NTkzNiAyMC4zMzMyIDcuMDA2MTkgMjAuNjA3NCA3LjUzMzk0IDIwLjgxMjZDOC4wNDQ0OSAyMS4wMTA4IDguNjI3MDQgMjEuMTQ2MSA5LjQ4MDk3IDIxLjE4NUMxMC4zMzY3IDIxLjIyMzggMTAuNjA5NyAyMS4yMzM1IDEyLjc4ODEgMjEuMjMzNUMxNC45NjY0IDIxLjIzMzUgMTUuMjM5OSAyMS4yMjQ1IDE2LjA5NTIgMjEuMTg1QzE2Ljk0OTIgMjEuMTQ2MSAxNy41MzIzIDIxLjAxMDggMTguMDQyMiAyMC44MTI2QzE4LjU2OTYgMjAuNjA3NCAxOS4wMTY3IDIwLjMzMzQgMTkuNDYzMiAxOS44ODc5QzE5LjkwOTYgMTkuNDQyNSAyMC4xODMgMTguOTk1IDIwLjM4ODQgMTguNDY3OEMyMC41ODY3IDE3Ljk1ODIgMjAuNzIyNyAxNy4zNzU0IDIwLjc2MSAxNi41MjJDMjAuNzk5OSAxNS42NjY2IDIwLjgwODkgMTUuMzkzOSAyMC44MDg5IDEzLjIxNjlDMjAuODA4OSAxMS4wMzk4IDIwLjc5OTkgMTAuNzY2NSAyMC43NjEgOS45MTE3NUMyMC43MjIxIDkuMDU4MjYgMjAuNTg2NyA4LjQ3NTE2IDIwLjM4ODQgNy45NjU4OEMyMC4xODMgNy40Mzg3NyAxOS45MDg5IDYuOTkxOTUgMTkuNDYzMiA2LjU0NTc4QzE5LjAxNzQgNi4wOTk2IDE4LjU2OTYgNS44MjU3NSAxOC4wNDI4IDUuNjIxMUMxNy41MzIzIDUuNDIyOTMgMTYuOTQ5MSA1LjI4Njk3IDE2LjA5NTggNS4yNDg3NEMxNS4yNDA1IDUuMjA5ODggMTQuOTY3MSA1LjIwMDIgMTIuNzg4NyA1LjIwMDJDMTAuNjEwMyA1LjIwMDIgMTAuMzM2NyA1LjIwOTI0IDkuNDgwOTcgNS4yNDg3NFoiIGZpbGw9InVybCgjcGFpbnQxX3JhZGlhbF8zMDJfMTQ2KSIvPgo8cGF0aCBkPSJNMTAuMTE0NyAxMy4yMTY5QzEwLjExNDcgMTEuNzQxMSAxMS4zMTE0IDEwLjU0NDQgMTIuNzg4MSAxMC41NDQ0QzE0LjI2NDcgMTAuNTQ0NCAxNS40NjIxIDExLjc0MTEgMTUuNDYyMSAxMy4yMTY5QzE1LjQ2MjEgMTQuNjkyNiAxNC4yNjQ3IDE1Ljg4OTMgMTIuNzg4MSAxNS44ODkzQzExLjMxMTQgMTUuODg5MyAxMC4xMTQ3IDE0LjY5MjYgMTAuMTE0NyAxMy4yMTY5Wk04LjY2OTEzIDEzLjIxNjlDOC42NjkxMyAxNS40OTA0IDEwLjUxMzIgMTcuMzMzMyAxMi43ODgxIDE3LjMzMzNDMTUuMDYzIDE3LjMzMzMgMTYuOTA3IDE1LjQ5MDQgMTYuOTA3IDEzLjIxNjlDMTYuOTA3IDEwLjk0MzMgMTUuMDYzIDkuMTAwNCAxMi43ODgxIDkuMTAwNEMxMC41MTMyIDkuMTAwNCA4LjY2OTEzIDEwLjk0MzMgOC42NjkxMyAxMy4yMTY5Wk0xNi4xMDc1IDguOTM3MThDMTYuMTA3NCA5LjEyNzQ1IDE2LjE2MzggOS4zMTM0NiAxNi4yNjk1IDkuNDcxN0MxNi4zNzUyIDkuNjI5OTUgMTYuNTI1NSA5Ljc1MzMxIDE2LjcwMTMgOS44MjYxOUMxNi44NzcyIDkuODk5MDcgMTcuMDcwNyA5LjkxODIgMTcuMjU3NSA5Ljg4MTE1QzE3LjQ0NDIgOS44NDQxMSAxNy42MTU4IDkuNzUyNTYgMTcuNzUwNCA5LjYxODA3QzE3Ljg4NTEgOS40ODM1OSAxNy45NzY4IDkuMzEyMjEgMTguMDE0MSA5LjEyNTYyQzE4LjA1MTMgOC45MzkwMiAxOC4wMzIzIDguNzQ1NTkgMTcuOTU5NSA4LjU2OTc4QzE3Ljg4NjcgOC4zOTM5NyAxNy43NjM0IDguMjQzNjcgMTcuNjA1MiA4LjEzNzlDMTcuNDQ2OSA4LjAzMjE0IDE3LjI2MDggNy45NzU2NCAxNy4wNzA0IDcuOTc1NTZIMTcuMDcwMUMxNi44MTQ5IDcuOTc1NjggMTYuNTcwMiA4LjA3NzAyIDE2LjM4OTcgOC4yNTczMkMxNi4yMDkyIDguNDM3NjIgMTYuMTA3NyA4LjY4MjE0IDE2LjEwNzUgOC45MzcxOFpNOS41NDczOSAxOS43NDIyQzguNzY1MzMgMTkuNzA2NiA4LjM0MDI1IDE5LjU3NjQgOC4wNTc3NyAxOS40NjY1QzcuNjgzMjYgMTkuMzIwNyA3LjQxNjA1IDE5LjE0NzIgNy4xMzUxMSAxOC44NjY4QzYuODU0MTYgMTguNTg2NCA2LjY4MDI2IDE4LjMxOTYgNi41MzUxIDE3Ljk0NTNDNi40MjQ5OCAxNy42NjMyIDYuMjk0NzEgMTcuMjM4MiA2LjI1OTE2IDE2LjQ1NjZDNi4yMjAyNyAxNS42MTE2IDYuMjEyNTEgMTUuMzU3OCA2LjIxMjUxIDEzLjIxNjlDNi4yMTI1MSAxMS4wNzYxIDYuMjIwOTIgMTAuODIzIDYuMjU5MTYgOS45NzcyM0M2LjI5NDc4IDkuMTk1NjQgNi40MjYwMSA4Ljc3MTUyIDYuNTM1MSA4LjQ4ODVDNi42ODA5IDguMTE0MjIgNi44NTQ1NSA3Ljg0NzE3IDcuMTM1MTEgNy41NjYzOUM3LjQxNTY3IDcuMjg1NjIgNy42ODI2MiA3LjExMTgyIDguMDU3NzcgNi45NjY3NUM4LjM0MDEzIDYuODU2NjkgOC43NjUzMyA2LjcyNjUgOS41NDczOSA2LjY5MDk3QzEwLjM5MjkgNi42NTIxMSAxMC42NDY5IDYuNjQ0MzUgMTIuNzg4MSA2LjY0NDM1QzE0LjkyOTIgNi42NDQzNSAxNS4xODM1IDYuNjUyNzUgMTYuMDI5NyA2LjY5MDk3QzE2LjgxMTggNi43MjY1NyAxNy4yMzYxIDYuODU3NzIgMTcuNTE5MyA2Ljk2Njc1QzE3Ljg5MzggNy4xMTE4MiAxOC4xNjEgNy4yODYgMTguNDQyIDcuNTY2MzlDMTguNzIyOSA3Ljg0Njc5IDE4Ljg5NjIgOC4xMTQyMiAxOS4wNDIgOC40ODg1QzE5LjE1MjEgOC43NzA2OSAxOS4yODI0IDkuMTk1NjQgMTkuMzE3OSA5Ljk3NzIzQzE5LjM1NjggMTAuODIzIDE5LjM2NDYgMTEuMDc2MSAxOS4zNjQ2IDEzLjIxNjlDMTkuMzY0NiAxNS4zNTc4IDE5LjM1NjggMTUuNjEwOSAxOS4zMTc5IDE2LjQ1NjZDMTkuMjgyMyAxNy4yMzgyIDE5LjE1MTQgMTcuNjYzIDE5LjA0MiAxNy45NDUzQzE4Ljg5NjIgMTguMzE5NiAxOC43MjI1IDE4LjU4NjcgMTguNDQyIDE4Ljg2NjhDMTguMTYxNCAxOS4xNDY5IDE3Ljg5MzggMTkuMzIwNyAxNy41MTkzIDE5LjQ2NjVDMTcuMjM3IDE5LjU3NjUgMTYuODExOCAxOS43MDY3IDE2LjAyOTcgMTkuNzQyMkMxNS4xODQyIDE5Ljc4MTEgMTQuOTMwMiAxOS43ODg5IDEyLjc4ODEgMTkuNzg4OUMxMC42NDU5IDE5Ljc4ODkgMTAuMzkyNyAxOS43ODExIDkuNTQ3MzkgMTkuNzQyMlpNOS40ODA5NyA1LjI0ODc0QzguNjI3MDQgNS4yODc2MSA4LjA0MzUyIDUuNDIyOTMgNy41MzM5NCA1LjYyMTFDNy4wMDYxOSA1LjgyNTc1IDYuNTU5NDIgNi4xMDAzMSA2LjExMjk4IDYuNTQ1NzhDNS42NjY1NCA2Ljk5MTI1IDUuMzkyNTIgNy40Mzg0NSA1LjE4Nzc1IDcuOTY1ODhDNC45ODk0NiA4LjQ3NTQ4IDQuODU0MDYgOS4wNTgzMyA0LjgxNTE3IDkuOTExNzVDNC43NzU2NCAxMC43NjY1IDQuNzY2NTkgMTEuMDM5OCA0Ljc2NjU5IDEzLjIxNjlDNC43NjY1OSAxNS4zOTM5IDQuNzc1NjQgMTUuNjY3MiA0LjgxNTE3IDE2LjUyMkM0Ljg1NDA2IDE3LjM3NTUgNC45ODk0NiAxNy45NTgyIDUuMTg3NzUgMTguNDY3OEM1LjM5MjUyIDE4Ljk5NSA1LjY2NjYgMTkuNDQyNyA2LjExMjk4IDE5Ljg4NzlDNi41NTkzNiAyMC4zMzMyIDcuMDA2MTkgMjAuNjA3NCA3LjUzMzk0IDIwLjgxMjZDOC4wNDQ0OSAyMS4wMTA4IDguNjI3MDQgMjEuMTQ2MSA5LjQ4MDk3IDIxLjE4NUMxMC4zMzY3IDIxLjIyMzggMTAuNjA5NyAyMS4yMzM1IDEyLjc4ODEgMjEuMjMzNUMxNC45NjY0IDIxLjIzMzUgMTUuMjM5OSAyMS4yMjQ1IDE2LjA5NTIgMjEuMTg1QzE2Ljk0OTIgMjEuMTQ2MSAxNy41MzIzIDIxLjAxMDggMTguMDQyMiAyMC44MTI2QzE4LjU2OTYgMjAuNjA3NCAxOS4wMTY3IDIwLjMzMzQgMTkuNDYzMiAxOS44ODc5QzE5LjkwOTYgMTkuNDQyNSAyMC4xODMgMTguOTk1IDIwLjM4ODQgMTguNDY3OEMyMC41ODY3IDE3Ljk1ODIgMjAuNzIyNyAxNy4zNzU0IDIwLjc2MSAxNi41MjJDMjAuNzk5OSAxNS42NjY2IDIwLjgwODkgMTUuMzkzOSAyMC44MDg5IDEzLjIxNjlDMjAuODA4OSAxMS4wMzk4IDIwLjc5OTkgMTAuNzY2NSAyMC43NjEgOS45MTE3NUMyMC43MjIxIDkuMDU4MjYgMjAuNTg2NyA4LjQ3NTE2IDIwLjM4ODQgNy45NjU4OEMyMC4xODMgNy40Mzg3NyAxOS45MDg5IDYuOTkxOTUgMTkuNDYzMiA2LjU0NTc4QzE5LjAxNzQgNi4wOTk2IDE4LjU2OTYgNS44MjU3NSAxOC4wNDI4IDUuNjIxMUMxNy41MzIzIDUuNDIyOTMgMTYuOTQ5MSA1LjI4Njk3IDE2LjA5NTggNS4yNDg3NEMxNS4yNDA1IDUuMjA5ODggMTQuOTY3MSA1LjIwMDIgMTIuNzg4NyA1LjIwMDJDMTAuNjEwMyA1LjIwMDIgMTAuMzM2NyA1LjIwOTI0IDkuNDgwOTcgNS4yNDg3NFoiIGZpbGw9IndoaXRlIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMzAyXzE0NiIgeDE9IjEzIiB5MT0iMCIgeDI9IjEzIiB5Mj0iMjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzhGM0FBOCIvPgo8c3RvcCBvZmZzZXQ9IjAuNDYxODA2IiBzdG9wLWNvbG9yPSIjREMzODc1Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0VFNkI0NCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MV9yYWRpYWxfMzAyXzE0NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSg2Ljg5Nzk5IDIxLjMwOTMpIHNjYWxlKDIwLjk0MjcgMjAuOTMwMikiPgo8c3RvcCBvZmZzZXQ9IjAuMDkiIHN0b3AtY29sb3I9IiNGQThGMjEiLz4KPHN0b3Agb2Zmc2V0PSIwLjc4IiBzdG9wLWNvbG9yPSIjRDgyRDdFIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==" width="25px" class="ml-2"> ' +
              '                 </a> ' +
              '                 <a href="https://www.youtube.com/@drogaleste3564/videos" target="_blank" rel="noopener noreferrer"> ' +
              '                     <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMTMiIGZpbGw9IiNGRjMwMDAiLz4KPHBhdGggZD0iTTIxLjMwNTMgOC44Mjc4QzIxLjEwNjcgOC4wODMyNiAyMC41MTk0IDcuNDk1OSAxOS43NzIxIDcuMjk0NTlDMTguNDIxIDYuOTMzMzUgMTIuOTk5OCA2LjkzMzM1IDEyLjk5OTggNi45MzMzNUMxMi45OTk4IDYuOTMzMzUgNy41ODE0MyA2LjkzMzM1IDYuMjI3NTMgNy4yOTQ1OUM1LjQ4MzAxIDcuNDkzMTQgNC44OTU2OCA4LjA4MDUgNC42OTQzOCA4LjgyNzhDNC4zMzMxNiAxMC4xNzkgNC4zMzMxNiAxMyA0LjMzMzE2IDEzQzQuMzMzMTYgMTMgNC4zMzMxNiAxNS44MjEgNC42OTQzOCAxNy4xNzIyQzQuODkyOTIgMTcuOTE2OCA1LjQ4MDI2IDE4LjUwNDEgNi4yMjc1MyAxOC43MDU0QzcuNTgxNDMgMTkuMDY2NyAxMi45OTk4IDE5LjA2NjcgMTIuOTk5OCAxOS4wNjY3QzEyLjk5OTggMTkuMDY2NyAxOC40MjEgMTkuMDY2NyAxOS43NzIxIDE4LjcwNTRDMjAuNTE2NiAxOC41MDY5IDIxLjEwNCAxNy45MTk1IDIxLjMwNTMgMTcuMTcyMkMyMS42NjY1IDE1LjgyMSAyMS42NjY1IDEzIDIxLjY2NjUgMTNDMjEuNjY2NSAxMyAyMS42NjY1IDEwLjE3OSAyMS4zMDUzIDguODI3OFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMS4yNjgxIDE1LjYwMDRMMTUuNzcxMSAxM0wxMS4yNjgxIDEwLjM5OTZWMTUuNjAwNFoiIGZpbGw9IiNGRjMwMDAiLz4KPC9zdmc+Cg==" width="25px" class="ml-2"> ' +
              '                 </a> ' +
              '             </div> ' +
              '         </footer> ' +
              '     </div> ' +
              ' </div> ';
              
              let teste = html; 
              let headerUsuario = {
                emails: 'junioroliveira.la@hotmail.com',//email, // + ', junioroliveira.la@hotmail.com',
                titulo: 'Drogaleste - Credenciais',
                corpoMensagem: teste
              }              
              var sendUsuario = await notify(headerUsuario);


              // let client = JSON.parse(response).clientId;

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
            
            // }
            
            // res.status(200).send({ cod: 200, message: JSON.parse(response).mensagem});
            res.status(200).send('OK');
              
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
  
  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Autenticação']
    #swagger.description = 'Autoriza e habilita o usuário'
     swagger.parameters['produto'] = { 
                                    in: 'headers', 
                                    type: 'integer', 
                                    description: 'código do produto.', 
                                    required: true
                                  }
     swagger.parameters['loja'] = { 
                                    in: 'headers', 
                                    type: 'integer', 
                                    description: 'código da loja.', 
                                    required: true
                                  }
    swagger.responses[200] = { 
                                schema: { $ref: "#/definitions/Cliente/purchasehistoric" },
                                description: 'Usuário encontrado.'
                              }
                               
  */

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