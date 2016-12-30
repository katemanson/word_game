var Tile = function(params){
  this.letter = params.letter;
  this.gridPosition = params.gridPosition || {column: 0, row: 0};
  this.id = params.id || -1;
}

Tile.prototype = {

  draw: function(context){

    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.fillStyle = '#efd19f';

    context.beginPath();
    context.moveTo(5,0);
    context.lineTo(40,0);
    context.arcTo(45,0,45,5,5);
    context.lineTo(45,40);
    context.arcTo(45,45,40,45,5);
    context.lineTo(5,45);
    context.arcTo(0,45,0,40,5);
    context.lineTo(0,5);
    context.arcTo(0,0,5,0,5);
    context.fill();
    context.stroke();

    context.fillStyle = 'black';
    context.font = '40px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(this.letter.toUpperCase(), 21, 21);
  }

}

module.exports = Tile;
