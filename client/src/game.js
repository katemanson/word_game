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

};

module.exports = Game;
