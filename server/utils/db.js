let mysql = require('mysql')

let pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'chatroom',
    user: 'root',
    password: ''
})

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows) {
            callback(err, rows)
            connection.release() //中斷連線
        })
    })
}

exports.query = query