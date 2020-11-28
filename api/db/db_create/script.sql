CREATE TABLE IF NOT EXISTS users (
  id INT(11) AUTO_INCREMENT,
  name VARCHAR(255),
  date DATETIME,
  PRIMARY KEY (id)
);

INSERT INTO users (name, date) VALUES('Daiane', '2015-03-15 10:30:00');
INSERT INTO users (name, date) VALUES('Maicon', '2017-02-21 10:30:00');
INSERT INTO users (name, date) VALUES('Clodio', '2016-08-19 10:30:00');