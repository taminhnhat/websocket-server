
const wallMess = require('./Message/wallMessage');
const io = require('socket.io')();
const event = require('./event');
require('dotenv').config({ path: './.env' });
// require('./readPipe');
if (process.env.SCANNER_ENABLED == 'true')
    require('./scanner');
const RGB = require('./rgb');
const version = '0.0.1';

const testEnabled = true;
const upperCaseRGBFormat = process.env.UPPERCASE_COLORRGB_FORMAT;

let listenSocket = null;
let enableSendConfirm = true;

function rgbFormat(color) {
    if (upperCaseRGBFormat) return color.toUpperCase();
    else return color.toLowerCase();
}

/**
 * 
 * @param {*} name name of api
 * @param {*} type type of wall
 * @param {*} row row of wall
 * @param {*} col column of wall
 * @param {*} side side of wall
 * @returns object
 */
let generateLightCmd = function (name, type, side) {
    let lightObj = {
        name: '',
        clientId: 'demo_server',
        version: '0.0.1',
        params: {}
    };
    lightObj.name = name;
    lightObj.params.wall = type;
    lightObj.params.side = side;
    lightObj.key = generateCheck(5);
    return {
        name: '',
        clientId: 'demo_server',
        version: '0.0.1',
        params: {
            wall: type,
            side: side
        }
    }
};

let generateConfirmCmd = function (name, wall, row, col, state) {
    let confirmObj = {
        'name': '',
        'clientId': 'demo_server',
        'version': '0.0.1',
        'params': {}

    };
    confirmObj.name = name, name;
    confirmObj.params.wall = wall;
    confirmObj.params.column = col;
    confirmObj.params.row = row;
    confirmObj.params.state = state;
    return confirmObj;
};

const returnWall = function (wallIndex) {
    if (wallIndex == 4) {
        const row = Math.floor(Math.random() * 15) + 1;
        const wallName = `M-${wallIndex}-${row}`;
        if (wall(wallName).full) return returnWall(wallIndex);
        else return wallName;
    } else {
        const row = Math.floor(Math.random() * 30) + 1;
        const wallName = `M-${wallIndex}-${row}`;
        if (wall(wallName).full) return returnWall(wallIndex);
        else return wallName;
    }
}

const lightColorList = ['00ff00', '0000ff', 'ffff00', 'ff00ff', '00ffff']
const returnLight = function () {
    return lightColorList[rand() * 5]
}

