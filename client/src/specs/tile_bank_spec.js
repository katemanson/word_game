var TileBank = require('../tile_bank');
var Tile = require('../tile');
var assert = require('assert');

describe('TileBank', function(){

  var testTileBank = new TileBank;

  beforeEach(function(){
    testTileBank = new TileBank();
  });

  it('should contain 144 tiles', function(){
    assert.equal(144, testTileBank.tiles.length);
    assert.equal(true, testTileBank.tiles[0] instanceof Tile);
  });

});
