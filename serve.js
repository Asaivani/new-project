'use strict';

const Hapi = require('@hapi/hapi');
const MySQL=require('MySQL');

const init = async () => {

   /* const connection=MySQL.createConnection({
        host:'local host',
        user:'root',
    });*/


    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    //connection.connect();
    /*server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });*/

    var books=[{
        id:1,
        title:'Theory of Everything',
        author:'Einstein',
    },
    {
        id:2,
        title:'wings of fire',
        author:'abdul kalam',}
]
    //add the route
    server.route({
        method:'GET',
        path:'/',handler:function(request,reply){
            return books;
            
        }
    });

    server.route({
        method:'POST',
        path:'/api/books',handler:function(request,reply){
            var newbook=request.payload;
            books.push(newbook);
            return books;           
        }
    });

    server.route({
        method:'PUT',
        path:'/api/books/{id}',
        handler:function(request,reply){

            var id=request.params.id;
            var updatedbook=books.filter((obj)=>{
                return obj.id==id;
            })
            updatedbook[0].author=request.payload.author;
            return updatedbook;
        }
            
    });

    server.route({
        method:'DELETE',
        path:'/api/books/{id}',
        handler:function(request,reply){

            var id=request.params.id;
            var deletedbook=books.filter((obj)=>{
                return obj.id!=id;
            })
            deletedbook[0].author=request.payload.author;
            return deletedbook;
        }
            
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

};
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);

});

init();