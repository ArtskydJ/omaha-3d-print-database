/*
SQLyog Community v11.31 (64 bit)
MySQL - 5.6.16 : Database - newdatabase20140219
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`newdatabase20140219` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `newdatabase20140219`;

/*Table structure for table `admeshtable` */

CREATE TABLE `admeshtable` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hash` char(16) DEFAULT NULL,
  `minX` float DEFAULT NULL,
  `maxX` float DEFAULT NULL,
  `minY` float DEFAULT NULL,
  `maxY` float DEFAULT NULL,
  `minZ` float DEFAULT NULL,
  `maxZ` float DEFAULT NULL,
  `volume` float DEFAULT NULL,
  `parts` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `admeshtable` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
