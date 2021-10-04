//ESTE ARCHIVO NO SE ESTÁ USANDO POR EL MOMENTO

const express = require('express');
const router = express.Router();

const pool=require('../database');

const { param, Result } = require("express-validator");

router.get('/', (req,res)=>{
    return res.send('Hola mundo de vuelta!!');
});

router.get('/links',(req,res)=>{
    return res.send('links!');
});

router.get('/add',(req,res)=>{
    return res.render('links/add');
});

router.post('/add', (req,res)=>{
    console.log(req.body);
    const{ apellido, nombre, documento, nacimiento }=req.body;
    const nuevoAlumno = {
        apellido,
        nombre,
        documento,
        nacimiento
    };    
    pool.query('INSERT INTO alumnos set ?', nuevoAlumno);
    res.send('controlador!');
});

module.exports=router;