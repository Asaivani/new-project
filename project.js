var Hapi=require('@hapi/hapi');
var mysql=require('mysql');

var server=new Hapi.Server({
    host:'localhost',
    port:4000
});
server.route({
  method:"GET",
  path:"/",
  handler:(request,reply)=>{
      return "Welcome to HAPI Server";
  }
})

//section 1 

//1 GET api/producers/
server.route({
    method:"GET",
    path:"/api/producers",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from producer`, function (error, producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
})

//2 POST api/producers
server.route({
    method:"POST",
    path:"/api/producers",
    handler:(request,reply)=>{
        var newproducer=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`INSERT INTO producer(producer_Name,Email,Password_Hash,twitter_name,soundcloud_name,producer_status) 
              VALUES('${newproducer.producer_Name}','${newproducer.Email}','${newproducer.Password_Hash}',
              '${newproducer.twitter_name}','${newproducer.soundcloud_name}','${newproducer.producer_status}')`,
              function (error, result, fields) {
                if (error) reject(error);
                resolve(result);
              });
               
              connection.end();
        })
        
    }
});

//3 GET api/producers/:id
server.route({
    method:"GET",
    path:"/api/producers/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from producer WHERE producer_id=${id}`, function (error, pro, fields) {
                if (error) reject(error);
                resolve(pro);
              });
               
              connection.end();
        })
        
    }
});

//4 DELETE api/producers/:id
server.route({
    method:"DELETE",
    path:"/api/producers/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`DELETE from producer WHERE producer_id=${id}`, function (error, res, fields) {
                if (error) reject(error);
                resolve(res);
              });
              connection.query(`DELETE from beat WHERE producer_id=${id}`, function (error, res, fields) {
                if (error) reject(error);
                resolve(res);
              });
              connection.end();
        })
        
    }
})

//5 PUT api/producers/:id
server.route({
    method:"PUT",
    path:"/api/producers/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        var newproducer=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`UPDATE producer SET producer_Name='${newproducer.producer_Name}' WHERE producer_id=${id}`, 
            function (error, res, fields) {
            if (error) reject(error);
            resolve(res);
          });
              connection.end();
        })
        
    }
});

//8 GET api/producers/:id/approvedbeats
server.route({
    method:"GET",
    path:"/api/producers/approvedbeats",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from beat WHERE approved=1`, function (error, pro, fields) {
                if (error) reject(error);
                resolve(pro);
              });
               
              connection.end();
        })
        
    }
});

//9 GET api/producers/:id/submittedbeats
server.route({
    method:"GET",
    path:"/api/producers/{id}/submittedbeats",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from beat WHERE submit_date is not null`, function (error, pro, fields) {
                if (error) reject(error);
                resolve(pro);
              });
               
              connection.end();
        })
        
    }
});

//section 2

//GET api/beats/
server.route({
  method:"GET",
  path:"/api/beats",
  handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
          var connection = mysql.createConnection({
              host     : 'localhost',
              user     :'root',
              password : '',
              database : 'project'
            });
            connection.connect();
   
            connection.query(`SELECT * from beat`, function (error, beat, fields) {
              if (error) reject(error);
              resolve(beat);
            });
             
            connection.end();
      })
      
  }
})

