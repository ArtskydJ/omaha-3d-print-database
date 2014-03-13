CREATE DATABASE IF NOT EXITSTS `omaha3dprint`
USE `omaha3dprint`;
DROP TABLE IF EXISTS `admesh`;
CREATE TABLE `admesh` (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  hash char(16) DEFAULT NOT NULL,
  volume float DEFAULT NOT NULL,
  parts int(10) unsigned DEFAULT NOT NULL,
  minX float DEFAULT NOT NULL,
  maxX float DEFAULT NOT NULL,
  minY float DEFAULT NOT NULL,
  maxY float DEFAULT NOT NULL,
  minZ float DEFAULT NOT NULL,
  maxZ float DEFAULT NOT NULL,
  PRIMARY KEY (id)
) CHARSET=utf8;
