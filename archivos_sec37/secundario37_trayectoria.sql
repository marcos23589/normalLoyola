-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: secundario37
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `trayectoria`
--

DROP TABLE IF EXISTS `trayectoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trayectoria`
--

LOCK TABLES `trayectoria` WRITE;
/*!40000 ALTER TABLE `trayectoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `trayectoria` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-13 19:55:16