//1 GET api/beats/submitted
server.route({
    method:"GET",
    path:"/api/beats/submitted",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from beat WHERE submit_date is not null and approved=0`, function (error, pro, fields) {
                if (error) reject(error);
                resolve(pro);
              });
               
              connection.end();
        })
        
    }
});

//2 GET api/beats/approved/startdate/enddate
server.route({
  method:"GET",
  path:"/api/beats/approved/{startdate}/{enddate}",
  handler:(request,reply)=>{
    var startdate=request.params.startdate;
    var enddate=request.params.enddate;
      return new Promise((resolve,reject)=>{
          var connection = mysql.createConnection({
              host     : 'localhost',
              user     :'root',
              password : '',
              database : 'project'
            });
            connection.connect();
   
            connection.query(`select * from beat where approved=1 and submit_date between '${startdate}' and '${enddate}'`, function (error, pro, fields) {
              if (error) reject(error);
              resolve(pro);
            });
             
            connection.end();
      })
      
  }
});

//3 GET api/beats/posted/startdate
server.route({
  method:"GET",
  path:"/api/beats/posted/{startdate}",
  handler:(request,reply)=>{
    var startdate=request.params.startdate;
      return new Promise((resolve,reject)=>{
          var connection = mysql.createConnection({
              host     : 'localhost',
              user     :'root',
              password : '',
              database : 'project'
            });
            connection.connect();
   
            connection.query(`select * from beat where approved=1 and submit_date between '${startdate}' and now()`, function (error, pro, fields) {
              if (error) reject(error);
              resolve(pro);
            });
             
            connection.end();
      })
      
  }
});

//4 GET api/beats/pending
server.route({
  method:"GET",
  path:"/api/beats/pending",
  handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
          var connection = mysql.createConnection({
              host     : 'localhost',
              user     :'root',
              password : '',
              database : 'project'
            });
            connection.connect();
   
            connection.query(`select * from beat where approved=1 and  approval_date>now()`, function (error, pro, fields) {
              if (error) reject(error);
              resolve(pro);
            });
             
            connection.end();
      })
      
  }
});

//5 POST api/beats
server.route({
    method:"POST",
    path:"/api/beats",
    handler:(request,reply)=>{
        var newbeat=request.payload;
        if(newbeat.beat_name.includes("MUST LISTEN")){
          return 'name must be valid';
        }
        else{
            return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`INSERT INTO beat(beat_name,beat_url,approved,producer_id,submit_date,approval_date,post_datetime) 
              VALUES('${newbeat.beat_name}','${newbeat.beat_url}','${newbeat.approved}',
              '${newbeat.producer_id}','${newbeat.submit_date}','${newbeat.approval_date}','${newbeat.post_datetime}')`,
              function (error, result, fields) {
                if (error) reject(error);
                resolve(result);
              });
               
              connection.end();
        })
        }  
    }
});

//6 GET api/beats/:id
server.route({
    method:"GET",
    path:"/api/beats/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from beat WHERE beat_id=${id}`, function (error, pro, fields) {
                if (error) reject(error);
                resolve(pro);
              });
               
              connection.end();
        })
        
    }
});

//7 DELETE api/beats/:id
server.route({
    method:"DELETE",
    path:"/api/beats/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`Delete from beat WHERE beat_id=${id}`, function (error, pro, fields) {
                if (error) reject(error);
                resolve(pro);
              });
               
              connection.end();
        })
        
    }
});

//8 PUT api/beats/:id
server.route({
    method:"PUT",
    path:"/api/beats/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        var newbeat=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`UPDATE beat SET beat_name='${newbeat.beat_name}' WHERE producer_id=${id}`, 
            function (error, res, fields) {
            if (error) reject(error);
            resolve(res);
          });
              connection.end();
        })
        
    }
});

//9 PUT api/beats/:id/approve
server.route({
  method:"PUT",
  path:"/api/beats/{id}/approve",
  handler:(request,reply)=>{
      var id=request.params.id;
      var newbeat=request.payload;
      return new Promise((resolve,reject)=>{
          var connection = mysql.createConnection({
              host     : 'localhost',
              user     :'root',
              password : '',
              database : 'project'
            });
            connection.connect();
            connection.query(`UPDATE beat SET approval_date='${newbeat.approval_date}',post_datetime='${newbeat.post_datetime}' WHERE approved=1`, 
          function (error, res, fields) {
          if (error) reject(error);
          resolve(res);
        });
            connection.end();
      })
      
  }
});

//10 PUT api/beats/:id/unapprove
server.route({
  method:"PUT",
  path:"/api/beats/{id}/unapprove",
  handler:(request,reply)=>{
      var id=request.params.id; 
      //var newbeat=request.payload;
      return new Promise((resolve,reject)=>{
          var connection = mysql.createConnection({
              host     : 'localhost',
              user     :'root',
              password : '',
              database : 'project'
            });
            connection.connect();
            connection.query(`UPDATE beat SET approval_date=null,post_datetime=null WHERE beat_id=${id}`, 
          function (error, res, fields) {
          if (error) reject(error);
          resolve(res);
        });
            connection.end();
      })
      
  }
});

server.start((err)=>{
    if(err) throw err;
    console.log("server is started");
});