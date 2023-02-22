
var sql = require("mssql");
const config = require('../../../Bin/config.json');

const reportLog = require('../../Services/Functions/reportLog');

async function execSQLDrogalesteQuery(sqlQry, res){   

    // const config = require('../StringConnection/drogaleste')

    const strConn = config.strConn.find(item => 
                                        item.server   === 'drogaleste.procfit.com.br' &&
                                        item.database === 'PBS_DROGALESTE_DADOS' &&
                                        item.user     === 'procfit.drogaleste'); 

    // try{
        var connect = await  sql.connect(strConn)
        .then(conn => connect = conn)
        .catch(err => console.log(err));   

        var response = await  connect.request()
                                        .query(sqlQry)
                                        .then(async result => response = await result.recordsets[0][0])
                                        .catch(err => ({
                                                            codErro: err.code,
                                                            originalError: err.originalError
                                                        }) ); 
                                        // console.log(response.originalError.info)                                        
    

        return response;

    // }catch(error){
    //     console.log('Erro ao retornar dados')
    //     return {status: 'Erro ao retornar os dados', mensagem: error}
    // }
}

module.exports = execSQLDrogalesteQuery;