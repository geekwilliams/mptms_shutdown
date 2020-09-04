/*  This application handles the graceful and automatic shutdown of houses using Christie and Doremi products

    Minimum requirements:
        -Theater must be a member of Movie Palace Inc. and use it's internal IP Scheme
            **If outside of Movie Palace Inc, you may customize 'addressLibrary.js' to
              match network schema of your location
        -Theater server running Node.js version 9 or later
        -Projector must be series 2 and running latest release of software(v-4.8.1(3)) 
        -IMS2000 must be running software version 2.8 or later
        -IMS3000 must be running software version 3.0 or later

        This application has been tested with the equipment above. Use with any other configuration may have 
        unexpected results.

    Start app standalone or as child process with arguments:
        $1 = location (str, see strLibrary.js for correct format)
        $2 = port to listen on (str), defaults to 5006
 
*/


//library for network addresses of devices
const NetAddress = require('./Lib/addressLibrary');

//net required for network activities
const net = require('net');

//required to communicate with Solaria equipment
const Projector = require('./Solaria_API/Projector');
const api = require('./Solaria_API/Solaria');

//required to communicate with doremi server
const drmSoap = require('./doremiSoap/doremiSoapv2.js');
const drmOperation = require('./doremiSoap/soapOperations');
const { PowerManagement } = require('./doremiSoap/soapOperations');

//*** additional setup information ***//
let location = process.argv[2];
let listenPort = process.argv[3] || 5006; 
let user = {
    username: 'manager', 
    password: 'password'
}

function sock(port) {
    //creates socket listening for shutdown command
    new net.createServer((socket) => {
        console.log('connected');

        socket.on('data', function (data) {
            data = sanitize(data);
            let regExp = RegExp('shutdown');

            if (regExp.test(data)) {
                 
                commHandler(data);
            }
            else {
                console.log('Data received, but no command...');
            }

        });

    }).listen(port);
}
    
function sanitize(args) {
    args = ((args.toString()).toLowerCase()).trim();
    return args;
}

function commHandler(args) {
    //get auditorium number from command 
    let auditorium = Number(args.substring(8, 10));
    //get network addresses for projector and server
    let urlSvr = NetAddress(location, auditorium, StrLibrary.equipment.showserver);
    let urlPrj = NetAddress(location, auditorium, StrLibrary.equipment.projector);
    //send device info to function
    shutdownManager(urlSvr, urlPrj, auditorium);    

}


 
async function shutdownManager(serverUrl, projectorUrl, house) {

    let SoapSvr = new drmSoap(serverUrl, user);
    let SvrOnline = await SoapSvr.online(); 

    let projector = new Projector(projectorUrl, '1');
    let projectorOnline = await projector.online();

    if (!projectorOnline) {
        console.log('Projector and server in theater ' + house + ' are down.');
    }
    else {

        if (!SvrOnline) {

            let status = await projector.standby();
            console.log('Projector status is ' + status.status + 'with response: ' + status.response);

        }

        else {
            console.log('Requesting shutdown of server at ' + serverUrl);
            let shutdownArg = {
                delayMinutes: '1'
            };
            SoapSvr.powerManagementRequest(PowerManagement.Shutdown, shutdownArg)
                .then(() => {
                console.log('Waiting for server to shut down...');
                setTimeout(function () {
                    projector.standbye();
                    console.log('Projector at ' + projectorUrl + ' sent standby command.');
                }, 180000);
            })
                .catch(() => {
                    console.log('Communication has broken down. Please ensure equipment is powered down correctly.');
                });          
        }
    }
}

// main();
sock(listenPort);