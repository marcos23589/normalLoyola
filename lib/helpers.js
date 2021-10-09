const bcrypt = require('bcryptjs');

const helpers = {};

//método para la creacion de usuario
helpers.encryptPassword = async (password) => {
    //se genera un patron de encriptado
    const salt = await bcrypt.genSalt(10);
    
    //se le pasa la contraseña y el patron de encriptado
    //para q la cifre
    const hash = await bcrypt.hash(password, salt);    
    return hash;
};

//metodo para el logueo de usuario
helpers.matchPassword = async(password, savedPassword) => {
    try {
        await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }

}


module.exports = helpers;