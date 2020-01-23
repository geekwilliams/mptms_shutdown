let net = require('net');

let pStandby = '(PWR3)';         // Projector Standby code
let pFull = '(PWR1)';            // Projector Full power code
let poloff = '(PWR0)';           // Projector Power on, Lamp off
let warmup = '(PWR11)';          // Projector Warmup mode; read-only value
let coolDown = '(PWR10)';        // Projector Cooldown mode; read-only value

let pState = '(PWR+STAT)';      // Query current projector power state
let lastComm = '(PWR?)';        // Query last power command sent to projector
let cdTime = '(PWR+COOL?)';     // Query cooldown time in seconds
let currentPowerState = pStandby;   // Start in standby mode
let stateChangeReq = '';        // Holds incoming power state change request

var gSocket;

//---open socket for listening---//

let server = new net.createServer(function (socket) {
    console.log('connected');

    gSocket = socket;

    socket.on('data', function (data) {
        

        //console.log(data.toString());

        commHandler(data.toString());

        //if (/\(PWR\+STAT\)/.test(data.toString())) {
        //    socket.write(currentPowerState);
        //}
                             
    });

    socket.on('close', function () {
        console.log('TCP Client disconnected.');
    });

}).listen(5000);

console.info("Projector Emulator is running on 5000");


function commHandler(args) {
    console.log('command handler...');


    args = args.replace(/(\r\n|\n|\r)/gm, "");
    console.log(args);

    switch (args.toUpperCase()) {
        case "(PWR+STAT)":
            console.log('Socket user requested current power state via ', args);
            gSocket.write(currentPowerState);
            break;
    }


    //switch (true) {
    //    case /\(PWR3\)/.test(args):
    //        power(pStandby, currentPowerState);
    //        break;
    //    case /\(PWR0\)/.test(args):
    //        power(poloff, currentPowerState);
    //        break;
    //    case /\(PWR1\)/.test(args):
    //        power(pFull, currentPowerState);
    //        break;
    //    case /\(PWR\+STAT\)/.test(args):
    //        console.log('Socket user requested current power state via ', args);
    //        gSocket.write(currentPowerState);
    //        break;
    //    default:
    //        console.log('Something went wrong');
    //        return;
    //};


}


function power(stateChange, currentState) {
    switch (stateChange) {
        
        case pStandby:
            switch (currentState) {
                case pStandby:
                    console.log('Projector already in this state: ', currentPowerState);
                    break;
                case poloff:
                    console.log('requesting standby mode ', stateChange);
                    currentPowerState = pStandby;
                    console.log(currentPowerState);
                    break;
                case pFull:
                    console.log('requesting standby mode ', stateChange);
                    currentPowerState = coolDown;
                    console.log('wait 10 seconds for cooldown...');
                    console.log(currentPowerState);
                    setTimeout(() => {
                        currentPowerState = pStandby;

                        console.log('Projector is in Standby mode ', currentPowerState);
                    }, 10000);
                    currentPowerState = pStandby;
                    
                    break;
                default:
                    console.log('Unknown Error');
                    return;
            }
            break;
        case poloff:
            switch (currentState) {
                case pStandby:
                    console.log('requesting power on lamp off ', stateChange);
                    currentPowerState = warmup;
                    console.log('wait 5 seconds for warmup...');
                    setTimeout(() => {
                        currentPowerState = poloff;
                        console.log(currentPowerState);
                    }, 5000);
                    break;
                case poloff:
                    console.log('Projector already in this state: ', currentPowerState);
                    break;
                case pFull:
                    console.log('requesting power on lamp off ', stateChange);
                    currentPowerState = coolDown;
                    console.log('wait 10 seconds for cooldown...');
                    
                    setTimeout(() => {
                        currentPowerState = poloff;
                        console.log(currentPowerState);
                    }, 10000);
                   
                    console.log(currentPowerState);
                    break;
                default:
                    console.log('Unknown Error');
                    return;
            }
            break;
        case pFull:
            switch (currentState) {
                case pStandby:
                    console.log('requesting full power mode ', stateChange);
                    currentPowerState = warmup;
                    console.log('wait 5 seconds for warmup...');
                    setTimeout(() => {
                        currentPowerState = pFull;
                        console.log('lamp is on');
                        console.log(currentPowerState);
                        
                    }, 5000);
                    break;
                case poloff:
                    console.log('requesting full power mode =>> power on lamp off ', stateChange);
                    currentPowerState = pFull;
                    console.log('Lamp is on');
                    break;
                case pFull:
                    currentPowerState = pFull;
                    console.log('Projector is already in this state ', currentPowerState);
                    break;
                default:
                    console.log('Unknown Error');
                    return;
            }
            break;
        
                

    }
};
