// ********** app.js **********

let gridContainer = document.querySelector(".grid-container");

// obtaining buttons from HTML document

const btnStatic = document.getElementById('btnStatic');
const btnRainbow = document.getElementById('btnRainbow');
const btnEraser = document.getElementById('btnEraser');
const btnColor = document.getElementById('btnColor');
const sliderBar = document.getElementById('sliderBar');
const btnClear = document.getElementById('btnClear');
const iconRefresh = document.getElementById('iconRefresh');

//setting default grid settings

const defaultColor = btnColor.value;
const defaultMode = `static`;
btnStatic.classList.add("activeButton");

let currentMode = defaultMode;
let currentColor = defaultColor;


// obtaining grid value from the slider bar and displaying it on the web page

let dim = sliderBar.value;

const h2 = document.querySelector('h2');
const currentDim = h2.textContent = dim;

function currentGridSize(){
    let newSlider = document.getElementById('sliderBar');
    let newH2 = newSlider.value;
    h2.textContent = newH2;
};

// ---------- FUNCTIONS TO CHANGE COLOR MODES ----------

    // For each mode, the active class is added/removed for the active mode animation

function setStaticMode(){
    currentMode = `static`;
    btnStatic.classList.remove("activeButton");
    btnRainbow.classList.remove("activeButton");
    btnEraser.classList.remove("activeButton");
    btnStatic.classList.add("activeButton");
};

function setRainbowMode(){
    currentMode = `rainbow`;
    btnStatic.classList.remove("activeButton");
    btnRainbow.classList.remove("activeButton");
    btnEraser.classList.remove("activeButton");
    btnRainbow.classList.add("activeButton");
};

function setEraserMode(){
    currentMode = `eraser`;
    btnStatic.classList.remove("activeButton");
    btnRainbow.classList.remove("activeButton");
    btnEraser.classList.remove("activeButton");
    btnEraser.classList.add("activeButton");
};

// ---------- creating a grid with specified dimensions ----------

function createGrid(dim){
    gridContainer.style.gridTemplateColumns = `repeat(${dim}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${dim}, 1fr)`

    for(let i = 0; i < dim*dim; i++){
        let cell = document.createElement("div");
        cell.classList.add("grid-item");
        cell.addEventListener("mouseover", colorPicker)
        gridContainer.appendChild(cell);
    }
};

createGrid(dim);

// ---------- Setting the static color based on color picker value ----------

function setStaticColor(){
    let staticColorValue = btnColor.value;
    currentColor = staticColorValue;
};

function colorPicker(e){
    if (currentMode === 'rainbow'){
        const colorR = Math.floor(Math.random()*256);
        const colorG = Math.floor(Math.random()*256);
        const colorB = Math.floor(Math.random()*256);
        e.target.style.backgroundColor = `rgb(${colorR}, ${colorG}, ${colorB})`;
    } else if(currentMode === 'static'){
        e.target.style.backgroundColor = currentColor;
    } else if(currentMode === 'eraser'){
        e.target.style.backgroundColor = 'lightgray';
    }
};

// ---------- Clearing the grid completely ----------

function eraseColor(){
    let gridElement = gridContainer.querySelectorAll('.grid-item');
        //returns a nodelist
        //modern JS allows a forEach loop to loop over a nodelist
    gridElement.forEach(function(gridSquare){
        gridSquare.style.backgroundColor = 'lightgray';
    })
};


// Button Event Listeners

btnClear.addEventListener('click', eraseColor);
btnStatic.addEventListener('click', setStaticMode);
btnRainbow.addEventListener('click', setRainbowMode);
btnEraser.addEventListener('click', setEraserMode);
btnColor.addEventListener('change', setStaticColor);
sliderBar.addEventListener('change', currentGridSize);