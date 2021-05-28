const walls = require("./wall");

let wallControlMessage = {
    command: '',
    convertWallId: function(row, col, side){
        let wallObj = {wall:1, row:1, col:1, num:1};
        wallObj.row = row;
        if(col <= 6){
            wallObj.wall = 1;
            wallObj.col = col;
        }
        else if(col > 6 && col <= 12){
            wallObj.wall = 2;
            wallObj.col = col - 6;
        }
        else{
            wallObj.wall = 3,
            wallObj.col = col - 12;
        }
        if(wallObj.col < 10)col = '0' + col;
        if(side == 'front'){
            wallObj.num = 1;
            wallObj.col = '01';
        }
        else if(side == 'back'){
            wallObj.num = 2;
            wallObj.col = '02';
        }
        return wallObj;
    },
    generateMess: function(wall, col, row, num, cmdName){
        if(wall < 10)wall = '0' + wall;
        switch(cmdName){
            case 'saveConnection':
                cmd = `CON${wall}/` + '\r';
                break;
            case 'confirm':
                cmd = `YES${wall}/` + '\r';
                break;
            case 'lightOn':
                cmd = `ON${wall}:${row}:${col}:${num}/` + '\r';
                break;
            case 'lightOff':
                cmd = `OF${wall}:${row}:${col}:${num}/` + '\r';
                break;
            case 'putPackage':
                if(num < 10)num = '0' + num;
                cmd = `PUT${wall}:${row}:${col}:${num}/` + '\r';
                break;
            case 'getPackage':
                if(num < 10)num = '0' + num;
                cmd = `GET${wall}:${row}:${col}:${num}/` + '\r';
                break;
            default:
                console.log('cannot generate message to wall controller');
                cmd = 'error_cmd';
                break;
        }
        this.command = cmd;
        return cmd;
    }
};
module.exports = wallControlMessage;