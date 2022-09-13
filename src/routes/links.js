const express = require('express');
const router = express.Router();
const pool = require("../database"); //hace referencia a la conexion a la base de datos

router.get('/add', function(req, res){
    res.render('./layouts/links/add');/*Verificar bien la direccion de las carpetas*/
});

router.post("/add", async function(req, res){//los datos lso recibimos del objeto req.body
    const { title, url, description } = req.body; /*tomamos los datos con destructiring
    para usarlo como un objeto nuevo y enlazarlo a un usuario*/
    const newLink = {
        title,
        url,
        description
    };
     await pool.query("INSERT INTO links set ?", [newLink]);
    req.flash("success", "Link guardado correctamente");
    res.redirect("/links");
})

router.get("/", async (req,res)=>{ //para ver los links guardados
    const links = await pool.query("SELECT * FROM links");
    console.log(links);
    res.render("./layouts/links/list", {links}); // ruta y la lista de base de datos
});

router.get("/delete/:id", async (req,res)=>{//ruta especifica para eliminarlo
const { id } = req.params;
    await pool.query("DELETE FROM links WHERE ID = ?", [id]);//sentencia sql
    console.log(req.params.id);//verificamos si nos pasan el parámetros
    req.flash("success", "Enlace removido correctamente");
    res.redirect("/links");
});

router.get("/edit/:id", async (req,res)=>{
    const { id } = req.params;//requiere el id para buscarlo en bd
    const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);//selecciona los cambos ya rellenados
    res.render("./layouts/links/edit", {links: links[0]})
})

router.post("/edit/:id", async (req,res) =>{
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
    req.flash("success","Link actualizado correctamente");
    res.redirect("/links");
})
module.exports = router;