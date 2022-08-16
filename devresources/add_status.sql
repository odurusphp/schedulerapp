 ALTER TABLE `users` ADD `status` varchar(50) NULL DEFAULT 1;
--  Alter othernames and title columns in users table to be NULL by default 
-- Language: sql
-- Path: devresources\alter_users_columns.sql
 ALTER TABLE `users` CHANGE `othernames` `othernames` varchar(50) NULL DEFAULT NULL;
 ALTER TABLE `users` CHANGE `title` `title` varchar(50) NULL DEFAULT NULL;

