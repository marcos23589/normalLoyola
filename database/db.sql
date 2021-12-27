CREATE DATABASE db_alumnos;
USE db_alumnos;

CREATE TABLE `alumnos` (
  `idAlumnos` int NOT NULL AUTO_INCREMENT,
  `apellido` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `documento` int NOT NULL,
  `nacimiento` DATE NULL, 
  PRIMARY KEY (`idAlumnos`),
  UNIQUE KEY `idAlumnos_UNIQUE` (`idAlumnos`),
  UNIQUE KEY `Documento_UNIQUE` (`Documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `idUsers` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`idUsers`));


CREATE TABLE `legajo` (
  `idLegajo` int NOT NULL AUTO_INCREMENT,
  `libro` varchar(2) DEFAULT NULL,
  `folio` varchar(2) DEFAULT NULL,
  `legajo` int DEFAULT NULL,
  `ano` int DEFAULT NULL,
  `legajoAlumno` int DEFAULT NULL,
  PRIMARY KEY (`idLegajo`),
  UNIQUE KEY `idLegajo_UNIQUE` (`idLegajo`),
  UNIQUE KEY `Legajo_UNIQUE` (`Legajo`),
  KEY `legajoAlumno` (`legajoAlumno`),
  CONSTRAINT `legajo_ibfk_1` FOREIGN KEY (`legajoAlumno`) REFERENCES `alumnos` (`idAlumnos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `transito` (
  `idTransito` int NOT NULL AUTO_INCREMENT,
  `origen` varchar(45) DEFAULT NULL,
  `fechaIngreso` date DEFAULT NULL,
  `salida` varchar(15) DEFAULT NULL,
  `fechaSalida` date DEFAULT NULL,
  `observaciones` varchar(45) DEFAULT NULL,
  `fechaEgreso` date DEFAULT NULL,
  `transitoAlumno` int DEFAULT NULL,
  PRIMARY KEY (`idTransito`),
  UNIQUE KEY `idTransito` (`idTransito`),
  KEY `transitoAlumno` (`transitoAlumno`),
  CONSTRAINT `transito_ibfk_1` FOREIGN KEY (`transitoAlumno`) REFERENCES `alumnos` (`idAlumnos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `trayectoria` (
  `idTrayectoria` int NOT NULL AUTO_INCREMENT,
  `rac2013` varchar(2) DEFAULT NULL,
  `rac2014` varchar(2) DEFAULT NULL,
  `rac2015` varchar(2) DEFAULT NULL,
  `rac2016` varchar(2) DEFAULT NULL,
  `rac2017` varchar(2) DEFAULT NULL,
  `rac2018` varchar(2) DEFAULT NULL,
  `rac2019` varchar(2) DEFAULT NULL,
  `rac2020` varchar(2) DEFAULT NULL,
  `rac2021` varchar(2) DEFAULT NULL,
  `rac2022` varchar(2) DEFAULT NULL,
  `rac2023` varchar(2) DEFAULT NULL,
  `trayectoriaAlumno` int DEFAULT NULL,
  PRIMARY KEY (`idTrayectoria`),
  UNIQUE KEY `idTrayectoria_UNIQUE` (`idTrayectoria`),
  KEY `trayectoriaAlumno` (`trayectoriaAlumno`),
  CONSTRAINT `trayectoria_ibfk_1` FOREIGN KEY (`trayectoriaAlumno`) REFERENCES `alumnos` (`idAlumnos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;