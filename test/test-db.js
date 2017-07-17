var Service = require('../service-discovery/service-register.js')
service = new Service('testingdbService',30000)


service.send('db', 'getStatus' , {}, function (err,msg) {
    console.log('result_received_getStatus_db:',err,msg)
})

service.send('db', 'init', {
        host: 'localhost',
        port: 2424,
        username:'root',
        password:'root',
        db: 'notify'
    }, function(err, msg) {
        console.log('result_received_testdbinit:', err,msg)
    })

service.send('db', 'list', {
        host: 'localhost',
        port: 2424,
        username:'root',
        password:'root',
        db: 'notify'
    }, function(err, msg) {
        console.log('result_received_testdbinit:', err,msg)
    })
