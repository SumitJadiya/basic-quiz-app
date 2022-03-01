let mainSection = document.querySelector('.main-section')
let optionList = document.querySelector('.optionList')
let questionTitle = document.querySelector('.question-title')
let testRules = document.querySelector('.test-rules')
let startBtn = document.querySelector('.start-btn')
let options = document.querySelectorAll('.option')
let timer = document.querySelector('.timer')

let currentQuestion = 0
let seconds = 60
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

startBtn.addEventListener('click', () => {
  startBtn.classList.add('hide')
  testRules.classList.add('hide')
  optionList.classList.remove('hide')

  countDown()
  renderQuestion(currentQuestion)
})

const renderQuestion = (currentQuestion) => {
  questionTitle.innerHTML = questions[currentQuestion].questionText
  options.forEach((option, index) => {
    option.innerHTML = questions[currentQuestion].options[index]
  })

  detachOptions()
  bindOptions()
}

const bindOptions = () => {
  options.forEach((option) => {
    option.addEventListener('click', selection)
  })
}

const detachOptions = () => {
  options.forEach((option) => {
    option.removeEventListener('click', selection)
  })
}

const selection = (e) => {
  let selectedOption = e.target
  let selectedAnswer = selectedOption.innerHTML

  console.log(selectedAnswer)
  calculateScore(selectedAnswer, currentQuestion)

  renderQuestion(currentQuestion + 1)
}

const countDown = () => {
  let interval = setInterval(() => {
    seconds--
    timer.innerHTML = `Time left: ${seconds}`

    if (seconds <= 0) {
      clearInterval(interval)
      console.log('Time is up!')
    }
  }, 1000)
}

const calculateScore = (selectedAnswer, currentQuestion) => {
  console.log(questions[currentQuestion])
  if (selectedAnswer === questions[currentQuestion].answer) {
    score++
    console.log(score)
  } else {
    // alert('error')
    seconds = seconds - 10
  }
}
