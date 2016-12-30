var Tile = require('../tile');
var assert = require('assert');

describe('Tile', function(){

  var testTileOne = new Tile({letter: "a"});
  var testTileTwo = new Tile({letter: "b", gridPosition: {column: 1, row: 2}, id: 20});

  it('should have a letter value', function(){
    assert.equal("a", testTileOne.letter);
  });

  it('should have initial grid position set to column 0, row 0, when not provided at setup', function(){
    assert.deepEqual({column: 0, row: 0}, testTileOne.gridPosition);
  });

  it('should have initial id set to -1, when not provided at setup', function(){
    assert.equal(-1, testTileOne.id);
  });

  it('should have a letter value, grid position and id, when provided at setup', function(){
    assert.equal("b", testTileTwo.letter);
    assert.equal(1, testTileTwo.gridPosition.column);
    assert.equal(2, testTileTwo.gridPosition.row);
    assert.equal(20, testTileTwo.id);
  });

});
