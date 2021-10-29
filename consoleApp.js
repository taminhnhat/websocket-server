
const wallMess = require('./Message/wallMessage');
const io = require('socket.io')();
const version = '0.0.1';

const testEnabled = true;

let listenSocket = null;
let enableSendConfirm = true;

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
        clientId: "server",
        version: "0.0.1",
        params: {}
    };
    lightObj.name = name;
    lightObj.params.wall = type;
    lightObj.params.side = side;
    lightObj.key = generateCheck(5);
    return {
        name: '',
        clientId: "server",
        version: "0.0.1",
        params: {
            wall: type,
            side: side
        }
    }
};

let generateConfirmCmd = function (name, wall, row, col, state) {
    let confirmObj = {
        "name": '',
        "clientId": "server",
        "version": "0.0.1",
        "params": {}

    };
    confirmObj.name = name, name;
    confirmObj.params.wall = wall;
    confirmObj.params.column = col;
    confirmObj.params.row = row;
    confirmObj.params.state = state;
    return confirmObj;
};

const returnWall = function () {
    const row = Math.floor(Math.random() * 30) + 1;
    const wallName = 'M-1-' + row;
    if (wall(wallName).full) return returnWall();
    else return wallName;
}

let M1 = { name: 'M-1-1', count: 0, max: 2, full: false };
let M2 = { name: 'M-1-2', count: 0, max: 3, full: false };
let M4 = { name: 'M-1-3', count: 0, max: 2, full: false };
let M5 = { name: 'M-1-4', count: 0, max: 3, full: false };
let M6 = { name: 'M-1-5', count: 0, max: 2, full: false };
let M7 = { name: 'M-1-6', count: 0, max: 3, full: false };
let M8 = { name: 'M-1-7', count: 0, max: 2, full: false };
let M9 = { name: 'M-1-8', count: 0, max: 3, full: false };
let M10 = { name: 'M-1-9', count: 0, max: 2, full: false };
let M11 = { name: 'M-1-10', count: 0, max: 3, full: false };
let M12 = { name: 'M-1-11', count: 0, max: 2, full: false };
let M13 = { name: 'M-1-12', count: 0, max: 3, full: false };
let M14 = { name: 'M-1-13', count: 0, max: 2, full: false };
let M15 = { name: 'M-1-14', count: 0, max: 3, full: false };
let M16 = { name: 'M-1-15', count: 0, max: 2, full: false };
let M17 = { name: 'M-1-16', count: 0, max: 3, full: false };
let M18 = { name: 'M-1-17', count: 0, max: 2, full: false };
let M19 = { name: 'M-1-18', count: 0, max: 3, full: false };
let M20 = { name: 'M-1-19', count: 0, max: 2, full: false };
let M21 = { name: 'M-1-20', count: 0, max: 3, full: false };
let M22 = { name: 'M-1-21', count: 0, max: 2, full: false };
let M23 = { name: 'M-1-22', count: 0, max: 3, full: false };
let M24 = { name: 'M-1-23', count: 0, max: 2, full: false };
let M25 = { name: 'M-1-24', count: 0, max: 3, full: false };
let M26 = { name: 'M-1-25', count: 0, max: 2, full: false };
let M27 = { name: 'M-1-26', count: 0, max: 3, full: false };
let M28 = { name: 'M-1-27', count: 0, max: 2, full: false };
let M29 = { name: 'M-1-28', count: 0, max: 3, full: false };
let M30 = { name: 'M-1-29', count: 0, max: 2, full: false };
let M31 = { name: 'M-1-30', count: 0, max: 3, full: false };

const M = [M1, M2, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15, M16, M17, M18, M19, M20, M21, M22, M23, M24, M25, M26, M27, M28, M29, M30, M31]

const wall = function (name) {
    for (i in M) {
        if (M[i].name == name) return M[i]
    }
}

console.log('Start listening')
io.listen(3000);
io.on('connection', function (socket) {
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
                clientId: "server",
                version: "0.0.1",
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

        if (testEnabled) {
            let wallName = returnWall();
            while (wall(wallName).full == true) {
                wallName = returnWall();
            }
            // while(wallName == 'M-1-1' || wallName == 'M-1-7' || wallName =='M-1-13' || wallName == 'M-1-19' || wallName == 'M-1-25'){
            //     wallName = returnWall();
            // }
            const lightApi = {
                name: 'mergeWall/lightOn',
                clientId: "Server",
                version: "1.0.0",
                params: {
                    wall: wallName,
                    side: 'front'
                },
                date: new Date().toISOString(),
                key: scanApi.key
            }
            io.emit('mergeWall/lightOn', lightApi)
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
            clientId: "server",
            version: "0.0.1",
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
                clientId: "server",
                version: "0.0.1",
                params: {
                    wall: wallName,
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
        socket.emit("pressButtonFromWallConfirm", d);
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



    socket.on("putPackageFromWall", function (d) {
        console.log(d);
    });
    socket.on("getPackageFromWall", function (d) {
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