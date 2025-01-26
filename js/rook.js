function getRookMoves(startingSquareId, pieceColor, boardSquaresArray) {
    let moveToEighthRankSquares = moveToEighthRank(
      startingSquareId,
      pieceColor,
      boardSquaresArray
    );
    let moveToFirstRankSquares = moveToFirstRank(
      startingSquareId,
      pieceColor,
      boardSquaresArray
    );
    let moveToAFileSquares = moveToAFile(
      startingSquareId,
      pieceColor,
      boardSquaresArray
    );
    let moveToHFileSquares = moveToHFile(
      startingSquareId,
      pieceColor,
      boardSquaresArray
    );
    let legalSquares = [
      ...moveToEighthRankSquares,
      ...moveToFirstRankSquares,
      ...moveToAFileSquares,
      ...moveToHFileSquares,
    ];
    return legalSquares;
}

function moveToEighthRank(startingSquareId, pieceColor, boardSquaresArray) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let currentRank = rankNumber;
    let legalSquares = [];
    while (currentRank != 8) {
      currentRank++;
      let currentSquareId = file + currentRank;
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

function moveToFirstRank(startingSquareId, pieceColor, boardSquaresArray) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let currentRank = rankNumber;
    let legalSquares = [];
    while (currentRank != 1) {
      currentRank--;
      let currentSquareId = file + currentRank;
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
function moveToAFile(startingSquareId, pieceColor, boardSquaresArray) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    let currentFile = file;
    let legalSquares = [];
  
    while (currentFile != "a") {
      currentFile = String.fromCharCode(
        currentFile.charCodeAt(currentFile.length - 1) - 1
      );
      let currentSquareId = currentFile + rank;
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
function moveToHFile(startingSquareId, pieceColor, boardSquaresArray) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    let currentFile = file;
    let legalSquares = [];
    while (currentFile != "h") {
      currentFile = String.fromCharCode(
        currentFile.charCodeAt(currentFile.length - 1) + 1
      );
      let currentSquareId = currentFile + rank;
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
  
function moveToEighthRankAFile(
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
    while (!(currentFile == "a" || currentRank == 8)) {
      currentFile = String.fromCharCode(
        currentFile.charCodeAt(currentFile.length - 1) - 1
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