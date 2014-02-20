/*
SQLyog Community v11.31 (64 bit)
MySQL - 5.6.16 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `admeshtable` (
	`id` int (10),
	`hash` char (48),
	`minX` float ,
	`maxX` float ,
	`minY` float ,
	`maxY` float ,
	`minZ` float ,
	`maxZ` float ,
	`facetsOverallBefore` int (10),
	`facetsOverallAfter` int (10),
	`facetsDiscon1Before` int (10),
	`facetsDiscon1After` int (10),
	`facetsDiscon2Before` int (10),
	`facetsDiscon2After` int (10),
	`facetsDiscon3Before` int (10),
	`facetsDiscon3After` int (10),
	`facetsDisconBefore` int (10),
	`facetsDisconAfter` int (10),
	`facetsDegenerate` int (10),
	`facetsRemoved` int (10),
	`facetsAdded` int (10),
	`facetsReversed` int (10),
	`volume` float ,
	`parts` int (10),
	`edgesFixed` int (10),
	`edgesBackwards` int (10),
	`normalsFixed` int (10)
); 
