const express = require('express');
const router = express.Router();
const pool=require('../database');
const passport = require('passport');



module.exports = () => {

    router.get('/',  async (req, res) => {
        const alumno = await pool.query('SELECT * FROM alumnos');        
        console.log(alumno);
        // Flavio: agregado la recuperación del/los mensajes de la key alerta
        const mensaje = await req.consumeFlash('mensaje')       

        if(mensaje){
            return res.render('links/list', {alumno, mensaje});
        } else {
            return res.render('links/list', {alumno});
        }


    });


    router.get('/links',(req,res)=>{
        return res.send('links!');
    });
    
    router.get('/add',async (req,res)=>{
        const mensaje = await req.consumeFlash('mensaje')
        if(mensaje){
            return res.render('links/add', {mensaje});
        } else {
        return res.render('links/add');
        }
    });
    
    router.post('/add', async(req,res)=>{
        try {
            await pool.query('INSERT INTO alumnos set ?', req.body);
            //alert('Alumno insertado correctamente!')  
            // Flavio: Agregado await antes de la asignación del par:valor
            await req.flash('mensaje', 'Alumno guardado exitosamente');            
            res.redirect('/');               
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY'){                
                //alert('Documento duplicado!')                
                await req.flash('mensaje', 'Documento duplicado!');
                res.redirect('/add')
            }
        }
        
    });

    router.get('/delete/:idAlumnos', async (req,res)=>{
        console.log(req.params.idAlumnos);
        await pool.query('DELETE FROM alumnos WHERE idAlumnos = ?', req.params.idAlumnos);
        // Flavio: Agregado await antes de la asignación del par:valor
        await req.flash('mensaje', 'Alumno eliminado exitosamente');        
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

    //---AUTENTICACION DE USUARIOS---//

    //primer logueo
    router.get('/signup',(req,res)=>{  
        res.render('auth/signup');
    });


/*     router.post('/signup', passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
      })); */

      router.post('/signup', passport.authenticate('local',
      {successRedirect: 'signin', failureRedirect: '/signup'})
      )

    //logueo comun
    router.get('/signin',async(req,res)=>{  
        const mensaje = await req.consumeFlash('mensaje')
        if(mensaje){
            return res.render('auth/signin', {mensaje});
        } else {
        return res.render('auth/signin');
        }
    });

    router.post('/signin', (req,res)=>{
        passport.authenticate('local.signin', {           
            failureRedirect: '/signin',
            failureFlash: true
        }) (req, res, next);
        res.render('auth/profile');
    })

    //vista del perfil del usuario
    router.get('/profile', (req,res)=>{
        res.render('auth/profile')
    })
    
    return router;
}


