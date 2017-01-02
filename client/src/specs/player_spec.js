var Player = require('../player');
var Tile = require('../tile');
var assert = require('assert');

describe('Player', function(){

  var testPlayer = new Player({name: "Fred"});
  var testTileOne = new Tile({letter: "a"});
  var testTileArray = [
    new Tile({letter: "b", id: 1}),
    new Tile({letter: "c", id: 2}),
    new Tile({letter: "d", id: 3}),
    new Tile({letter: "e", id: 4})
  ];
  var testTileArrayTwo = [
    new Tile({letter: "f", gridPosition: {column: 3, row: 5}, id: 1}),
    new Tile({letter: "i", gridPosition: {column: 3, row: 6}, id: 2}),
    new Tile({letter: "r", gridPosition: {column: 3, row: 7}, id: 3}),
    new Tile({letter: "o", gridPosition: {column: 4, row: 7}, id: 4}),
    new Tile({letter: "c", gridPosition: {column: 4, row: 9}, id: 5}),
    new Tile({letter: "e", gridPosition: {column: 5, row: 5}, id: 6}),
    new Tile({letter: "u", gridPosition: {column: 5, row: 7}, id: 7}),
    new Tile({letter: "g", gridPosition: {column: 6, row: 7}, id: 8}),
    new Tile({letter: "h", gridPosition: {column: 5, row: 9}, id: 9}),
    new Tile({letter: "i", gridPosition: {column: 5, row: 10}, id: 10}),
    new Tile({letter: "i", gridPosition: {column: 6, row: 9}, id: 11}),
    new Tile({letter: "e", gridPosition: {column: 7, row: 5}, id: 12}),
    new Tile({letter: "x", gridPosition: {column: 6, row: 5}, id: 13}),
    new Tile({letter: "r", gridPosition: {column: 8, row: 5}, id: 14}),
    new Tile({letter: "t", gridPosition: {column: 9, row: 5}, id: 15}),
    new Tile({letter: "o", gridPosition: {column: 9, row: 6}, id: 16}),
    new Tile({letter: "r", gridPosition: {column: 7, row: 4}, id: 17}),
    new Tile({letter: "v", gridPosition: {column: 7, row: 6}, id: 18}),
    new Tile({letter: "e", gridPosition: {column: 7, row: 7}, id: 19}),
    new Tile({letter: "r", gridPosition: {column: 7, row: 8}, id: 20}),
    new Tile({letter: "t", gridPosition: {column: 7, row: 9}, id: 21})
  ]

  beforeEach(function(){
    testPlayer.hand = [];
  })

  it('should have a name', function(){
    assert.equal("Fred", testPlayer.name);
  });

  it('should start with no id', function(){
    assert.equal("", testPlayer.id);
  });

  it('should start with an empty hand', function(){
    assert.equal(0, testPlayer.hand.length);
  });

  it('should start with no words', function(){
    assert.equal(0, testPlayer.words.length);
  });

  it('should be possible to add a tile to hand', function(){
    testPlayer.getTile(testTileOne);
    assert.equal(1, testPlayer.hand.length);
    assert.equal(true, testPlayer.hand[0] instanceof Tile);
    assert.equal("a", testPlayer.hand[0].letter);
  });

  it('should be possible to add multiple tiles to hand', function(){
    testPlayer.getTile(testTileOne);
    assert.equal(1, testPlayer.hand.length);
    testPlayer.getTiles(testTileArray);
    assert.equal(5, testPlayer.hand.length);
  });

  it('should be possible to find a tile in hand using the tile id', function(){
    testPlayer.getTiles(testTileArray);
    assert.equal("d", testPlayer.findTileById(3).letter);
    assert.equal(4, testPlayer.hand.length);
  });

  it('should be possible to find a tile index in hand using the tile id', function(){
    testPlayer.getTiles(testTileArray);
    assert.equal(2, testPlayer.findTileIndexById(3));
    assert.equal(4, testPlayer.hand.length);
  });

  it('should be possible to update grid position of tile in hand', function(){
    testPlayer.getTiles(testTileArray);
    testPlayer.updateTilePosition(3, {column: 2, row: 3});
    assert.deepEqual({column: 2, row: 3}, testPlayer.hand[2].gridPosition);
    assert.equal(4, testPlayer.hand.length);
  });

  it('should be possible to identify words based on grid positions of tiles', function(){
    testPlayer.getTiles(testTileArrayTwo);
    testPlayer.getWords();
    assert.equal(7, testPlayer.words.length);
  });

  it('should be possible to remove a tile from hand', function(){
    testPlayer.getTiles(testTileArray);
    testPlayer.removeTile(testTileArray[2]);
    assert.equal(3, testPlayer.hand.length);
  });

});
