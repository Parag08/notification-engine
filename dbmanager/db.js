var Service = require('../service-discovery/service-register.js')
var OrientDB = require('orientjs');
service = new Service('db')

var db;
var server;

service.addFunction('init', function(msg, reply) {
    console.log('db:init:msg:', msg)
    server = OrientDB({
        host: msg.host,
        port: msg.port,
        username: msg.username,
        password: msg.password
    });
    var dbs = server.list()
        .then(
            function(list) {
                console.log('Databases on Server:', list.length);
            }
        );
    db = server.use({
        name: msg.db,
        username: msg.username,
        password: msg.password
    });
    reply(null, {
        db: db.name
    });
})

service.addFunction('list', function(msg, reply) {
    console.log('db:list:msg:', msg)

    className = msg.className
        db.class.get(className).then(function(rule) {
            rule.list().then(function(records) {
                reply(null,records);
            }).catch(function(err) {
                reply(err, null);
            })
        });
})

service.addFunction('listRid',function (msg,reply) {
    console.log('db:listRid:msg:',msg)
    var  RID =  msg.rid
    db.record.get(RID)
   .then(
      function(record){
         console.log('db:listRid:Loaded Record:', record);
         reply(null,record);
       }
   ).catch(function(err) {
         console.log('db:listRid:error:',err)
         reply(err, null);
  })
})


