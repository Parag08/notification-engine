var Service = require('../service-discovery/service-register.js')
var db = require('./db.js')
service = new Service('rulemanager')
service.addFunction('getRules',function (msg,reply) {
    console.log('rulemanager:listRules:msg:',msg)
    db.getRules(reply)
})

service.addFunction('getRule',function (msg,reply) {
    console.log('rulemanager:listRules:msg:',msg)
    db.getRule(msg.rid,reply)
})

