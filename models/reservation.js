let connection = require('../config/db')
let moment = require('../config/moment')

class Reservation {

	constructor(row){
		this.row = row
	}

	get id(){
		return this.row.id
	}

	get numtable(){
		return this.row.numtable
	}

	get client(){
		return this.row.client
	}


	static create(content, cb){
		connection.query('INSERT INTO reservations SET id = ?, numtable = ?, client = ?',[content.id,content.numtable,content.client], (err, result)=>{
			if(err) throw err;
			connection.query('UPDATE tables SET prise=?, client=?  WHERE numero=? ',[1,content.client,content.numtable], (err, result)=>{
			if(err) throw err;
			cb(result)
		})
	})
}

	static all(cb){
		connection.query('SELECT * FROM reservations', (err,rows)=>{
			if(err)throw err;
			cb(rows.map((row)=> new Reservation(row)))
		})
	}

	static count(cb){
		connection.query('SELECT COUNT(*) as nbreserv FROM reservations', (err,rows)=>{
			if(err)throw err;
			cb(new Reservation(rows[0]))
		})
	}

	static find(id, cb){
		connection.query('SELECT * FROM reservations WHERE numtable=? LIMIT 1', [id], (err,rows)=>{
			if(err) throw err
			cb(new Reservation(rows[0]))
		})
	}
}

module.exports = Reservation