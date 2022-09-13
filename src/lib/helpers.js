//para encriptar las claves
const bcrypt = require("bcryptjs");
const helpers = {};


//para cifrar la contraseña
helpers.encryptPassword = async (password) => { try{
    const salt = await bcrypt.genSalt(2);//se usa de esta forma y se encripta en la cantidad de veces ingresada
    const hash = await bcrypt.hash(password,salt);
    return hash;
} catch(e){ console.log(e)}
};
helpers.matchPassword = async (password, savedPassword) =>{
    try{
        await bcrypt.compare(password, savedPassword);
}catch(e){ console.log(e)};
    };
    
// Recibimos la contraseña, se genera un patron 2 veces y se le da la contraseña
//para cifrarla y la devolvemos
//Una vez con el metodo lo pasamos a passport
module.exports = helpers;