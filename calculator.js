let currentOperation = null
let shouldResetScreen = false
let firstOperand = ''
let secondOperand = ''

var display = document.getElementById("calc-display")
var firstDisplay = document.getElementById("first-display")
var secondDisplay = document.getElementById("second-display")
var buttonsCont = document.getElementById("buttons-cont")
var numberButtons = document.querySelectorAll('[data-number]')
var operatorButtons = document.querySelectorAll('[data-operator]')
var equalsButton = document.getElementById("equals-btn")
var pointButton = document.getElementById("point-btn")
var clearButton = document.getElementById("clear-btn")
var deleteButton = document.getElementById("delete-btn")

numberButtons.forEach((button) =>
button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
button.addEventListener('click', () => setOperation(button.textContent))
)

equalsButton.addEventListener('click', calculate)
clearButton.addEventListener('click', clear)

function appendNumber(number) {
  if (firstDisplay.textContent === '0' || shouldResetScreen) resetScreen()
  firstDisplay.textContent += number
}

function resetScreen() {
  firstDisplay.textContent = ''
  shouldResetScreen = false
}

function clear() {
  firstDisplay.textContent = '0'
  secondDisplay.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function setOperation(operator) {
  if (currentOperation !== null) calculate()
  firstOperand = firstDisplay.textContent
  currentOperation = operator
  firstDisplay.textContent = `${firstOperand}${currentOperation}`
  shouldResetScreen = true
}

function calculate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && firstDisplay.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = firstDisplay.textContent
  secondDisplay.textContent = operate(currentOperation, firstOperand, secondOperand)
  firstDisplay.textContent = `${firstOperand}${currentOperation}${secondOperand}`
  currentOperation = null
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  
  switch (operator) {
    case '+':
      return add(a, b)
    case '-':
      return substract(a, b)
    case '÷':
      return divide(a, b)
    case 'x':
      return multiply(a, b)
    default:
      return null
  }
}