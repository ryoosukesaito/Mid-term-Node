const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'containers-us-west-95.railway.app',
  user: 'root',
  password: 'OyqJ6PZKp1sp1N4LSqGj',
  database: 'railway',
  port: 6583,
})

module.exports = pool.promise();