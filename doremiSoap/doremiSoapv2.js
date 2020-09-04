// Dolby server Soap v2
// ---Soap requests requiring server response must be async due to http. 
// ---make sure to accound for this when issuing soap requests 
// ---login method must be called first when making multiple requests in the same instance 
// ---make sure to run logout method when finished to destroy sessionId 

const soapGen = require('./drmSoapGen');
const httpReq = require('./httpGen');
const tcpping = require('../Lib/tcp-ping');

class Soap {

	constructor(url, user) {
        this.url = url;
        this.user = user;
		this.sessionId;
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
		this.Sensors = '/dc/dcp/json/v1/Sensors'; 
		this.SessionManagement = '/dc/dcp/json/v1/SessionManagement';
		this.ShowControl = '/dc/dcp/json/v1/ShowControl';
		this.SNMP = '/dc/dcp/json/v1/SNMP';
		this.SPLManagement = '/dc/dcp/json/v1/SPLManagement';
		this.StorageManagement = '/dc/dcp/json/v1/StorageManagement';
		this.SystemInformation = '/dc/dcp/json/v1/SystemInformation';
		this.SystemOverview = '/dc/dcp/json/v1/SystemOverview';
		this.TKR = '/dc/dcp/json/v1/TKR';//*
		this.Toolbox = '/dc/dcp/json/v1/Toolbox';
		this.TriggerManagement = '/dc/dcp/json/v1/TriggerManagement';
		this.UserManagement = '/dc/dcp/json/v1/UserManagement'; 
		this.VirtualAssetManagement = '/dc/dcp/json/v1/VirtualAssetManagement';
        this.WebUI = '/dc/dcp/json/v1/WebUI';
        // Javascript sucks so we have to define function before using it
        // On object construction init() will authenticate object to server
        // 'this.sessionId' is scoped to object created
        // For now we will log-off manually when tasks with object are completed
        this.init = function() {
                return new Promise(resolve, reject => {
                    let s = soapGen('Login', this.user)
                    let request = new httpReq(this.url, this.SessionManagement);
        
                    request.POST(s)
                        .then(res => {
                            let json = JSON.parse(res);
                            this.sessionId = json.sessionId;
                            resolve(res);
                        })
                        .catch(res => {reject(res)});
                
            });
        }
        // Call this to login when object is made
        this.init();
	}
	
	// Need a way to get sessionId out of this object
	getSessionId() {
		return new Promise(resolve, reject => {
			if (this.sessionId){
				resolve(this.sessionId);
			}
			else {
				let str = "Error: SessionId not set in class object instance.";
				reject(str);
			}

		})
	}

	// Simple way to see if server is online (PING)
	online() {

		return new Promise(async (resolve, reject) => {
			tcpping.probe(this.url, 80, (err, available) => {

				if (available == null) {
					reject(false);
				}
				else {
					resolve(true);
				}
			});
		});
	}
    
    
    // ASSET CHECK SERVICE
    assetCheckRequest(operation, args) {
        return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.AssetCheck);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}
	
	// ASSET MANAGEMENT SERVICE
	assetManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.AssetManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// AUDIO MANAGEMENT SERVICE
	audioManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.AudioManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// BACKUP SCAN SERVICE
	backupScanRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.BackupScan);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// BACKUP MANAGEMENT SERVICE
	backupManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.BackupManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// CONFIG MANAGEMENT SERVICE
	configManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.ConfigManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// CPL MANAGEMENT SERVICE
	cplManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.CPLManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// DATE AND TIME SERVICE
	dateTimeRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.DateTimeManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// DIAGNOSTICS
	diagnosticsRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.Diagnostics);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// DLM MANAGEMENT SERVICE
	dlmManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.DLMManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// EXPORT MANAGEMENT SERVICE
	exportManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.ExportManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// FEATURE MANAGEMENT SERVICE
	featureManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.FeatureManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// INGEST MANAGEMENT SERVICE
	ingestManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.IngestManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// INGEST SCAN 
	ingestScanRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.IngestScan);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// INPUT FEED MANAGEMENT
	inputFeedManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.InputFeedManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// KDM MANAGEMENT SERVICE
	kdmManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.KDMManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// LOG MANAGEMENT SERVICE
	logManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.LogManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// MACRO MANAGEMENT SERVICE
	macroManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.MacroManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// MAINTENANCE MANAGEMENT SERVICE
	maintenanceManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.Maintenance);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// NETWORK MANAGEMENT SERVICE
	networkManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.NetworkManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// NOTIFICATION MANAGEMENT SERVICE
	notificationManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.NotificationEvents);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// POWER MANAGEMENT SERVICE
	powerManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.PowerManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// PROJECTOR MANAGEMENT SERVICE
	projectorManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.Projectors);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// SCHEDULE MANAGEMENT SERVICE
	scheduleManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.ScheduleManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// SENSOR MANAGEMENT SERVICE
	sensorManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.Sensors);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// SESSION MANAGEMENT SERVICE
	sessionManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.SessionManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// SHOW CONTROL
	showControlRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.ShowControl);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// SNMP SERVICE
	snmpRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.SNMP);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// SPL MANAGEMENT SERVICE
	splManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.SPLManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// STORAGE MANAGEMENT SERVICE
	storageManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.StorageManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// SYSTEM INFORMATION
	systemInformationRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.SystemInformation);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// SYSTEM OVERVIEW
	systemOverviewRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.SystemOverview);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// TKR
	tkrRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.TKR);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// TOOLBOX
	toolboxRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.Toolbox);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// TRIGGER MANAGEMENT SERVICE
	triggerManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.TriggerManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// USER MANAGEMENT SERVICE
	userManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.UserManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// VIRTUAL ASSET MANAGEMENT
	virtualAssetManagementRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.VirtualAssetManagement);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}

	// WEB UI UTILITIES
	webRequest(operation, args) {
		return new Promise(resolve, reject => {
            let s = soapGen(operation, args, this.sessionId);
            let request = new httpReq(this.url, this.WebUI);

            request.POST(s)
                .then(res => {resolve(res)})
                .catch(res => {reject(res)});
        })
	}
}  