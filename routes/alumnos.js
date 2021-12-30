const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const alumnosController = require('../controllers/alumnosController')

router.get('/alumnos',isLoggedIn, alumnosController.alumnosGet);
router.post('/search', isLoggedIn, alumnosController.buscarAlumnosPost);
router.get('/add',isLoggedIn, alumnosController.addGet);
router.post('/add', isLoggedIn, alumnosController.addPost);
router.get('/delete/:idAlumnos', isLoggedIn, alumnosController.deleteAlumnos);
router.get('/edit/:idAlumnos', isLoggedIn, alumnosController.editAlumnos);
router.post('/edit/:idAlumnos', isLoggedIn, alumnosController.postAlumnos);
router.get('/view/:idAlumnos', isLoggedIn, alumnosController.verAlumno);
router.get('/search', isLoggedIn, alumnosController.buscarAlumnosGet);
module.exports=router;