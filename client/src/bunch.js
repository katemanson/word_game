var Tile = require('./tile');
var shuffle = require('lodash/shuffle');

var Bunch = function(){
  this.tiles = [];
  this.makeBunch();
}

Bunch.prototype = {

  makeBunch: function(){
    var tileCounts = [
      ['a', 13],
      ['b', 3],
      ['c', 3],
      ['d', 6],
      ['e', 18],
      ['f', 3],
      ['g', 4],
      ['h', 3],
      ['i', 12],
      ['j', 2],
      ['k', 2],
      ['l', 5],
      ['m', 3],
      ['n', 8],
      ['o', 11],
      ['p', 3],
      ['q', 2],
      ['r', 9],
      ['s', 6],
      ['t', 9],
      ['u', 6],
      ['v', 3],
      ['w', 3],
      ['x', 2],
      ['y', 3],
      ['z', 2]
    ];

    //Note: tile id is the index of the tile in the this.tiles array, in its original order.
    var counter = 0;
    for (var i = 0; i < tileCounts.length; i++){
      var letter = tileCounts[i][0];
      for (var j = 0; j < tileCounts[i][1]; j++){
        var tile = new Tile(letter);
        tile.id = counter;
        this.tiles.push(tile);
        counter++;
      }
    }
  },

  shuffle: function(){
    this.tiles = shuffle(this.tiles);
  },

  takeRandomTile: function(){
    var randomIndex = Math.floor(Math.random() * this.tiles.length);
    var randomTile = this.tiles[randomIndex];
    console.log('randomTile object', randomTile);
    console.log('randomTile.id', randomTile.id);
    this.tiles.splice(randomIndex, 1);
    return randomTile;
  },

  takeHand: function(handSize){
    var hand = [];
    for (var i = 0; i < handSize; i++){
      var randomTile = this.takeRandomTile();
      hand.push(randomTile);
    }
    return hand;
  }
}

module.exports = Bunch;
