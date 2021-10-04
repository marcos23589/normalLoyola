set @documento = 38785588;
select alumnos.apellido, alumnos.nombre, libro, folio, legajo, año, rac2013, rac2014, rac2015, rac2016, rac2017, rac2018, rac2019, rac2020, rac2021
from ((alumnos 
inner join trayectoria
on alumnos.documento = @documento                                       
and alumnos.idAlumnos = trayectoria.idTrayectoria)
inner join legajo
on alumnos.documento = @documento
and alumnos.idAlumnos = legajo.idLegajo);