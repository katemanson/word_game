// var GridView = require('./grid_view');
var Game = require('./game');
var Player = require('./player');
var Tile = require('./tile');
var TileBank = require('./tile_bank');

window.onload = function(){

  // var grid = new GridView();
  var game = new Game();
  var player = new Player("Vyvyan");
  game.addPlayer(player);
  game.dealHand(1);

  var gridIdToTilePosition = function(gridSquareId){
    var columnNumber = Number(gridSquareId.split(",")[0]);
    var rowNumber = Number(gridSquareId.split(",")[1]);
    var tilePosition = {column: columnNumber, row: rowNumber};
    return tilePosition;
  }

  var dragStartHandler = function(event){
    event.dataTransfer.setData("text", event.target.id);
    console.log('tile drag start');
  }

  var gridDragOverHandler = function(event){
    if (event.target.tagName !== "CANVAS" && event.target.childElementCount === 0){
      event.preventDefault();
    }
  }

  var swapDragOverHandler = function(event){
    event.preventDefault();
  }

  var swapDropHandler = function(event){
    event.preventDefault();

    var data = event.dataTransfer.getData("text");
    var draggedCanvas = document.getElementById(data);
    var tile = JSON.parse(data);
    console.log('tile to be swapped:', tile);

    draggedCanvas.parentNode.removeChild(draggedCanvas);
    var tilesReturned = game.swapTile(player, tile, 3);
    console.log('tiles returned by swap:', tilesReturned);
    console.log('player hand after swap:', player.hand);

    var swapZone = document.getElementById('swap-zone');
    var tileSpace = document.getElementById('placeholder-tile-space');
    swapZone.removeChild(tileSpace);
    for (var i = 0; i < tilesReturned.length; i++){
      var newTileSpace = document.createElement('p');
      newTileSpace.setAttribute("class", "tile-space");
      swapZone.appendChild(newTileSpace);
      var canvas = document.createElement('canvas');
      newTileSpace.appendChild(canvas);
      //append canvas to a tile space in swap zone
      var tile = tilesReturned[i];
      var tileJSON = JSON.stringify(tile);
      var context = canvas.getContext('2d');

      canvas.id = tileJSON;
      canvas.draggable = true;
      canvas.width = 45;
      canvas.height = 45;
      canvas.ondragstart = dragStartHandler;
      tile.draw(context);
    }
  }

  var gridDropHandler = function(event){
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
      console.log('player.hand after grid drop:', player.hand);
      console.log('canvas id after grid drop:', draggedCanvas.id);
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
        square.ondragover = gridDragOverHandler;
        square.ondrop = gridDropHandler;
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

  var checkWords = function(word){
    //url adds 'entries/en/' and word to base url; needed to retrieve dictionary
    //entry for the word
    //word parameter needs to be in form of api's 'word_id' (see
    //https://developer.oxforddictionaries.com/documentation/making-requests-to-the-api)
    //-- this means a url-encoded string, lower case (also any spaces replaced
    //with underscores - although words queried here won't include spaces)
    var url = 'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + word;
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.setRequestHeader("Accept","application/json");
    request.setRequestHeader("app_id","3fb114a3");
    request.setRequestHeader("app_key","b6574f7d1ba83ba2414f233f465e4d06");
    request.onload = function(){
      console.log(request.status);
      if (request.status === 200){
        var wordEntry = JSON.parse(request.responseText);
        console.log('word entry from api:', wordEntry);
      }
    }
    request.send(null);
  }

  makeGrid();
  showHand();
  checkWords("lenticular");

  //ToDo: Where should this bit go?
  var swapZone = document.getElementById('swap-zone');
  swapZone.ondragover = swapDragOverHandler;
  swapZone.ondrop = swapDropHandler;
}
