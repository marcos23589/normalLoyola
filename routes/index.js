const express = require('express');
const router = express.Router();
const pool=require('../database');
const passport = require('passport');



module.exports = () => {

    router.get('/',  async (req, res) => {
        const alumno = await pool.query('SELECT * FROM alumnos');        
        console.log(alumno);
        return res.render('links/list', {alumno, messages: req.flash('mensaje')});
    });


    router.get('/links',(req,res)=>{
        return res.send('links!');
    });
    
    router.get('/add',async (req,res)=>{
        return res.render('links/add', {messages: req.flash('mensaje')});
    });
    
    router.post('/add', async(req,res)=>{
        try {
            await pool.query('INSERT INTO alumnos set ?', req.body);             
            // Flavio: Agregado await antes de la asignación del par:valor
            req.flash('mensaje', 'Alumno guardado exitosamente');
                       
            res.redirect('/');               
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY'){                
                //alert('Documento duplicado!')                
                req.flash('mensaje', 'Documento duplicado!');
                res.redirect('/add')
            }
        }
        console.log('REQ->',req.body)
    });

    router.get('/delete/:idAlumnos', async (req,res)=>{
        console.log(req.params.idAlumnos);
        await pool.query('DELETE FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
        // Flavio: Agregado await antes de la asignación del par:valor
        req.flash('mensaje', 'Alumno eliminado exitosamente');        
        res.redirect('/');
    });

    router.get('/edit/:idAlumnos', async(req,res)=>{        
        const edicion = await pool.query('SELECT * FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
        console.log(edicion[0])
        req.flash('mensaje', 'Cambios efectuados correctamente')
        res.render('links/edit', {link: edicion[0]});
    });

    router.post('/edit/:idAlumnos', async(req,res)=>{
        
        console.log('params',req.body.nacimiento)
        const { apellido,nombre,documento,nacimiento} = req.body;
        const newLink = {
            apellido,nombre,documento,nacimiento
        }
        await pool.query('UPDATE alumnos set ? WHERE idAlumnos = ?', [newLink, req.params.idAlumnos])
        res.redirect('/');
    })

    router.get('/view/:idAlumnos', async(req,res)=>{        
        const vista = await pool.query('SELECT * FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
        console.log(vista[0])
        res.render('links/view', {link: vista[0]});
        
    });

  
    
    return router;
}


