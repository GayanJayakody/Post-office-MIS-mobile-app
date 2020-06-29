
var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));
	
var con = mysql.createConnection({
	host:'http://db4free.net/',
	user: 'sl_post',
	password: 'sepgroup12',
	database: 'post_office_mis'
});
	
var server = app.listen(4545, function(){
	var host = server.address().address
	var port = server.address().port
	console.log('server started')
});


con.connect(function(error){
	if(!!error) console.log('error');
	else console.log('connected to server');
});


app.get('/users/:id', function(req, res){
	con.query('SELECT status from registered_posts WHERE id = ?', req.params.id, function(error, rows, fields){
		if(!!error) console.log('error');
		else{
			console.log(rows);
			res.send(JSON.stringify(rows));  
		}
			
	});
})


app.put('/users', function(req, res){	
	if(req.body.letterType === 'RegPost'){
		if(req.body.status === 'delivered'){
			var mysqlQuery = 'UPDATE registered_posts set status="'+[req.body.status ]+'",last_update="'+[req.body.time ]+'",delivered_datetime="'+[req.body.time ]+'",delivery_attempts_receiver = delivery_attempts_receiver + 1 WHERE id='+[req.body.id ]
		}
		else if(req.body.status === 'receiver-unavailable'){
			var mysqlQuery = 'UPDATE registered_posts set status="'+[req.body.status ]+'",last_update="'+[req.body.time ]+'",delivery_attempts_receiver = delivery_attempts_receiver + 1 WHERE id='+[req.body.id ]
		}
		else if(req.body.status === 'sent-back'){
			var mysqlQuery = 'UPDATE registered_posts set status="'+[req.body.status ]+'",last_update="'+[req.body.time ]+'",delivered_datetime="'+[req.body.time ]+'",delivery_attempts_sender = delivery_attempts_sender + 1 WHERE id='+[req.body.id ]
		}
		else if(req.body.status === 'sender-unavailable'){
			var mysqlQuery = 'UPDATE registered_posts set status="'+[req.body.status ]+'",last_update="'+[req.body.time ]+'",delivery_attempts_sender = delivery_attempts_sender + 1 WHERE id='+[req.body.id ]
		}
		else{
			var mysqlQuery = 'UPDATE registered_posts set last_update="'+[req.body.time ]+'" WHERE id='+[req.body.id ]
		}
	}
	else if(req.body.letterType === 'Parcel'){
		if(req.body.status === 'delivered'){
			var mysqlQuery = 'UPDATE parcels set status="'+[req.body.status ]+'",last_update="'+[req.body.time ]+'",delivered_datetime="'+[req.body.time ]+'",delivery_attempts = delivery_attempts+1 WHERE id='+[req.body.id ]
		}
		else if(req.body.status === 'receiver-unavailable'){
			var mysqlQuery = 'UPDATE parcels set status="'+[req.body.status ]+'",last_update="'+[req.body.time ]+'",delivery_attempts = delivery_attempts+1 WHERE id='+[req.body.id ]
		}
		else{
			var mysqlQuery = 'UPDATE parcels set last_update="'+[req.body.time ]+'" WHERE id='+[req.body.id ]
		}
		
	}
	else if(req.body.letterType === 'NormalPost'){
		if(req.body.status === 'delivered'){
			var mysqlQuery = 'UPDATE normal_posts set on_route_count = on_route_count - 1,delivered_count = delivered_count + 1 WHERE address_id='+[req.body.id ]
		}
		else if(req.body.status === 'receiver-unavailable'){
			var mysqlQuery = 'UPDATE normal_posts set on_route_count = on_route_count - 1,failed_delivery_count = failed_delivery_count + 1 WHERE address_id='+[req.body.id ]
		}		
	}
	con.query(mysqlQuery, function(error, rows,fields){
		if(error) throw error;
			console.log(rows);
			res.end(JSON.stringify(rows));
				
	})
})