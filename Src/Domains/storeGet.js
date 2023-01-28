var sql = require("mssql")

function store(store){

    // config for your database
  // var config = {
  //   user: 'drogaleste.junior',
  //   password: 'Ti873562',
  //   server: 'drogaleste.procfit.com.br', // You can use 'localhost\\instance' to connect to named instance
  //   database: 'PBS_DROGALESTE_DADOS',
  //   port: 1433,

  //   options: {
  //       encrypt: false // Use this if you're on Windows Azure
  //   }
  // };

//   // connect to your database
//   sql.connect(config, function (err) {
  
//       if (err) console.log(err);

//       // create Request object
//       var request = new sql.Request();
         
//       // query to the database and get the records
//       request.query('select TOP 5 * from PDV_SAT_LOGS', function (err, recordset) {
          
//           if (err) console.log(err)

//           // send records as a response
//           res.send(recordset);
          
//       });
//   });

    return 'store'
}

module.exports = store;