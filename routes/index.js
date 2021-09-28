const express = require('express');
const router = express.Router();
const pool=require('../database');

module.exports = () => {

    router.get('/',  (req, res) => {
        res.send('index');
    });


    router.get('/links',(req,res)=>{
        return res.send('links!');
    });
    
    router.get('/add',(req,res)=>{
        return res.render('links/add');
    });
    
    router.post('/add', (req,res)=>{
        console.log(req.body);
       /*  const{ apellido, nombre, documento, nacimiento }=req.body;
        const nuevoAlumno = {
            apellido,
            nombre,
            documento,
            nacimiento
        };*/    
        try{
            pool.query('INSERT INTO alumnos set ?', req.body);
            res.send('controlador!');   
        }catch(err){
            res.send(`Error encontrado! => ${err}`);
/*             setTimeout(()=>{
                res.render('/links/add');
            }, 2000); */
        }

        
    });
    
    return router;
}