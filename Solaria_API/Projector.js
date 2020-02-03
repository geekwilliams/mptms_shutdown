
let net = require('net');
let _ = require('./Solaria');
let ping = require('../Lib/tcp-ping');



class Projector { 
	constructor(address, series) {
		// properties
		this.address = address;
		this.series = series;
		this.port = 5000;
	} 


	//communication

	send(command) {
		return new Promise((resolve, reject) => {
			let res;

			let socket = new net.Socket();
			socket.connect(this.port, this.address, function () {
				socket.write(command);
				socket.on('data', function (data) {
					res = data;

					resolve(res);
				});
				socket.on('error', (err) => {
					reject(err);
				});
			});
		});
	}

	online() {
		return new Promise((resolve, reject) => {

			ping.probe(this.address, this.port, (err, available) => {

				if (available == null) {
					reject(err);
				}
				else {
					resolve(true);
				}

			});


		});

	}
	

	standby() {
		return new Promise((resolve, reject) => {

			let res = '';

			let socket = new net.Socket();
			socket.connect(this.port, this.address, function () {
				socket.write(_.Solaria.power.standby);
				socket.on('data', function (data) {
					res = {
						response: data,
						status: 'Standby'
					}

					resolve(res);
				});
				socket.on('error', (err) => {
					reject(err);
				});

			});
		}); 
	}

	fullPower() {
		let res = '';

		let socket = new net.Socket();
		socket.connect(this.port, this.address, function () {
			socket.write(_.Solaria.power.full);
			socket.on('data', function (data) {
				res = data;

				return res;
			});

		});

	}

	on() {
		let res = '';

		let socket = new net.Socket();
		socket.connect(this.port, this.address, function () {
			socket.write(_.Solaria.power.on);
			socket.on('data', function (data) {
				res = data;

				return res;
			});

		});
	}

	coolDown() {
		let res = '';

		let socket = new net.Socket();
		socket.connect(this.port, this.address, function () {
			socket.write(_.Solaria.power.coolDown);
			socket.on('data', function (data) {
				res = data;

				return res;
			});

		});
	}
	
}
module.exports = Projector;


