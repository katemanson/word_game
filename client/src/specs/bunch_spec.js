var Bunch = require('../bunch');
var Tile = require('../tile');
var assert = require('assert');

describe('Bunch', function(){

  var testBunch = new Bunch;

  beforeEach(function(){
    testBunch = new Bunch();
  });

  it('should contain 144 tiles', function(){
    assert.equal(144, testBunch.tiles.length);
  });

  it('should be possible to take a tile, removing it from bunch', function(){
    testBunch.shuffle();
    var tile = testBunch.takeRandomTile();
    assert.equal(143, testBunch.tiles.length);
    assert.equal(true, tile instanceof Tile);
  });

  it('should be possible to take a hand of tiles of specified size', function(){
    testBunch.shuffle();
    assert.equal(144, testBunch.tiles.length);
    var hand = testBunch.takeHand(21);
    assert.equal(21, hand.length);
    assert.equal(123, testBunch.tiles.length);
    assert.equal(true, hand[0] instanceof Tile);
  });


});
