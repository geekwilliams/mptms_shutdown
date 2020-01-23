exports.Solaria = {

    //power commands
    power: {
        state:    '(PWR+STAT?)',
        full:     '(PWR1)',
        on:       '(PWR0)',
        standby:  ' (PWR3)',
        coolDown: '(PWR+COOL?)'
    },

    lampID: '(LID?)',

    lampHistory: '(HIS?)',
    // Start backup command/get backup information
    backup: {
        backup: '(BCK1)',
        location: '(BCK+STAT?)'
    },

}










