function colourIn(event) {
    event.target.classList.add('coloured');
}

const container = document.querySelector('#container');
for (let i = 1; i<=16;i++) {
    for (let j = 1; j<=16; j++) {
        const gridSquare = document.createElement('div');
        gridSquare.id = `${(i-1)*16+j}`;
        gridSquare.classList.add('grid-square');
        container.appendChild(gridSquare);
        gridSquare.addEventListener('mouseenter',colourIn);
    }
}