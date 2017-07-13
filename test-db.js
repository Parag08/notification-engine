var Service = require('./mesh-base.js')
config = {}
config.isbase = false
service = new Service('testingService',config)


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
