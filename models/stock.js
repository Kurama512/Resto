let connection = require('../config/db')
let moment = require('../config/moment')

class Stock{

	constructor(row){
		this.row = row
	}

	get nom(){
		return this.row.nom
	}

	get quantite(){
		return this.row.quantite
	}

	get ref(){
		return this.row.ref
	}


	static create(content, cb){
		connection.query('INSERT INTO stock SET nom = ?, quantite = ?, ref = ?',[content.nom,content.quantite,content.ref], (err, result)=>{
			if(err) throw err;
			cb(result)
		})
	}

	static all(cb){
		connection.query('SELECT * FROM stock', (err,rows)=>{
			if(err)throw err;
			cb(rows.map((row)=> new Stock(row)))
		})
	}

	static find(id, cb){
		connection.query('SELECT * FROM stock WHERE ref=? LIMIT 1', [ref], (err,rows)=>{
			if(err) throw err;
			cb(new Stock(rows[0]))
		})
	}
}


module.exports = Stock