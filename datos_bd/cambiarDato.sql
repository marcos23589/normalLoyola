set @documento = 42250197;
select @alumno:= idAlumnos from alumnos where documento = @documento;
update legajo set libro= 3, folio=92 where legajo.idLegajo = @alumno;

