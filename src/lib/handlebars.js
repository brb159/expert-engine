//configuracion timeago. Ya que la fecha esta en formato timestamp
const { format } = require("timeago.js"); //importando el metodo format de timeago


const helpers = {}; // creo un objeto que puedo utilizar desde las vistas este objeto sera utilizado por la vista de handelbars

helpers.timeago = (timestamp)=>{
return format(timestamp);//metodo creado por mi que recibe un timestamp y le damos formato
};

module.exports = helpers ;