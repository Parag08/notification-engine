# notification-engine

A central entity which will read kafka messages from multiple kafka topics and execute rules on them
Once rules are satisfied send messages to registered user using sms or email  

<b>Design</b>

1. rulemanager [handles all the rules based operations:- add rules, delete rules, get rules, get rule, put rule]
2. dbmanager [link between rulemanager and DB:- add rule in db, modify rule in db, get rules from db, delete rule in db]
3. kafkamanager [functionality yet to be decided]
4. functions [a simple library with predifined operation that a rule can have:- add , subtract, send_notification, compare]
5. ruleExecutioner [functionality yet to be decided]
6. postoffice [send messages or email]
7. usermanager [usermanager:- adduser, deleteuser,modifyuser]

language:- nodejs  
DB:- orientdb  
architecture:- microservices(senecajs)  

<b>Expectation</b> 

1. We should be able to scale the services  [seneca-mesh will take care of it]   


<b>bugs</b>

1. first call always fail for seneca [investigate] it does hit the service but it cant get the reply   
