let boardSq = [];
let whiteTurn = true;
let whiteKingSq = "e1";
let blackKingSq = "e8";
const squares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const pieceImg = document.getElementsByClassName("img");

function fillBoard(){
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

function setupBoardSq(){
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

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let [pieceId, startSqId] = data.split("|");
    let legalSquaresJson = ev.dataTransfer.getData("application/json");
    let legalSquares = JSON.parse(legalSquaresJson);

    const piece = document.getElementById(pieceId);
    const pieceColor = piece.getAttribute("color");
    const pieceType = piece.classList[1];

    const destSq = ev.currentTarget;
    let destSqId = destSq.id;

    legalSquares = isMoveValidInCheck(legalSquares, startSqId, pieceColor, pieceType);

    if (pieceType == "king") {
        let isCheck = isKingInCheck(destSqId, pieceColor, boardSq);
        if (isCheck) return;
        whiteTurn ? (whiteKingSq = destSqId) : (blackKingSq = destSqId);
    }
    let sqContent = getPieceAtSq(destSqId, boardSq);
    if (sqContent == "blank" && legalSquares.includes(destSqId)) {
        destSq.appendChild(piece);
        whiteTurn = !whiteTurn;
        updateBoardSq(startSqId, destSqId, boardSq);
        checkForMate();
        return;
    }
    if (sqContent != "blank" && legalSquares.includes(destSqId)) {
        let children = destSq.children;
        for (let i = 0; i < children.length; i++) {
            if (!children[i].classList.contains('coordinate')) {
                destSq.removeChild(children[i]);
            }
        }
        destSq.appendChild(piece);
        whiteTurn = !whiteTurn;
        updateBoardSq(startSqId, destSqId, boardSq);
        checkForMate();
        return;
    }
}

setupBoardSq();
setupPieces();
fillBoard();

function getPieceAtSq(SqId, boardSq) {
    let currSq = boardSq.find((element) => element.squareId === SqId); 
    const color = currSq.pieceColor;
    const pieceType = currSq.pieceType;
    const pieceId = currSq.pieceId;
    return { pieceColor: color, pieceType: pieceType, pieceId: pieceId };
}

function getLegalMoves(startSqId, piece, boardSq){
    const pieceColor = piece.pieceColor;
    const pieceType = piece.pieceType;

    let legalSquares = [];
    if (pieceType == "pawn"){
        legalSquares = getPawnMoves(startSqId, pieceColor, boardSq);
        return legalSquares;
    }

    if (pieceType == "knight"){
        legalSquares = getKnightMoves(startSqId, pieceColor, boardSq);
        return legalSquares;
    }

    if (pieceType == "rook"){
        legalSquares = getRookMoves(startSqId, pieceColor, boardSq);
        return legalSquares;
    }

    if (pieceType == "bishop"){
        legalSquares = getBishopMoves(startSqId, pieceColor, boardSq);
        return legalSquares;
    }

    if (pieceType == "Queen"){
        legalSquares = getQueenMoves(startSqId, pieceColor, boardSq);
        return legalSquares;
    }

    if (pieceType == "king"){
        legalSquares = getKingMoves(startSqId, pieceColor, boardSq);
        return legalSquares;
    }

}

function getAllLegalMoves(sqArray, color){
    return sqArray.filter((square) => square.pieceColor === color).flatMap((square) => {
            const { pieceColor, pieceType, pieceId } = getPieceAtSquare(square.squareId, sqArray);

            if (pieceId === "blank") return [];

            let boardSqCopy = deepCopyArray(sqArray);
            const pieceObj = { pieceColor, pieceType, pieceId };
            let legalSquares = getLegalMoves(square.squareId, pieceObj, boardSqCopy);
            
            legalSquares = isMoveValidAgainstCheck(legalSquares, square.squareId, pieceColor, pieceType);
            return legalSquares;
        });
        
}