const express = require('express');
const router = express.Router();
const pool=require('../database');
const alert=require('alert');

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
    
    router.post('/add', async(req,res)=>{
        try {
            await pool.query('INSERT INTO alumnos set ?', req.body);
            console.log(req.body);
            res.redirect('/');               
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY'){                
                alert('Documento duplicado!')                
                return res.render('links/add')
            }
        }
        
    });

    router.get('/delete/:idAlumnos', async (req,res)=>{
        console.log(req.params.idAlumnos);
        await pool.query('DELETE FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
        res.redirect('/');
    });

    router.get('/edit/:idAlumnos', async(req,res)=>{        
        const edicion = await pool.query('SELECT * FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
        console.log(edicion[0])
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