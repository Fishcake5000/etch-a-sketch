function random(number) { //Returns a random whole n w/ 0<= n <number
    return Math.floor(Math.random()*number);
}

function extractRGBvalues(str) {
    let rIndex = str.indexOf(`(`) + 1;
    let gIndex = str.indexOf(`,`) + 2;
    let bIndex = str.indexOf(`,`,gIndex) + 2;
    let r = str.slice(rIndex,gIndex-2);
    let g = str.slice(gIndex,bIndex-2);
    let b = str.slice(bIndex,-1);
    return [r, g, b];
}

function RGBtoHSL(colourIndex) {
    let r = colourIndex[0];
    let g = colourIndex[1];
    let b = colourIndex[2];
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (delta == 0) {
        h = 0;
    } else {
        switch (cmax) {
            case r:
                h = ((g - b) / delta) % 6;
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            case b:
                h = (r - g) / delta + 4;
                break;
        }
    }
    h = Math.round(h * 60);
    // Make negative hues positive behind 360°
    if (h < 0) {
        h += 360;
    }
    // Calculate lightness
    l = (cmax + cmin) / 2;
    // Calculate saturation
    s = (delta == 0) ? 0 : delta / (1 - Math.abs(2 * l - 1));
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return [h, s, l];
}

function HSLtoString(colourIndex) {
    return `hsl(${colourIndex[0]}, ${colourIndex[1]}%, ${colourIndex[2]}%)`;
}

function darkenHSL(colourIndex) {
    if (colourIndex[2] >= 5) {
        colourIndex[2] = colourIndex[2] - 5;
    } else {
        colourIndex[2] = 0;
    }
    return colourIndex;
}

function darkenRGB(colourString) {
    let colourIndex = extractRGBvalues(colourString);
    colourIndex = RGBtoHSL(colourIndex);
    colourIndex = darkenHSL(colourIndex);
    return HSLtoString(colourIndex);
}

function colourIn(event) {
    if (event.target.style.backgroundColor == '') {
        event.target.style.backgroundColor = `hsl(${random(360)}, 100%, 50%)`;
    } else {
        event.target.style.backgroundColor = darkenRGB(event.target.style.backgroundColor);
    }
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