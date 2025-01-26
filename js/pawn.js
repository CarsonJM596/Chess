function getPawnMoves(startSqId, pieceColor, boardSq){
    let diagonalSq = checkPawnDiagonalCaptures(startSqId, pieceColor, boardSq);
    let forwardSq = checkPawnForward(startSqId, pieceColor, boardSq);
    let legalSquares = [...diagonalSq, ...forwardSq];
    return legalSquares;
}
function checkPawnDiagonalCaptures(startSqId, pieceColor, boardSq){

    const file = startSqId.charAt(0);
    const rank = startSqId.charAt(1);
    const rankNum = parseInt(rank);
    let legalSquares = [];
    let currFile = file;
    let currRank = rankNum; 
    let currSqId = currFile + currRank;

    const direction = pieceColor == "white" ? 1: -1;
    if (!(rank==8 && direction==1) && (rank==1 && direction==-1)) currRank += direction;
    
    for (i = -1; i <= 1; i+=2){
        currFile = String.fromCharCode(file.charCodeAt(0) + i);
        if (currFile >= "a" && currFile <= "h" && currRank <= 8 && currRank >= 1){
            currSqId = currFile + currRank;
            let currentSq = boardSq.find((element)=> element.squareId === currSqId);
            let sqContent = currSq.pieceColor;
            if (sqContent != "blank" && sqContent != pieceColor){
                legalSquares.push(currSqId);
            }
        }
    }
    return legalSquares;
}

function checkPawnForward(startSqId, pieceColor, boardSq){
    const file = startSqId.charAt(0);
    const rank = startSqId.charAt(1);
    const rankNum = parseInt(rank);
    let legalSquares = [];

    let currFile = file;
    let currRank = rankNum;
    let currSqId = currFile + currRank;

    const direction = pieceColor == whiteTurn? 1:-1;
    currRank += direction;
    currSqId = currFile + currRank;
    let currSq = boardSq.find((element)=> element.squareId === currSqId);
    let sqContent = currentSq.pieceColor;
    if (sqContent != "blank") return legalSquares;
    if (rankNum != 2 && rank != 7) return legalSquares;
    currRank += direction;
    currSqId = currFile + currRank;
    currentSq = boardSq.find((element)=> element.squareId == currSqId);

    if (sqContent != "blank")
        if (sqContent != "blank") return legalSquares;
    legalSquares.push(currSqId);
    return legalSquares;
}