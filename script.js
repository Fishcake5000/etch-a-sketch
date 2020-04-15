function random(number) { //Returns a random whole n w/ 0<= n <number
    return Math.floor(Math.random()*number);
}

function colourIn(event) {
    event.target.style.backgroundColor = `rgb( ${random(256)}, ${random(256)}, ${random(256)} )`;
}

function resetGrid() {
    container.textContent = '';
    let numberSquares = window.prompt('How many squares per side ?');
    let columnSet = '';
    for (let i = 1; i<=numberSquares; i++) {columnSet += '1fr '}
    container.style.gridTemplateRows = columnSet;
    container.style.gridTemplateColumns = columnSet;
    for (let i = 1; i<=numberSquares;i++) {
        for (let j = 1; j<=numberSquares; j++) {
            const gridSquare = document.createElement('div');
            gridSquare.id = `${(i-1)*numberSquares+j}`;
            gridSquare.classList.add('grid-square');
            container.appendChild(gridSquare);
            gridSquare.addEventListener('mouseenter',colourIn);
        }
    }
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

const reset = document.querySelector('#reset');
reset.addEventListener('click',resetGrid);