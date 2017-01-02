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
  var testTile = new Tile({letter: "a"});
  var testTileArray = [
    new Tile({letter: "a", id: 1}),
    new Tile({letter: "b", id: 2}),
    new Tile({letter: "c", id: 3}),
    new Tile({letter: "d", id: 4})
  ];

  beforeEach(function(){
    testGame.players = [];
    testGame.tileBank = new TileBank();
    testPlayerOne.hand = [];
    testPlayerTwo.hand = [];
    testPlayerThree.hand = [];
    testPlayerFour.hand = [];
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

  it('should be possible to add a tile to the bank', function(){
    testGame.addTileToBank(testTile);
    assert.equal(145, testGame.tileBank.tiles.length);
    assert.deepEqual(testTile, testGame.tileBank.tiles[testGame.tileBank.tiles.length - 1]);
  });

  it("should return a player's swapped tile to bank and deal three new tiles to that player", function(){
    testGame.addPlayer(testPlayerOne);
    testPlayerOne.hand = [];
    testPlayerOne.getTiles(testTileArray);
    assert.equal(4, testPlayerOne.hand.length);
    testGame.swapTile(testPlayerOne, testPlayerOne.hand[0], 3);
    assert.equal(6, testPlayerOne.hand.length);
    assert.equal(142, testGame.tileBank.tiles.length);
  });

  it('should be possible for a player to twist so that all players get a new tile', function(){
    var players = [testPlayerOne, testPlayerTwo, testPlayerThree, testPlayerFour];
    testGame.addPlayers(players);
    testGame.shuffleTiles();
    testGame.dealHand(3);
    assert.equal(3, testPlayerOne.hand.length);
    assert.equal(3, testPlayerTwo.hand.length);
    assert.equal(3, testPlayerThree.hand.length);
    assert.equal(3, testPlayerFour.hand.length);
    assert.equal(132, testGame.tileBank.tiles.length);
    testGame.twist(testPlayerThree, 1);
    assert.equal(4, testPlayerOne.hand.length);
    assert.equal(4, testPlayerTwo.hand.length);
    assert.equal(4, testPlayerThree.hand.length);
    assert.equal(4, testPlayerFour.hand.length);
    assert.equal(128, testGame.tileBank.tiles.length);
  });

});
