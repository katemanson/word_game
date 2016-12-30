var Tile = require('../tile');
var assert = require('assert');

describe('Tile', function(){

  var testTileOne = new Tile({letter: "a"});
  var testTileTwo = new Tile({letter: "b", gridPosition: "c0r0", id: 20});

  it('should have a letter value', function(){
    assert.equal("a", testTileOne.letter);
  });

  it('should have initial grid position set to empty string, when not provided at setup', function(){
    assert.equal("", testTileOne.gridPosition);
  });

  it('should have initial id set to -1, when not provided at setup', function(){
    assert.equal(-1, testTileOne.id);
  });

  it('should have a letter value, grid position and id, when provided at setup', function(){
    assert.equal("b", testTileTwo.letter);
    assert.equal("c0r0", testTileTwo.gridPosition);
    assert.equal(20, testTileTwo.id);
  });

});
