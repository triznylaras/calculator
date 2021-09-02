var buttonsCont = document.getElementById("buttons-cont");


function setupButtons(rows, cols) {
  buttonsCont.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
  buttonsCont.style.gridTemplateRows = `repeat(${rows}, 1fr)`

  for (let i=0; i < rows*cols; i++) {
    const button = document.createElement('div')
    button.textContent = i + 1
    buttonsCont.appendChild(button).className = "button-item"
  }
}

setupButtons(5, 4)

function add(a, b) {
  console.log(a + b)
}

function substract(a, b) {
  console.log(a - b)
}

function multiply(a, b) {
  console.log(a * b)
}

function divide(a, b) {
  console.log(a / b)
}

function operate(a, b) {
  divide(a, b)
}