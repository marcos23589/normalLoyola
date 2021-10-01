const { format, compareAsc } = require('date-fns');

const helpers = {};

helpers.timeago = (timestamp) =>{
    //console.log(timestamp);
    return format(new Date(timestamp), 'dd/MM/yyyy');
};

module.exports = helpers;