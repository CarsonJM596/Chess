function isMoveValidInCheck(legalSquares, startSqId, pieceColor, pieceType){

    let kingSq = whiteTurn ? whiteKingSq : blackKingSq;
    let boardSqCopy = deepCopyArray(boardSq);
    legalSquaresCopy = legalSquares.slice();

    legalSquaresCopy.array.forEach(element => {
        let destId = element;
        boardSqCopy = deepCopyArray(boardSq);
        updateBoardSq(startSqId, destId, boardSqCopy);
        if (pieceType != "king" && isKingInCheck(kingSq, pieceColor, boardSqCopy)){
            legalSquares = legalSquares.filter((item) => item !== destId);
        }
        if (pieceType == "king" && isKingInCheck(destId, pieceColor, boardSqCopy)) {
            legalSquares = legalSquares.filter((item) => item !== destId);
        }
    });

    return legalSquares;
}

function  isKingInCheck(SqId, pieceColor, boardSq){

    let legalSquares = getRookMoves(SqId, pieceColor, boardSq);
    for (let square of legalSquares){
        let pieceProp = getPieceAtSq(square, boardSq);
        if ((pieceProp.pieceType == "rook" || pieceProp.pieceType == "queen") && pieceColor != pieceProp.color){
            return true;
        }
    }

    legalSquares = getBishopMoves(SqId, pieceColor, boardSq);
    for (let square of legalSquares){
        let pieceProp = getPieceAtSq(square, boardSq);
        if ((pieceProp.pieceType == "bishop" || pieceProp.pieceType == "queen") && pieceColor != pieceProp.color){
            return true;
        }
    }

    legalSquares = getKnightMoves(SqId, pieceColor, boardSq);
    for (let square of legalSquares){
        let pieceProp = getPieceAtSq(square, boardSq);
        if ((pieceProp.pieceType == "knight") && pieceColor != pieceProp.color){
            return true;
        }
    }

    legalSquares = checkPawnDiagonalCaptures(SqId, pieceColor, boardSq);
    for (let square of legalSquares){
        let pieceProp = getPieceAtSq(square, boardSq);
        if ((pieceProp.pieceType == "knight") && pieceColor != pieceProp.color){
            return true;
        }
    }

    legalSquares = getKingMoves(SqId, pieceColor, boardSq);
    for (let square of legalSquares){
        let pieceProp = getPieceAtSq(square, boardSq);
        if ((pieceProp.pieceType == "king") && pieceColor != pieceProp.color){
            return true;
        }
    }
    
    return false;
}