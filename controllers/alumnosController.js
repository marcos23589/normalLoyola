const express = require('express');
const router = express.Router();
const pool=require('../database');

exports.alumnosGet = async (req,res)=>{
    const alumno = await pool.query('SELECT * FROM alumnos');   
    console.log("----- alumnos GET -------")
    console.log("alumnos -> ",alumno);        
    return res.render('alumnos/list', {alumno, messages:req.flash('mensaje')});
}

exports.addGet = async (req,res)=>{
    return res.render('alumnos/add', {messages: req.flash('mensaje')});
}

exports.addPost = async(req,res)=>{
    try {
        await pool.query('INSERT INTO alumnos set ?', req.body);                         
        req.flash('mensaje', 'Alumno guardado exitosamente');                       
        res.redirect('/alumnos');               
    } catch (error) {
        if(error.code === 'ER_DUP_ENTRY'){                                           
            req.flash('mensaje', 'Documento duplicado!');
            res.redirect('/add')
        }
    }
    console.log('REQ->',req.body)
}

exports.deleteAlumnos = async (req,res)=>{
    console.log(req.params.idAlumnos);
    await pool.query('DELETE FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
    req.flash('mensaje', 'Alumno eliminado exitosamente');        
    res.redirect('/alumnos');
}

exports.editAlumnos = async(req,res)=>{        
    const edicion = await pool.query('SELECT * FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);       
    //construimos el objeto DATE y le pasamos el timestamp en nacimiento
    const fecha = new Date(edicion[0].nacimiento);
    //pasamos el valor de fecha al formato YYYY-MM-DD
    const fechaNac = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
    //lo guardamos en el body
    edicion[0].nacimiento = fechaNac;
    res.render('alumnos/edit', {link: edicion[0]});
}

exports.postAlumnos = async(req,res)=>{
    
    console.log('params',req.body.nacimiento)
    const { apellido,nombre,documento,nacimiento} = req.body;
    const newLink = {
        apellido,nombre,documento,nacimiento
    }
    await pool.query('UPDATE alumnos set ? WHERE idAlumnos = ?', [newLink, req.params.idAlumnos])
    req.flash('mensaje', 'Cambios efectuados correctamente')
    res.redirect('/alumnos');
}

exports.verAlumno = async(req,res)=>{        
    const vista = await pool.query('SELECT * FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
    console.log(vista[0])
    res.render('alumnos/view', {link: vista[0]});
    
}