let M_1_1 = { name: 'M-1-1', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_2 = { name: 'M-1-2', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_3 = { name: 'M-1-3', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_4 = { name: 'M-1-4', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_5 = { name: 'M-1-5', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_6 = { name: 'M-1-6', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_7 = { name: 'M-1-7', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_8 = { name: 'M-1-8', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_9 = { name: 'M-1-9', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_10 = { name: 'M-1-10', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_11 = { name: 'M-1-11', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_12 = { name: 'M-1-12', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_13 = { name: 'M-1-13', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_14 = { name: 'M-1-14', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_15 = { name: 'M-1-15', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_16 = { name: 'M-1-16', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_17 = { name: 'M-1-17', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_18 = { name: 'M-1-18', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_19 = { name: 'M-1-19', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_20 = { name: 'M-1-20', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_21 = { name: 'M-1-21', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_22 = { name: 'M-1-22', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_23 = { name: 'M-1-23', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_24 = { name: 'M-1-24', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_25 = { name: 'M-1-25', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_26 = { name: 'M-1-26', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_27 = { name: 'M-1-27', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_28 = { name: 'M-1-28', count: 0, max: 1, full: false, loadingMode: 'put' };
let M_1_29 = { name: 'M-1-29', count: 0, max: 2, full: false, loadingMode: 'put' };
let M_1_30 = { name: 'M-1-30', count: 0, max: 1, full: false, loadingMode: 'put' };

const M1 = [M_1_1, M_1_2, M_1_3, M_1_4, M_1_5, M_1_6, M_1_7, M_1_8, M_1_9, M_1_10, M_1_11, M_1_12, M_1_13, M_1_14, M_1_15, M_1_16, M_1_17, M_1_18, M_1_19, M_1_20, M_1_21, M_1_22, M_1_23, M_1_24, M_1_25, M_1_26, M_1_27, M_1_28, M_1_29, M_1_30];

let M_2_1 = { name: 'M-2-1', count: 0, max: 2, full: false };
let M_2_2 = { name: 'M-2-2', count: 0, max: 1, full: false };
let M_2_4 = { name: 'M-2-3', count: 0, max: 2, full: false };
let M_2_5 = { name: 'M-2-4', count: 0, max: 1, full: false };
let M_2_6 = { name: 'M-2-5', count: 0, max: 2, full: false };
let M_2_7 = { name: 'M-2-6', count: 0, max: 1, full: false };
let M_2_8 = { name: 'M-2-7', count: 0, max: 2, full: false };
let M_2_9 = { name: 'M-2-8', count: 0, max: 1, full: false };
let M_2_10 = { name: 'M-2-9', count: 0, max: 2, full: false };
let M_2_11 = { name: 'M-2-10', count: 0, max: 1, full: false };
let M_2_12 = { name: 'M-2-11', count: 0, max: 2, full: false };
let M_2_13 = { name: 'M-2-12', count: 0, max: 1, full: false };
let M_2_14 = { name: 'M-2-13', count: 0, max: 1, full: false };
let M_2_15 = { name: 'M-2-14', count: 0, max: 1, full: false };
let M_2_16 = { name: 'M-2-15', count: 0, max: 2, full: false };
let M_2_17 = { name: 'M-2-16', count: 0, max: 1, full: false };
let M_2_18 = { name: 'M-2-17', count: 0, max: 2, full: false };
let M_2_19 = { name: 'M-2-18', count: 0, max: 1, full: false };
let M_2_20 = { name: 'M-2-19', count: 0, max: 2, full: false };
let M_2_21 = { name: 'M-2-20', count: 0, max: 1, full: false };
let M_2_22 = { name: 'M-2-21', count: 0, max: 2, full: false };
let M_2_23 = { name: 'M-2-22', count: 0, max: 1, full: false };
let M_2_24 = { name: 'M-2-23', count: 0, max: 2, full: false };
let M_2_25 = { name: 'M-2-24', count: 0, max: 1, full: false };
let M_2_26 = { name: 'M-2-25', count: 0, max: 2, full: false };
let M_2_27 = { name: 'M-2-26', count: 0, max: 1, full: false };
let M_2_28 = { name: 'M-2-27', count: 0, max: 1, full: false };
let M_2_29 = { name: 'M-2-28', count: 0, max: 1, full: false };
let M_2_30 = { name: 'M-2-29', count: 0, max: 2, full: false };
let M_2_31 = { name: 'M-2-30', count: 0, max: 1, full: false };

const M2 = [M_2_1, M_2_2, M_2_4, M_2_5, M_2_6, M_2_7, M_2_8, M_2_9, M_2_10, M_2_11, M_2_12, M_2_13, M_2_14, M_2_15, M_2_16, M_2_17, M_2_18, M_2_19, M_2_20, M_2_21, M_2_22, M_2_23, M_2_24, M_2_25, M_2_26, M_2_27, M_2_28, M_2_29, M_2_30, M_2_31];

let M_3_1 = { name: 'M-3-1', count: 0, max: 2, full: false };
let M_3_2 = { name: 'M-3-2', count: 0, max: 3, full: false };
let M_3_4 = { name: 'M-3-3', count: 0, max: 2, full: false };
let M_3_5 = { name: 'M-3-4', count: 0, max: 3, full: false };
let M_3_6 = { name: 'M-3-5', count: 0, max: 2, full: false };
let M_3_7 = { name: 'M-3-6', count: 0, max: 3, full: false };
let M_3_8 = { name: 'M-3-7', count: 0, max: 2, full: false };
let M_3_9 = { name: 'M-3-8', count: 0, max: 3, full: false };
let M_3_10 = { name: 'M-3-9', count: 0, max: 2, full: false };
let M_3_11 = { name: 'M-3-10', count: 0, max: 3, full: false };
let M_3_12 = { name: 'M-3-11', count: 0, max: 2, full: false };
let M_3_13 = { name: 'M-3-12', count: 0, max: 3, full: false };
let M_3_14 = { name: 'M-3-13', count: 0, max: 2, full: false };
let M_3_15 = { name: 'M-3-14', count: 0, max: 3, full: false };
let M_3_16 = { name: 'M-3-15', count: 0, max: 2, full: false };
let M_3_17 = { name: 'M-3-16', count: 0, max: 3, full: false };
let M_3_18 = { name: 'M-3-17', count: 0, max: 2, full: false };
let M_3_19 = { name: 'M-3-18', count: 0, max: 3, full: false };
let M_3_20 = { name: 'M-3-19', count: 0, max: 2, full: false };
let M_3_21 = { name: 'M-3-20', count: 0, max: 3, full: false };
let M_3_22 = { name: 'M-3-21', count: 0, max: 2, full: false };
let M_3_23 = { name: 'M-3-22', count: 0, max: 3, full: false };
let M_3_24 = { name: 'M-3-23', count: 0, max: 2, full: false };
let M_3_25 = { name: 'M-3-24', count: 0, max: 3, full: false };
let M_3_26 = { name: 'M-3-25', count: 0, max: 2, full: false };
let M_3_27 = { name: 'M-3-26', count: 0, max: 3, full: false };
let M_3_28 = { name: 'M-3-27', count: 0, max: 2, full: false };
let M_3_29 = { name: 'M-3-28', count: 0, max: 3, full: false };
let M_3_30 = { name: 'M-3-29', count: 0, max: 2, full: false };
let M_3_31 = { name: 'M-3-30', count: 0, max: 3, full: false };

const M3 = [M_3_1, M_3_2, M_3_4, M_3_5, M_3_6, M_3_7, M_3_8, M_3_9, M_3_10, M_3_11, M_3_12, M_3_13, M_3_14, M_3_15, M_3_16, M_3_17, M_3_18, M_3_19, M_3_20, M_3_21, M_3_22, M_3_23, M_3_24, M_3_25, M_3_26, M_3_27, M_3_28, M_3_29, M_3_30, M_3_31]

let M_4_1 = { name: 'M-4-1', count: 0, max: 2, full: false };
let M_4_2 = { name: 'M-4-2', count: 0, max: 3, full: false };
let M_4_4 = { name: 'M-4-3', count: 0, max: 2, full: false };
let M_4_5 = { name: 'M-4-4', count: 0, max: 3, full: false };
let M_4_6 = { name: 'M-4-5', count: 0, max: 2, full: false };
let M_4_7 = { name: 'M-4-6', count: 0, max: 3, full: false };
let M_4_8 = { name: 'M-4-7', count: 0, max: 2, full: false };
let M_4_9 = { name: 'M-4-8', count: 0, max: 3, full: false };
let M_4_10 = { name: 'M-4-9', count: 0, max: 2, full: false };
let M_4_11 = { name: 'M-4-10', count: 0, max: 3, full: false };
let M_4_12 = { name: 'M-4-11', count: 0, max: 2, full: false };
let M_4_13 = { name: 'M-4-12', count: 0, max: 3, full: false };
let M_4_14 = { name: 'M-4-13', count: 0, max: 2, full: false };
let M_4_15 = { name: 'M-4-14', count: 0, max: 3, full: false };
let M_4_16 = { name: 'M-4-15', count: 0, max: 2, full: false };

const M4 = [M_4_1, M_4_2, M_4_4, M_4_5, M_4_6, M_4_7, M_4_8, M_4_9, M_4_10, M_4_11, M_4_12, M_4_13, M_4_14, M_4_15, M_4_16];

// let M1 = { name: 'M-3-1', count: 0, max: 2, full: false };
// let M2 = { name: 'M-3-2', count: 0, max: 3, full: false };
// let M4 = { name: 'M-3-3', count: 0, max: 2, full: false };
// let M5 = { name: 'M-3-4', count: 0, max: 3, full: false };
// let M6 = { name: 'M-3-5', count: 0, max: 2, full: false };
// let M7 = { name: 'M-3-6', count: 0, max: 3, full: false };
// let M8 = { name: 'M-3-7', count: 0, max: 2, full: false };
// let M9 = { name: 'M-3-8', count: 0, max: 3, full: false };
// let M10 = { name: 'M-3-9', count: 0, max: 2, full: false };
// let M11 = { name: 'M-3-10', count: 0, max: 3, full: false };
// let M12 = { name: 'M-3-11', count: 0, max: 2, full: false };
// let M13 = { name: 'M-3-12', count: 0, max: 3, full: false };
// let M14 = { name: 'M-3-13', count: 0, max: 2, full: false };
// let M15 = { name: 'M-3-14', count: 0, max: 3, full: false };
// let M16 = { name: 'M-3-15', count: 0, max: 2, full: false };
// let M17 = { name: 'M-3-16', count: 0, max: 3, full: false };
// let M18 = { name: 'M-3-17', count: 0, max: 2, full: false };
// let M19 = { name: 'M-3-18', count: 0, max: 3, full: false };
// let M20 = { name: 'M-3-19', count: 0, max: 2, full: false };
// let M21 = { name: 'M-3-20', count: 0, max: 3, full: false };
// let M22 = { name: 'M-3-21', count: 0, max: 2, full: false };
// let M23 = { name: 'M-3-22', count: 0, max: 3, full: false };
// let M24 = { name: 'M-3-23', count: 0, max: 2, full: false };
// let M25 = { name: 'M-3-24', count: 0, max: 3, full: false };
// let M26 = { name: 'M-3-25', count: 0, max: 2, full: false };
// let M27 = { name: 'M-3-26', count: 0, max: 3, full: false };
// let M28 = { name: 'M-3-27', count: 0, max: 2, full: false };
// let M29 = { name: 'M-3-28', count: 0, max: 3, full: false };
// let M30 = { name: 'M-3-29', count: 0, max: 2, full: false };
// let M31 = { name: 'M-3-30', count: 0, max: 3, full: false };

// const M = [M1, M2, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15, M16, M17, M18, M19, M20, M21, M22, M23, M24, M25, M26, M27, M28, M29, M30, M31]

const appUser = [{
    color: '00ff00'// green
}, {
    color: '0000ff'// blue
}, {
    color: 'ffff00'// yelow
}, {
    color: 'ff00ff'// pink
}, {
    color: '00ffff'// cean
}];

const wall = function (wallName) {
    const tmp = wallName.split('-');
    const wallIndex = tmp[1];
    if (wallIndex == 1) {
        for (i in M1) {
            if (M1[i].name == wallName) return M1[i]
        }
    } else if (wallIndex == 2) {
        for (i in M2) {
            if (M2[i].name == wallName) return M2[i]
        }
    } else if (wallIndex == 3) {
        for (i in M3) {
            if (M3[i].name == wallName) return M3[i]
        }
    } else if (wallIndex == 4) {
        for (i in M4) {
            if (M4[i].name == wallName) return M4[i]
        }
    } else return 'error';
}

console.log(`Start listening on port ${serverPort}`);
const serverPort = process.env.SERVER_PORT || 3001
io.listen(serverPort);
io.on('connection', function (socket) {
    socket.emit('mergeWall/reset', {});
    setInterval(() => {
        appUser.forEach(user => {
            const wallName = returnWall(1);
            const key = generateCheck(5);
            const lightApi = {
                name: 'mergeWall/lightOn',
                clientId: 'demo_server',
                version: '1.0.0',
                params: {
                    wall: wallName,
                    lightColor: rgbFormat(user.color)
                },
                date: new Date().toISOString(),
                key: key
            }
            socket.emit('mergeWall/lightOn', lightApi);
        });
        // setTimeout(() => {
        //     const lightApi = {
        //         name: 'mergeWall/lightOff',
        //         clientId: 'demo_server',
        //         version: '1.0.0',
        //         params: {
        //             wall: wallName,
        //             lightColor: rgbFormat(appUser[0].color)
        //         },
        //         date: new Date().toISOString(),
        //         key: key
        //     }
        //     socket.emit('mergeWall/lightOff', lightApi)
        // }, 4000)
    }, 2000)

    let userIndex = 0;
    let loadingMode = 'putTolight';
    event.on('user:turnLight', (data) => {
        const dataArray = data.split(':');
        const header = dataArray[0];
        if (header == 'user' && dataArray.length >= 2) {
            const tempIdex = Number(dataArray[1]);
            if (tempIdex >= 0 && tempIdex < 6) {
                userIndex = dataArray[1];
                console.log(`Switch to user ${dataArray[1]}`);
            }
        }
        else if (header == 'on') {
            const lightApi = {
                name: 'mergeWall/lightOn',
                clientId: 'demo_server',
                version: '1.0.0',
                params: {
                    wall: dataArray[1],
                    lightColor: dataArray[2],
                    side: 'front'
                },
                date: new Date().toISOString(),
                key: generateCheck(5)
            }
            socket.emit('mergeWall/lightOn', lightApi);
            console.log('socket emit', lightApi);
        }
        else if (header == 'off') {
            const lightApi = {
                name: 'mergeWall/lightOff',
                clientId: 'demo_server',
                version: '1.0.0',
                params: {
                    wall: dataArray[1],
                    lightColor: dataArray[2],
                    side: 'front'
                },
                date: new Date().toISOString(),
                key: generateCheck(5)
            }
            socket.emit('mergeWall/lightOff', lightApi);
            console.log('socket emit', lightApi);
        }
        else if (header == 'put') {
            loadingMode = 'putToLight';
            console.log('Switch to put to light mode');
            event.emit('putToLight', {
                tote: dataArray[1],
                wall: dataArray[2]
            });
        }
        else if (header == 'pick') {
            loadingMode = 'pickToLight';
            console.log('Switch to pick to light mode');
            event.emit('pickToLight', {
                tote: dataArray[1],
                wall: dataArray[2]
            });
        }
        else if (header == 'scan' && dataArray.length >= 2) {
            event.emit('scanner', {
                value: dataArray[1]
            });
        }
        else if (header == 'clear') {
            const apiName = 'mergeWall/reset';
            const wallList = [];
            const resetApi = {
                name: apiName,
                clientId: 'demo_server',
                version: '1.0.0',
                params: {
                    wallList: wallList,
                },
                date: new Date().toISOString(),
                key: generateCheck(5)
            }
            socket.emit(apiName, resetApi);
        }
        else if (header == 'reload') {
            const apiName = 'mergeWall/reload';
            const reloadApi = {
                name: apiName,
                clientId: 'demo_server',
                version: '1.0.0',
                date: new Date().toISOString(),
                key: generateCheck(5)
            }
            socket.emit(apiName, reloadApi);
        }
        else {
            const apiName = `mergeWall/${dataArray[0]}`;
            const wallName = dataArray[1];
            const lightColor = dataArray[2];
            const wallSide = dataArray[3];
            const key = generateCheck(5);
            const lightApi = {
                name: apiName,
                clientId: 'demo_server',
                version: '1.0.0',
                params: {
                    wall: wallName,
                    lightColor: lightColor,
                    side: wallSide
                },
                date: new Date().toISOString(),
                key: key
            }
            socket.emit(apiName, lightApi);
        }
    });

    event.on('scanner', params => {
        console.log('scanner event', params);
        const scanValue = params.value.split('-');
        if (scanValue.length == 2) {
            // const randValue = Math.floor(Math.random() * 30) + 1;
            const randValue = Math.floor(Math.random() * 5 + 1) * 5;
            // const randValue = Math.floor(Math.random() * 6) * 5 + 4;
            const wallName = `M-1-${randValue}`;

            for (let idx = 0; idx < 30; idx++) {
                if (M1[idx].name == wallName) {
                    if (M1[idx].full) {
                        console.log(`Wall ${wallName} is full`);
                    }
                    else {
                        // userIndex = params.userIndex || 0;
                        userIndex = Math.floor(Math.random() * 6);
                        const lightColor = appUser[userIndex].color;
                        let wallSide = 'front';
                        if (loadingMode == 'putToLight') wallSide = 'front';
                        else if (loadingMode == 'pickToLight') wallSide = 'back';
                        const lightApi = {
                            name: 'mergeWall/lightOn',
                            clientId: 'demo_server',
                            version: '1.0.0',
                            params: {
                                wall: wallName,
                                lightColor: lightColor,
                                side: wallSide
                            },
                            date: new Date().toISOString(),
                            key: generateCheck(5)
                        }
                        socket.emit('mergeWall/lightOn', lightApi);
                        console.log('socket emit', lightApi);
                    }
                }
            }
        }
        else if (scanValue.length == 3) {
            let wallSide = 'front';
            if (loadingMode == 'putToLight') wallSide = 'front';
            else if (loadingMode == 'pickToLight') wallSide = 'back';
            const lightApi = {
                name: 'mergeWall/lightOff',
                clientId: 'demo_server',
                version: '1.0.0',
                params: {
                    wall: params.value,
                    lightColor: appUser[userIndex].color,
                    side: wallSide
                },
                date: new Date().toISOString(),
                key: generateCheck(5)
            }
            socket.emit('mergeWall/lightOff', lightApi);
            console.log('socket emit', lightApi);

            for (let idx = 0; idx < 30; idx++) {
                if (M1[idx].name == params.value) {
                    if (M1[idx].loadingMode == 'put') {
                        M1[idx].count++;
                    } else if (M1[idx].loadingMode == 'pick') {
                        M1[idx].loadingMode = 'put';
                    } else { }
                    console.log(`Wall ${M1[idx].name} has ${M1[idx].count} totes`);
                    M1[idx].full = false;
                    if (M1[idx].count >= M1[idx].max) {
                        const lightApi = {
                            name: 'mergeWall/lightOn',
                            clientId: 'demo_server',
                            version: '1.0.0',
                            params: {
                                wall: params.value,
                                lightColor: 'ffffff',
                                side: 'back'
                            },
                            date: new Date().toISOString(),
                            key: generateCheck(5)
                        }
                        setTimeout(() => {
                            socket.emit('mergeWall/lightOn', lightApi);
                        }, 1000);
                        M1[idx].count = 0;
                        M1[idx].full = true;
                        M1[idx].loadingMode = 'pick';
                    }
                }
            }
        }

    });


    console.log('New client connected', socket.conn.remoteAddress);
    listenSocket = socket;
    //      HANDLE EVENT FROM USER
    //      ONLY FOR TESTING
    socket.on('user:clearInterval', function (key) {
        console.log('User request!');
        io.emit('clearInterval', key);
    });
    socket.on('user:db:clear', function (collectionName, query) {
        console.log('User request!');
        io.emit('db:clear', collectionName, query);
    });
    socket.on('user:command', function (d) {
        const tempStr = d.split('.')
        const tempName = tempStr[0];
        const tempWall = tempStr[1] + '-' + tempStr[2] + '-' + tempStr[3];
        const tempSide = tempStr[4];
        if (tempStr[1] == 'M' && tempStr[2] >= 1 && tempStr[2] <= 4 && tempStr[3] >= 1 && tempStr[3] <= 30) {
            let lightApi = {
                name: tempName,
                clientId: 'demo_server',
                version: '0.0.1',
                params: {
                    wall: tempWall,
                    side: tempSide
                },
                date: Date.now(),
                key: generateCheck(6)
            }
            io.emit(tempName, lightApi);
            console.log('Sent to client', d);
        }
    });

    ///////////////////////////////

    //  HANDLE EVENT FROM WALL CONTROLLER__________________________________________________________________

    socket.on('wallControllerStart', function (startApi) {
        console.log('wallControllerStart', startApi);
    });

    socket.on('mergeWall/scanTotePutToLight', function (scanApi) {
        console.log('scanTotePushToWall', scanApi);
        // if (enableSendConfirm)
        //     socket.emit('confirmWall', generateConfirmApi(scanApi.key));
        if (scanApi.params.tote == 'M-6022') {
            socket.emit('mergeWall/error', { err: 'NOT_TO_THIS_WALL' });
        }
        else if (testEnabled) {
            let wallName = returnWall(scanApi.params.wallIndex);
            while (wall(wallName).full == true) {
                wallName = returnWall(scanApi.params.wallIndex);
            }
            // while(wallName == 'M-3-1' || wallName == 'M-3-7' || wallName =='M-3-13' || wallName == 'M-3-19' || wallName == 'M-3-25'){
            //     wallName = returnWall();
            // }

            const lightApi = {
                name: 'mergeWall/lightOn',
                clientId: 'demo_server',
                version: '1.0.0',
                params: {
                    wall: wallName,
                    lightColor: rgbFormat(RGB.rand()),
                    side: 'front'
                },
                date: new Date().toISOString(),
                key: scanApi.key
            }
            socket.emit('mergeWall/lightOn', lightApi)
        }
    });

    socket.on('mergeWall/putToLight', function (buttonApi) {
        const wallName = buttonApi.params.wall;
        console.log('pushToWall', buttonApi);
        buttonApi.name = 'mergeWall/confirmPutToLight';
        socket.emit('mergeWall/confirmPutToLight', buttonApi);
        // if (enableSendConfirm)
        //     socket.emit('confirmWall', generateConfirmApi(buttonApi.key));
        const lightOffApi = {
            name: 'lightOff',
            clientId: 'demo_server',
            version: '0.0.1',
            params: {
                wall: wallName,
                side: 'front'
            },
            date: buttonApi.date,
            key: buttonApi.key
        }
        // socket.emit('lightOff', lightOffApi);

        wall(wallName).count++;
        console.log('wall', wall(wallName).name, wall(wallName).count, wall(wallName).max)

        if (testEnabled && wall(wallName).count >= wall(wallName).max) {
            const lightApi = {
                name: 'mergeWall/lightOn',
                clientId: 'demo_server',
                version: '0.0.1',
                params: {
                    wall: wallName,
                    lightColor: 'ff0000',
                    side: 'back'
                },
                date: buttonApi.date,
                key: buttonApi.key
            }
            socket.emit('mergeWall/lightOn', lightApi);
            wall(wallName).count == 0;
            wall(wallName).max = Math.floor(Math.random() * 3);
            wall(wallName).full = true;
            //wall(wallName).count == Math.floor(Math.random() * 3) + 2;
        }
    });

    socket.on('mergeWall/pickToLight', function (buttonApi) {
        console.log('pickToLight', buttonApi);
        buttonApi.name = 'mergeWall/confirmPickToLight';
        socket.emit('mergeWall/confirmPickToLight', buttonApi);
        // if (enableSendConfirm)
        // socket.emit('confirmWall', generateConfirmApi(buttonApi.key));
    });


    //  HANDLE EVENT FROM COUNTER CONTROLLER__________________________________________________________________

    socket.on('booksCounter', function (counterApi) {
        console.log('new book-set count', counterApi);
        if (enableSendConfirm)
            socket.emit('counterConfirm', generateConfirmApi(counterApi.key));

        console.log('confirm with key', counterApi.key);
    });

    socket.on('booksCounterTest', function (counterApi) {
        console.log('test button from wall', counterApi);
        if (enableSendConfirm)
            socket.emit('counterConfirm', generateConfirmApi(counterApi.key));

        console.log('confirm with key', counterApi.key);
    })

    //  HANDLE EVENT FROM OLD CONTROLLER__________________________________________________________________
    socket.on('pressButton', function (d) {
        console.log('Button pressed', d);
        delete d.params;
        d.name = 'confirm';
        d.clientId = 'server';
        socket.emit('pressButtonFromWallConfirm', d);
    });
    //  Handle scaner from wall
    socket.on('scanner:container', function (d) {
        console.log('New container scaned: ', d);
        delete d.params;
        d.name = 'confirm';
        d.clientId = 'server';
        if (enableSendConfirm) {
            console.log('Sending confirm.');
            socket.emit('scanner:confirm', d);
        }
    });
    socket.on('scanner:wall', function (d) {
        console.log('New wall scaned: ', d);
        delete d.params;
        d.name = 'confirm';
        d.clientId = 'server';
        if (enableSendConfirm) {
            console.log('Sending confirm.');
            socket.emit('scanner:confirm', d);
        }
    });
    socket.on('scanner:unknown', function (d) {
        console.log('Unknown scaned:', d);
        delete d.params;
        d.name = 'confirm';
        d.clientId = 'server';
        if (enableSendConfirm) {
            console.log('Sending confirm.');
            socket.emit('scanner:confirm', d);
        }
    });



    socket.on('putPackageFromWall', function (d) {
        console.log(d);
    });
    socket.on('getPackageFromWall', function (d) {
        console.log(d);
    });
    //  Handle error from wall
    socket.on('lightOnError', function (d) {
        console.log(d);
    });
    socket.on('lightOffError', function (d) {
        console.log(d);
    });
    //  Handle confirm from wall
    socket.on('lightOnConfirm', function (d) {
        console.log('lightOnConfirm', d);
        //console.log(`light already on at address: ${d.params.type}:${d.params.side}`);
    });
    socket.on('lightOffConfirm', function (d) {
        console.log('lightOffConfirm', d);
        //console.log(`light already off at address: ${d.params.type}:${d.params.row}:${d.params.col}:${d.params.side}`);
    });
    socket.on('getPackageConfirm', function (d) {
        console.log(d);
        //console.log(`take package at address: ${d.params.type}:${d.params.row}:${d.params.col}`);
    });
    socket.on('putPackageConfirm', function (d) {
        console.log(d);
        //console.log(`add package at address: ${d.params.type}:${d.params.row}:${d.params.col}`);
    });
    //  Handle wallState
    socket.on('wallState', function (d) {
        console.log(d);
    });
});

/**
 * 
 * @param {*} size size of check string
 * @returns string type of an interger
 */
function generateCheck(size) {
    let val = '';
    for (let i = 0; i < size; i++) {
        val += Math.floor(Math.random() * 10);
    }
    return val;
}

/**
 * 
 * @param {*} key key of api
 * @returns object
 */
function generateConfirmApi(key) {
    let confirmApi = {};
    confirmApi.name = 'confirm from server';
    confirmApi.clientId = 'server';
    confirmApi.version = version;
    confirmApi.key = key;
    return confirmApi;
}