//library for network addresses of devices
const StrLibrary = require('./Lib/strLibrary');
const NetAddress = require('./Lib/addressLibrary');

//net required for network activities
const net = require('net');

//required to communicate with Solaria equipment
const Projector = require('./Solaria_API/Projector');
const api = require('./Solaria_API/Solaria');

//required to communicate with doremi server
const DrmSoap = require('./doremiSoap/doremiSoap');

//doremi user info
let user = {
    username: 'manager',
    password: 'password'
}

//additional setup information:
let location = StrLibrary.mesa;
let listenPort = 5006; 


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

    let SoapSvr = new DrmSoap(serverUrl);
    let SvrOnline = await SoapSvr.online(); 

    let projector = new Projector(projectorUrl, '1');
    let projectorOnline = await projector.online();
    //console.log(projectorOnline);

    if (!projectorOnline) {
        console.log('Projector and server in theater ' + house + ' are down.');
    }
    else {

        if (!SvrOnline) {

            let status = await projector.standby();
            console.log('Projector status is ' + status.status + 'with response: ' + status.response);

        }

        else {
            //log in to server
            let status = await SoapSvr.login(user);

            if (status.login == true) {
                console.log('Requesting shutdown of server at ' + serverUrl);
                let imsResponse = await SoapSvr.shutdown();
                //console.log(imsResponse):
                console.log('Waiting for server to shut down...');
                
                //wait 3 minutes then send standby to projector
                setTimeout(function () {
                    projector.standby();
                    console.log('Projector at ' + projectorUrl + ' sent standby command.');
                }, 180000);
            }
            else {
                console.log('There was a problem with server validation');
            }

        }
    }
    

};

sock(listenPort);


