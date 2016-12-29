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
      event.target.appendChild(document.getElementById(data));
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
        square.ondragover = this.dragOverHandler;
        square.ondrop = this.dropHandler;
        row.appendChild(square);
      }
    }

    this.scrollGrid(scroller, grid);
  },

  scrollGrid: function(scroller, grid){
    if (scroller.scrollWidth - window.innerWidth >= scroller.scrollLeft){
      // console.log('in scrollGrid if statement');
      // console.log('scrollWidth', scroller.scrollWidth);
      // console.log('window.innerWidth', window.innerWidth);
      // console.log('scroller.scrollWidth - window.innerWidth', scroller.scrollWidth - window.innerWidth);
      // console.log('scroller.scrollLeft', scroller.scrollLeft);
    }
  }
}

module.exports = Grid;
