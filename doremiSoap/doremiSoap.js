// Dolby server Soap 
// ---Soap requests requiring server response must be async due to http. 
// ---make sure to accound for this when issuing soap requests 
// ---login method must be called first when making multiple requests in the same instance 
// ---make sure to run logout method when finished to destroy sessionId 


const tcpping = require('../Lib/tcp-ping');
const httpReq = require('./httpGen');
const soapGen = require('./soapGen');

class Soap {

	constructor(url, sessionId, args) {
		this.url = url;
		this.sessionId = sessionId;
		this.args = args;
		this.AssetCheck = '/dc/dcp/json/v1/AssetCheck';
		this.AssetManagement = '/dc/dcp/json/v1/AssetManagement';
		this.BackupScan = '/dc/dcp/json/v1/BackupScan';
		this.BackupManagement = '/dc/dcp/json/v1/BackupManagement';
		this.ConfigManagement = '/dc/dcp/json/v1/ConfigManagement';
		this.CPLManagement = '/dc/dcp/json/v1/CPLManagement';
		this.DateTimeManagement = '/dc/dcp/json/v1/DateTimeManagement';
		this.Diagnostics = '/dc/dcp/json/v1/Diagnostics';
		this.DLMManagement = '/dc/dcp/json/v1/DLMManagement';
		this.IngestManagement = '/dc/dcp/json/v1/IngestManagement';
		this.IngestScan = '/dc/dcp/json/v1/IngestScan';
		this.InputFeedManagement = '/dc/dcp/json/v1/InputFeedManagement';
		this.KDMManagement = '/dc/dcp/json/v1/KDMManagement';
		this.LogManagement = '/dc/dcp/json/v1/LogManagement';
		this.MacroManagement = '/dc/dcp/json/v1/MacroManagement';
		this.NetworkManagement = '/dc/dcp/json/v1/NetworkManagement';
		this.OutputFeedManagement = '/dc/dcp/json/v1/OutputFeedManagement';
		this.PowerManagement = '/dc/dcp/json/v1/PowerManagement';
		this.RecordLegacy = '/dc/dcp/json/v1/RecordLegacy';
		this.ScheduleManagement = '/dc/dcp/json/v1/ScheduleManagement';
		this.SessionManagement = '/dc/dcp/json/v1/SessionManagement';
		this.ShowControl = '/dc/dcp/json/v1/ShowControl';
		this.SNMP = '/dc/dcp/json/v1/SNMP';
		this.Sensors = '/dc/dcp/json/v1/Sensors';
		this.SPLManagement = '/dc/dcp/json/v1/SPLManagement';
		this.StorageManagement = '/dc/dcp/json/v1/StorageManagement';
		this.SystemInformation = '/dc/dcp/json/v1/SystemInformation';
		this.SystemOverview = '/dc/dcp/json/v1/SystemOverview';
		this.Toolbox = '/dc/dcp/json/v1/Toolbox';
		this.TriggerManagement = '/dc/dcp/json/v1/TriggerManagement';
		this.WebUI = '/dc/dcp/json/v1/WebUI';
		this.AudioManagement = '/dc/dcp/json/v1/AudioManagement';
		this.TKRManagement = '/dc/dcp/json/v1/TKR';
		this.ExportManagement = '/dc/dcp/json/v1/ExportManagement';

	}

	//simple ping to server and return bool
	online() {

		return new Promise((resolve, reject) => {
			tcpping.probe(this.url, 80, (err, available) => {

				if (available == null) {
					reject(err);
				}
				else {
					resolve(available);
				}

			});
						

		});

	}

	login(user) {

		return new Promise(async (resolve, reject) => {
			let sGen = new soapGen();
			let request = sGen.generateLoginRequest('Login', user);
			let netReq = new httpReq(this.url, this.SessionManagement);

			//response should be json
			let response = await netReq.POST(request);
			let json = await JSON.parse(response);
			
			let sessionId = json.LoginResponse.sessionId;

			//make sure we got something back
			if (sessionId == undefined) {
				reject(Console.error('Unable to get session ID from server'));
			}
			else {

				//set sessionId variable for object instanse
				this.sessionId = sessionId;
				let res = {
					response: json,
					login: true
				}
				resolve(res);
			}
		});

	}

	//The following methods require a authentication to get valid information from server

	shutdown() {
		return new Promise(async (resolve, reject) => {
			//create soap request with selected inputs
			let soap = new soapGen();
			let shutdownArg = {
				delayMinutes: 0
			}
			let request = soap.generateJsonRequest(this.sessionId, 'Shutdown', shutdownArg);

			console.log(request);
			//create network request
			let netReq = new httpReq(this.url, this.PowerManagement);
			//send network request
			let response = await netReq.POST(request);
			//return any response
			resolve(response);
		});
	}


}
   
module.exports = Soap;
