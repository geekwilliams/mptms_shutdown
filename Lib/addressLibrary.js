var AddressLibrary = {
    // general address library for projection equipment
    // 'x' is used as placeholder for location  and device octet
    // devices are given a number then converted to string and merged for full address 
    theaterSub: '10.18.x.x',
    mediaSub: '10.95.x.x',
    studio: 128,
    mesa: 130,
    laramie: 132,
    america: 134,
    rialto: 136,
    fox: 138,
    capitol: 140,
    starStadium: 144,
    starTwin: 146,
    equipment: {
        ShowServerNet1: 110,
        projector: 190,
        ChristieAct: 30,
        audioProcessor: 30
    }

};

function NetAddress(theater, auditorium, device) {

    var currentAddress = AddressLibrary.theaterSub;

    if (device.toLowerCase() == 'audioprocessor') {
        switch (theater.toLowerCase()) {
            case 'mesa':
                currentAddress = currentAddress.replace('x', (AddressLibrary.mesa + 1).toString());
                break;
            case 'studio':
                currentAddress = currentAddress.replace('x', (AddressLibrary.studio + 1).toString());
                break;
            case 'america':
                currentAddress = currentAddress.replace('x', (AddressLibrary.america + 1).toString());
                break;
            case 'rialto':
                currentAddress = currentAddress.replace('x', (AddressLibrary.rialto + 1).toString());
                break;
            case 'fox':
                currentAddress = currentAddress.replace('x', (AddressLibrary.fox + 1).toString());
                break;
            case 'capitol':
                currentAddress = currentAddress.replace('x', (AddressLibrary.capitol + 1).toString());
                break;
            case 'starstadium':
                currentAddress = currentAddress.replace('x', (AddressLibrary.starStadium + 1).toString());
                break;
            case 'startwin':
                currentAddress = currentAddress.replace('x', (AddressLibrary.starTwin + 1).toString());
                break;
            case 'laramie':
                currentAddress = currentAddress.replace('x', (AddressLibrary.laramie + 1).toString());
                break;
            default:
                return console.log('Incorrect theater.');
        }
    }
    else {

        switch (theater.toLowerCase()) {
            case 'mesa':
                currentAddress = currentAddress.replace('x', (AddressLibrary.mesa).toString());
                break;
            case 'studio':
                currentAddress = currentAddress.replace('x', (AddressLibrary.studio).toString());
                break;
            case 'america':
                currentAddress = currentAddress.replace('x', (AddressLibrary.america).toString());
                break;
            case 'rialto':
                currentAddress = currentAddress.replace('x', (AddressLibrary.rialto).toString());
                break;
            case 'fox':
                currentAddress = currentAddress.replace('x', (AddressLibrary.fox).toString());
                break;
            case 'capitol':
                currentAddress = currentAddress.replace('x', (AddressLibrary.capitol).toString());
                break;
            case 'starstadium':
                currentAddress = currentAddress.replace('x', (AddressLibrary.starStadium).toString());
                break;
            case 'startwin':
                currentAddress = currentAddress.replace('x', (AddressLibrary.starTwin).toString());
                break;
            case 'laramie':
                currentAddress = currentAddress.replace('x', (AddressLibrary.laramie).toString());
                break;
            default:
                return console.log('Incorrect theater.');
        }
    }

    switch (device.toLowerCase()) {
        case 'showserver':
            currentAddress = currentAddress.replace('x', (AddressLibrary.equipment.ShowServerNet1 + auditorium).toString());
            break;
        case 'projector':
            currentAddress = currentAddress.replace('x', (AddressLibrary.equipment.projector + auditorium).toString());
            break;
        case 'act':
            currentAddress = currentAddress.replace('x', (AddressLibrary.equipment.ChristieAct + auditorium).toString());
            break;
        case 'audioprocessor':
            currentAddress = currentAddress.replace('x', (AddressLibrary.equipment.audioProcessor + auditorium).toString());
            break;

        default:
            return console.log('Incorrect device.');
    }

    return currentAddress;
};

module.exports = NetAddress;
