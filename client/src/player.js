var find = require('lodash/find');
var sortBy = require('lodash/sortBy');

var Player = function(params){
  this.id = "";
  this.name = params.name;
  this.hand = [];
  this.words = [];
}

Player.prototype = {

  getTile: function(tile){
    this.hand.push(tile);
  },

  getTiles: function(tileArray){
    this.hand = this.hand.concat(tileArray);
  },

  findTileById: function(id){
    return this.hand.find(function(tile){
      return tile.id === id;
    });
  },

  findTileIndexById: function(id){
    return this.hand.findIndex(function(tile){
        return tile.id === id;
    });
  },

  updateTilePosition: function(tileId, newPosition){
    var tileIndex = this.findTileIndexById(tileId);
    this.hand[tileIndex].gridPosition = newPosition;
  },

  removeTile: function(tile){
    var tileIndex = this.findTileIndexById(tile.id);
    this.hand.splice(tileIndex, 1);
  },

  //? Next method requires either "column" or "row" (as String) as parameter.
  // Don't think this is clear enough in the code.
  getWordsIn: function(specifyColumnOrRow){
    //find the min and max column/row numbers
    var handSortedByColumnOrRow = sortBy(this.hand, [function(tile){
      return tile.gridPosition[specifyColumnOrRow];
    }]);
    var firstColumnOrRow = handSortedByColumnOrRow[0].gridPosition[specifyColumnOrRow];
    var lastColumnOrRow = handSortedByColumnOrRow[handSortedByColumnOrRow.length - 1].gridPosition[specifyColumnOrRow];

    //group tiles in the same column/row
    var handGroupedByColumnOrRow = [];
    for (var i = firstColumnOrRow; i <= lastColumnOrRow; i++){
      var tilesInColumnOrRowI = handSortedByColumnOrRow.filter(function(tile){
        return tile.gridPosition[specifyColumnOrRow] === i;
      });
      handGroupedByColumnOrRow.push(tilesInColumnOrRowI);
    }

    //order by row/column number
    var specifyRowOrColumn = "";
    if (specifyColumnOrRow === "column"){
      specifyRowOrColumn = "row";
    } else {
      specifyRowOrColumn = "column";
    }

    var handGroupedByColumnOrRowSortedByRowOrColumn = [];
    for (var group of handGroupedByColumnOrRow){
      var sortedByRowOrColumn = sortBy(group, [function(tile){
        return tile.gridPosition[specifyRowOrColumn];
      }]);
      handGroupedByColumnOrRowSortedByRowOrColumn.push(sortedByRowOrColumn);
    }

    //group tiles with consecutive row/column numbers
    /*  Note: the following bit (with the nested for loops and if statements)
        is based on the first answer at
        http://stackoverflow.com/questions/22627125/grouping-consecutive-elements-together-using-javascript */
    var tilesFormingWords = [];
    var difference;
    var holder = [];
    for (var group of handGroupedByColumnOrRowSortedByRowOrColumn){
      for (var i = 0; i < group.length; i++){
        if (difference !== (group[i].gridPosition[specifyRowOrColumn] - i) && difference !== undefined ){
          if (holder.length > 1){
            tilesFormingWords.push(holder);
          }
          holder = [];
        }
        difference = group[i].gridPosition[specifyRowOrColumn] - i;
        holder.push(group[i]);
      }
      if (holder.length){
        if (holder.length > 1){
          tilesFormingWords.push(holder);
        }
        holder = [];
      }
      difference = undefined;
    }

    //for consecutive tiles, concatenate letters to make words, add each word
    //to player's this.words array
    var lettersOfWord = [];
    var word = "";
    for (var tilesFormingWord of tilesFormingWords){
      lettersOfWord = tilesFormingWord.map(function(tile){
        return tile.letter;
      });
      word = lettersOfWord.join("");
      this.words.push(word);
      lettersOfWord = [];
      word = "";
    }
  },

  getWords: function(){
    //ToDo: Is this if statement needed?
    if (this.words.length){
      this.words = [];
    }
    this.getWordsIn("column");
    this.getWordsIn("row");
  }
}

module.exports = Player;
