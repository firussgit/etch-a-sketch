// Selecting elements
const screen = document.querySelector(".screen")
const eraser = document.querySelector(".eraser")
const clear = document.querySelector(".clear")
const sizeSlider = document.querySelector("#sizeSlider")
const modeText = document.querySelector(".info h2 span")

let currentSize = sizeSlider.value

// Tracking drawing state
let isDrawing = false

// Creating the initial grid
initGrid(currentSize)

// Initializing the grid
function initGrid(size) {
    // Clear the screen
    screen.innerHTML = ""

    // Set the CSS grid properties
    screen.style.gridTemplateColumns = `repeat(${size}, auto)`
    screen.style.gridTemplateRows = `repeat(${size}, auto)`

    // Create the grid cells
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        screen.appendChild(cell)
    }

    // Add event listeners to the cells
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", mouseIsOver)
        cell.addEventListener("mousedown", mouseIsDown)
        cell.addEventListener("mouseup", mouseIsUp)
    })
}

// Handling mouseover event
function mouseIsOver(e) {
    if (isDrawing) {
        if (eraser.classList.contains("active")) {
            e.target.style.backgroundColor = "white"
        } else {
            e.target.style.backgroundColor = "black"
        }
    }
}

// Handling mousedown event
function mouseIsDown(e) {
    isDrawing = true
    if (eraser.classList.contains("active")) {
        e.target.style.backgroundColor = "white"
    } else {
        e.target.style.backgroundColor = "black"
    }
}

// Handling mouseup event
function mouseIsUp() {
    isDrawing = false
}

// Event listener for size slider
sizeSlider.addEventListener("input", () => {
    currentSize = sizeSlider.value
    document.querySelector(".sizeValue").textContent = `${currentSize} x ${currentSize}`
    initGrid(currentSize)
})

// Event listener for eraser and clear button
eraser.addEventListener("click", () => {
    eraser.classList.toggle("active")
    if (eraser.classList.contains("active")) {
        modeText.textContent = "Erase"
    } else {
        modeText.textContent = "Draw"
    }
})

clear.addEventListener("click", clearGrid)

// Clear the grid
function clearGrid() {
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell) => {
        cell.style.backgroundColor = ""
    })
}