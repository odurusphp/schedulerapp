/*
SQLyog Ultimate v11.33 (64 bit)
MySQL - 5.7.26-log : Database - scheduler
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`scheduler` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `scheduler`;

/*Table structure for table `bookings` */

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `from_date` datetime DEFAULT NULL,
  `to_date` datetime DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `status` varchar(220) DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` varchar(90) DEFAULT NULL,
  `room` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

/*Data for the table `bookings` */

/*Table structure for table `rooms` */

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `rooms` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `othernames` varchar(220) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(220) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'user',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(220) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`firstname`,`othernames`,`lastname`,`email`,`title`,`role`,`created_on`,`password`,`status`) values (2,'Prince',NULL,'Oduro','odurusphp@gmail.com',NULL,'admin','2022-08-04 16:50:20','$2a$10$OhdjTlVyV2UvYuKqes7MP.LSFkimdbkSBY.IVhFctKl8KfAV/3YUa',1),(5,'Godfred',NULL,'Asare','wapowe6822@ukgent.com',NULL,'user','2022-08-15 14:25:55','$2a$10$OhdjTlVyV2UvYuKqes7MP.LSFkimdbkSBY.IVhFctKl8KfAV/3YUa',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
