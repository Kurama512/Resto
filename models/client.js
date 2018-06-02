let connection = require('../config/db')
let moment = require('../config/moment')

class Client {

	constructor(row){
		this.row = row
	}

	get id(){
		return this.row.id
	}

	get nom(){
		return this.row.nom
	}


	static create(content, cb){
		connection.query('INSERT INTO clients SET nom = ?',[content], (err, result)=>{
			if(err) throw err;
			cb(result)
		})
	}

	static all(cb){
		connection.query('SELECT * FROM clients', (err,rows)=>{
			if(err)throw err;
			cb(rows.map((row)=> new Client(row)))
		})
	}

	static find(id, cb){
		connection.query('SELECT * FROM clients WHERE id=? LIMIT 1', [id], (err,rows)=>{
			if(err) throw err;
			cb(new Client(rows[0]))
		})
	}
}



module.exports = Client