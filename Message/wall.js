const walls = [];
const numOfWall = 16;
const createNewWall = function(Id){
    let newWall = new Object;
    newWall.wallId = Id;
    newWall.type = null;
    newWall.socket = null;
    newWall.connected = false;
    return newWall;
};
for(let i = 0; i < numOfWall; i++){
    walls.push(createNewWall(i + 1));
};
//console.log(walls);
module.exports = walls;