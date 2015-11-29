	var express = require('express');
	var app = express();
	var mongojs = require('mongojs');
	var db = mongojs ('centromedico',['servicios','citas']);
	var bodyParser = require('body-parser');
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'centromedicomoyuta@gmail.com',
			pass: 'moyuta2015'
		}
	});
	
	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser.json());
	
	app.get('/serviceList',function(req,res){
		
		//console.log("I recieve a get request");
		
		db.servicios.find(function(err,docs){
			res.json(docs);
			
		});
		
		
	});

	app.post('/createAppointment',function(req,res){
		
		db.citas.insert(req.body,function(err,docs){
		
			if(!err){
				res.json(docs);
				sendMail(req);
			}
			else
				console.log(err);
		});
		
		
	});

	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	};
	
	function sendMail(req){
		
		var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");		
		var f=new Date(req.body.fecha);
		
		var fechaStr = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + ' a las ' + formatAMPM(f);
		var mailText =  'Estimado(a), <b> '+ req.body.nombre +'</b>' + ' de ' + req.body.edad + ' años, ' ;
		mailText += 'presentando sintomas de: ' + req.body.malestar + '</b>';
		mailText += '<br/> Se confirma su cita para el dia y hora <b>' + fechaStr + '</b>';
		mailText += '<br/> el servicio que se le estara brindando será de <b>' + req.body.servicio + '</b>';
		
		mailText += '<br/> Cualquier duda, modificación o consulta adicional puede contestar este correo electronico o a nuestro número telefonico 59823580, con gusto le atenderemos';
		mailText += '<br/><br/> <i> "Centro médico moyuta, su salud en buenas manos" </i>';
		
		var mailOptions = {
			from: 'Centro Médico Moyuta<centromedicomoyuta@gmail.com>', 
			to: req.body.email +",centromedicomoyuta@gmail.com",
			subject: 'Notificación de cita médica ' + req.body.nombre, 
			//text: 'Texto plano', 
			html:  mailText
		};

		transporter.sendMail(mailOptions, function(error, info){
			
			if(error)
				return console.log(error);
			
			console.log('Message sent: ' + info.response); 
		 });  
	};
	
	app.listen(80);
	console.log("Server running on port 80");