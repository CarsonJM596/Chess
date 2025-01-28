let boardSquaresArray = [];
let moves = [];
const castlingSquares = ["g1", "g8", "c1", "c8"];
let isWhiteTurn = true;
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img");

function makeMove(startingSquareId, destinationSquareId, pieceType, pieceColor, captured){
  moves.push({from: startingSquareId, to:destinationSquareId, pieceType : pieceType, pieceColor:pieceColor, captured:captured});
}

function fillBoardSquaresArray() {
  const boardSquares = document.getElementsByClassName("square");
  for (let i = 0; i < boardSquares.length; i++) {
    let row = 8 - Math.floor(i / 8);
    let column = String.fromCharCode(97 + (i % 8));
    let square = boardSquares[i];
    square.id = column + row;
    let color = "";
    let pieceType = "";
    let pieceId="";
    if (square.querySelector(".piece")) {
      color = square.querySelector(".piece").getAttribute("color");
      pieceType = square.querySelector(".piece").classList[1];
      pieceId=square.querySelector(".piece").id;
    } else {
      color = "blank";
      pieceType = "blank";
      pieceId ="blank";
    }
    let arrayElement = {squareId: square.id,pieceColor: color,pieceType: pieceType,pieceId:pieceId};
    boardSquaresArray.push(arrayElement);
  }
}
function updateBoardSquaresArray(currentSquareId, destinationSquareId, boardSquaresArray) {
    let currentSquare = boardSquaresArray.find((element) => element.squareId === currentSquareId);
    let destinationSquareElement = boardSquaresArray.find((element) => element.squareId === destinationSquareId);
    let pieceColor = currentSquare.pieceColor;
    let pieceType = currentSquare.pieceType;
    let pieceId= currentSquare.pieceId;
    destinationSquareElement.pieceColor = pieceColor;
    destinationSquareElement.pieceType = pieceType;
    destinationSquareElement.pieceId=pieceId;
    currentSquare.pieceColor = "blank";
    currentSquare.pieceType = "blank";
    currentSquare.pieceId = "blank";
}

function deepCopyArray(array) {
  let arrayCopy = array.map(element => {
    return {...element};
  });
  return arrayCopy;
}

setupBoardSquares();
setupPieces();
fillBoardSquaresArray();

function setupBoardSquares() {
  for (let i = 0; i < boardSquares.length; i++) {
    boardSquares[i].addEventListener("dragover", allowDrop);
    boardSquares[i].addEventListener("drop", drop);
    let row = 8 - Math.floor(i / 8);
    let column = String.fromCharCode(97 + (i % 8));
    let square = boardSquares[i];
    square.id = column + row;
  }
}

function setupPieces() {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener("dragstart", drag);
    pieces[i].setAttribute("draggable", true);
    pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
  }
  for (let i = 0; i < piecesImages.length; i++) {
    piecesImages[i].setAttribute("draggable", false);
  }
}
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  const piece = ev.target;
  const pieceColor = piece.getAttribute("color");
  const pieceType =piece.classList[1];
  const pieceId = piece.id;

  if (
    (isWhiteTurn && pieceColor == "white") ||
    (!isWhiteTurn && pieceColor == "black")
  ) {
    const startingSquareId = piece.parentNode.id;
    ev.dataTransfer.setData("text", pieceId + "|" + startingSquareId);
    const pieceObject ={pieceColor:pieceColor,pieceType:pieceType,pieceId:pieceId}
    let legalSquares = getPossibleMoves(startingSquareId, pieceObject, boardSquaresArray);

    let legalSquaresJson = JSON.stringify(legalSquares);
    ev.dataTransfer.setData("application/json", legalSquaresJson);
  }
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let [pieceId, startingSquareId] = data.split("|");
    let legalSquaresJson = ev.dataTransfer.getData("application/json");
    let legalSquares = JSON.parse(legalSquaresJson);

    const piece = document.getElementById(pieceId);
    const pieceColor = piece.getAttribute("color");
    const pieceType = piece.classList[1];
    
    const destinationSquare = ev.currentTarget;
    let destinationSquareId = destinationSquare.id;

    legalSquares=isMoveValidAgainstCheck(legalSquares,startingSquareId,pieceColor,pieceType);

    if (pieceType == "king") {
        let isCheck = isKingInCheck(destinationSquareId, pieceColor, boardSquaresArray);
        if (isCheck) return;
    }

        let squareContent=getPieceAtSquare(destinationSquareId,boardSquaresArray);
    if (squareContent.pieceColor == "blank" && legalSquares.includes(destinationSquareId)) {
        
        if (pieceType =="king")
          isCheck=isKingInCheck(startingSquareId,pieceColor,boardSquaresArray);

        if(pieceType=="king" && !kingHasMoved(pieceColor) && castlingSquares.includes(destinationSquareId)&& !isCheck){

          performCastling(piece,pieceColor,startingSquareId,destinationSquareId,boardSquaresArray);
          return;
        }
        if(pieceType=="king" && !kingHasMoved(pieceColor) && castlingSquares.includes(destinationSquareId)&& isCheck) return;
        destinationSquare.appendChild(piece);
        isWhiteTurn = !isWhiteTurn;
        updateBoardSquaresArray(startingSquareId, destinationSquareId, boardSquaresArray);
        let captured = false;
        makeMove(startingSquareId, destinationSquareId, pieceType, pieceColor, captured)
        checkForCheckMate();
        return;
    }
    if (squareContent.pieceColor!= "blank" && legalSquares.includes(destinationSquareId)) {
        let children = destinationSquare.children;
        for (let i = 0; i < children.length; i++) {
            if (!children[i].classList.contains('coordinate')) {
            destinationSquare.removeChild(children[i]);
            }
        }
        
        destinationSquare.appendChild(piece);
        isWhiteTurn = !isWhiteTurn;
        updateBoardSquaresArray(startingSquareId, destinationSquareId, boardSquaresArray);
        let captured = true;
        makeMove(startingSquareId, destinationSquareId, pieceType, pieceColor, captured)
        checkForCheckMate();
        return;
    }
}

