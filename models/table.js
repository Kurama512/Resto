let connection = require('../config/db')
let moment = require('../config/moment')

class Table {

	constructor(row){
		this.row = row
	}

	get numero(){
		return this.row.numero
	}

	get taille(){
		return this.row.taille
	}

	get posx(){
		return this.row.posx
	}

	get posy(){
		return this.row.posy
	}

	get prise(){
		return this.row.prise
	}

	get client(){
		return this.row.client
	}

	static create(content, cb){
		connection.query('INSERT INTO tables SET taille = ?, numero = ?, posx = ?, posy = ?, prise=?',[content.taille,content.numero,content.posx,content.posy,0], (err, result)=>{
			if(err) throw err;
			cb(result)
		})
	}

	static alldispo(cb){
		connection.query('SELECT * FROM tables WHERE prise=0', (err,rows)=>{
			if(err)throw err;
			cb(rows.map((row)=> new Table(row)))
		})
	}

	static all(cb){
		connection.query('SELECT * FROM tables', (err,rows)=>{
			if(err)throw err;
			cb(rows.map((row)=> new Table(row)))
		})
	}

	static find(id, cb){
		connection.query('SELECT * FROM tables WHERE numero=? LIMIT 1', [numero], (err,rows)=>{
			if(err) throw err
			cb(new Table(rows[0]))
		})
	}
}



module.exports = Table