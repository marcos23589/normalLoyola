const express = require('express');
const router = express.Router();
const pool=require('../database');

module.exports = () => {

    router.get('/',  async (req, res) => {
        const alumno = await pool.query('SELECT * FROM alumnos');
        console.log(alumno);
        res.render('links/list', {alumno});
    });


    router.get('/links',(req,res)=>{
        return res.send('links!');
    });
    
    router.get('/add',(req,res)=>{
        return res.render('links/add');
    });
    
    router.post('/add', (req,res)=>{
        pool.query('INSERT INTO alumnos set ?', req.body);
        console.log(req.body);
        res.redirect('/');
        /* try{
            
        }catch(err){
            if(err.code ===  'ER_DUP_ENTRY'){
                res.send('valor duplicado!');
            } else
            if (err.code === 'ER_TRUNCATED_WRONG_VALUE'){
                res.send('error en un dato!');
            }
        } */
           
    });
    
    return router;
}