function getPossibleMoves(startingSquareId, piece, boardSquaresArray) {
    const pieceColor = piece.pieceColor;
    const pieceType = piece.pieceType;
  
    let legalSquares = [];
    if (pieceType=="pawn") {
      legalSquares = getPawnMoves(startingSquareId, pieceColor, boardSquaresArray);
      return legalSquares;
    }
    if  (pieceType=="knight") {
      legalSquares = getKnightMoves(startingSquareId, pieceColor, boardSquaresArray);
      return legalSquares;
    }
    if  (pieceType=="rook"){
      legalSquares = getRookMoves(startingSquareId, pieceColor, boardSquaresArray);
      return legalSquares;
    }
    if  (pieceType=="bishop") {
      legalSquares = getBishopMoves(startingSquareId, pieceColor, boardSquaresArray);
      return legalSquares;
    }
    if  (pieceType=="queen"){
      legalSquares = getQueenMoves(startingSquareId, pieceColor, boardSquaresArray );
      return legalSquares;
    }
    if  (pieceType=="king"){
      legalSquares = getKingMoves(startingSquareId, pieceColor, boardSquaresArray);
      return legalSquares;
    }
}

function getPieceAtSquare(squareId, boardSquaresArray) {
    let currentSquare = boardSquaresArray.find(
      (element) => element.squareId === squareId
    );
    const color = currentSquare.pieceColor;
    const pieceType = currentSquare.pieceType;
    const pieceId=currentSquare.pieceId;
    return { pieceColor: color, pieceType: pieceType,pieceId:pieceId};
}

function getAllPossibleMoves(squaresArray, color) {
    return squaresArray
      .filter((square) => square.pieceColor === color)
      .flatMap((square) => {
        const { pieceColor,pieceType,pieceId } = getPieceAtSquare(square.squareId,squaresArray);
        if (pieceId === "blank") return [];
  
        let squaresArrayCopy = deepCopyArray(squaresArray);
        const pieceObject ={pieceColor:pieceColor,pieceType:pieceType,pieceId:pieceId}
  
        let legalSquares = getPossibleMoves(square.squareId, pieceObject, squaresArrayCopy);
        legalSquares = isMoveValidAgainstCheck(legalSquares, square.squareId, pieceColor,pieceType);
  
        return legalSquares;
      });
}

function isShortCastlePossible(pieceColor, boardSquaresArray){

  let  rank = pieceColor === "white" ? "1" : "8";
  let fSquare = boardSquaresArray.find(element=>element.squareId===`f${rank}`);
  let gSquare = boardSquaresArray.find(element=>element.squareId===`g${rank}`);
  if (fSquare.pieceColor !=="blank" || gSquare.pieceColor!=="blank" || kingHasMoved(pieceColor)||rookHasMoved(pieceColor,`h${rank}`)){
    return "blank";
  }

  return `g${rank}`;
}

function isLongCastlePossible (pieceColor, boardSquaresArray){
  let rank = pieceColor === "white" ? "1" : "8";
  let dSquare=boardSquaresArray.find(element=>element.squareId===`d${rank}`);
  let cSquare=boardSquaresArray.find(element=>element.squareId===`c${rank}`);
  let bSquare=boardSquaresArray.find(element=>element.squareId===`b${rank}`);

  if(dSquare.pieceColor !=="blank" || cSquare.pieceColor!=="blank"||bSquare.pieceColor!=="blank" || kingHasMoved(pieceColor)||rookHasMoved(pieceColor,`a${rank}`)){
    return "blank";
  }
  return `c${rank}`;
}