// var Grid = require('./grid');
var find = require('lodash/find');

var Player = function(name){
  this.name = name;
  this.hand = [];
  // this.grid = new Grid();
  this.words = [];
}

Player.prototype = {

  getTile: function(tile){
    this.hand.push(tile);
  },

  getTiles: function(tileArray){
    this.hand = this.hand.concat(tileArray);
  },

  findTileById: function(id){
    return this.hand.find(function(tile){
      return tile.id === id;
    });
  },

  findTileIndexById: function(id){
    return this.hand.findIndex(function(tile){
        return tile.id === id;
    });
  },

  updateTilePosition: function(tileId, newPosition){
    var tileIndex = this.findTileIndexById(tileId);
    this.hand[tileIndex].gridPosition = newPosition;
  }
}

module.exports = Player;
