( function() {
    
    // There's only one map generator, so we'll define everything in a single
    // object.
    window.game.MapGenerator = {
        /**
         * This is the set of all possible puzzle pieces.
         * @type {Array:PuzzlePiece}
         */
    	puzzlePieces: [],

        /**
         * The tiles that form this map. These are indexed as follows:
         *
         * 1 2
         * 3 4
         * 5 6
         * 
         * @type {Array:Number}
         */
        mapArray: [],

        /**
         * The tileset to use when creating a map.
         * @type {Tileset}
         */
        tileset: null,

        /**
         * The doodad graphic indices for this map. They are indexed like the
         * mapArray is, and null indicates that there's no doodad at that tile.
         * @type {Array}
         */
        doodadIndices: [],

        /**
         * The columns of puzzle pieces that form this map. These are indexed as
         * follows:
         *
         * 1 4
         * 2 5
         * 3 6
         * 
         * @type {Array:PuzzlePiece}
         */
        columns: [],

        /**
         * Width of this map in terms of puzzle pieces.
         * @type {Number}
         */
        heightInPuzzlePieces: 0,
        widthInPuzzlePieces: 0,

        /**
         * Width of the map in terms of tiles.
         * @type {Number}
         */
        widthInTiles: 0,
        heightInTiles: 0,

        mapDifficulty: 0,

        /**
         * Initialization function. Creates the puzzle pieces
         */
    	init: function() {

            // Wipe out all of the arrays
            this.mapArray = [];
            this.doodadIndices = [];
            this.puzzlePieces = [];
            this.columns = [];

            this.addPuzzlePiece([0,0,0,0,0,
                                 0,0,0,0,0,
                                 0,0,0,0,0,
                                 0,0,0,0,0,
                                 0,0,0,0,0,], game.PuzzlePieceType.LEFT | 
                                              game.PuzzlePieceType.MIDDLE | 
                                              game.PuzzlePieceType.RIGHT);

            this.addPuzzlePiece([0,0,0,0,0,
                                 0,0,0,0,0,
                                 0,0,1,1,1,
                                 0,0,0,0,0,
                                 0,0,0,0,0,], game.PuzzlePieceType.LEFT);

            this.addPuzzlePiece([0,0,0,0,0,
                                 0,0,0,0,0,
                                 1,1,1,1,1,
                                 0,0,0,0,0,
                                 0,0,0,0,0,], game.PuzzlePieceType.MIDDLE);

            this.addPuzzlePiece([0,0,0,0,0,
                                 0,0,0,0,0,
                                 1,1,0,1,1,
                                 0,1,0,1,0,
                                 0,1,1,1,0,], game.PuzzlePieceType.MIDDLE);

            this.addPuzzlePiece([0,0,1,0,0,
                                 0,0,1,0,0,
                                 0,0,1,1,1,
                                 0,0,0,0,0,
                                 0,0,0,0,0,], game.PuzzlePieceType.MIDDLE);

            this.addPuzzlePiece([0,0,1,0,0,
                                 0,0,1,0,0,
                                 1,1,1,1,1,
                                 0,0,0,0,0,
                                 0,0,0,0,0,], game.PuzzlePieceType.MIDDLE);

            this.addPuzzlePiece([0,1,1,1,0,
                                 0,1,0,1,0,
                                 0,1,0,1,1,
                                 0,1,1,0,0,
                                 0,0,1,0,0,], game.PuzzlePieceType.MIDDLE);

            this.addPuzzlePiece([0,1,1,1,0,
                                 0,1,0,1,0,
                                 1,1,0,1,1,
                                 0,0,0,0,0,
                                 0,0,0,0,0,], game.PuzzlePieceType.MIDDLE);

            this.addPuzzlePiece([0,1,1,1,0,
                                 0,1,0,1,0,
                                 0,1,1,1,1,
                                 0,0,1,1,0,
                                 0,0,0,0,0,], game.PuzzlePieceType.MIDDLE);

            this.addPuzzlePiece([0,0,0,0,0,
                                 0,0,0,0,0,
                                 1,1,1,0,0,
                                 0,0,0,0,0,
                                 0,0,0,0,0,], game.PuzzlePieceType.RIGHT);
    	},

        /**
         * Adds a puzzle piece to the list of puzzle pieces
         * @param  {Array:Number} tiles        tiles that make up the puzzle piece
         * @param  {game.PuzzlePieceType} puzzlePieceType indicates the type of puzzle piece
         */
        addPuzzlePiece: function(tiles, puzzlePieceType) {
            this.puzzlePieces.push(new game.PuzzlePiece(tiles, puzzlePieceType));
        },

        /**
         * Prints all puzzle pieces comprising the column at the column index
         * @param {Number} columnIndex The column index, from 0 to heightInPuzzlePieces.
         */
        printColumn: function(columnIndex) {
            for (var i = columnIndex; i < columnIndex + this.heightInPuzzlePieces; i++) {
                this.columns[i].print();
            };
        },

        /**
         * Gets the puzzle piece that is next to, above, or below the one that's
         * passed in.
         * @param  {game.DirectionFlags} direction   Direction to look in
         * @param  {Number} fromThisPieceIndex Index of the puzzle piece
         * @return {game.PuzzlePiece}               Puzzle piece, or null if no
         * such puzzle piece existed (e.g. you're at the top row and you request
         * the piece above)
         */
        getPuzzlePiece: function(direction, fromThisPieceIndex) {
            var x = Math.floor(fromThisPieceIndex / this.heightInPuzzlePieces);
            var y = fromThisPieceIndex % this.heightInPuzzlePieces;
            switch(direction) {
                case game.DirectionFlags.LEFT:
                    if ( x == 0 ) return null;
                    return this.columns[fromThisPieceIndex - this.heightInPuzzlePieces];
                case game.DirectionFlags.UP :
                    if ( y == 0 ) return null;
                    return this.columns[fromThisPieceIndex - 1];
                case game.DirectionFlags.RIGHT :
                    if ( x == this.widthInPuzzlePieces - 1 ) return null;
                    return this.columns[fromThisPieceIndex + this.heightInPuzzlePieces];
                case game.DirectionFlags.DOWN :
                    if ( y == this.heightInPuzzlePieces - 1 ) return null;
                    return this.columns[fromThisPieceIndex + 1];
            }
        },

        /**
         * Prints the generated map
         */
        printMap: function() {
            for (var i = 0; i < this.heightInTiles; i ++ ) {
                rowStr = '';
                for ( var j = 0; j < this.widthInTiles; j ++ ) {
                    if ( j > 0 ) rowStr += ' ';
                    rowStr += this.mapArray[i * this.widthInTiles + j];
                }
                console.log(rowStr);
            }
        },

        /**
         * Gets all the possible puzzle pieces that will fit at the index that's
         * passed in.
         * @param  {Number} index Index in the map array in tiles.
         * @return {List}       List of possible puzzle pieces
         */
        getPossiblePuzzlePieces: function(index) {
            var possiblePuzzlePiecesList = [];
            var flags = 0;
            var columnIndex = Math.floor(index / this.heightInPuzzlePieces);
            var row = index % this.heightInPuzzlePieces;

            if (columnIndex == 0) {
                flags = game.PuzzlePieceType.LEFT;
            } else if (columnIndex == this.widthInPuzzlePieces - 1) {
                flags = game.PuzzlePieceType.RIGHT;
            } else {
                flags = game.PuzzlePieceType.MIDDLE;
            }

            // These may be null.
            var upPiece = this.getPuzzlePiece(game.DirectionFlags.UP, index);
            var rightPiece = this.getPuzzlePiece(game.DirectionFlags.RIGHT, index);
            var leftPiece = this.getPuzzlePiece(game.DirectionFlags.LEFT, index);
            var downPiece = this.getPuzzlePiece(game.DirectionFlags.DOWN, index);

            for (var i = 0; i < this.puzzlePieces.length; i++) {
                var puzzlePiece = this.puzzlePieces[i];
                if (!(puzzlePiece.pieceType & flags)) continue;

                // If the puzzle piece doesn't fit, continue
                if ( 
                    ((puzzlePiece.canFitTogether(upPiece) & game.DirectionFlags.DOWN) == 0) ||
                    ((puzzlePiece.canFitTogether(rightPiece) & game.DirectionFlags.LEFT) == 0) ||
                    ((puzzlePiece.canFitTogether(leftPiece) & game.DirectionFlags.RIGHT) == 0) ||
                    ((puzzlePiece.canFitTogether(downPiece) & game.DirectionFlags.UP) == 0)
                    ) continue;

                // If we're at the top or bottom and our puzzle piece needs to
                // connect to something above or below it (respectively),
                // continue
                if ( (row == 0 && puzzlePiece.hasTopOpening) ||
                    (row == this.heightInPuzzlePieces - 1 && puzzlePiece.hasBottomOpening ) ) {
                    continue;
                }

                // If we're in the middle, we can't connect to a blank piece on
                // the left if we have a left opening.
                if ( flags == game.PuzzlePieceType.MIDDLE && !leftPiece.hasRightOpening && puzzlePiece.hasLeftOpening ) {
                    continue;
                }

                possiblePuzzlePiecesList.push(this.puzzlePieces[i]);
            };

            // Sanity check for future puzzle piece engineers: if we didn't find
            // any pieces, then we should print useful information.
            if ( possiblePuzzlePiecesList.length == 0 ) {
                if ( upPiece != null ) upPiece.print('Up piece');
                if ( rightPiece != null ) rightPiece.print('Right piece');
                if ( leftPiece != null ) leftPiece.print('Left piece');
                if ( downPiece != null ) downPiece.print('Down piece');

                console.log('Fatal error: couldn\'t place piece at index: ' + index + ' flags: ' + flags + ' row: ' + row + ' heightInPuzzlePieces: ' + this.heightInPuzzlePieces);
                if ( row == 0 && flags == game.PuzzlePieceType.MIDDLE ) console.log('This piece can\'t have top openings.');
                if ( row == this.heightInPuzzlePieces - 1 && flags == game.PuzzlePieceType.MIDDLE ) console.log('This piece can\'t have bottom openings.');
            }

            return possiblePuzzlePiecesList;
        },

        /**
         * Generates a column of the map
         * @param  {Number} columnIndex Column index (from 0 to
         * heightInPuzzlePieces)
         */
        generateColumn: function(columnIndex) {
            var validColumn = false;
            while (!validColumn) {

                // Last column doesn't need right openings and just needs to
                // connect to the previous column, so it's always valid.
                if (columnIndex == this.widthInPuzzlePieces - 1) {
                    validColumn = true;
                }

                for ( var i = 0; i < this.heightInPuzzlePieces; i++ ) {
                    var puzzlePiece;
                    var possiblePuzzlePiecesList = this.getPossiblePuzzlePieces(columnIndex * this.heightInPuzzlePieces + i);
                    puzzlePiece = possiblePuzzlePiecesList[Math.floor(Math.random()*possiblePuzzlePiecesList.length)];

                    if (puzzlePiece.hasRightOpening) {
                        validColumn = true;
                    }
                    this.columns.push(puzzlePiece);
                }

                if (!validColumn) {
                    this.columns.splice(columnIndex, this.heightInPuzzlePieces);
                }
            }
        },

        /**
         * Places doodads on the map.
         *
         * This works by going through each doodad and attempting to place it at
         * random locations on the map. Not the best algorithm, I know.
         * @return {undefined}
         */
        computeDoodads: function() {
            // Copy the array so that we don't sort the tileset's doodads too.
            var doodads = this.tileset.doodads.slice(0);

            // Sort from biggest to smallest so that we try placing the biggest
            // ones first. If we placed small doodads first, then we'd have a
            // lot less room for the big doodads.
            doodads.sort(function(doodad1, doodad2) {
                return doodad2.graphicIndices.length - doodad1.graphicIndices.length;
            });

            this.doodadIndices = new Array(this.mapArray.length);

            var doodadDensity = 5; // approximately 1 doodad every 5 tiles

            // Based on the map size, the doodadDensity, and the number of
            // different doodads we can place, we'll attempt to place doodads a
            // different number of times.
            //
            // 1250 tiles in a 50x25 map, divided by the density == 125, divided
            // by number of doodads == ~20.
            var attemptsPerSquare = this.widthInTiles * this.heightInTiles / doodadDensity / doodads.length;

            for (var i = 0; i < doodads.length; i++) {
                var doodad = doodads[i];
                var numAttemptsToPlace = doodad.width * doodad.height * attemptsPerSquare;
                numAttemptsToPlace = Math.min(numAttemptsToPlace, 250) / doodad.rarity;
                numAttemptsToPlace = Math.ceil(numAttemptsToPlace);
                for (var j = 0; j < numAttemptsToPlace; j++) {
                    var x = game.util.randomInteger(-doodad.width + 1,this.widthInTiles);
                    var y = game.util.randomInteger(-doodad.height + 1,this.heightInTiles);
                    if ( this.applyDoodad(doodad, x, y, true) ) {
                        this.applyDoodad(doodad, x, y, false);
                    }
                };
            };
        },

        /**
         * This function can do two things:
         *
         * 1. It can tell you if a doodad CAN be applied at the specified
         * position.
         * 2. It can actually apply the doodad.
         * @param  {Doodad} doodad    - the doodad to apply
         * @param  {Number} x         - the x coordinate, in tiles
         * @param  {Number} y         - the y coordinate, in tiles
         * @param  {Boolean} justCheck - if true, this won't actually do the
         * application.
         * @return {Boolean}           true if the doodad can be applied.
         */
        applyDoodad: function(doodad, x, y, justCheck) {
            var graphicIndices = doodad.graphicIndices;
            for (var i = 0; i < graphicIndices.length; i++) {
                var row = Math.floor(i / doodad.width);
                var column = i % doodad.width;

                // If we're off the map, we can still apply it. That way we can
                // get edges of doodads showing on our map.
                if ( y + row < 0 || y + row >= this.heightInTiles ) continue;
                if ( x + column < 0 || x + column >= this.widthInTiles ) continue;

                // Apply our offsets to the passed-in coordinates
                var index2 = (y + row) * this.widthInTiles + x + column;
                if ( justCheck ) {
                    if ( this.mapArray[index2] == 1 || this.doodadIndices[index2] != null ) {
                        return false;
                    }
                } else {
                    this.doodadIndices[index2] = graphicIndices[i];
                }
            };

            return true;
        },

        /**
         * Adds a blank row of zeroes to this.mapArray.
         * @param  {Number} rowIndex - the index of the row from 0 to
         * heightInTiles
         */
        addBlankRow: function(rowIndex) {
            var startIndex = rowIndex * this.widthInTiles;
            // var blankRow = new Array(this.widthInTiles);
            for (var i = 0; i < this.widthInTiles; i++) {
                // blankRow[i] = 0;
                this.mapArray.splice(startIndex, 0, 0);
            };
            this.heightInTiles++;
        },

        /**
         * Removes a row from this.mapArray;
         * @param  {Number} rowIndex - the index of the row from 0 to
         * heightInTiles.
         */
        removeRow: function(rowIndex) {
            var startIndex = rowIndex * this.widthInTiles;
            this.mapArray.splice(startIndex, this.widthInTiles);
            this.heightInTiles--;
        },

        /**
         * @param  {Number} rowIndex - the index of the row from 0 to
         * heightInTiles
         * @return {Boolean} true if the row is blank
         */
        isRowBlank: function(rowIndex) {
            var startIndex = rowIndex * this.widthInTiles;
            for (var i = startIndex; i < startIndex + this.widthInTiles; i++) {
                if ( this.mapArray[i] == 1 ) {
                    return false;
                }
            };

            return true;
        },

        /**
         * Removes large chunks of blank rows. Also, ensures that there's only a
         * single blank row at the top and bottom of the map.
         */
        handleBlankRows: function() {
            // Remove any blank rows at the beginning
            for (var i = 0; i < this.heightInTiles; i++) {
                if ( this.isRowBlank(i) ) {
                    this.removeRow(i);
                    i--;
                } else {
                    break;
                }
            };

            // Remove any at the end
            for (var i = this.heightInTiles - 1; i >= 0; i--) {
                if ( this.isRowBlank(i) ) {
                    this.removeRow(i);
                } else {
                    break;
                }
            };

            // Now remove large blocks of blank rows.

            // This number cannot be 0 or it could generate invalid maps!
            var maxNumOfConsecutiveBlankRows = 5;

            // Keep track of how many consecutive blank rows we find.
            var consecutiveCount = 0;
            for (var i = 0; i < this.heightInTiles; i++) {
                if ( this.isRowBlank(i) ) {
                    consecutiveCount++;

                    // If we've exceed our maximum, then remove all blank
                    // rows from here until the next non-blank row.
                    if ( consecutiveCount > maxNumOfConsecutiveBlankRows ) {
                        while (true) {
                            if ( !this.isRowBlank(i) ) {
                                break;
                            }
                            this.removeRow(i);
                        }
                        trimmed = true;

                        // We're at a non-blank row now, so reset the count.
                        consecutiveCount = 0;
                    }
                } else {
                    consecutiveCount = 0;
                }
            };

            // Add a single blank row at the top and at the bottom
            this.addBlankRow(0);
            this.addBlankRow(this.heightInTiles);
        },

        /**
         * Generates a random map
         * @param  {Number} width      width of the map to be generated in tiles
         * @param  {Number} height     height of the map to be generated in tiles
         * @param  {Number} difficulty Difficulty of the map. The higher the
         *                             difficulty, the harder the map
         * @return {game.Map}          New auto-generated map, or null if there was an error.
         */
    	generateRandomMap: function(width, height, difficulty) {
            if (difficulty < 1 || difficulty > 4) {
                game.util.debugDisplayText('Fatal map generation error: difficulty out of bounds.', 'difficulty');
                return null;
            }

            // Make sure we can use whole puzzle pieces
            if (width * height % game.PUZZLE_PIECE_SIZE != 0) {
                game.util.debugDisplayText('Fatal map generation error: map size is not a multiple of puzzle piece size', 'map size');
                console.log('Map width: ' + width + ' height: ' + height);
                return null;
            }

            // Makes sure the map is at least as big as three puzzle pieces so
            // that the algorithm doesn't fail.
            if (width < 3 * game.PUZZLE_PIECE_SIZE) {
                game.util.debugDisplayText('Fatal map generation error: width isn\'t big enough.', 'map width');
                console.log('Map width: ' + width);
                return null;
            }

            this.mapDifficulty = difficulty;
            this.widthInTiles = width;
            this.heightInTiles = height;
            this.heightInPuzzlePieces = this.heightInTiles / game.PUZZLE_PIECE_SIZE;
            this.widthInPuzzlePieces = this.widthInTiles / game.PUZZLE_PIECE_SIZE;

            var sizeInTiles = this.widthInTiles * this.heightInTiles;

            this.tileset = game.util.randomArrayElement(game.TilesetManager.tilesets);

            // Generate a map array with all zeroes
            for (var i = 0; i < sizeInTiles; i++) {
                this.mapArray.push(0);
            };

            // Generate the columns
            for (var i = 0; i < this.widthInPuzzlePieces; i++) {
                this.generateColumn(i);
            };

            // Go through the columns we generated (in puzzle pieces) and form
            // tiles out of them.
            var x = 0;
            var y = 0;
            for (var i = 0; i < this.columns.length; i++) {
                this.columns[i].applyToMapArray(this.mapArray, this.widthInTiles, x, y);
                y += game.PUZZLE_PIECE_SIZE;
                if ( y == this.heightInTiles ) {
                    y = 0;
                    x += game.PUZZLE_PIECE_SIZE;
                }
            };

            this.handleBlankRows();

            this.computeDoodads();

            // Convert the array of 0s and 1s to map tiles
            for (var i = 0; i < this.mapArray.length; i++) {
                this.mapArray[i] = (this.mapArray[i] == 0 ? this.tileset.nonwalkableTileGraphic : this.tileset.walkableTileGraphic);
            };

            var map = new game.Map(this.mapArray, this.doodadIndices, this.tileset.id, this.widthInTiles);

            // We don't need these any longer, so free the memory.
            delete this.columns;
            delete this.mapArray;
            delete this.puzzlePieces;

            return map;
    	}
    };

}());