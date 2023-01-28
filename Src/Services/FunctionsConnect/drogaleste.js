
var sql = require("mssql");
const config = require('../StringConnection/drogaleste')

async function execSQLQuery(sqlQry, res){
    

    
    try{
        var connect = await  sql.connect(config)
        .then(conn => connect = conn)
        .catch(err => console.log(err));   
    
        var response = await  connect.request()
                                        .query(sqlQry)
                                        .then(async result => response = await result.recordsets[0][0].res)
                                        .catch(err => err);    
        return response;

    }catch(error){
        console.log('Erro ao retornar dados')
        return {status: 'Erro ao retornar os dados', mensagem: error}
    }
}

module.exports = execSQLQuery;