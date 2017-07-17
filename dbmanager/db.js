var Service = require('../service-discovery/service-register.js')
var OrientDB = require('orientjs');
service = new Service('db')

var db;
var server;

service.addFunction('init', function(msg, reply) {
    console.log('db:init:msg:',msg)
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
    console.log('db:list:msg:',msg)
    reply(null,{dummy:'hi'})
})
