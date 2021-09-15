let currentOperation = null
let currentCalculation = null
let shouldResetScreen = false
let firstOperand = ""
let secondOperand = ""
let displayValue = ""
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

// firstDisplay.addEventListener("DOMCharacterDataModified", calculateChanges)

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    displayValue = mutation.target.innerHTML
    if (!displayValue.indexOf(operatorData) > 1) {
      calculateChanges()
    } else {
      displayValue = firstOperand + currentOperation
      calculateChanges()
    }
  })
})

var config = { attributes: true, childList: true, characterData: true }
observer.observe(firstDisplay, config)

clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteOperation)
equalsButton.addEventListener('click', calculate)

for (let i=0; i<operatorButtons.length; i++) {
  operatorData.push(operatorButtons[i].innerHTML)
}

for (let i=0; i<numberButtons.length; i++) {
  numberData.push(numberButtons[i].innerHTML)
}

function calculateChanges() {
  var splitOperation = displayValue.split(currentOperation)
  secondOperand = splitOperation[1]
  if (firstOperand === "" || firstOperand === null) {
    firstOperand = splitOperation[0]
  } else {
    secondDisplay.textContent = ""
    displayValue = firstOperand + currentOperation
    firstDisplay.textContent = displayValue + secondOperand
  }
  if (secondOperand !== "" || secondOperand !== null) {
    secondDisplay.textContent = operate(currentOperation, firstOperand, secondOperand)
    currentOperation = null
    firstOperand = secondDisplay.textContent
    secondOperand = ""
  }
}

function appendNumber(number) {
  if (firstDisplay.textContent === '0' || shouldResetScreen) resetScreen()
  displayValue = firstDisplay.textContent += number
  calculateChanges()
}

function appendOperator(operator) {
  if (displayValue === "") return
  if (displayValue === "" && operator === "=") return
  currentOperation = operator
  // if (displayValue.charAt(displayValue.length-1) === operatorData.values) {
  //   displayValue.slice(0, -1)
  //   displayValue = displayValue + operator
  // }
  if (firstDisplay.textContent.indexOf(operatorData) <= 1) {
    displayValue = firstDisplay.textContent + currentOperation
    firstDisplay.textContent = displayValue
    calculateChanges()
  } else {
    if (firstOperand !== "" || firstOperand !== null) {
      displayValue = firstOperand + operator
      firstDisplay.textContent = displayValue
      secondDisplay.textContent = ""
    } else {
      firstDisplay.textContent = displayValue + operator
    }
    calculateChanges()
  }
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
  displayValue = ''
  currentOperation = null
}

function deleteOperation() {
  firstDisplay.textContent = firstDisplay.textContent.slice(0, -1)
  displayValue = firstDisplay.textContent
}

function calculate() {
  // if (currentOperation === null || shouldResetScreen) return
  // if (currentOperation === '÷' && firstDisplay.textContent === '0') {
  //   alert("You can't divide by 0!")
  //   return
  // }
  // secondDisplay.textContent = operate(currentOperation, firstOperand, secondOperand)
  // firstDisplay.textContent = `${firstOperand}${currentOperation}${secondOperand}`
  // currentOperation = null
  // currentCalculation = firstDisplay.textContent
  if (currentCalculation !== null) {
    if  (currentOperation !== null) {
      firstOperand = currentCalculation.split(currentOperation)[0]
      secondOperand = currentCalculation.split(currentOperation)[1]
      secondDisplay.textContent = operate(currentOperation, firstOperand, secondOperand)
    }
  }
  firstOperand = secondDisplay.textContent
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