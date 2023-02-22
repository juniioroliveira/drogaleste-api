

async function reportError(response){   
   var now = String(new Date().getHours()).padStart(2, "0") + ':' + String(new Date().getMinutes()).padStart(2, "0") + ':' + String(new Date().getSeconds()).padStart(2, "0");   
    
   console.log(`${now} - ${response}`);
}

module.exports = reportError; 