var Tile = require('./tile');
var Bunch = require('./bunch');
var Grid = require('./grid');

window.onload = function(){

  var grid = new Grid();
  var bunch = new Bunch();
  bunch.shuffle();
  var hand = bunch.takeHand(21);

  var dragStartHandler = function(event){
    event.dataTransfer.setData("text", event.target.id);
    event.target.opacity = 0.5;
  }

  //ToDo: Below assumes there will be at least as many grid squares in
  //the first row as there are tiles in the hand; when that's the case it
  //throws an error and stops adding tiles to the grid.
  for (var i = 0; i < hand.length; i++){
    var gridSquare = document.getElementById('grid').children[0].children[i];
    var canvas = document.createElement('canvas');
    var tile = hand[i];
    var tileJSON = JSON.stringify(hand[i]);
    var context = canvas.getContext('2d');

    canvas.id = tileJSON;
    canvas.draggable = true;
    canvas.width = 45;
    canvas.height = 45;
    canvas.ondragstart = dragStartHandler;
    gridSquare.appendChild(canvas);
    tile.draw(context);
  }

}
