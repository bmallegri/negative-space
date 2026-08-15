const puzzleContainer = document.getElementById("puzzle-container");

const puzzlePieces = [
    { x: 25, y: 25 },
    { x: 35, y: 25 },
    { x: 45, y: 25 },
    { x: 25, y: 35 },
    { x: 35, y: 35 },
    { x: 45, y: 35 }
];

puzzlePieces.forEach((position, index) => {
    createPuzzlePiece(position, index);
});


function createPuzzlePiece(position, index) {

    const piece = document.createElement("div");

    piece.classList.add("puzzle-piece", "entering");
    setTimeout(() => {
        piece.classList.remove("entering");
    }, 1500);
    piece.style.left = `${position.x}%`;
    piece.style.top = `${position.y}%`;

    // Stagger the pieces
    piece.style.animationDelay = `${index * 0.5}s`;

    piece.innerHTML = `
        <svg viewBox="0 0 100 100">

            <path
                d="
                M10 10
                H40

                C40 0, 60 0, 60 10

                H90
                V40

                C100 40, 100 60, 90 60

                V90
                H60

                C60 100, 40 100, 40 90

                H10
                V60

                C0 60, 0 40, 10 40

                Z
                "

                fill="rgba(159,192,202,.04)"
                stroke="rgba(159,192,202,.5)"
                stroke-width="2"
            />

        </svg>
    `;

    puzzleContainer.appendChild(piece);

    makeDraggable(piece, position);
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

        piece.style.left = `${rect.left}px`;
        piece.style.top = `${rect.top}px`;
    });


    piece.addEventListener("pointermove", (event) => {

        if (!dragging) return;

        piece.style.left =
            `${event.clientX - offsetX}px`;

        piece.style.top =
            `${event.clientY - offsetY}px`;
    });


    piece.addEventListener("pointerup", (event) => {

        dragging = false;

        piece.releasePointerCapture(event.pointerId);

        piece.classList.remove("dragging");

        // Return to original location
        piece.style.left = `${originalPosition.x}%`;
        piece.style.top = `${originalPosition.y}%`;
    });
}
piece.addEventListener("pointerup", (event) => {

    dragging = false;

    piece.releasePointerCapture(event.pointerId);

    piece.classList.remove("dragging");

    piece.style.left = `${originalPosition.x}%`;
    piece.style.top = `${originalPosition.y}%`;
});