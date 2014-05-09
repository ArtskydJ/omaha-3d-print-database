-- This SQL file is for usage inside SQLyog, for testing purposes
CREATE DATABASE IF NOT EXISTS `omaha3dprint`;
USE `omaha3dprint`;
DROP TABLE IF EXISTS `stl_properties`;
CREATE TABLE `stl_properties` (
	id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`hash` CHAR(32) NOT NULL,
	volume FLOAT NOT NULL,
	parts INT(10) UNSIGNED NOT NULL,
	minX FLOAT NOT NULL,
	maxX FLOAT NOT NULL,
	minY FLOAT NOT NULL,
	maxY FLOAT NOT NULL,
	minZ FLOAT NOT NULL,
	maxZ FLOAT NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX `hash` (`hash`)
) CHARSET=utf8;

SHOW TABLES;

SHOW WARNINGS;

SELECT * FROM stl_properties;

SELECT * FROM stl_properties WHERE HASH = 'ba4301c9e5aa93d96bdb5c87d9cf089d';

DELETE FROM stl_properties WHERE `hash` = 'ba4301c9e5aa93d96bdb5c87d9cf089d';

DROP DATABASE IF EXISTS `omaha3dprint`;
