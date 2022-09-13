const express = require('express');
const router = express.Router();
//en este archivo definimos metodos de autentificacion
const passport = require("passport"); //Pasport permite validar con redes sociales.

router.get('/signup', function(req, res){
    res.render("./auth/signup");
});

router.post("/signup", passport.authenticate("local", {
        successRedirect:"/profile",
        failureRedirect:"/signup",
        failureFlash: true
    }));

router.get("/profile", (req,res)=>{
    res.send("respuesta");
});

module.exports = router;