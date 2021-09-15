let currentOperation = null
let currentCalculation = null
let shouldResetScreen = false
let firstOperand = ""
let secondOperand = ""
let operatorData = Array()
let numberData = Array()

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
button.addEventListener('click', () => appendOperator(button.textContent))
)

clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteOperation)
equalsButton.addEventListener('click', calculate)

/** to populate operator data */
for (let i=0; i<operatorButtons.length; i++) {
  operatorData.push(operatorButtons[i].innerHTML)
}
/** to populate number data */
for (let i=0; i<numberButtons.length; i++) {
  numberData.push(numberButtons[i].innerHTML)
}

function appendNumber(number) {
  if (secondDisplay.textContent === '0' || shouldResetScreen)
    resetScreen()
  secondDisplay.textContent += number
}

function appendOperator(operator) {
  if (currentOperation !== null) calculate()
  firstOperand = secondDisplay.textContent
  currentOperation = operator
  firstDisplay.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

function resetScreen() {
  secondDisplay.textContent = ''
  shouldResetScreen = false
} 

function clear() {
  secondDisplay.textContent = '0'
  firstDisplay.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function deleteOperation() {
  secondDisplay.textContent = secondDisplay.textContent.slice(0, -1)
}

function calculate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && secondDisplay.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = secondDisplay.textContent
  secondDisplay.textContent = operate(currentOperation, firstOperand, secondOperand)
  firstDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
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