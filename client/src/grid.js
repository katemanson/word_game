var Grid = function(){
  this.makeGrid();
}

Grid.prototype = {

  dragOverHandler: function(event){
    if (event.target.tagName !== "CANVAS" && event.target.childElementCount === 0){
      event.preventDefault();
    }
  },

  dropHandler: function(event){
    if (event.target.tagName !== "CANVAS" && event.target.childElementCount === 0){
      event.preventDefault();
      var data = event.dataTransfer.getData("text");
      var tile = JSON.parse(data);
      tile.gridPosition = event.target.id;
      //? Bit weird: the console log immediately below gives the element id updated
      //with the new grid position (but this update doesn't happen til later on in the method).
      //Is this to do with JS asynchronous-ness?
      // console.log('document.getElementById(data)', document.getElementById(data));
      var draggedElement = document.getElementById(data);
      // !!ToDo!! Need to update hand with tile in new position.
      event.target.appendChild(draggedElement);
      draggedElement.id = JSON.stringify(tile);
      console.log('drop event target after updating tile canvas id: ', event.target);
    }
  },

  makeGrid: function(){
    var scroller = document.scrollingElement;
    var scrollWidth = scroller.scrollWidth;
    var scrollHeight = scroller.scrollHeight;
    var numberColumns = Math.ceil(scrollWidth/49);
    var numberRows = Math.ceil(scrollHeight/49);
    var grid = document.getElementById('grid');

    for (var i = 0; i < numberRows; i++){
      var row = document.createElement('tr');
      grid.appendChild(row);

      for (var j = 0; j < numberColumns; j++){
        var square = document.createElement('td');
        square.id = "c" + j + "r" + i;
        square.ondragover = this.dragOverHandler;
        square.ondrop = this.dropHandler;
        row.appendChild(square);
      }
    }
    console.log('scroller.scrollWidth', scroller.scrollWidth);
    console.log('window.innerWidth', window.innerWidth);
    console.log('scroller.scrollWidth - window.innerWidth', scroller.scrollWidth - window.innerWidth);
    console.log('scroller.scrollLeft', scroller.scrollLeft);

    this.scrollGrid(scroller, grid);
  },

  scrollGrid: function(scroller, grid){
    if (scroller.scrollWidth - window.innerWidth >= scroller.scrollLeft){
      // console.log('in scrollGrid if statement');
    }
  }
}

module.exports = Grid;
