var Player = require('../player');
var Tile = require('../tile');
var assert = require('assert');

describe('Player', function(){

  var testPlayer = new Player("Fred");
  var testTileOne = new Tile({letter: "a"});
  var testTileArray = [
    new Tile({letter: "b", id: 1}),
    new Tile({letter: "c", id: 2}),
    new Tile({letter: "d", id: 3}),
    new Tile({letter: "e", id: 4})
  ];

  beforeEach(function(){
    testPlayer.hand = [];
  })

  it('should have a name', function(){
    assert.equal("Fred", testPlayer.name);
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
    testPlayer.updateTilePosition(3, "c1r1");
    assert.equal("c1r1", testPlayer.hand[2].gridPosition);
    assert.equal(4, testPlayer.hand.length);
  });

});
