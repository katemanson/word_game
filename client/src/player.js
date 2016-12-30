// var Grid = require('./grid');
var find = require('lodash/find');
var sortBy = require('lodash/sortBy');

var Player = function(name){
  this.name = name;
  this.hand = [];
  // this.grid = new Grid();
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

  getWords: function(){
    //find the min and max column numbers
    var handSortedByColumn = sortBy(this.hand, [function(tile){
      return tile.gridPosition.column;
    }]);
    var firstColumn = handSortedByColumn[0].gridPosition.column;
    var lastColumn = handSortedByColumn[handSortedByColumn.length - 1].gridPosition.column;
    console.log('handSortedByColumn', handSortedByColumn);
    console.log('firstColumn', firstColumn);
    console.log('lastColumn', lastColumn);

    //group tiles in the same columns
    var handGroupedByColumn = [];
    for (var i = firstColumn; i <= lastColumn; i++){
      var tilesInColumnI = handSortedByColumn.filter(function(tile){
        return tile.gridPosition.column === i;
      });
      handGroupedByColumn.push(tilesInColumnI);
    }
    console.log('handGroupedByColumn', handGroupedByColumn);

    //order by row number
    var handGroupedByColumnSortedByRow = [];
    for (var group of handGroupedByColumn){
      var sortedByRow = sortBy(group, [function(tile){
        return tile.gridPosition.row;
      }]);
      handGroupedByColumnSortedByRow.push(sortedByRow);
    }
    console.log('handGroupedByColumnSortedByRow', handGroupedByColumnSortedByRow);

    //group tiles with consecutive row numbers
    /*  Note: following loopy bit based on first answer at
        http://stackoverflow.com/questions/22627125/grouping-consecutive-elements-together-using-javascript */
    var tilesFormingWords = [];
    var difference;
    var holder = [];
    for (var group of handGroupedByColumnSortedByRow){
      console.log('difference', difference);
      for (var i = 0; i < group.length; i++){
        if (difference !== (group[i].gridPosition.row - i) && difference !== undefined ){
          if (holder.length > 1){
            tilesFormingWords.push(holder);
          }
          holder = [];
        }
        difference = group[i].gridPosition.row - i;
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
    console.log('tilesFormingWords:', tilesFormingWords);

    //for consecutive tiles, concatenate letters to make words, add each word
    //to player's words array

    var lettersOfWord = [];
    var word = "";
    for (var tilesFormingWord of tilesFormingWords){
      lettersOfWord = tilesFormingWord.map(function(tile){
        return tile.letter;
      });
      console.log('lettersOfWord', lettersOfWord);
      word = lettersOfWord.join("");
      console.log('word', word);
      this.words.push(word);
      lettersOfWord = [];
      word = "";
    }
    console.log('this.words', this.words);

    //repeat for rows
  }
}

module.exports = Player;
