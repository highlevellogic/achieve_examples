-- advanced/mysql/setup.sql
--
-- Achieve v3 MySQL demonstration
-- Creates the database and table used by the example.
--
-- New to MariaDB/MySQL?
-- In phpMyAdmin, select the Import tab, choose this file, and click Import.

CREATE DATABASE IF NOT EXISTS achieve_demo;
USE achieve_demo;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    uname VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    pword VARCHAR(255) NOT NULL
);
