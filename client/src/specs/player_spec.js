var Player = require('../player');
var assert = require('assert');

describe('Player', function(){

  var testPlayer = new Player("Fred");

  it('should have a name', function(){
    assert.equal("Fred", testPlayer.name);
  });

  it('should start with an empty hand', function(){
    assert.equal(0, testPlayer.hand.length);
  });

  it('should start with no words', function(){
    assert.equal(0, testPlayer.words.length);
  });

});
