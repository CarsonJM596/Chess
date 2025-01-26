function getPawnMoves(startingSqId, pieceColor){//All legal pawn moves
    checkPawnDiagonalCaptures(startingSqId, pieceColor);
    checkPawnForwardMoves(startingSqId, pieceColor);
}
function checkPawnDiagonalCaptures(startingSqId, pieceColor) { //Checks for all legal diagonal captures
    const file = startingSqId.charAt(0);
    const rankNum = parseInt(startingSqId.charAt(1));
    const direct = pieceColor == "white" ? 1 : -1;

    for (let i = -1; i <= 1; i += 2) {
        const currFile = String.fromCharCode(file.charCodeAt(0) + i);
        const currRank = rankNum + direct;

        if (currFile >= "a" && currFile <= "h" && currRank >= 1 && currRank <= 8) {
            const currentSqId = currFile + currRank;
            const currentSq = document.getElementById(currentSqId);
            const sqContent = isSquareOcc(currentSq);

            if (sqContent != "blank" && sqContent != pieceColor) {
                legalSquares.push(currentSqId);
            }
        }
    }
}
function checkPawnForwardMoves(startingSqId, pieceColor) { //Checks for all legal forward moves
    const file = startingSqId.charAt(0);
    const rankNum = parseInt(startingSqId.charAt(1));
    const direct = pieceColor == "white" ? 1 : -1;

    let currRank = rankNum + direct;
    let currFile = file;
    let currentSqId = currFile + currRank;
    let currentSq = document.getElementById(currentSqId);
    let sqContent = isSquareOcc(currentSq);

    if (sqContent == "blank") {
        legalSquares.push(currentSqId);

        if ((pieceColor == "white" && rankNum == 2) || (pieceColor == "black" && rankNum == 7)) {
            currRank += direct;
            currentSqId = currFile + currRank;
            currentSq = document.getElementById(currentSqId);
            sqContent = isSquareOcc(currentSq);

            if (sqContent == "blank") {
                legalSquares.push(currentSqId);
            }
        }
    }
}