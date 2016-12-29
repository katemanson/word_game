var Tile = require('../tile');
var assert = require('assert');

describe('Tile', function(){

  var testTile = new Tile("a");

  it('should have a letter value', function(){
    assert.equal("a", testTile.letter);
  });

  it('should initially have grid position set to empty string', function(){
    assert.equal("", testTile.gridPosition);
  });

  it('should be possible to set grid position', function(){
    testTile.gridPosition = "c1r1";
    assert.equal("c1r1", testTile.gridPosition);
  });

  it('should initially have id set to -1', function(){
    assert.equal(-1, testTile.id);
  });

  it('should be possible to set id', function(){
    testTile.id = 20;
    assert.equal(20, testTile.id);
  });

});
