const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;//verificar mayusculas

const pool = require("../database");//conectamos a la bd para crear el usuario
const helpers = require("../lib/helpers");

passport.use("local", new LocalStrategy({
usernameField:"username",
passwordField:"password"
},//que es lo que voy a recibir de mi signup?
async function(req, username, password, done){
    console.log(req.body);
    console.log(username);
    console.log(password);
}));
    /*
const newUser = {
    username,
    password,
};

newUser.password = try{
    await helpers.encryptPassword(password);
} catch(e){console.log(e)};

const result = await pool.query("INSERT INTO user SET  ?", [newUser]); //desde aca debemos cifrar los datos
console.log(result)
}));
//se necesita de middleware para usarlo
//indica que debemos definir dos parte de passport.
/*uno para serializarlo y otro para deserializarlo.
passport.serializeUser((usr, done)=>{

});*/