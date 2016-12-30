var Game = require('../game');
var Player = require('../player');
var TileBank = require('../tile_bank');
var Tile = require('../tile');
var assert = require('assert');
var shuffle = require('lodash/shuffle');

describe('Game', function(){

  var testGame = new Game();
  var testPlayerOne = new Player("Rick");
  var testPlayerTwo = new Player("Mike");
  var testPlayerThree = new Player("Neil");
  var testPlayerFour = new Player("Vyvyan");

  beforeEach(function(){
    testGame.players = [];
    testGame.tileBank = new TileBank();
  });

  it('should start with no players', function(){
    assert.equal(0, testGame.players.length);
  });

  it('should start with a bank of 144 tiles', function(){
    assert.equal(144, testGame.tileBank.tiles.length);
    assert.equal(true, testGame.tileBank.tiles[0] instanceof Tile);
  });

  it('should be possible to add a player', function(){
    testGame.addPlayer(testPlayerOne);
    assert.equal(true, testGame.players[0] instanceof Player);
    assert.equal(1, testGame.players.length);
    testGame.addPlayer(testPlayerTwo);
    testGame.addPlayer(testPlayerThree);
    testGame.addPlayer(testPlayerFour);
    assert.equal(4, testGame.players.length);
  });

  it('should be possible to add multiple players', function(){
    var players = [testPlayerTwo, testPlayerThree, testPlayerFour];
    testGame.addPlayer(testPlayerOne);
    assert.equal(1, testGame.players.length);
    testGame.addPlayers(players);
    assert.equal(4, testGame.players.length);
  });

  it('should be possible to take a tile, removing it from bank', function(){
    testGame.shuffleTiles();
    var tile = testGame.takeRandomTile();
    assert.equal(143, testGame.tileBank.tiles.length);
    assert.equal(true, tile instanceof Tile);
  });

  it('should be possible to deal a hand of specified size', function(){
    var players = [testPlayerOne, testPlayerTwo, testPlayerThree, testPlayerFour];
    testGame.addPlayers(players);
    testGame.shuffleTiles();
    testGame.dealHand(21);
    assert.equal(21, testPlayerOne.hand.length);
    assert.equal(true, testPlayerOne.hand[0] instanceof Tile);
    assert.equal(21, testPlayerTwo.hand.length);
    assert.equal(21, testPlayerThree.hand.length);
    assert.equal(21, testPlayerFour.hand.length);
    assert.equal(60, testGame.tileBank.tiles.length);
  });


});
