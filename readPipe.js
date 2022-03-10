const fs = require('fs');
const { spawn, fork } = require('child_process');

const event = require('./event');

const read_pipe_path = '/tmp/emit_light';
let readfifo = spawn('mkfifo', [read_pipe_path]);

readfifo.on('exit', function (status) {
    console.log('pipe opened');
    const fileHandle = fs.openSync(read_pipe_path, 'r+');
    let fifoRs = fs.createReadStream(null, { fd: fileHandle });

    // Handle Reading pipe event
    fifoRs.on('data', data => {
        const mess = String(data).trim();
        console.log(mess);
        event.emit('user:turnLight', mess);
    });

    fifoRs.on('ready', function (err) {
        logger.debug({ message: 'Reading pipe is ready', location: FILE_NAME });
    });

    fifoRs.on('open', function (err) {
        logger.debug({ message: 'Reading pipe opened', location: FILE_NAME });
    });

    fifoRs.on('close', function (err) {
        logger.debug({ message: 'Reading pipe closed', location: FILE_NAME });
    });
});
