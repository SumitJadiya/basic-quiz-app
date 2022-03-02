let board = document.querySelector('.board')
let mainSection = document.querySelector('.main-section')
let optionList = document.querySelector('.optionList')
let questionTitle = document.querySelector('.question-title')
let testRules = document.querySelector('.test-rules')
let startBtn = document.querySelector('.start-btn')
let options = document.querySelectorAll('.option')
let timer = document.querySelector('.timer')

let currentQuestion = 0
let seconds = 50
let score = 0

const questions = [
  {
    questionText: 'Commonly used data types DO NOT include:',
    options: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
    answer: '3. alerts',
  },
  {
    questionText: 'Arrays in JavaScript can be used to store ______.',
    options: [
      '1. numbers and strings',
      '2. other arrays',
      '3. booleans',
      '4. all of the above',
    ],
    answer: '4. all of the above',
  },
  {
    questionText:
      'String values must be enclosed within _____ when being assigned to variables.',
    options: ['1. commas', '2. curly brackets', '3. quotes', '4. parentheses'],
    answer: '3. quotes',
  },
  {
    questionText:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    options: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
    answer: '4. console.log',
  },
  {
    questionText:
      'Which of the following is a statement that can be used to terminate a loop, switch or label statement?',
    options: ['1. break', '2. stop', '3. halt', '4. exit'],
    answer: '1. break',
  },
]

console.log(board)

// Start quiz
startBtn.addEventListener('click', () => {
  startBtn.classList.add('hide')
  testRules.classList.add('hide')
  optionList.classList.remove('hide')

  countDown()
  renderQuestion(currentQuestion)
})

// Render question
const renderQuestion = (currentQuestion) => {
  questionTitle.innerHTML = questions[currentQuestion].questionText
  options.forEach((option, index) => {
    option.innerHTML = questions[currentQuestion].options[index]
  })

  detachOptions()
  bindOptions()
}

//  Bind options
const bindOptions = () => {
  options.forEach((option) => {
    option.addEventListener('click', selection)
  })
}

// Remove options
const detachOptions = () => {
  options.forEach((option) => {
    option.removeEventListener('click', selection)
  })
}

// Calculate score and move to Next question
const selection = (e) => {
  let selectedOption = e.target
  let selectedAnswer = selectedOption.innerHTML

  calculateScore(selectedAnswer, currentQuestion)

  currentQuestion = currentQuestion + 1
  if (currentQuestion < questions.length && seconds > 0) {
    renderQuestion(currentQuestion)
  } else {
    displayScore()
  }
}

// Timer
const countDown = () => {
  let interval = setInterval(() => {
    timer.innerHTML = `Time left: ${seconds}`

    if (seconds <= 1) {
      clearInterval(interval)
      displayScore()
    }
    seconds--
  }, 1000)
}

// calculate score
const calculateScore = (selectedAnswer, currentQuestion) => {
  if (selectedAnswer === questions[currentQuestion].answer) {
    score++
  } else {
    seconds = seconds <= 10 ? 0 : seconds - 10
  }
}

// Results page
const displayScore = () => {
  optionList.classList.add('hide')
  mainSection.innerHTML = `<h2>All Done!</h2> <p>Your final score is ${score * 5} </p> 
  <form>
  <input type='text' name='scorerName' /> Enter your name
  <button onclick=saveEntry()>Submit</button>
  </form>`
}

const saveEntry = () => {
  localStorage.setItem(document.querySelector('input[name=scorerName]').value, score)
}

const displayHighScores = () => {
  alert('bol')
  mainSection.innerHTML = `<h2>High Scores</h2> <br/>`
  for (let i = 0; i < localStorage.length; i++) {
    mainSection.innerHTML += `<p>${localStorage.key(i)} - ${localStorage.getItem(
      localStorage.key(i)
    )}</p>`
  }
}

// Leaderboard
board.addEventListener('click', displayHighScores)
