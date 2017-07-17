var Service = require('../service-discovery/service-register.js')
service = new Service('rulemanager-db')

module.exports = { getRules : function (callback) {
    service.send('db','list',{className:'rules'},callback)
},
 getRule : function (rid,callback) {
    service.send('db','listRid',{rid:rid},callback)
}
}
