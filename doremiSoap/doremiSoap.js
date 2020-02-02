// Dolby server Soap 
// ---Soap requests requiring server response must be async due to http. 
// ---make sure to accound for this when issuing soap requests 
// ---login method must be called first when making multiple requests in the same instance 
// ---make sure to run logout method when finished to destroy sessionId 


const tcpping = require('../Lib/tcp-ping');
const httpRequest = require('./httpGen');
const soapGen = require('./soapGen');

class Soap {

	constructor(url, sessionId, args) {
		this.url = url;
		this.sessionId = sessionId;
		this.args = args;
		this.AssetCheck = '/dc/dcp/json/v1/AssetCheck';
		this.AssetManagement = '/dc/dcp/json/v1/AssetManagement';
		this.AudioManagement = '/dc/dcp/json/v1/AudioManagement'; 
		this.BackupScan = '/dc/dcp/json/v1/BackupScan';
		this.BackupManagement = '/dc/dcp/json/v1/BackupManagement';
		this.ConfigManagement = '/dc/dcp/json/v1/ConfigManagement';
		this.CPLManagement = '/dc/dcp/json/v1/CPLManagement';
		this.DateTimeManagement = '/dc/dcp/json/v1/DateTimeManagement';
		this.Diagnostics = '/dc/dcp/json/v1/Diagnostics';
		this.DLMManagement = '/dc/dcp/json/v1/DLMManagement';
		this.ExportManagement = '/dc/dcp/json/v1/ExportManagement';
		this.FeatureManagement = '/dc/dcp/json/v1/FeatureManagement'; 
		this.IngestManagement = '/dc/dcp/json/v1/IngestManagement';
		this.IngestScan = '/dc/dcp/json/v1/IngestScan';
		this.InputFeedManagement = '/dc/dcp/json/v1/InputFeedManagement';
		this.KDMManagement = '/dc/dcp/json/v1/KDMManagement';
		this.LogManagement = '/dc/dcp/json/v1/LogManagement';
		this.MacroManagement = '/dc/dcp/json/v1/MacroManagement';
		this.Maintenance = '/dc/dcp/json/v1/Maintenance';
		this.NetworkManagement = '/dc/dcp/json/v1/NetworkManagement';
		this.NotificationEvents = '/dc/dcp/json/v1/NotificationEvents'; 
		this.PowerManagement = '/dc/dcp/json/v1/PowerManagement';
		this.Projectors = '/dc/dcp/json/v1/Projectors'; 
		this.ScheduleManagement = '/dc/dcp/json/v1/ScheduleManagement';
		this.Sensors = '/dc/dcp/json/v1/Sensors'; //*
		this.SessionManagement = '/dc/dcp/json/v1/SessionManagement';
		this.ShowControl = '/dc/dcp/json/v1/ShowControl';
		this.SNMP = '/dc/dcp/json/v1/SNMP';
		this.Sensors = '/dc/dcp/json/v1/Sensors';
		this.SPLManagement = '/dc/dcp/json/v1/SPLManagement';
		this.StorageManagement = '/dc/dcp/json/v1/StorageManagement';
		this.SystemInformation = '/dc/dcp/json/v1/SystemInformation';
		this.SystemOverview = '/dc/dcp/json/v1/SystemOverview';
		this.TKR = '/dc/dcp/json/v1/TKR';//*
		this.Toolbox = '/dc/dcp/json/v1/Toolbox';
		this.TriggerManagement = '/dc/dcp/json/v1/TriggerManagement';
		this.UserManagement = '/dc/dcp/json/v1/UserManagement'; //*
		this.VirtualAssetManagement = '/dc/dcp/json/v1/VirtualAssetManagement'; //*
		this.WebUI = '/dc/dcp/json/v1/WebUI';
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
			let netReq = new httpRequest(this.url, this.SessionManagement);

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
	//---PowerManagement---//
	Shutdown() {
		return new Promise(async (resolve, reject) => {
			//create soap request with selected inputs
			let soap = new soapGen();
			let args = {
				'delayMinutes': 0
			}
			let request = soap.generateJsonRequest(this.sessionId, 'Shutdown', args);

			console.log(request);
			//create network request
			let net = new httpRequest(this.url, this.PowerManagement);
			//send network request
			let response = await net.POST(request);
			//return any response
			resolve(response);
		});
	}
	Reboot() {
		return new Promise(async (resolve, reject) => {
			//create soap request with selected inputs
			let soap = new soapGen();
			let args = {
				'delayMinutes': 0
			}
			let request = soap.generateJsonRequest(this.sessionId, 'Reboot', args);

			console.log(request);
			//create network request
			let net = new httpRequest(this.url, this.PowerManagement);
			//send network request
			let response = await net.POST(request);
			//return any response
			resolve(response);
		});
	}
	CancelShutdown() {
		return new Promise(async (resolve, reject) => {
			//create soap request with selected inputs
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'CancelShutdown');
			//create network request
			let net = new httpRequest(this.url, this.PowerManagement);
			//send network request
			let response = await net.POST(request);
			//return any response
			resolve(response);
		});
	}
	CancelReboot() {
		return new Promise(async (resolve, reject) => {
			//create soap request with selected inputs
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'CancelReboot');
			//create network request
			let net = new httpRequest(this.url, this.PowerManagement);
			//send network request
			let response = await net.POST(request);
			//return any response
			resolve(response);
		});
	}
	Standby() {
		return new Promise(async (resolve, reject) => {
			//create soap request with selected inputs
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'Standby');
			//create network request
			let net = new httpRequest(this.url, this.PowerManagement);
			//send network request
			let response = await net.POST(request);
			//return any response
			resolve(response);
		});
	}
	Wakeup() {
		return new Promise(async (resolve, reject) => {
			//create soap request with selected inputs
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'Wakeup');
			//create network request
			let net = new httpRequest(this.url, this.PowerManagement);
			//send network request
			let response = await net.POST(request);
			//return any response
			resolve(response);
		});
	}
	//---AssetCheck---//
	GetAssetChecklist(assetId, assetCheckId, assetCheckType) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let checks = {
				'assetId': assetId,
				'assetCheckId': assetCheckId,
				'assetCheckType': assetCheckType
			}
			let request = soap.generateJsonRequest(this.sessionId, checks);
			
			let net = new httpRequest(this.url, this.assetCheck);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	RunAssetCheck(assetId, assetCheckTitle, assetCheckType) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'assetId': assetId,
				'assetCheckTitle': assetCheckTitle,
				'assetCheckType': assetCheckType
			}
			let request = soap.generateJsonRequest(this.sessionId, args);
			let net = new httpRequest(this.url, this.assetCheck);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	CancelAssetCheck(assetCheckId) {
		return new Promise((async resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'assetCheckId': assetCheckId
			}
			let request = soap.generateJsonRequest(this.sessionId, args);
			let net = new httpRequest(this.url, this.assetCheck);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	RestartAssetCheck(assetCheckId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'assetCheckId': assetCheckId
			}
			let request = soap.generateJsonRequest(this.sessionId, args);
			let net = new httpRequest(this.url, this.assetCheck);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---AssetManagement---//
	GetAssetList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetAssetList');
			let net = new httpRequest(this.url, this.AssetManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	StartAssetOperation(operation, arrayList) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonRequest(this.sessionId, operation, arrayList);
			let net = new httpRequest(this.url, this.AssetManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	AssetOperationStatus() {
		return new Promise((resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'AssetOperationStatus');
			let net = new httpRequest(this.url, this.AssetManagement);
			let response = await net.POST(request);
			resolve(response);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
		});
	}
	ClearAssetOperation() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'ClearAssetOperation');
			let net = new httpRequest(this.url, this.AssetManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}

		});
	}
	//---AudioManagement---//
	GetAudioMacro() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetAudioMacro');
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetAudioMacroList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetAudioMacroList');
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetAudioMacro(macroId) {
		return new Promise((resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'macroId': macroId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetAudioMacro', args);
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
 	GetAudioMute() {
		return new Promise((resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetAudioMute');
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetAudioMute(value) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'value': value
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetAudioMute', args);
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetAudioMicrophone() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetAudioMicrophone');
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetAudioMicrophone(enabled) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'enabled': enabled
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetAudioMicrophone', args);
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetAudioFader() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetAudioFader');
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetAudioFader(value) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'value': value
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetAudioFader', args);
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetAudioMonitor() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetAudioMonitor');
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetAudioEqPresetList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetAudioEqPresetList');
			let net = new httpRequest(this.url, this.AudioManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---BackupScan---//
	StartBackupScan() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'StartBackupScan');
			let net = new httpRequest(this.url, this.BackupScan);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	CancelBackupScan(identifier) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'identifier': identifier
			}
			let request = soap.generateJsonRequest(this.sessionId, 'CancelBackupScan', args);
			let net = new httpRequest(this.url, this.BackupScan);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetBackupScanProgress(identifier) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'identifier': identifier
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetBackupScanProgress', args);
			let net = new httpRequest(this.url, this.BackupScan);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetBackupScanResult(identifier) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'identifier': identifier
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetBackupScanResult', args);
			let net = new httpRequest(this.url, this.BackupScan);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetBackupFileInfo(backupFilename) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'backupFilename': backupFilename
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetBackupFileInfo', args);
			let net = new httpRequest(this.url, this.BackupScan);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---BackupManagement---//
	StartBackupGenerate(repairAuto, path, description) {
		return new Promise((async resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'repairAuto': repairAuto,
				'path': path,
				'description': description
			}
			let request = soap.generateJsonRequest(this.sessionId, 'StartBackupGenerate', args);
			let net = new httpRequest(this.url, this.BackupManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetBackupGenerateProgress(identifier) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'identifier': identifier
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetBackupGenerateProgress', args);
			let net = new httpRequest(this.url, this.BackupManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteBackup(backupFilename) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'backupFilename': backupFilename
			}
			let request = soap.generateJsonRequest(this.sessionId, 'DeleteBackup', args);
			let net = new httpRequest(this.url, this.BackupManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	StartBackupRestore(backupFilename, categoryList) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'backupFilename': backupFilename,
				'categoryList': categoryList
			}
			let request = soap.generateJsonRequest(this.sessionId, 'StartBackupRestore', args);
			let net = new httpRequest(this.url, this.BackupManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetBackupRestoreProgress(identifier) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'identifier': identifier
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetBackupRestoreProgress', args);
			let net = new httpRequest(this.url, this.BackupManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetBackupInformation() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetBackupInformation');
			let net = new httpRequest(this.url, this.BackupManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---ConfigManagement---//
	GetConfigFileContent(id, channel) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'id': id, 
				'channel': channel // default is 0
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetConfigurationFileContent', args);
			let net = new httpRequest(this.url, this.ConfigManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetConfigFileContent(id, channel, content) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'id': id,
				'channel': channel,
				'content': content
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetConfigurationFileContent', args);
			let net = new httpRequest(this.url, this.ConfigManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteConfigFile(id, channel) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'id': id, 
				'channel': channel
			}
			let request = soap.generateJsonRequest(this.sessionId, 'DeleteConfigurationFile', args);
			let net = new httpRequest(this.url, this.ConfigManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---CPLManagement---//
	GetCPLList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetCPLList');
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteCPL(cplId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'cplId': cplId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'DeleteCPL', args);
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetCPLInfo(cplId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'cplId': cplId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetCPLInfo', args);
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetCPLContent(cplId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'cplId': cplId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetCPLContent', args);
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetCPLContent(content) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'content': content
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetCPLContent', args);
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	ValidateCPL(cplId, checkStrength) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'cplId': cplId,
				'checkStrength': checkStrength //type:int ---determines how hard the system will try to validate the cpl. default is 0
			}
			let request = soap.generateJsonRequest(this.sessionId, 'ValidateCPL', args);
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetCPLListInfo() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetCPLListInfo');
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetCPLSettings(cplId, type) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'cplId': cplId,
				'type': type
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetCPLSettings', args);
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetCPLSettings(cplId, content) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'cplId': cplId,
				'content': content
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetCPLSettings', args);
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	RunIntegCheck(cplId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'cplId': cplId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'RunIntegrityCheck', args);
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	AbortIntegChecks(cplId) {
		return new Promise(async (resolve, reject) => { 
			let soap = new soapGen();
			let args = {
				'cplId': cplId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'AbortIntegrityChecks', args);
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetCPLDefaultSettings(content) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'content': content
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetCPLDefaultSettings', args);
			let net = new httpRequest(this.url, this.CPLManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---DateTimeManagement---//
	GetTime(clockId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'clockId': clockId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetTime', args);
			let net = new httpRequest(this.url, this.DateTimeManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetTime(clockId, time) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'clockId': clockId,
				'time': time
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetTime', args);
			let net = new httpRequest(this.url, this.DateTimeManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetTimeZone() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetTimeZone');
			let net = new httpRequest(this.url, this.DateTimeManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetTimeZone(timezone) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'timezone': timezone
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetTimeZone', args);
			let net = new httpRequest(this.url, this.DateTimeManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetNTPStatus() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetNTPStatus');
			let net = new httpRequest(this.url, this.DateTimeManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---Diagnostics---//
	GenerateReport() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GenerateReport');
			let net = new httpRequest(this.url, this.Diagnostics);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	CreateReportTask() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'CreateReportTask');
			let net = new httpRequest(this.url, this.Diagnostics);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteReportTask(reportId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'reportId': reportId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'DeleteReportTask', args);
			let net = new httpRequest(this.url, this.Diagnostics);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetReportTaskList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetReportTaskList');
			let net = new httpRequest(this.url, this.Diagnostics);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---DLMManagement---//
	GetDLMList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetDLMList');
			let net = new httpRequest(this.url, this.DLMManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteDLM(dlmId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'dlmId': dlmId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'DeleteDLM', args);
			let net = new httpRequest(this.url, this.DLMManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetDLMContent(dlmId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'dlmId': dlmId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetDLMContent', args);
			let net = new httpRequest(this.url, this.DLMManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetDLMContent(content) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'content': content
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetDLMContent', args);
			let net = new httpRequest(this.url, this.DLMManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---ExportManagement---//
	GetExportLocation(dataType) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'dataType': dataType
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetExportLocation', args);
			let net = new httpRequest(this.url, this.ExportManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetExportStatus() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetExportStatus');
			let net = new httpRequest(this.url, this.ExportManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	ExportData(type, name, exportURI) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'type': type,
				'name': name,
				'exportURI': exportURI
			}
			let request = soap.generateJsonRequest(this.sessionId, 'ExportData', args);
			let net = new httpRequest(this.url, this.ExportManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
 	CancelExport(identifier) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'identifier': identifier
			}
			let request = soap.generateJsonRequest(this.sessionId, 'CancelExport', args);
			let net = new httpRequest(this.url, this.ExportManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---FeatureManagement---//
	GetFeatureInfo(feature) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'feature': feature
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetFeatureInfo', args);
			let net = new httpRequest(this.url, this.FeatureManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	RefreshFeatureInfo(feature) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'feature': feature
			}
			let request = soap.generateJsonRequest(this.sessionId, 'RefreshFeatureInfo', args);
			let net = new httpRequest(this.url, this.FeatureManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---IngestManagement---//
	CreateIngestTask(taskParameters, taskProperties) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskParameters': taskParameters,
				'taskProperties': taskProperties
			}
			let request = soap.generateJsonRequest(this.sessionId, 'CreateIngestTask', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});

	}
	PauseIngestTask(taskId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskId': taskId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'PauseIngestTask', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	ResumeIngestTask(taskId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskId': taskId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'ResumeIngestTask', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	CancelIngestTask(taskId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskId': taskId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'CancelIngestTask', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteIngestTask(taskId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskId': taskId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'DeleteIngestTask', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	UpdateIngestTask(taskParameters, taskProperties) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskParameters': taskParameters,
				'taskProperties': taskProperties
			}
			let request = soap.generateJsonRequest(this.sessionId, 'UpdateIngestTask', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});

	}
	GetIngestTaskList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetIngestTaskList');
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetIngestTaskInfo(taskId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskId': taskId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetIngestTaskInfo', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetIngestTaskStatus(taskId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskId': taskId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetIngestTaskStatus', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetIngestTaskEventCount(taskId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskId': taskId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetIngestTaskEventCount', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetIngestTaskEventMessage(taskId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskId': taskId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetIngestTaskEventMessage', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetIngestTaskListInfo(taskId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskId': taskId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetIngestTaskListInfo', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetIngestTaskEventList(taskId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'taskId': taskId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetIngestTaskEventList', args);
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---IngestScan---//
	StartScan(uri, maxDepth, typeList, reportIsComplete, reportIsAlreadyIngested, filterProduct, filterSerial, alternateConfigurationFile) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'maxDepth': maxDepth,
				'typeList': typeList,
				'reportIsComplete': reportIsComplete,
				'reportIsAlreadyIngested': reportIsAlreadyIngested,
				'filterProduct': filterProduct,
				'filterSerial': filterSerial,
				'alternateConfigurationFile': alternateConfigurationFile
			}
			let request = soap.generateJsonRequest(this.sessionId, 'StartScan', args);
			let net = new httpRequest(this.url, this.IngestScan);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	CancelScan() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'CancelScan');
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetScanStatus() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetScanStatus');
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetScanResult() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetScanResult');
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	ClearScan() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'ClearScan');
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---InputFeedManagement---//
	GetInputFeedList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetInputFeedList');
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	ConfigureInputFeed(feedId, config) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'feedId': feedId,
				'config': config
			}
			let request = soap.generateJsonRequest(this.sessionId, 'ConfigureInputFeed', args);
			let net = new httpRequest(this.url, this.InputFeedManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetInputFeedProgramList(feedId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'feedId': feedId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetInputFeedProgramList', args);
			let net = new httpRequest(this.url, this.InputFeedManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetInputFeedStatus(feedId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'feedId': feedId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetInputFeedStatus', args);
			let net = new httpRequest(this.url, this.InputFeedManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---KDMManagement---//
	GetKDMList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetKDMList');
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteKDM(kdmId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'kdmId': kdmId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'DeleteKDM', args);
			let net = new httpRequest(this.url, this.InputFeedManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetKDMInfo(kdmId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'kdmId': kdmId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetKDMInfo', args);
			let net = new httpRequest(this.url, this.InputFeedManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetKDMContent(kdmId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'kdmId': kdmId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetKDMContent', args);
			let net = new httpRequest(this.url, this.InputFeedManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetKDMContent(kdmId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'kdmId': kdmId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetKDMContent', args);
			let net = new httpRequest(this.url, this.InputFeedManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetKDMListInfo() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetKDMListInfo');
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---LogManagement---//
	CreateLogSnapshot(databaseId, filters, title) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'databaseId': databaseId, 
				'filters': filters,
				'title': title
			}
			let request = soap.generateJsonRequest(this.sessionId, 'CreateLogSnapshot', args);
			let net = new httpRequest(this.url, this.LogManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetLogSnapshotList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetLogSnapshotList');
			let net = new httpRequest(this.url, this.IngestManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteLogSnapshot(snapshotd) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'snapshotId': snapshotd
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetKDMContent', args);
			let net = new httpRequest(this.url, this.InputFeedManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	QueryLog(databaseId, offset, count, descendingOrder, filters) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'databaseId': databaseId,
				'offset': offset,
				'count': count,
				'descendingOrder': descendingOrder,
				'filters': filters
			}
			let request = soap.generateJsonRequest(this.sessionId, 'QueryLog', args);
			let net = new httpRequest(this.url, this.LogManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---MacroManagement---//
	GetMacroList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetMacroList');
			let net = new httpRequest(this.url, this.MacroManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetMacroInfo(uuid) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'uuid': uuid
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetMacroInfo', args);
			let net = new httpRequest(this.url, this.MacroManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	RunMacro(name) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'name': name
			}
			let request = soap.generateJsonRequest(this.sessionId, 'RunMacro', args);
			let net = new httpRequest(this.url, this.MacroManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---Maintenance---//
	GetMaintenanceTaskList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetMaintenanceTaskList');
			let net = new httpRequest(this.url, this.Maintenance);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetMaintenanceOperationList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetMaintenanceOperationList');
			let net = new httpRequest(this.url, this.Maintenance);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	AddMaintenanceOperation(authId, taskId, annotationText) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'authId': authId,
				'taskId': taskId,
				'annotationText': annotationText
			}
			let request = soap.generateJsonRequest(this.sessionId, 'AddMaintenanceOperation', args);
			let net = new httpRequest(this.url, this.Maintenance);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---NetworkManagement---//
	GetNetworkList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetNetworkList');
			let net = new httpRequest(this.url, this.MacroManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetNetworkConfig(interface) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'interface': interface
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetNetworkConfig', args);
			let net = new httpRequest(this.url, this.MacroManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetNetworkConfig(networkConfig) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'networkConfig': networkConfig
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetNetworkConfig', args);
			let net = new httpRequest(this.url, this.MacroManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetNetworkInfo(interface) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'interface': interface
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetNetworkInfo', args);
			let net = new httpRequest(this.url, this.MacroManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---NotificationEvents---//
	GetNotificationStatus(database) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'database': database
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetNotificationStatus', args);
			let net = new httpRequest(this.url, this.NotificationEvents);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetNotificationList(database, lowId, highId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'database': database,
				'lowId': lowId,
				'highId': highId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetNotificationList', args);
			let net = new httpRequest(this.url, this.NotificationEvents);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetEventTag(database, eventId, tag) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'database': database,
				'eventId': eventId,
				'tag': tag
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetEventTag', args);
			let net = new httpRequest(this.url, this.NotificationEvents);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	ResetEventTag(database, eventId, tag) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'database': database,
				'eventId': eventId,
				'tag': tag
			}
			let request = soap.generateJsonRequest(this.sessionId, 'ResetEventTag', args);
			let net = new httpRequest(this.url, this.NotificationEvents);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---Projectors---//
	GetProjectorMacroList(projector) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'projector': projector
			}
			
			let request = soap.generateJsonRequest(this.sessionId, 'GetMacroList', args);
			let net = new httpRequest(this.url, this.Projectors);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---ScheduleManagement---//
	CreateSchedule(scheduleInfo) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'scheduleInfo': scheduleInfo
			}
			let request = soap.generateJsonRequest(this.sessionId, 'CreateSchedule', args);
			let net = new httpRequest(this.url, this.ScheduleManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetScheduleList(dateFrom, dateTo) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'dateFrom': dateFrom,
				'dateTo': dateTo
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetScheduleList', args);
			let net = new httpRequest(this.url, this.ScheduleManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteSchedule(scheduleId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'scheduleId': scheduleId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'DeleteSchedule', args);
			let net = new httpRequest(this.url, this.ScheduleManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetScheduleInfo(scheduleId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'scheduleId': scheduleId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetScheduleInfo', args);
			let net = new httpRequest(this.url, this.ScheduleManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetSchedulerStatus() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetSchedulerStatus');
			let net = new httpRequest(this.url, this.ScheduleManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetSchedulerStatus() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetSchedulerStatus');
			let net = new httpRequest(this.url, this.ScheduleManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	StartScheduler() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'StartScheduler');
			let net = new httpRequest(this.url, this.ScheduleManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	StopScheduler() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'StopScheduler');
			let net = new httpRequest(this.url, this.ScheduleManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---Sensors---//
	GetModuleList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetModuleList');
			let net = new httpRequest(this.url, this.Sensors);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetTemperatureList(module) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'module': module
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetTemperatureList', args);
			let net = new httpRequest(this.url, this.Sensors);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetFanList(module) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'module': module
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetFanList', args);
			let net = new httpRequest(this.url, this.Sensors);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetVoltageList(module) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'module': module
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetVoltageList', args);
			let net = new httpRequest(this.url, this.Sensors);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---ShowControl---//
	Play() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'Play');
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	Pause() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'Pause');
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	Eject() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'Eject');
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SkipForward() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'SkipForward');
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SkipBackward() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'SkipBackward');
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	JumpForward(offset) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'offset': offset
			}
			let request = soap.generateJsonRequest(this.sessionId, 'JumpForward', args);
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	JumpBackward(offset) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'offset': offset
			}
			let request = soap.generateJsonRequest(this.sessionId, 'JumpBackward', args);
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	JumpTimecode(timecode) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'timecode': timecode
			}
			let request = soap.generateJsonRequest(this.sessionId, 'JumpTimecode', args);
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	JumpElement(elementId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'elementId': elementId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'JumpElement', args);
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetLoopMode(loopMode) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'loopMode': loopMode
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetLoopMode', args);
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetLoopMode(loopMode) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'loopMode': loopMode
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetLoopMode', args);
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	LoadShowAsset(splId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'splId': splId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'LoadShowAsset', args);
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	LoadClip(clipId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'clipId': clipId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'LoadClip', args);
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	LoadShowConent(content) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'content': content
			}
			let request = soap.generateJsonRequest(this.sessionId, 'LoadShowContent', args);
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetShowStatus() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetShowStatus');
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetShowLockStatus() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetShowLockStatus');
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetElementListStatus() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetElementListStatus');
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetLoadinStatus() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetLoadinStatus');
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetErrorStatus() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetErrorStatus');
			let net = new httpRequest(this.url, this.ShowControl);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---SNMP---//
	GetSNMP(oid) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'oid': oid
			}
			let request = soap.generateJsonRequest(thie.sessionId, 'GetSNMP', args);
			let net = new httpRequest(this.url, this.SNMP);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---SPLManagement---//
	GetSPLList() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetSPLList');
			let net = new httpRequest(this.url, this.SPLManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteSPL(splId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'splId': splId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'DeleteSPL', args);
			let net = new httpRequest(this.url, this.SPLManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetSPLInfo(splId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'splId': splId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetSPLInfo', args);
			let net = new httpRequest(this.url, this.SPLManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetSPLContent(splId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'splId': splId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetSPLContent', args);
			let net = new httpRequest(this.url, this.SPLManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetSPLContent(splId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'splId': splId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetSPLContent', args);
			let net = new httpRequest(this.url, this.SPLManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetSPLListInfo() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetSPLListInfo');
			let net = new httpRequest(this.url, this.SPLManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetSPLRuntime() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetSPLRuntime');
			let net = new httpRequest(this.url, this.SPLManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---StorageManagement---//
	GetStorageList() {									 
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetStorageList');
			let net = new httpRequest(this.url, this.StorageManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetStorageUnitInfo(name) {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'name': name
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetStorageUnitInfo', args);
			let net = new httpRequest(this.url, this.StorageManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	AddActiveUnit(storageUnit, activeUnit) {								 
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'storageUnit': storageUnit,
				'activeUnit': activeUnit
			}
			let request = soap.generateJsonRequest(this.sessionId, 'AddActiveUnit', args);
			let net = new httpRequest(this.url, this.StorageManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	RemoveActiveUnit(storageUnit, activeUnit) {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'storageUnit': storageUnit,
				'activeUnit': activeUnit
			}
			let request = soap.generateJsonRequest(this.sessionId, 'RemoveActiveUnit', args);
			let net = new httpRequest(this.url, this.StorageManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	StartStorageInit(storageName, driveCount) {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'storageName': storageName,
				'driveCount': driveCount
			}
			let request = soap.generateJsonRequest(this.sessionId, 'StartStorageInit', args);
			let net = new httpRequest(this.url, this.StorageManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetStorageInitStatus() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetStorageInitStatus');
			let net = new httpRequest(this.url, this.StorageManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---SystemInformation---//
	GetProductInformation() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetProductInformation');
			let net = new httpRequest(this.url, this.SystemInformation);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetSoftwareInventoryList() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetSoftwareInventoryList');
			let net = new httpRequest(this.url, this.SystemInformation);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetHardwareInventoryList() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetHardwarenventoryList');
			let net = new httpRequest(this.url, this.SystemInformation);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetHostname() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetHostname');
			let net = new httpRequest(this.url, this.SystemInformation);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	SetHostname(hostname, screenName) {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'hostname': hostname,
				'screenName': screenName
			}
			let request = soap.generateJsonRequest(this.sessionId, 'SetHostname', args);
			let net = new httpRequest(this.url, this.SystemInformation);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetCertificateList() {									 
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetCertificateList');
			let net = new httpRequest(this.url, this.SystemInformation);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetFeatureList() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetFeatureList');
			let net = new httpRequest(this.url, this.SystemInformation);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---SystemOverview---//
	GetSystemOverview() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetSystemOverview');
			let net = new httpRequest(this.url, this.SystemOverview);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetSystemStatus() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetSystemStatus');
			let net = new httpRequest(this.url, this.SystemOverview);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---TKR---//
	CreateTkrTask(url, cplId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'url': url, 
				'cplId': cplId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'CreateTkrTask', args);
			let net = new httpRequest(this.url, this.TKR);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetTkrTaskList(cplId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'cplId': cplId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetTkrTaskList', args);
			let net = new httpRequest(this.url, this.TKR);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	CancelTkrTask(tkrId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'tkrId': tkrId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'CancelTkrTask', args);
			let net = new httpRequest(this.url, this.TKR);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetTkrTaskInfo(tkrId) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'tkrId': tkrId
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetTkrTaskInfo', args);
			let net = new httpRequest(this.url, this.TKR);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---Toolbox---//
	EncryptConfigPassword(plaintext) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'plaintext': plaintext
			}
			let request = soap.generateJsonRequest(this.sessionId, 'EncryptConfigPassword', args);
			let net = new httpRequest(this.url, this.Toolbox);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	TestURIAccess(uri, write, username, password, passwordEncoding) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'uri': uri,
				'write': write,
				'username': username,
				'password': password,
				'passwordEncoding': passwordEncoding
			}
			let request = soap.generateJsonRequest(this.sessionId, 'TestURIAccess', args);
			let net = new httpRequest(this.url, this.Toolbox);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---TriggerManagement---//
	GetTriggerList() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetTriggerList');
			let net = new httpRequest(this.url, this.TriggerManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetTriggerInfo(uuid) {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'uuid': uuid
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetTriggerInfo', args);
			let net = new httpRequest(this.url, this.TriggerManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---UserManagement---//
	GetUserList() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetUserList');
			let net = new httpRequest(this.url, this.UserManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetGroupList() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetGroupList');
			let net = new httpRequest(this.url, this.UserManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetUserListInfo() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetUserListInfo');
			let net = new httpRequest(this.url, this.UserManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	CreateUser(userId, groupId, userType, password, userFullName) {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'userId': userId, 
				'groupId': groupId,
				'userType': userType,
				'password': password,
				'userFullName': userFullName
			}
			let request = soap.generateJsonRequest(this.sessionId, 'CreateUser', args);
			let net = new httpRequest(this.url, this.UserManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	DeleteUser(userId, userType) {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'userId': userId, 
				'userType': userType,
			}
			let request = soap.generateJsonRequest(this.sessionId, 'DeleteUser', args);
			let net = new httpRequest(this.url, this.UserManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	ModifyUser(userId, userType, groupId, userFullName) {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'userId': userId, 
				'userType': userType,
				'groupId': groupId,
				'userFullName': userFullName
			}
			let request = soap.generateJsonRequest(this.sessionId, 'ModifyUser', args);
			let net = new httpRequest(this.url, this.UserManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetUserInfo(userId, userType) {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'userId': userId, 
				'userType': userType,
			}
			let request = soap.generateJsonRequest(this.sessionId, 'GetUserInfo', args);
			let net = new httpRequest(this.url, this.UserManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	ChangeUserPassword(userId, password, userType) {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'userId': userId,
				'password': password,
				'userType': userType,
			}
			let request = soap.generateJsonRequest(this.sessionId, 'ChangeUserPassword', args);
			let net = new httpRequest(this.url, this.UserManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---VirtualAssetManagement---//
	CreateVirtualClip(parameters) {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let args = {
				'parameters': parameters
			}
			let request = soap.generateJsonRequest(this.sessionId, 'CreateVirtualClip', args);
			let net = new httpRequest(this.url, this.VirtualAssetManagement);
			let response = await net.POST(request);

			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});

	}
	GetVirtualClipList() {									
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetVirtualClipList');
			let net = new httpRequest(this.url, this.VirtualAssetManagement);
			let response = await net.POST(request);
			
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	//---WebUi---//
	GetFooter() {
		return new Promise(async (resovle, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetFooter');
			let net = new httpRequest(this.url, this.WebUI);
			let response = await net.POST(request);
				
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetConnectionCount() {
		return new Promise(async (resolve, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonRequestNoSession('GetConnectionCount');
			let net = new httpRequest(this.url, this.WebUI);
			let response = await net.POST(request);

				
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
	GetCounters() {
		return new Promise(async (resovle, reject) => {
			let soap = new soapGen();
			let request = soap.generateJsonOperation(this.sessionId, 'GetCounters');
			let net = new httpRequest(this.url, this.WebUI);
			let response = await net.POST(request);
				
			if (response == undefined){
				let err = console.error('No response from server');
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	}
}
   
module.exports = Soap;
