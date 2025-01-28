function enPassantPossible(currentSquareId,pawnStartingSquareId,direction){

  if(moves.length==0) return false;
  let lastMove= moves[moves.length-1];
  if(!(lastMove.to===currentSquareId && lastMove.from===pawnStartingSquareId && lastMove.pieceType=="pawn")) return false;
  file=currentSquareId[0];
  rank=parseInt(currentSquareId[1]);
  rank+=direction;
  let squareBehindId=file+rank;
  enPassantSquare=squareBehindId;
  return true;
  
}

function performEnPassant(piece,pieceColor,startingSquareId,destinationSquareId){

  let file = destinationSquareId[0];
  let rank = parseInt(destinationSquareId[1]);
  rank += (pieceColor === 'white') ? -1 : 1;
  let squareBehindId=file+rank;

  const squareBehindElement=document.getElementById(squareBehindId);
  while (squareBehindElement.firstChild) {
    squareBehindElement.removeChild(squareBehindElement.firstChild);
  }
    
  let squareBehind = boardSquaresArray.find((element) => element.squareId === squareBehindId);
  squareBehind.pieceColor = "blank";
  squareBehind.pieceType = "blank";
  squareBehind.pieceId = "blank";


  const destinationSquare=document.getElementById(destinationSquareId);
  destinationSquare.appendChild(piece);
  isWhiteTurn = !isWhiteTurn;
  updateBoardSquaresArray(startingSquareId, destinationSquareId,boardSquaresArray);
  let captured=true;
  makeMove(startingSquareId,
    destinationSquareId,"pawn",pieceColor,captured)
  checkForCheckMate();
  return;
}

function getPawnMoves(startingSquareId, pieceColor, boardSquaresArray) {
    let diogonalSquares = checkPawnDiagonalCaptures(startingSquareId, pieceColor, boardSquaresArray);
    let forwardSquares = checkPawnForwardMoves(startingSquareId, pieceColor, boardSquaresArray);
    let legalSquares = [...diogonalSquares, ...forwardSquares];
    return legalSquares;
}

function checkPawnDiagonalCaptures(
  startingSquareId,
  pieceColor,
  boardSquaresArray
) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let legalSquares = [];
  let currentFile = file;
  let currentRank = rankNumber;
  let currentSquareId = currentFile + currentRank;

  const direction = pieceColor == "white" ? 1 : -1;
  if(!(rank==8 && direction==1) && !(rank==1 && direction==-1))
    currentRank += direction;
  for (let i = -1; i <= 1; i += 2) {
    currentFile = String.fromCharCode(file.charCodeAt(0) + i);
    if (currentFile >= "a" && currentFile <= "h" && currentRank<=8 && currentRank>=1) {
      currentSquareId = currentFile + currentRank;
      let currentSquare = boardSquaresArray.find(
        (element) => element.squareId === currentSquareId
      );
      let squareContent = currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent != pieceColor)
        legalSquares.push(currentSquareId);
        if (squareContent == "blank"){
          currentSquareId = currentFile + rank;
          let pawnStartingSquareRank=rankNumber+direction*2;
          let pawnStartingSquareId=currentFile+pawnStartingSquareRank;
        
          if(enPassantPossible(currentSquareId,pawnStartingSquareId,direction))
          {
            let pawnStartingSquareRank=rankNumber+direction;
            let enPassantSquare=currentFile+pawnStartingSquareRank;
            legalSquares.push(enPassantSquare);
          }
  
        }
    }
  }
  return legalSquares;
}

function checkPawnForwardMoves(startingSquareId, pieceColor, boardSquaresArray) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let legalSquares = [];
  
    let currentFile = file;
    let currentRank = rankNumber;
    let currentSquareId = currentFile + currentRank;
  
    const direction = pieceColor == "white" ? 1 : -1;
    currentRank += direction;
    currentSquareId = currentFile + currentRank;
    let currentSquare = boardSquaresArray.find((element) => element.squareId === currentSquareId);
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank") return legalSquares;
    legalSquares.push(currentSquareId);
    if (rankNumber != 2 && rankNumber != 7) return legalSquares;
    currentRank += direction;
    currentSquareId = currentFile + currentRank;
    currentSquare = boardSquaresArray.find((element) => element.squareId === currentSquareId);
    squareContent = currentSquare.pieceColor;
    if (squareContent != "blank")
      if (squareContent != "blank") return legalSquares;
    legalSquares.push(currentSquareId);
    return legalSquares;
}