const puzzleContainer = document.getElementById("puzzle-container");
const puzzlePieces = [];
const columns = 4;
const rows = 3;
const pieceSize = 100;
const startX = 0;
const startY = 50;
for (let row = 0; row < rows; row++){
    for (let col = 0; col < columns;col++){
        const piece = {
            x: startX + col * pieceSize,
            y: startY + row * pieceSize,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
        if (row > 0) {
            piece.top = -puzzlePieces[
                (row - 1) * columns + col
            ].bottom;
        }
        if (col > 0) {
            piece.left = -puzzlePieces[
                row * columns + (col - 1)
            ].right;
        }
        if (col < columns - 1) {
            piece.right = Math.random() < 0.5 ? 1 : -1;
        }
        if (row < rows - 1) {
            piece.bottom = Math.random() < 0.5 ? 1 : -1;
        }
        puzzlePieces.push(piece);
    }
}
let piecesShown = 0;
function updatePuzzle(timeLeft, totalTime) {
    const elapsed = totalTime - timeLeft;
    const pieceInterval = totalTime / puzzlePieces.length;
    const shouldBeShown = Math.min(
        Math.floor(elapsed / pieceInterval) + 1,
        puzzlePieces.length
    );
    while (piecesShown < shouldBeShown) {
        createPuzzlePiece(
            puzzlePieces[piecesShown],
            piecesShown
        );
        piecesShown++;
    }
}
function createPuzzlePiece(position, index) {
    const piece = document.createElement("div");
    piece.classList.add(
        "puzzle-piece",
        "entering"
    );
    const directions = [
        { x: "-500px", y: "-300px" },
        { x: "0px", y: "-400px" },
        { x: "500px", y: "-300px" },
        { x: "-600px", y: "0px" },
        { x: "600px", y: "0px" },
        { x: "-500px", y: "300px" },
        { x: "0px", y: "400px" },
        { x: "500px", y: "300px" },
        { x: "-700px", y: "-150px" },
        { x: "700px", y: "-150px" },
        { x: "-700px", y: "150px" },
        { x: "700px", y: "150px" }
    ];
    piece.style.setProperty(
        "--start-x",
        directions[index].x
    );
    piece.style.setProperty(
        "--start-y",
        directions[index].y
    );
    piece.style.left = `${position.x}px`;
    piece.style.top = `${position.y}px`;
    piece.innerHTML = `
        <svg
            viewBox="0 0 100 100"
            width="100"
            height="100"
        >
            <path
                d="${createPuzzlePath(position)}"
                fill="rgba(159,192,202,.04)"
                stroke="rgba(159,192,202,.5)"
                stroke-width="2"
            />
        </svg>
    `;
    puzzleContainer.appendChild(piece);
    makeDraggable(piece, position);
}
function createPuzzlePath(piece) {
    let path = "M 0 0 ";
    if (piece.top === 0) {
        path += "L 100 0 ";
    } else if (piece.top === 1) {
        path += `
            L 40 0
            C 40 -12, 60 -12, 60 0
            L 100 0
        `;
    } else {
        path += `
            L 40 0
            C 40 12, 60 12, 60 0
            L 100 0
        `;
    }
    if (piece.right === 0) {
        path += "L 100 100 ";
    } else if (piece.right === 1) {
        path += `
            L 100 40
            C 112 40, 112 60, 100 60
            L 100 100
        `;
    } else {
        path += `
            L 100 40
            C 88 40, 88 60, 100 60
            L 100 100
        `;
    }
    if (piece.bottom === 0) {
        path += "L 0 100 ";
    } else if (piece.bottom === 1) {
        path += `
            L 60 100
            C 60 112, 40 112, 40 100
            L 0 100
        `;
    } else {
        path += `
            L 60 100
            C 60 88, 40 88, 40 100
            L 0 100
        `;
    }
    if (piece.left === 0) {
        path += "Z ";
    } else if (piece.left === 1) {
        path += `
            L 0 60
            C -12 60, -12 40, 0 40
            L 0 0
            Z
        `;
    } else {
        path += `
            L 0 60
            C 12 60, 12 40, 0 40
            L 0 0
            Z
        `;
    }
    return path;
}
function makeDraggable(piece, originalPosition) {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    piece.addEventListener("pointerdown", (event) => {
        dragging = true;
        piece.classList.add("dragging");
        piece.setPointerCapture(event.pointerId);
        const rect = piece.getBoundingClientRect();
        const containerRect =
            puzzleContainer.getBoundingClientRect();
        offsetX =
            event.clientX - rect.left;
        offsetY =
            event.clientY - rect.top;
        piece.style.left =
            `${rect.left - containerRect.left}px`;
        piece.style.top =
            `${rect.top - containerRect.top}px`;
    });
    piece.addEventListener("pointermove", (event) => {
        if (!dragging) return;
        const containerRect =
            puzzleContainer.getBoundingClientRect();
        piece.style.left =
            `${event.clientX -
                containerRect.left -
                offsetX}px`;
        piece.style.top =
            `${event.clientY -
                containerRect.top -
                offsetY}px`;
    });
    piece.addEventListener("pointerup", (event) => {
        dragging = false;
        if (
            piece.hasPointerCapture(event.pointerId)
        ) {
            piece.releasePointerCapture(
                event.pointerId
            );
        }
        piece.classList.remove("dragging");
        piece.style.left =
            `${originalPosition.x}px`;
        piece.style.top =
            `${originalPosition.y}px`;
    });
}