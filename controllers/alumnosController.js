const pool = require("../database");
const date_fns = require("date-fns");

exports.alumnosGet = async (req, res) => {
  const alumno = await pool.query("SELECT * FROM alumnos");
  console.log("----- alumnos GET -------");
  console.log("alumnos -> ", alumno);
  return res.render("alumnos/list", { alumno, messages: req.flash("mensaje") });
};

exports.buscarAlumnosPost = async (req, res) => {
  console.log("alumnosPost ->", req.body);
  const { apellido, documento, curso, anio } = req.body;
  let alumno = await pool.query(
    "SELECT * FROM alumnos WHERE apellido LIKE ? or documento = ? ORDER BY nombre",
    [apellido, documento]
  );

  try {
    console.log(alumno[0].idAlumnos);
  } catch (error) {
    console.error(error);
    req.flash("mensaje", "No se encontraron alumnos");
  }

  return res.render("alumnos/search", { alumno });
};

exports.buscarAlumnosGet = (req, res) => {
  return res.render("alumnos/search", { messages: req.flash("mensaje") });
};

exports.addGet = async (req, res) => {
  return res.render("alumnos/add", { messages: req.flash("mensaje") });
};

exports.addPost = async (req, res) => {
  try {
    await pool.query("INSERT INTO alumnos set ?", req.body);
    req.flash("mensaje", "Alumno guardado exitosamente");
    res.redirect("/alumnos");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      req.flash("mensaje", "Documento duplicado!");
      res.redirect("/add");
    }
  }
  console.log("REQ->", req.body);
};

exports.deleteAlumnos = async (req, res) => {
  console.log(req.params.idAlumnos);
  await pool.query(
    "DELETE FROM alumnos WHERE idAlumnos = ?",
    req.params.idAlumnos
  );
  req.flash("mensaje", "Alumno eliminado exitosamente");
  res.redirect("/alumnos");
};

exports.editAlumnos = async (req, res) => {
  const edicion = await pool.query(
    "SELECT * FROM alumnos WHERE idAlumnos = ?",
    req.params.idAlumnos
  );
  const fecha = new Date(edicion[0].nacimiento);
  const fechaNac = date_fns.format(
    new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()),
    "yyyy-MM-dd"
  );
  edicion[0].nacimiento = fechaNac;
  res.render("alumnos/edit", { link: edicion[0] });
};

exports.postAlumnos = async (req, res) => {
  console.log("params", req.body.nacimiento);
  const { apellido, nombre, documento, nacimiento } = req.body;
  const newLink = {
    apellido,
    nombre,
    documento,
    nacimiento,
  };
  await pool.query("UPDATE alumnos set ? WHERE idAlumnos = ?", [
    newLink,
    req.params.idAlumnos,
  ]);
  req.flash("mensaje", "Cambios efectuados correctamente");
  res.redirect("/alumnos");
};

exports.verAlumno = async (req, res) => {
  const vista = await pool.query(
    "SELECT * FROM alumnos WHERE idAlumnos = ?",
    req.params.idAlumnos
  );
  console.log(vista[0]);
  res.render("alumnos/view", { link: vista[0] });
};
