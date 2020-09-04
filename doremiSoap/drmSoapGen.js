function soapGen(operation, args, sessionId) {
    let soapRequest = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:v1=\"http://www.doremilabs.com/dc/dcp/json/v1_0\">\n<soapenv:Header/>\n\<soapenv:Body>\n\<v1:" + operation + ">\n"; 

    // If sessionId is included in args then add it first, if not then continue
    // ---This allows this block of code to generate ALL requests
    if (sessionId) {
        soapRequest += "<sessionId>" + sessionId + "</sessionId>\n"
    }

    Object.keys(args).forEach(function (key) {

        soapRequest += "<" + key + ">" + args[key] + "</" + key + ">\n";
    });

    soapRequest += "</v1:" + operation + ">\n\</soapenv:Body>\n\</soapenv:Envelope>\n";

		return soapRequest;
}

module.exports = soapGen;