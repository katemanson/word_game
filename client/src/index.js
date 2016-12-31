// var Grid = require('./grid');
var Game = require('./game');
var Player = require('./player');
var Tile = require('./tile');
var TileBank = require('./tile_bank');

window.onload = function(){

  var game = new Game();
  var player = new Player("Vyvyan");
  game.addPlayer(player);
  game.dealHand(21);

  var gridIdToTilePosition = function(gridSquareId){
    var columnNumber = Number(gridSquareId.split(",")[0]);
    var rowNumber = Number(gridSquareId.split(",")[1]);
    var tilePosition = {column: columnNumber, row: rowNumber};
    return tilePosition;
  }

  var dragStartHandler = function(event){
    event.dataTransfer.setData("text", event.target.id);
  }

  var dragOverHandler = function(event){
    if (event.target.tagName !== "CANVAS" && event.target.childElementCount === 0){
      event.preventDefault();
    }
  }

  var dropHandler = function(event){
    if (event.target.tagName !== "CANVAS" && event.target.childElementCount === 0){
      event.preventDefault();
      var data = event.dataTransfer.getData("text");
      var tileCopyObject = JSON.parse(data);
      tileCopyObject.gridPosition = gridIdToTilePosition(event.target.id);
      //? Bit weird: the console log immediately below gives the element id updated
      //with the new grid position (but this update doesn't happen 'til later on in the method).
      //Is this to do with JS asynchronous-ness?
      // console.log('document.getElementById(data)', document.getElementById(data));
      var draggedCanvas = document.getElementById(data);

      player.updateTilePosition(tileCopyObject.id, tileCopyObject.gridPosition);
      event.target.appendChild(draggedCanvas);
      draggedCanvas.id = JSON.stringify(tileCopyObject);
    }
  }

  var makeGrid = function(){
    var scroller = document.scrollingElement;
    var scrollWidth = scroller.scrollWidth;
    var scrollHeight = scroller.scrollHeight;
    var numberColumns = Math.ceil(scrollWidth/49);
    var numberRows = Math.ceil(scrollHeight/49);
    var grid = document.getElementById('grid');

    for (var i = 1; i <= numberRows; i++){
      var row = document.createElement('tr');
      grid.appendChild(row);

      for (var j = 1; j <= numberColumns; j++){
        var square = document.createElement('td');
        square.id = j + "," + i;
        square.ondragover = dragOverHandler;
        square.ondrop = dropHandler;
        row.appendChild(square);
      }
    }
    // console.log('scroller.scrollWidth', scroller.scrollWidth);
    // console.log('window.innerWidth', window.innerWidth);
    // console.log('scroller.scrollWidth - window.innerWidth', scroller.scrollWidth - window.innerWidth);
    // console.log('scroller.scrollLeft', scroller.scrollLeft);

    //ToDo: scrollGrid function to make infinite scrolling grid.
    // this.scrollGrid(scroller, grid, i, j);
  }

  //ToDo: scrollGrid function to make infinite scrolling grid.
  // var scrollGrid = function(scroller, grid, i, j){
  //   if (scroller.scrollWidth - window.innerWidth >= scroller.scrollLeft){
  //     // console.log('in scrollGrid if statement');
  //   }
  // }

  var showHand = function(){
    //ToDo: Below assumes there will be at least as many grid squares in
    //the first row as there are tiles in the hand; when that's the case it
    //throws an error and stops adding tiles to the grid.
    for (var i = 0; i < player.hand.length; i++){
      var gridSquare = document.getElementById('grid').children[0].children[i];
      var canvas = document.createElement('canvas');
      var tile = player.hand[i];
      //Note: the line below (?seems to?) update the tile grid position both in the
      //tile variable and in the player's hand.
      tile.gridPosition = gridIdToTilePosition(gridSquare.id);
      var tileJSON = JSON.stringify(tile);
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

  makeGrid();
  showHand();

}
