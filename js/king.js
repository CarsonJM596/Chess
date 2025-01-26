function getKingMoves(startSqId, pieceColor, boardSq) {
    const file = startSqId.charCodeAt(0) - 97;
    const rank = startSqId.charAt(1);
    const rankNum = parseInt(rank);
    let currFile = file; 
    let currRank = rankNum;
    let legalSquares = [];

    const moves = [[0, 1], [0, -1], [1, 1], [1, -1], [-1, 0], [-1, -1], [-1, 1], [1, 0]];

    moves.forEach((move) => {
        currFile = file + move[0];
        currRank = rankNum + move[1];
        if (currFile >= 0 && currFile <= 7 && currRank > 0 && currRank <= 8) {
            let currentSqId = String.fromCharCode(currFile + 97) + currRank;
            let currSq = boardSq.find((element) => element.SqId === currentSqId);
            let sqContent = currSq.pieceColor;
            if (sqContent !== "blank" && sqContent === pieceColor) {
                return;
            }
            legalSquares.push(String.fromCharCode(currFile + 97) + currRank);
        }
    });

    return legalSquares;
}

function isMoveValidInCheck(legalSquares, startSqId, pieceColor, pieceType) {
    let kingSq = whiteTurn ? whiteKingSq : blackKingSq;
    let boardSqCopy = deepCopyArray(boardSq);
    let legalSquaresCopy = legalSquares.slice();

    legalSquaresCopy.forEach(element => {
        let destId = element;
        boardSqCopy = deepCopyArray(boardSq);
        updateBoardSq(startSqId, destId, boardSqCopy);
        if (pieceType !== "king" && isKingInCheck(kingSq, pieceColor, boardSqCopy)) {
            legalSquares = legalSquares.filter((item) => item !== destId);
        }
        if (pieceType === "king" && isKingInCheck(destId, pieceColor, boardSqCopy)) {
            legalSquares = legalSquares.filter((item) => item !== destId);
        }
    });

    return legalSquares;
}

function isKingInCheck(SqId, pieceColor, boardSq) {
    let legalSquares = getRookMoves(SqId, pieceColor, boardSq);
    for (let square of legalSquares) {
        let pieceProp = getPieceAtSq(square, boardSq);
        if ((pieceProp.pieceType === "rook" || pieceProp.pieceType === "queen") && pieceColor !== pieceProp.color) {
            return true;
        }
    }

    legalSquares = getBishopMoves(SqId, pieceColor, boardSq);
    for (let square of legalSquares) {
        let pieceProp = getPieceAtSq(square, boardSq);
        if ((pieceProp.pieceType === "bishop" || pieceProp.pieceType === "queen") && pieceColor !== pieceProp.color) {
            return true;
        }
    }

    legalSquares = getKnightMoves(SqId, pieceColor, boardSq);
    for (let square of legalSquares) {
        let pieceProp = getPieceAtSq(square, boardSq);
        if (pieceProp.pieceType === "knight" && pieceColor !== pieceProp.color) {
            return true;
        }
    }

    legalSquares = checkPawnDiagonalCaptures(SqId, pieceColor, boardSq);
    for (let square of legalSquares) {
        let pieceProp = getPieceAtSq(square, boardSq);
        if (pieceProp.pieceType === "pawn" && pieceColor !== pieceProp.color) {
            return true;
        }
    }

    legalSquares = getKingMoves(SqId, pieceColor, boardSq);
    for (let square of legalSquares) {
        let pieceProp = getPieceAtSq(square, boardSq);
        if (pieceProp.pieceType === "king" && pieceColor !== pieceProp.color) {
            return true;
        }
    }

    return false;
}

function checkForMate() {
    let kingSq = whiteTurn ? whiteKingSq : blackKingSq;
    let pieceColor = whiteTurn ? "white" : "black";
    let boardSqCopy = deepCopyArray(boardSq);
    let kingInCheck = isKingInCheck(kingSq, pieceColor, boardSqCopy);

    if (!kingInCheck) return;
    let legalMoves = getLegalMoves(boardSqCopy, pieceColor);
    if (legalMoves.length > 0) return;

    let msg = "";
    whiteTurn ? (msg = "Black Wins!") : (msg = "White Wins!");
    alert(msg);  // or use showAlert(msg);
}
