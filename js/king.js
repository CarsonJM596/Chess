function getKingMoves(startingSquareId, pieceColor, boardSquaresArray) {
    const file = startingSquareId.charCodeAt(0) - 97;
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let currentFile = file;
    let currentRank = rankNumber;
    let legalSquares = [];
  
    const moves = [
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 0],
      [-1, -1],
      [-1, 1],
      [1, 0],
    ];
  
    //  for (let move of moves)
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
function isKingInCheck(SquareId, pieceColor, boardSquaresArray) {
    let legalSquares = getRookMoves(SquareId, pieceColor, boardSquaresArray);
    for (let squareId of legalSquares) {
      let pieceProperties = getPieceAtSquare(squareId, boardSquaresArray);
      if (
        (pieceProperties.pieceType == "rook" ||
          pieceProperties.pieceType == "queen") &&
        pieceColor != pieceProperties.color
      ) {
        return true;
      }
    }
  
    legalSquares = getBishopMoves(SquareId, pieceColor, boardSquaresArray);
    for (let squareId of legalSquares) {
      let pieceProperties = getPieceAtSquare(squareId, boardSquaresArray);
      if (
        (pieceProperties.pieceType == "bishop" ||
          pieceProperties.pieceType == "queen") &&
        pieceColor != pieceProperties.color
      ) {
        return true;
      }
    }
  
    legalSquares = getKnightMoves(SquareId, pieceColor, boardSquaresArray);
    for (let squareId of legalSquares) {
      let pieceProperties = getPieceAtSquare(squareId, boardSquaresArray);
      if (
        pieceProperties.pieceType == "knight" &&
        pieceColor != pieceProperties.color
      ) {
        return true;
      }
    }
  
    legalSquares = checkPawnDiagonalCaptures(
      SquareId,
      pieceColor,
      boardSquaresArray
    );
    for (let squareId of legalSquares) {
      let pieceProperties = getPieceAtSquare(squareId, boardSquaresArray);
      if (
        pieceProperties.pieceType == "pawn" &&
        pieceColor != pieceProperties.color
      ) {
        return true;
      }
    }
    legalSquares = getKingMoves(SquareId, pieceColor, boardSquaresArray);
    for (let squareId of legalSquares) {
      let pieceProperties = getPieceAtSquare(squareId, boardSquaresArray);
      if (
        pieceProperties.pieceType == "king" &&
        pieceColor != pieceProperties.color
      ) {
        return true;
      }
    }
    return false;
}
function isMoveValidAgainstCheck(legalSquares,startingSquareId,pieceColor,pieceType){
    let kingSquare = isWhiteTurn  ? whiteKingSquare : blackKingSquare;
    let boardSquaresArrayCopy = deepCopyArray(boardSquaresArray);
    legalSquaresCopy =legalSquares.slice();
    legalSquaresCopy.forEach((element) => {
      let destinationId = element;
      //boardSquaresArrayCopy.length=0;
      boardSquaresArrayCopy = deepCopyArray(boardSquaresArray);
      updateBoardSquaresArray(
        startingSquareId,
        destinationId,
        boardSquaresArrayCopy
      );
      
      if (pieceType != "king" && isKingInCheck(kingSquare, pieceColor, boardSquaresArrayCopy)) {
        legalSquares = legalSquares.filter((item) => item !== destinationId);
      }
      
      if (pieceType == "king" && isKingInCheck(destinationId, pieceColor, boardSquaresArrayCopy)) {
        legalSquares = legalSquares.filter((item) => item !== destinationId);
      }
  
    });
    return legalSquares;
}  
function checkForCheckMate() {
    let kingSqaure=isWhiteTurn  ? whiteKingSquare: blackKingSquare;
    let pieceColor=isWhiteTurn  ? "white": "black";
    let boardSquaresArrayCopy = deepCopyArray(boardSquaresArray);
    let kingIsCheck=isKingInCheck(kingSqaure,pieceColor,boardSquaresArrayCopy);
    
    if(!kingIsCheck) return;
    let possibleMoves=getAllPossibleMoves(boardSquaresArrayCopy,pieceColor);
    if(possibleMoves.length>0) return;
    let message="";
    isWhiteTurn  ? (message="Black Wins") : (message="White Wins");
    showAlert(message);
}
function showAlert(message) {
    const alert= document.getElementById("alert");
    alert.innerHTML=message;
    alert.style.display="block";
  
    setTimeout(function(){
         alert.style.display="none";
    },3000);
}