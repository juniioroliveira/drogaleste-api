

async function reportError(error){
    var error = {
        code:error.code,
        process: error.process,
        router: error.router,
        message: error.message,
        ex:error.ex
    };
    return(
       JSON.parse(error)



     //               Verificação de parametros          //
    //////////////////////////////////////////////////////

    //       Declaração/Validação de parametros         //
   //////////////////////////////////////////////////////  

     //               Execução do processo               //
    //////////////////////////////////////////////////////

     //               Verificação de retorno             //
    //////////////////////////////////////////////////////

     //               Resultado final                    //
    //////////////////////////////////////////////////////



    )
};

module.exports = reportError