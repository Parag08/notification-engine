var seneca = require('seneca')()

function Service(serviceName, config) {
    console.log('serviceCreated:',serviceName,'config:',config)
    this.serviceName = serviceName;
    seneca.add('service:' + this.serviceName + ',func:getStatus', function (msg,reply) {
          console.log('getstatus:'+this.serviceName,msg)
          reply(null,{'alive':'true'})
    }).use('consul-registry',{
        host: 'localhost'
    }).use('mesh',{
    isbase: config.isbase && true,
    pin: 'service:'+this.serviceName,
    discover: {
            multicast: {
                active: false
            }
        }
  })
}

Service.prototype.getServiceName = function() {
    return this.serviceName
}

Service.prototype.addFunctionalityConsumer = function(functionName, callback) {
    console.log('addingfucntion:', functionName, 'service:', this.serviceName)
    seneca.add('service:' + this.serviceName + ',func:' + functionName, callback)
}

//need to be implemented I dont know how to Right now link https://github.com/senecajs/seneca-mesh [search for listen]
Service.prototype.addFunctionalityObserver = function(functionName, callback) {
    console.log('addingfucntion:', functionName, 'service:', this.serviceName)
    seneca.add('service:' + this.serviceName + ',func:' + functionName, callback)
}

Service.prototype.send = function(service, functionName, msg, callback) {
    console.log('action:', {
        'service': service,
        'func': functionName,
        'msg': msg
    })
    seneca.act({
        'service': service,
        'func': functionName,
        'msg': msg
    }, callback).use('mesh')
}


module.exports = Service;

function testaddFunctionalityConsumer(object) {
    var resultoftest = false
    object.addFunctionalityConsumer('sum', function(msg, reply) {
        console.log('func(consume):', msg)
        reply(null, {
            answer: (msg.msg.left + msg.msg.right)
        })
    })
    seneca.act({
        service: 'testingservice',
        func: 'sum',
        msg: {
            left: 1,
            right: 2
        }
    }, function(err, result) {
        if (err) return console.error(err)
        if (result.answer == 3) {
            resultoftest = true
        }
        console.log('result_received_testaddFunctionalityConsumer:', result, 'test_result:', resultoftest)
    }).use('mesh')
}

function testaddFunctionalityObserver(object) {
    var resultoftest = false
    object.addFunctionalityObserver('sum', function(msg, reply) {
        console.log('func(observe):', msg)
        reply(null, {
            answer: (msg.msg.left + msg.msg.right)
        })
    })
    seneca.act({
        service: 'testingservice',
        func: 'sum',
        msg: {
            left: 1,
            right: 2
        }
    }, function(err, result) {
        if (err) return console.error(err)
        if (result.answer == 3) {
            resultoftest = true
        }
        console.log('result_received_testaddFunctionalityObserver:', result, 'test_result:', resultoftest)
    })

}

function testsend(object) {
    var resultoftest = false
    object.addFunctionalityConsumer('subtract', function(msg, reply) {
        console.log('func(consumer):', msg)
        reply(null, {
            answer: (msg.msg.left - msg.msg.right)
        })
    })
    object.send('testingservice', 'subtract', {
        left: 1,
        right: 2
    }, function(err, msg) {
        if (err) return console.error(err)
        if (msg.answer == -1) {
            resultoftest = true
        }
        console.log('result_received_testsend:', msg, 'test_result:', resultoftest)
    })

}

function test() {
    var object = new Service('testingservice',{isbase:true})
    console.log(object.getServiceName())
    testaddFunctionalityConsumer(object)
    //testaddFunctionalityObserver(object)
    testsend(object)
}

if (typeof require != 'undefined' && require.main == module) {
    test();
}
