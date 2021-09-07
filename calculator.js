let currentOperation = null
let shouldResetScreen = false

var display = document.getElementById("calc-display")
var buttonsCont = document.getElementById("buttons-cont")
var numberButtons = document.querySelectorAll('[data-number]')
var operatorButtons = document.querySelectorAll('[data-operator]')

numberButtons.forEach((button) =>
button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetScreen) resetScreen
  display.textContent += number
}

function resetScreen() {
  display.textContent = ''
  shouldResetScreen = false
}

function setOperation(operator) {
  firstOperand = display.textContent
  currentOperation = operator
  display.textContent = `${firstOperand}${currentOperation}`
  shouldResetScreen = true
}

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
  a = Number(a)
  b = Number(b)
  
}