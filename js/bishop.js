function getBishopMoves(startingSquareId, pieceColor, boardSquaresArray) {
    let moveToEighthRankHFileSquares = moveToEighthRankHFile(
      startingSquareId,
      pieceColor,
      boardSquaresArray
    );
    let moveToEighthRankAFileSquares = moveToEighthRankAFile(
      startingSquareId,
      pieceColor,
      boardSquaresArray
    );
    let moveToFirstRankHFileSquares = moveToFirstRankHFile(
      startingSquareId,
      pieceColor,
      boardSquaresArray
    );
    let moveToFirstRankAFileSquares = moveToFirstRankAFile(
      startingSquareId,
      pieceColor,
      boardSquaresArray
    );
    let legalSquares = [
      ...moveToEighthRankHFileSquares,
      ...moveToEighthRankAFileSquares,
      ...moveToFirstRankHFileSquares,
      ...moveToFirstRankAFileSquares,
    ];
    return legalSquares;
}

function moveToEighthRankHFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  ) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let currentFile = file;
    let currentRank = rankNumber;
    let legalSquares = [];
    while (!(currentFile == "h" || currentRank == 8)) {
      currentFile = String.fromCharCode(
        currentFile.charCodeAt(currentFile.length - 1) + 1
      );
      currentRank++;
      let currentSquareId = currentFile + currentRank;
      let currentSquare = boardSquaresArray.find(
        (element) => element.squareId === currentSquareId
      );
      let squareContent = currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent == pieceColor)
        return legalSquares;
      legalSquares.push(currentSquareId);
      if (squareContent != "blank" && squareContent != pieceColor)
        return legalSquares;
    }
    return legalSquares;
}

function moveToEighthRankHFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  ) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let currentFile = file;
    let currentRank = rankNumber;
    let legalSquares = [];
    while (!(currentFile == "h" || currentRank == 8)) {
      currentFile = String.fromCharCode(
        currentFile.charCodeAt(currentFile.length - 1) + 1
      );
      currentRank++;
      let currentSquareId = currentFile + currentRank;
      let currentSquare = boardSquaresArray.find(
        (element) => element.squareId === currentSquareId
      );
      let squareContent = currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent == pieceColor)
        return legalSquares;
      legalSquares.push(currentSquareId);
      if (squareContent != "blank" && squareContent != pieceColor)
        return legalSquares;
    }
    return legalSquares;
}
function moveToFirstRankAFile(startingSquareId, pieceColor, boardSquaresArray) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let currentFile = file;
    let currentRank = rankNumber;
    let legalSquares = [];
    while (!(currentFile == "a" || currentRank == 1)) {
      currentFile = String.fromCharCode(
        currentFile.charCodeAt(currentFile.length - 1) - 1
      );
      currentRank--;
      let currentSquareId = currentFile + currentRank;
      let currentSquare = boardSquaresArray.find(
        (element) => element.squareId === currentSquareId
      );
      let squareContent = currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent == pieceColor)
        return legalSquares;
      legalSquares.push(currentSquareId);
      if (squareContent != "blank" && squareContent != pieceColor)
        return legalSquares;
    }
    return legalSquares;
}

function moveToFirstRankHFile(startingSquareId, pieceColor, boardSquaresArray) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let currentFile = file;
    let currentRank = rankNumber;
    let legalSquares = [];
    while (!(currentFile == "h" || currentRank == 1)) {
      currentFile = String.fromCharCode(
        currentFile.charCodeAt(currentFile.length - 1) + 1
      );
      currentRank--;
      let currentSquareId = currentFile + currentRank;
      let currentSquare = boardSquaresArray.find(
        (element) => element.squareId === currentSquareId
      );
      let squareContent = currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent == pieceColor)
        return legalSquares;
      legalSquares.push(currentSquareId);
      if (squareContent != "blank" && squareContent != pieceColor)
        return legalSquares;
    }
    return legalSquares;
}