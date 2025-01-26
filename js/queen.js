function getQueenMoves(startingSquareId, pieceColor, boardSquaresArray) {
    let bishopMoves = getBishopMoves(
      startingSquareId,
      pieceColor,
      boardSquaresArray
    );
    let rookMoves = getRookMoves(startingSquareId, pieceColor, boardSquaresArray);
    let legalSquares = [...bishopMoves, ...rookMoves];
    return legalSquares;
}