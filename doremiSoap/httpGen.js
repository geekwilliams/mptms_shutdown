// Trying to condense http request into smaller instance in other files
// HTTP by nature is async, so account for this when calling its methods
// httpReq requires hostname and path, http request is actually assenbled and sent via POST method in class
// POST method takes request as argument (likely a soap request)
// POST method is async to allow req.write() and req.end to finish, making sure that 'data' variable has 
// all of the returned data inside, then data is returned.  
const http = require('http');

class httpReq {
	constructor(hostname, path) {
		this.hostname = hostname;
		this.path = path;
		
	}


	POST(request) {
		//returning a promise to enable async/await functionality 
		return new Promise((resolve, reject) => {
			let options = {
			hostname: this.hostname,
			port: 80,
			path: this.path,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(request)
				}
			}
			//console.log(options);			
			let buffer;

			//set up request object
			let req = new http.request(options);

			//add listeners 
			req.on('response', async (res) => {

				//handle data stream
				res.on('data', (chunk) => {
					buffer += chunk;

				});

				//assign finished buffer to response and resolve
				await res.on('end', () => {
					let response = buffer;
					//string starts with 'undefined'...cutting this off
					let json = response.substring(9);
					
					resolve(json);
				});

				//error
				res.on('error', (err) => {
					console.error(err);
				});
			}); 
			
			req.on('error', (err) => {
				reject(err);
			})

			req.write(request);
			req.end();

		});
	}
}

module.exports = httpReq;