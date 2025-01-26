let boardSq = [];
let whiteTurn = true;
let whiteKingSq = "e1";
let blackKingSq = "e8";
const squares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const pieceImg = document.getElementsByClassName("img");

function fillBoard() {
    for (let i = 0; i < squares.length; i++) {
        let row = 8 - Math.floor(i / 8); 
        let column = String.fromCharCode(97 + (i % 8)); 
        let square = squares[i];
        square.id = column + row;

        let color = "blank";
        let pieceType = "blank";
        let pieceId = "blank";

        if (square.querySelector(".piece")) {
            const piece = square.querySelector(".piece");
            color = piece.getAttribute("color");
            pieceType = piece.classList[1];
            pieceId = piece.id;
        }

        let elementArr = { squareId: square.id, pieceColor: color, pieceType: pieceType, pieceId: pieceId };
        boardSq.push(elementArr);
    }
}

function updateBoardSq(currSqId, destSqId, boardSq) {
    let currentSq = boardSq.find((element) => element.squareId === currSqId);
    let destSqElm = boardSq.find((element) => element.squareId === destSqId);

    if (currentSq && destSqElm) {
        destSqElm.pieceColor = currentSq.pieceColor;
        destSqElm.pieceType = currentSq.pieceType;
        destSqElm.pieceId = currentSq.pieceId;

        currentSq.pieceColor = "blank";
        currentSq.pieceType = "blank";
        currentSq.pieceId = "blank";
    }
}

function deepCopyArray(array) {
    return array.map(element => ({ ...element }));
}

function setupBoardSq() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("dragover", allowDrop);
        squares[i].addEventListener("drop", drop);

        let row = 8 - Math.floor(i / 8);
        let column = String.fromCharCode(97 + (i % 8));
        squares[i].id = column + row;
    }
}

function setupPieces() {
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener("dragstart", drag);
        pieces[i].setAttribute("draggable", true);
        pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
    }
    for (let i = 0; i < pieceImg.length; i++) {
        pieceImg[i].setAttribute("draggable", false);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const piece = ev.target;
    const pieceColor = piece.getAttribute("color");
    const pieceType = piece.classList[1];
    const pieceId = piece.id;

    if ((whiteTurn && pieceColor === "white") || (!whiteTurn && pieceColor === "black")) {
        const startSqId = piece.parentNode.id;
        ev.dataTransfer.setData("text", pieceId + "|" + startSqId);

        const pieceObj = { pieceColor: pieceColor, pieceType: pieceType, pieceId: pieceId };
        let legalSquares = getLegalMoves(startSqId, pieceObj, boardSq); 

        let legalSquaresJson = JSON.stringify(legalSquares);
        ev.dataTransfer.setData("application/json", legalSquaresJson);
    }
}

// Initialize the board
setupBoardSq();
setupPieces();
fillBoard();

