function getRookMoves(startingSqId, pieceColor){
    moveToEigthRank(startingSqId, pieceColor);
    moveToFirstRank(startingSqId, pieceColor);
    moveToAFile(startingSqId, pieceColor);
    moveToHFile(startingSqId, pieceColor);
}

function moveToEigthRank(startingSqId, pieceColor){
    const file = startingSqId.charAt(0);
    const rank = startingSqId.charAt(1);
    const rankNum = parseInt(rank);
    let currRank = rankNum;
    while (currRank != 8){
        currRank++;
        let currentSqId = file + currRank;
        let currentSq = document.getElementById(currentSqId);
        let sqContent = isSquareOcc(currentSq);
        if(sqContent != "blank" && sqContent == pieceColor){
            return;
        }
        legalSquares.push(currentSqId);
        if(sqContent != "blank" && sqContent == pieceColor){
            return;
        }
    }
    return;
}

function moveToFirstRank(startingSqId, pieceColor){
    const file = startingSqId.charAt(0);
    const rank = startingSqId.charAt(1);
    const rankNum = parseInt(rank);
    let currRank = rankNum;
    while (currRank != 1){
        currRank--;
        let currentSqId = file + currRank;
        let currentSq = document.getElementById(currentSqId);
        let sqContent = isSquareOcc(currentSq);
        if(sqContent != "blank" && sqContent == pieceColor){
            return;
        }
        legalSquares.push(currentSqId);
        if(sqContent != "blank" && sqContent == pieceColor){
            return;
        }
    }
    return;
}

function moveToAFile(startingSqId, pieceColor) {
    const file = startingSqId.charAt(0); 
    const rank = startingSqId.charAt(1); 
    let currFile = file.charCodeAt(0); 
    while (currFile > 'a'.charCodeAt(0)) { 
        currFile--; 
        let currentSqId = String.fromCharCode(currFile) + rank; 
        let currentSq = document.getElementById(currentSqId); 
        let sqContent = isSquareOcc(currentSq); 

        if (sqContent != "blank" && sqContent == pieceColor) {
            return; 
        }
        legalSquares.push(currentSqId); 

        if (sqContent != "blank" && sqContent != pieceColor) {
            return; 
        }
    }
}

function moveToHFile(startingSqId, pieceColor) {
    const file = startingSqId.charAt(0); 
    const rank = startingSqId.charAt(1); 
    let currFile = file.charCodeAt(0); 

    while (currFile < 'h'.charCodeAt(0)) { 
        currFile++; 
        let currentSqId = String.fromCharCode(currFile) + rank; 
        let currentSq = document.getElementById(currentSqId); 
        let sqContent = isSquareOcc(currentSq); 

        if (sqContent != "blank" && sqContent == pieceColor) {
            return; 
        }
        legalSquares.push(currentSqId); 

        if (sqContent != "blank" && sqContent != pieceColor) {
            return; 
        }
    }
}