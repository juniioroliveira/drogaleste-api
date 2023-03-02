
var sql = require("mssql");
const reportLog = require('../../Services/Functions/reportLog');
const config = require('../../../Bin/config.json');

async function execSQLDrogalesteQuery(script, res){ 

    const strConn = config.strConn.find(item => 
                                        item.server   === 'drogaleste.procfit.com.br' &&
                                        item.database === 'PBS_DROGALESTE_DADOS' &&
                                        item.user     === 'procfit.drogaleste'); 
    
    let messageSucess;
    let messageError;
    let response;
    
    sql.connect(strConn)
        .then(async conn => {
           response = await conn.request()
                .query(script)
                .then(async content => messageSucess = await content.recordset[0].res)
                .catch(async err =>  messageError = await err);

            if(response){

                console.log(messageError)
                
                if(messageError){
                    var error = {
                        code: 500,
                        message: 'Erro ao retornar dados',
                        ex: messageError.code
                    }

                    reportLog(`Code:       ${error.code}`)
                    reportLog(`Message:    ${error.message}`)
                    reportLog(`Ex:         ${error.ex}`)        
                    console.log('');

                    res.status(500).send(error);
                }
                
                if(messageSucess){
                    
                    var error = {
                        code: 200,
                        message: 'Dados retornados com sucesso'
                    }

                    reportLog(`Code:       ${error.code}`)
                    reportLog(`Message:    ${error.message}`) 
                    console.log('');
                    
                    console.log(messageSucess)
                    res.status(200).send(JSON.parse(messageSucess))
                }

            }else{
                var error = {
                    code: 404,
                    message: 'Nenhum dado encontrado',
                    ex: 'Sua requisição não retornou nenhuma dado'
                }

                reportLog(`Code:       ${error.code}`)
                reportLog(`Message:    ${error.message}`)
                reportLog(`Ex:         ${error.ex}`)        
                console.log('');

                res.status(404).send(error);
            }
                }
        );
}

module.exports = execSQLDrogalesteQuery;