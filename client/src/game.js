var Player = require('./player');
var TileBank = require('./tile_bank');
var Tile = require('./tile');
var shuffle = require('lodash/shuffle');

var Game = function(){
  this.players = [];
  this.tileBank = new TileBank();
}

Game.prototype = {

  addPlayer: function(player){
    this.players.push(player);
  },

  //Note: parameter 'players' expected to be an array of player objects.
  addPlayers: function(players){
    this.players = this.players.concat(players);
  },

  shuffleTiles: function(){
    this.tileBank.tiles = shuffle(this.tileBank.tiles);
  },

  takeRandomTile: function(){
    var randomIndex = Math.floor(Math.random() * this.tileBank.tiles.length);
    var randomTile = this.tileBank.tiles[randomIndex];
    this.tileBank.tiles.splice(randomIndex, 1);
    return randomTile;
  },

  dealHand: function(handSize){
    for (player of this.players){
      for (var i = 0; i < handSize; i++){
        var randomTile = this.takeRandomTile();
        player.getTile(randomTile);
      }
    }
  },

  addTileToBank: function(tile){
    this.tileBank.tiles.push(tile);
  },

  swapTile: function(player, tileToBeSwapped, numberOfTilesToGiveBack){
    player.removeTile(tileToBeSwapped);
    var tilesReturned = [];
    for (var i = 0; i < numberOfTilesToGiveBack; i++){
      var randomTile = this.takeRandomTile();
      player.getTile(randomTile);
      tilesReturned.push(randomTile);
    }
    if (tileToBeSwapped.gridPosition){
      tileToBeSwapped.gridPosition = {column: 0, row: 0};
    }
    this.addTileToBank(tileToBeSwapped);
    return tilesReturned;
  },

  twist: function(playerTwisting, numberOfTilesToDeal){
    for (player of this.players){
      for (var i = 0; i < numberOfTilesToDeal; i++){
        var randomTile = this.takeRandomTile();
        player.getTile(randomTile);
      }
    }
    //ToDo: include check for hand used up (no gaps, lone tiles)
    // if(playerTwisting.checkHandUsedUp()){
    //
    // } else {
    //   //query twist with player
    // }
  }

};

module.exports = Game;
