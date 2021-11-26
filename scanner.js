/*************
 * This file used to interact serial device on USB port
 * Scanners are configured
 */

require('dotenv').config({ path: './.env' });
const SerialPort = require('serialport');
const event = require('./event');

const scannerPath = process.env.SCANNER_PATH;
//  NEED TO CONFIG SERIAL PORT FIRST, READ 'README.md'
const scanner = new SerialPort(scannerPath, {
    baudRate: 9600,
    autoOpen: true
});

scanner.on('open', function () {
    console.log('Scanner opened');
});

scanner.on('data', function (data) {
    let scanString = String(data).trim();

    event.emit('scanner', {
        value: scanString
    });

});

scanner.on('close', () => {
    console.log('Front scanner closed');
});

scanner.on('error', (err) => {
    console.log('scanner error:', err.message);
});


/**
 * Reconnecting to serial port every 5 seconds after loosing connection
 */
function scannerCheckHealth() {
    scanner.open((err) => {
        if (err) {
            if (err.message !== 'Port is already open')
                event.emit('scanner:error', err.message);
        }
    });
}

setInterval(scannerCheckHealth, 5000);