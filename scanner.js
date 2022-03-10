
require('dotenv').config({ path: './.env' });
const SerialPort = require('serialport');
const event = require('./event');

const scannerPath1 = process.env.SCANNER_PATH_1;
const scannerPath2 = process.env.SCANNER_PATH_2;
const scannerPath3 = process.env.SCANNER_PATH_3;


//  NEED TO CONFIG SERIAL PORT FIRST, READ 'README.md'
const scanner1 = new SerialPort(scannerPath1, {
    baudRate: 9600,
    autoOpen: true
});
scanner1.on('open', function () {
    console.log('scanner 1 opened');
});
scanner1.on('data', function (data) {
    const scanString = String(data).trim();
    event.emit('scanner', {
        value: scanString,
        userIndex: 0
    });
});
scanner1.on('close', () => {
    console.log('Scanner 1 closed');
});
scanner1.on('error', (err) => {
    console.log('scanner 1 error:', err.message);
});
/////////////////////////////////////////////////////////////////////////
const scanner2 = new SerialPort(scannerPath2, {
    baudRate: 9600,
    autoOpen: true
});
scanner2.on('open', function () {
    console.log('scanner 2 opened');
});
scanner2.on('data', function (data) {
    const scanString = String(data).trim();
    event.emit('scanner', {
        value: scanString,
        userIndex: 1
    });
});
scanner2.on('close', () => {
    console.log('Scanner 2 closed');
});
scanner2.on('error', (err) => {
    console.log('scanner 2 error:', err.message);
});
/////////////////////////////////////////////////////////////////////////
const scanner3 = new SerialPort(scannerPath3, {
    baudRate: 9600,
    autoOpen: true
});
scanner3.on('open', function () {
    console.log('scanner 3 opened');
});
scanner3.on('data', function (data) {
    const scanString = String(data).trim();
    event.emit('scanner', {
        value: scanString,
        userIndex: 2
    });
});
scanner3.on('close', () => {
    console.log('Scanner 3 closed');
});
scanner3.on('error', (err) => {
    console.log('scanner 3 error:', err.message);
});

/**
 * Reconnecting to serial port every 5 seconds after loosing connection
 */
function scanner1CheckHealth() {
    scanner1.open((err) => {
        if (err) {
            if (err.message !== 'Port is already open')
                event.emit('scanner:error', err.message);
        }
    });
}

setInterval(scanner1CheckHealth, 5000);