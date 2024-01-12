const _ = require('lodash');

const allShips = {
    destroyer: {
        name: "destroyer",
        length: 2,
        position: [],
        hits: 0
    },
    submarine: {
        name: "submarine",
        length: 3,
        position: [],
        hits: 0
    },
    cruiser: {
        name: "cruiser",
        length: 3,
        position: [],
        hits: 0
    },
    battleship: {
        name: "battleship",
        length: 4,
        position: [],
        hits: 0
    },
    carrier: {
        name: "carrier",
        length: 5,
        position: [],
        hits: 0
    }
};

 const ships = _.cloneDeep(allShips);
 const compShips = _.cloneDeep(allShips);

 const compShipNames = Object.keys(compShips);
 const shipNames = Object.keys(ships);




module.exports = {
    allShips,
    ships,
    compShips,
    compShipNames,
    shipNames
};