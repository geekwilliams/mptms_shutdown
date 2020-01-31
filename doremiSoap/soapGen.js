//this class generates the soap request

class soapGen {
	constructor(sessionId) {
		this.sessionId = sessionId;		
	}

	//Creates login request. Cannot include sessionId in login request (as one has not yet been assigned)
	//args is sub for user OBJECT (using key: 'value' pair syntax)
	generateLoginRequest(operation, args) {
		var JsonRequest = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:v1=\"http://www.doremilabs.com/dc/dcp/json/v1_0\">\n<soapenv:Header/>\n\<soapenv:Body>\n\<v1:" + operation + ">\n";

		Object.keys(args).forEach(function (key) {

			JsonRequest += "<" + key + ">" + args[key] + "</" + key + ">\n";
		});

		JsonRequest += "</v1:" + operation + ">\n\</soapenv:Body>\n\</soapenv:Envelope>\n";

		return JsonRequest;
	}

	//Creates Json request for an operation to be completed
	generateJsonOperation(sessionId, operation){
		var JsonRequest = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:v1=\"http://www.doremilabs.com/dc/dcp/json/v1_0\"><soapenv:Header/>\
			<soapenv:Body>\
			<v1:" + operation + ">\
			<sessionId>" + sessionId + "</sessionId>\
			</v1:" + operation + ">\
			</soapenv:Body>\
			</soapenv:Envelope>";

			return JsonRequest;
	}

	//Covers special cases (like SNMP) where sessionId is not needed
	generateJsonRequestNoSession(operation){
		var JsonRequest = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:v1=\"http://www.doremilabs.com/dc/dcp/json/v1_0\"><soapenv:Header/>\
			<soapenv:Body>\
			<v1:" + operation + ">\
			</v1:" + operation + ">\
			</soapenv:Body>\
			</soapenv:Envelope>";

			return JsonRequest;
	}

	//Creates Json request with multiple arguments 
	generateJsonRequest(sessionId, operation, args){
		var JsonRequest = "<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns1=\"http://www.doremilabs.com/dc/dcp/json/v1_0\">\
			<SOAP-ENV:Body>\
			<ns1:" + operation + ">\
			<sessionId>" + sessionId + "</sessionId>";

			Object.keys(args).forEach(function (key) {

				JsonRequest += "<" + key + ">" + args[key] + "</" + key + ">\n";
			});
	
			JsonRequest += "</ns1:" + operation + ">\
			</SOAP-ENV:Body>\
			</SOAP-ENV:Envelope>";
	
		return JsonRequest;
	}
	

}

module.exports = soapGen;
