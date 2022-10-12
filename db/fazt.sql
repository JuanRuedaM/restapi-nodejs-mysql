create database if not exists testdb;
use testdb;
create table users(
  id int not null AUTO_INCREMENT,
  names varchar(45) default null,
  ages int default null,
  PRIMARY KEY (id)
);
describe users;

INSERT INTO users (names, ages)
VALUES 
	('Juan David', 23),
  ('Rueda Martinez', 32);