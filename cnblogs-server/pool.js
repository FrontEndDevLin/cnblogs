const mysql = require("mysql");

let pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "cnblogs",
    connectionLimit: 25
});

module.exports = pool;