import { Router } from 'express';
const router = Router();
import { query } from '../database';

export async function alumnosGet(req,res){
    const alumno = await query('SELECT * FROM alumnos');        
    console.log(alumno);        
    return res.render('alumnos/list', {alumno, messages:req.flash('mensaje')});
}

export async function addGet(req,res){
    return res.render('alumnos/add', {messages: req.flash('mensaje')});
}

export async function addPost(req,res){
    try {
        await query('INSERT INTO alumnos set ?', req.body);                         
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

export async function deleteAlumnos(req,res){
    console.log(req.params.idAlumnos);
    await query('DELETE FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
    req.flash('mensaje', 'Alumno eliminado exitosamente');        
    res.redirect('/alumnos');
}

export async function editAlumnos(req,res){        
    const edicion = await query('SELECT * FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
    console.log(edicion[0])        
    res.render('alumnos/edit', {link: edicion[0]});
}

export async function postAlumnos(req,res){
    
    console.log('params',req.body.nacimiento)
    const { apellido,nombre,documento,nacimiento} = req.body;
    const newLink = {
        apellido,nombre,documento,nacimiento
    }
    await query('UPDATE alumnos set ? WHERE idAlumnos = ?', [newLink, req.params.idAlumnos])
    req.flash('mensaje', 'Cambios efectuados correctamente')
    res.redirect('/alumnos');
}

export async function verAlumno(req,res){        
    const vista = await query('SELECT * FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
    console.log(vista[0])
    res.render('alumnos/view', {link: vista[0]});
    
}