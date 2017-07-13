var Service = require('./mesh-base.js')
var OrientDB = require('orientjs');
config = {isbase:true}
service = new Service('db',config)

var db;
var server;

service.addFunctionalityConsumer('init', function(msg, reply) {
    console.log('db:init:msg:',msg)
    server = OrientDB({
        host: msg.msg.host,
        port: msg.msg.port,
        username: msg.msg.username,
        password: msg.msg.password
    });
    var dbs = server.list()
        .then(
            function(list) {
                console.log('Databases on Server:', list.length);
            }
        );
    db = server.use({
        name: msg.msg.db,
        username: msg.msg.username,
        password: msg.msg.password
    });
    reply(null, {
        db: db.name
    });
})

service.addFunctionalityConsumer('list', function(msg, reply) {
    console.log('db:list:msg:',msg)
    reply(null,{dummy:'hi'})
})
