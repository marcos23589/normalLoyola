//ESTE ARCHIVO SE USA PARA GENERAR FUNCIONES A USAR 
//EN LAS PLANTILLAS DE HANDLEBARS

const { format } = require('date-fns');

const helpers = {};

helpers.timeago = (date) =>{
    //console.log(timestamp);
    return format(new Date(date), 'dd/MM/yyyy');
};

module.exports = helpers;