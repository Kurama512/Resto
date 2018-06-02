let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session =require('express-session')

//Moteur de templates
app.set('view engine', 'ejs')

//Middlewares
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
	secret:'kurama512',
	resave:false,
	saveUninitialized: true,
	cookie: {secure: false}
}))
app.use(require('./middlewares/flash'))

//Routes

////////////////////INDEX////////////////////////////////////////////////

app.get('/', (req, res)=>{
	let Table = require('./models/table')
	Table.all(function(tables){
		res.render('pages/index',{
			tables: tables
		})
	})
})

///////////////////LES TABLES////////////////////////////////////////////

app.get('/tables', (req,res)=>{
	res.render('pages/tables',{})
})

app.post('/tables', (req, res)=>{
	if(req.body.numero === undefined || req.body.numero === ''){
		req.flash('error', "Cette entrée n'est pas valide :(")
		res.redirect('/tables')
	} else {
		let Table = require('./models/table')
		Table.create(req.body, function(){
			req.flash('success', "Table bien enregistrée en base")
			res.redirect('/')
		})
	}
})

/////////////////LES RESERVATIONS////////////////////////////////////////

app.get('/reservations', (req,res)=>{
	let Reservation = require('./models/reservation')
	Reservation.count(function(nbreserv){
		let Client = require('./models/client')
		Client.all(function(clients){
			let Table = require('./models/table')
			Table.alldispo(function(tables){
				res.render('pages/reservations',{
					clients: clients, 
					tables: tables, 
					nbreserv: nbreserv.row.nbreserv+1
				})
			})
		})
	})
})

app.post('/reservations', (req, res)=>{
	if(req.body.id === undefined || req.body.id === ''){
		req.flash('error', "Cette entrée n'est pas valide :(")
		res.redirect('/reservations')
	} else {
		let Reservation = require('./models/reservation')
		Reservation.create(req.body, function(){
			req.flash('success', "Réservation bien enregistrée en base")
			res.redirect('/')
		})
	}
})

////////////////////LE STOCK////////////////////////////////////////////

app.get('/stock', (req,res)=>{
	let Stock = require('./models/stock')
	Stock.all(function(stock){
		res.render('pages/stock',{
			stock: stock
		})
	})
})

app.post('/stock', (req, res)=>{
	if(req.body.ref === undefined || req.body.ref === ''){
		req.flash('error', "Cette entrée n'est pas valide :(")
		res.redirect('/stock')
	} else {
		let Stock = require('./models/stock')
		Stock.create(req.body, function(){
			req.flash('success', "Produit bien enregistré en base")
			res.redirect('/stock')
		})
	}
})

////////////////////LES CLIENTS/////////////////////////////////////////

app.get('/clients', (req,res)=>{
	res.render('pages/clients',{})
})

app.post('/clients', (req, res)=>{
	if(req.body.nom === undefined || req.body.nom === ''){
		req.flash('error', "Cette entrée n'est pas valide :(")
		res.redirect('/clients')
	} else {
		let Client = require('./models/client')
		Client.create(req.body.nom, function(){
			req.flash('success', "Client bien enregistré en base")
			res.redirect('/')
		})
	}
})

app.listen(8080)