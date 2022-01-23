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