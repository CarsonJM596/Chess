function getPawnMoves(startSqId, pieceColor, boardSq) {
    let diagonalSq = checkPawnDiagonalCaptures(startSqId, pieceColor, boardSq);
    let forwardSq = checkPawnForward(startSqId, pieceColor, boardSq);
    let legalSquares = [...diagonalSq, ...forwardSq];
    return legalSquares;
}

function checkPawnDiagonalCaptures(startSqId, pieceColor, boardSq) {
    const file = startSqId.charAt(0);
    const rank = startSqId.charAt(1);
    const rankNum = parseInt(rank);
    let legalSquares = [];
    let currFile = file;
    let currRank = rankNum;
    let currSqId = currFile + currRank;

    const direction = pieceColor === "white" ? 1 : -1;
    if (!(rank === '8' && direction === 1) && !(rank === '1' && direction === -1)) {
        currRank += direction;
    }

    for (let i = -1; i <= 1; i += 2) {
        currFile = String.fromCharCode(file.charCodeAt(0) + i);
        if (currFile >= "a" && currFile <= "h" && currRank <= 8 && currRank >= 1) {
            currSqId = currFile + currRank;
            let currentSq = boardSq.find((element) => element.squareId === currSqId);
            if (currentSq) {
                let sqContent = currentSq.pieceColor;
                if (sqContent !== "blank" && sqContent !== pieceColor) {
                    legalSquares.push(currSqId);
                }
            }
        }
    }
    return legalSquares;
}

function checkPawnForward(startSqId, pieceColor, boardSq) {
    const file = startSqId.charAt(0);
    const rank = startSqId.charAt(1);
    const rankNum = parseInt(rank);
    let legalSquares = [];

    let currFile = file;
    let currRank = rankNum;
    let currSqId = currFile + currRank;

    const direction = pieceColor === "white" ? 1 : -1;
    currRank += direction;
    currSqId = currFile + currRank;

    // Check forward square
    let currSq = boardSq.find((element) => element.squareId === currSqId);
    let sqContent = currSq ? currSq.pieceColor : "blank";
    if (sqContent === "blank") {
        legalSquares.push(currSqId);

        // Check if pawn is on starting rank (2 for white, 7 for black) and can move two squares
        if ((pieceColor === "white" && rankNum === 2) || (pieceColor === "black" && rankNum === 7)) {
            currRank += direction;
            currSqId = currFile + currRank;
            currSq = boardSq.find((element) => element.squareId === currSqId);
            sqContent = currSq ? currSq.pieceColor : "blank";
            if (sqContent === "blank") {
                legalSquares.push(currSqId);
            }
        }
    }

    return legalSquares;
}

