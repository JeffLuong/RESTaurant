var express 			= require('express'),
	server				= express(),
	bodyParser			= require('body-parser'),
	ejs					= require('ejs'),
	MongoClient			= require('mongodb').MongoClient,
	ObjectId			= require('mongodb').ObjectID,
	url					= 'mongodb://localhost:27017/loveprofile';
	// methodOverride		= require('method-override');
 
server.set('views','./views');
server.set('view engine', "ejs"); 

server.use(express.static('./public'));
server.use(bodyParser.urlencoded({extended: true}));


server.listen(3000);
console.log("the mon god is ever watchful");