const mysql = require("mysql");
const { promisify } = require("util"); //módulo de node para soportar conexiones asincronas
//para soportar callbacks, promesas, async await

const { database } = require("./keys") //Usando destructuracion

const pool = mysql.createPool(database); 

pool.getConnection((err, connection)=>{
     if(err){
        if (err.code === "PROTOCOL_CONNECTION_LOST"){
            console.error("Database conexion cerrada");
        }
        if (err.code === "ER_CON_COUNT_ERROR"){
            console.error("Error de conteo");
    }
        if (err.code === "ECONNREFUSED"){
            console.error("La base de datos declina la conexion");
        }
    }
    if(connection) connection.release()
    console.log("DB esta conectada")
    return;
    
});//se ejecuta de esta forma para estar conectado y no tener que llamarla cada rato

pool.query = promisify(pool.query);

module.exports = pool;