let legalSquares = []; //All legal squares to go to 
let whiteTurn = true; //White always goes first in the beginning
const boardSquares = document.getElementsByClassName("square"); 
const pieces = document.getElementsByClassName("piece");
const pieceImages = document.getElementsByTagName("img");

setupBoardSquares();
setupPieces();

function setupBoardSquares(){ //Sets up the board and allows pieces to be dropped on squares
    for (let i = 0; i < boardSquares.length; i++) {
        boardSquares[i].addEventListener("dragover", allowDrop);
        boardSquares[i].addEventListener("drop", drop);
        let row = 8 - Math.floor(i / 8);
        let column = String.fromCharCode(97 + (i % 8));
        let square = boardSquares[i]; 
        square.id = column + row;
    }
}

function setupPieces(){ //Sets up the pieces & piece images and allows pieces to be dragged 
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener("dragstart", drag);
        pieces[i].setAttribute("draggable", true);
        pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
    }
    for (let i = 0; i < Math.min(pieces.length, pieceImages.length); i++) {
        pieceImages[i].setAttribute("draggable", false);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) { //Drag event 
    const piece = ev.target;
    const pieceColor = piece.getAttribute("color");
    if ((whiteTurn && pieceColor == "white")||(!whiteTurn && pieceColor == "black")){
        ev.dataTransfer.setData("text", piece.id);
        const startingSqId = piece.parentNode.id;
        getLegalMoves(startingSqId, piece);
    }
}

function drop(ev) { //Drop event
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    const piece = document.getElementById(data);
    const destinationSq = ev.currentTarget;
    let destinationSqId = destinationSq.id;
    if ((isSquareOcc(destinationSq) =="blank") && (legalSquares.includes(destinationSqId))){
        destinationSq.appendChild(piece);
        whiteTurn = !whiteTurn; //Switches turns
        legalSquares.length = 0;
        return;
    }
    if ((isSquareOcc(destinationSq) !="blank") && (legalSquares.includes(destinationSqId))){
        while (destinationSq.firstChild){
            destinationSq.removeChild(destinationSq.firstChild);
        }
        destinationSq.appendChild(piece);
        whiteTurn = !whiteTurn; //Switches turns
        legalSquares.length = 0;
        return;
    }
}
function getLegalMoves(startingSqId, piece){ //Gets all legal moves for all pieces
    const pieceColor = piece.getAttribute("color");
    if (piece.classList.contains("pawn")){
        getPawnMoves(startingSqId, pieceColor);
    }
    if (piece.classList.contains("knight")){
        getKnightMoves(startingSqId, pieceColor);
    }
    if (piece.classList.contains("rook")){
        getRookMoves(startingSqId, pieceColor);
    }
}
function isSquareOcc(square){//Returns what piece color square is occupied by 
    if (square.querySelector(".piece")){
        const color = square.querySelector(".piece").getAttribute("color");
        return color;
    } else {return "blank";}
}