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
