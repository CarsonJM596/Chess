function getKnightMoves(startingSqId, pieceColor) {
    const file = startingSqId.charCodeAt(0) - 97;
    const rank = parseInt(startingSqId.charAt(1), 10);
    const rankNum = parseInt(rank);
    let currFile = file;
    let currRank = rank;

    const moves = [
        [-2, 1],
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
    ];

    moves.forEach((move) => {
        currFile = file + move[0];
        currRank = rankNum + move[1]
        if((currFile >= 0 && currFile <= 7) &&(currRank >= 0 && currRank <= 8)){
            let currentSqId = String.fromCharCode(currFile+97)+currRank;
            let currentSq = document.getElementById(currentSqId);
            let sqContent = isSquareOcc(currentSq);
            if (sqContent != "blank" && sqContent == pieceColor){
                return;
            }
            legalSquares.push(String.fromCharCode(currFile+97)+currRank);
        }
    });
    
}