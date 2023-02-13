const Router = require("express")
const router = Router();
const { isLoggedIn }  = require('../lib/auth');
const { alumnosGet, addGet, addPost, deleteAlumnos, editAlumnos, postAlumnos, verAlumno } = require('../controllers/alumnosController');

router.get('/alumnos',isLoggedIn, alumnosGet);
router.get('/add',isLoggedIn, addGet);
router.post('/add', isLoggedIn, addPost);
router.get('/delete/:idAlumnos', isLoggedIn, deleteAlumnos);
router.get('/edit/:idAlumnos', isLoggedIn, editAlumnos);
router.post('/edit/:idAlumnos', isLoggedIn, postAlumnos);
router.get('/view/:idAlumnos', isLoggedIn, verAlumno);

module.exports = router;