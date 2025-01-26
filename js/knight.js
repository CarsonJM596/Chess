function getKnightMoves(startingSquareId, pieceColor, boardSquaresArray) {
    const file = startingSquareId.charCodeAt(0) - 97;
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let currentFile = file;
    let currentRank = rankNumber;
    let legalSquares = [];
  
    const moves = [
      [-2, 1],
      [-1, 2],
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
    ];
    moves.forEach((move) => {
      currentFile = file + move[0];
      currentRank = rankNumber + move[1];
      if (
        currentFile >= 0 &&
        currentFile <= 7 &&
        currentRank > 0 &&
        currentRank <= 8
      ) {
        let currentSquareId = String.fromCharCode(currentFile + 97) + currentRank;
        let currentSquare = boardSquaresArray.find(
          (element) => element.squareId === currentSquareId
        );
        let squareContent = currentSquare.pieceColor;
        if (squareContent != "blank" && squareContent == pieceColor)
          return legalSquares;
        legalSquares.push(String.fromCharCode(currentFile + 97) + currentRank);
      }
    });
    return legalSquares;
}