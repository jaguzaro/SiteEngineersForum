CREATE DATABASE EngineersForum;

USE EngineersForum;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100),
    license VARCHAR(9),
    password varchar(100)
);

CREATE TABLE Courses (
	idCourse int auto_increment primary key,
    nameCourse Varchar(100),
    points int,
    license_user Varchar(100)
);

CREATE TABLE Posts (
	idPost int auto_increment primary key,
	textPost Varchar(190),
    license_user Varchar(100),
	teacher Varchar(100),
    nameCourse Varchar(100),
    idCourse Varchar(100),
    datePost Varchar(100)
);

CREATE TABLE Comments (
	idComment int auto_increment primary key,
    textComment Varchar(190),
    idPost int,
    license_user Varchar(100)
);

Delimiter //
Create procedure InsertUser(name VARCHAR(100), lastname VARCHAR(100), email VARCHAR(100), license VARCHAR(9), password varchar(100))
BEGIN
	Insert Into Users(name, lastname, email, license, password) values (name, lastname, email, license, password);
END //

Call InsertUser('Joel', 'Guzaro', 'alexguz039@gmail.com', '202201395', 'admin');
Call InsertUser('Christopher', 'Ramos', 'christopherramos@gmail.com', '202200057', 'admin');

Select * from Users
Select * from Comments
Select * from Posts

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
flush privileges;

-- drop table user_entity;

-- drop database EngineersForum

