var Hapi=require('@hapi/hapi');
var mysql=require('mysql');

var server=new Hapi.Server({
    host:'localhost',
    port:8000
});
server.route({
    method:"GET",
    path:"/",
    handler:(request,reply)=>{
        return "Welcome to HAPI Server";
    }
})
server.route({
    method:"GET",
    path:"/books",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'table'
              });
              connection.connect();
     
              connection.query(`SELECT * from books`, function (error, books, fields) {
                if (error) reject(error);
                resolve(books);
              });
               
              connection.end();
        })
        
    }
})


server.route({
    method:"POST",
    path:"/books",
    handler:(request,reply)=>{
        var newbook=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'table'
              });
              connection.connect();
              connection.query(`INSERT INTO books(id,title) VALUES('${newbook.id}','${newbook.title}')`,
              function (error, books, fields) {
                if (error) reject(error);
                resolve(books);
              });
               
              connection.end();
        })
        
    }
});

server.route({
    method:"PUT",
    path:"/books/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        var newbook=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'table'
              });
              connection.connect();
              connection.query(`UPDATE books SET title='${newbook.title}' WHERE id=${id}`, 
            function (error, books, fields) {
            if (error) reject(error);
            resolve(books);
          });
              connection.end();
        })
        
    }
});

server.route({
    method:"DELETE",
    path:"/books/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'table'
              });
              connection.connect();
              connection.query(`DELETE from books WHERE id=${id}`, function (error, books, fields) {
                if (error) reject(error);
                resolve(books);
              });
              connection.end();
        })
        
    }
})


server.start((err)=>{
    if(err) throw err;
    console.log("server is started");
});
/*var Hapi = require('@hapi/hapi');
var mysql = require('mysql');

//create a server

var server=new Hapi.server({
    host:'localhost',
    port:8000
});


server.route({
    method:'GET',
    path:'/books',
    handler:(request,reply)=>{
        return new promise((resolve,reject)=>{
           var connection=mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'table'
        });
        connection.connect();
        
        connection.query(`select title,author_fname from books`,function(error,results,fields) {
            if(error) reject(error);
            resolve(results);
        });
        connection.end();
        })
    }

})

server.start((err)=>{
    if(err) throw err;
    console.log("server is started")
});*/

