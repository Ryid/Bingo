const db = require('./db');

let arr = [
    { id: null, name: 'coco', password: '12345' },
    { id: null, name: 'Bobo', password: '12345' },
    { id: null, name: 'Steven', password: '12345' },
    { id: null, name: 'Adim', password: '12345' }
]

arr.map(val => {
    let sql = `insert into user values (${val.id}, '${val.name}', ${val.password})`;
    // let sql=`INSERT INTO user VALUES (NULL, 'COCOA', '12345','2021-08-16 14:56:51.000000');`
    db.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data);
    })

})

// INSERT INTO `user` (`id`, `username`, `password`, `create_time`) VALUES (NULL, 'VV', '12345', '2021-08-16 14:56:51.000000');