import { Router } from 'express';
const router = Router();
import { isLoggedIn } from '../lib/auth';
import { alumnosGet, addGet, addPost, deleteAlumnos, editAlumnos, postAlumnos, verAlumno } from '../controllers/alumnosController';

router.get('/alumnos',isLoggedIn, alumnosGet);
router.get('/add',isLoggedIn, addGet);
router.post('/add', isLoggedIn, addPost);
router.get('/delete/:idAlumnos', isLoggedIn, deleteAlumnos);
router.get('/edit/:idAlumnos', isLoggedIn, editAlumnos);
router.post('/edit/:idAlumnos', isLoggedIn, postAlumnos);
router.get('/view/:idAlumnos', isLoggedIn, verAlumno);

export default router;