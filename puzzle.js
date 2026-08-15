const puzzleContainer = document.getElementById("puzzle-container");

const puzzlePieces = [
    { x: 300, y: 200, top: 0,  right: 1,  bottom: 1,  left: 0 },
    { x: 400, y: 200, top: 0,  right: -1, bottom: -1, left: -1 },
    { x: 500, y: 200, top: 0,  right: 0,  bottom: 1,  left: 1 },

    { x: 300, y: 300, top: -1, right: 1,  bottom: 0,  left: 0 },
    { x: 400, y: 300, top: 1,  right: -1, bottom: 0,  left: -1 },
    { x: 500, y: 300, top: -1, right: 0,  bottom: 0, left: 1 }
];

puzzlePieces.forEach((position, index) => {
    createPuzzlePiece(position, index);
});


function createPuzzlePiece(position, index) {

    const piece = document.createElement("div");

    piece.classList.add("puzzle-piece", "entering");

    piece.style.left = `${position.x}px`;
    piece.style.top = `${position.y}px`;

    piece.style.animationDelay = `${index * 0.4}s`;

    piece.innerHTML = `
        <svg viewBox="0 0 100 100">
            <path
                d="${createPuzzlePath(position)}"
                fill="rgba(159,192,202,.04)"
                stroke="rgba(159,192,202,.5)"
                stroke-width="2"
            />
        </svg>
    `;

    puzzleContainer.appendChild(piece);

    setTimeout(() => {
        piece.classList.remove("entering");
    }, 1500 + index * 400);

    makeDraggable(piece, position);
}
function createPuzzlePath(piece) {

    let path = "M 0 0 ";

    // TOP
    if (piece.top === 0) {
        path += "L 100 0 ";
    }

    else if (piece.top === 1) {
        path += `
            L 40 0
            C 40 -12, 60 -12, 60 0
            L 100 0
        `;
    }

    else {
        path += `
            L 40 0
            C 40 12, 60 12, 60 0
            L 100 0
        `;
    }


    // RIGHT
    if (piece.right === 0) {
        path += "L 100 100 ";
    }

    else if (piece.right === 1) {
        path += `
            L 100 40
            C 112 40, 112 60, 100 60
            L 100 100
        `;
    }

    else {
        path += `
            L 100 40
            C 88 40, 88 60, 100 60
            L 100 100
        `;
    }


    // BOTTOM
    if (piece.bottom === 0) {
        path += "L 0 100 ";
    }

    else if (piece.bottom === 1) {
        path += `
            L 60 100
            C 60 112, 40 112, 40 100
            L 0 100
        `;
    }

    else {
        path += `
            L 60 100
            C 60 88, 40 88, 40 100
            L 0 100
        `;
    }


    // LEFT
    if (piece.left === 0) {
        path += "Z";
    }

    else if (piece.left === 1) {
        path += `
            L 0 60
            C -12 60, -12 40, 0 40
            L 0 0
            Z
        `;
    }

    else {
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

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        // Convert to coordinates relative to the puzzle container
        const containerRect = puzzleContainer.getBoundingClientRect();

        piece.style.left =
            `${rect.left - containerRect.left}px`;

        piece.style.top =
            `${rect.top - containerRect.top}px`;
    });

    piece.addEventListener("pointermove", (event) => {

        if (!dragging) return;

        const containerRect = puzzleContainer.getBoundingClientRect();

        piece.style.left =
            `${event.clientX - containerRect.left - offsetX}px`;

        piece.style.top =
            `${event.clientY - containerRect.top - offsetY}px`;
    });

    piece.addEventListener("pointerup", (event) => {

        dragging = false;

        piece.releasePointerCapture(event.pointerId);

        piece.classList.remove("dragging");

        // Float back to its original position
        piece.style.left = `${originalPosition.x}px`;
        piece.style.top = `${originalPosition.y}px`;
    });
}