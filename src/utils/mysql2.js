require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DBNAME,
  port: process.env.MYSQL_PORT,
});



const sql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA= 'railway' AND TABLE_NAME='Users'`;

pool.query(sql, (err, data) => {
  if (err) {
    return console.error(err.message);
  }

  if (data.length === 0) {
    console.log("Table Users not found");
    createDB();
  } else {
    console.log("Table Users exists");
  }
});

const createDB = () => {
  
  pool.query(`DROP TABLE IF EXISTS Users`);

  pool.query(
    `CREATE TABLE Users (
      UserID INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      about TEXT,
      PRIMARY KEY (UserID)
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successfully created Users table");
    }
  );

  pool.query(
    `
    INSERT INTO Users (UserName, Email, Password) VALUES
    ('admin', 'admin@admin.com', 'admin1234');
  `,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successfully created Admin Account");
    }
  );
};


const sql2 = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA= 'railway' AND TABLE_NAME='Tasks'`;

pool.query(sql2, (error, data2) => {
  if (error) {
    return console.error(error.message);
  }

  if (data2.length === 0) {
    console.log("Table Tasks not found");
    createTasksDB();
  } else {
    console.log("Table Tasks exists");
  }
});

const createTasksDB = () => {
  pool.query('DROP TABLE IF EXISTS Tasks')

  pool.query(
    `CREATE TABLE Tasks (
      TaskID INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      detail TEXT,
      username VARCHAR(255) NOT NULL,
      date TEXT,
      PRIMARY KEY (TaskID)
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successfully created Tasks table");
    }
  );
  
  pool.query(
    `
    INSERT INTO Tasks (title, detail, username, date) VALUES
    ('Create', 'Create Your Task', 'User', now());
  `,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successfully created New Task in table");
    }
  );
}

module.exports = pool;
