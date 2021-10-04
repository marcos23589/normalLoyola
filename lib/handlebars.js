const { format, compareAsc } = require('date-fns');

const helpers = {};

helpers.timeago = (date) =>{
    //console.log(timestamp);
    return format(new Date(date), 'dd/MM/yyyy');
};

module.exports = helpers;