let questions = []
let randQuestions = []
const randInt = (val) => {
  return Math.floor(Math.random() * val)
}
let wrongAnswers = []
let correctAnswers = []

let timer = 0;
let quizInterval = undefined;
let questionNum = 0;
let correctAnswer = 0
let start = document.getElementById(`start`)
let highScores = document.getElementById(`highScores`)

const showHighscores = () => {
  heading.textContent = "High Scores"
  highScores.style.display = `block`
  highScores.textContent = ``
  restart.style.display = "inline"
  clear.style.display = "inline"
  description.style.display = `none`
  start.style.display = `none`
  form.style.display = `none`

  let length = scores.length
  for (let i = 0; i < length; i++) {
    let myScores = document.createElement(`Li`)
    if (i % 2 === 0) {
      myScores.classList.add(`Even`)
    } else {
      myScores.classList.add(`Odd`)
    }
    myScores.textContent = `${i}. ${scores[i].name} - ${scores[i].score}`

    highScores.appendChild(myScores)
  }

}

let viewScores = document.getElementById("viewScores")

let clear = document.getElementById(`clear`)

let heading = document.getElementById(`heading`)

let clock = document.getElementById('clock')

let description = document.getElementById(`description`)

let answerButtons = document.getElementById(`answerButtons`)

let form = document.getElementById(`yourName`)

let input = document.getElementById(`input`)

let restart = document.getElementById(`restart`)

let hr = document.getElementById(`line`)
hr.style.display = `none`

let result = document.getElementById(`result`)
result.style.display = `none`

resultTimer = undefined;

questions.push(`Commonly used data types DO NOT include:`)
wrongAnswers.push([`strings`, `booleans`, `alerts`, `numbers`])
correctAnswers.push(`alerts`)

questions.push(`The condition in an if/else statement is enclosed within:`)
wrongAnswers.push([`quotes`, `curly brackets`, `parentheses`, `square brackets`])
correctAnswers.push(`parentheses`)

questions.push(`Arrays in JavaScript can be used to store:`)
wrongAnswers.push([`numbers and strings`, `other arrays`, `booleans`, `all of the above`])
correctAnswers.push(`all of the above`)

questions.push(`String values must be enclosed within ____ when being assigned to variables.`)
wrongAnswers.push([`commas`, `curly brackets`, `quotes`, `parentheses`])
correctAnswers.push(`quotes`)

questions.push(`A very useful tool used during development and debugging for printing content to the debugger is:`)
wrongAnswers.push([`JavaScript`, `terminal/bash`, `for loops`, `console.log`])
correctAnswers.push(`console.log`)

let answers = []
answers.push(document.getElementById(`answer1`))
answers.push(document.getElementById(`answer2`))
answers.push(document.getElementById(`answer3`))
answers.push(document.getElementById(`answer4`))

let scores = JSON.parse(localStorage.getItem(`High Scores`))
if (scores === null) {
  scores = []
}

document.addEventListener('click', event => {
  let btn = event.target
  if (btn.classList.contains('start')) {
    startQuiz()
  } else if (btn.classList.contains('answer')) {
    checkAnswer(btn.getAttribute("value"))
  } else if (btn.classList.contains('submit')) {
    event.preventDefault()
    submitHighscore(input.value)
    input.value = ``
  } else if (btn.classList.contains(`clear`)) {
    clearHighscores()
  } else if (btn.classList.contains(`viewScores`)) {
    showHighscores()
  }
})

const startPage = () => {
  heading.style.display = "block"
  heading.textContent = "Coding Quiz"
  heading.style.textAlign = "center"
  description.style.display = "block"
  description.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answerd will penalize your scortime by ten seconds!"

  description.style.textAlign = "center"
  answerButtons.style.display = "none"
  start.style.display = "block"
  form.style.display = "none"
  highScores.style.display = "none"
  restart.style.display = "none"
  result.style.display = "none"
  hr.style.display = "none"
  clear.style.display = "none"
}

startPage()

const startQuiz = () => {
  viewScores.style.display = "none"
  heading.style.display = "block"
  heading.textAlign = "left"
  start.style.display = "none"
  description.style.display = "none"
  answerButtons.style.display = "block"

  let length = questions.length
  for (let i = 0; i < length; i++) {
    randQuestions.push(i)
  }

  timer = 60
  clock.textContent = `Time Remaining: ${timer}`
  quizInterval = setInterval(() => {
    timer--
    clock.textContent = `Time Remaining: ${timer}`
    if (timer < 1) {
      endQuiz()
    }
  }, 1000)

  nextQuestion()

}

const endQuiz = () => {
  clearInterval(quizInterval)
  clock.textContent = ``
  timer += -10 * randQuestions.length

  heading.innerHTML = `All done!`
  form.style.display = `block`
  description.style.display = `block`
  description.innerHTML = `Your final score is ${timer}`
  answerButtons.style.display = `none`
}

const submitHighscore = (yourName) => {
  let index = 0
  let length = scores.length
  for (let i = 0; i < length; i++) {
    if (timer > scores[i].score) {
      i = length
    }
  }
  scores.splice(index, 0, { name: yourName, score: timer })
  localStorage.setItem(`High Scores`, JSON.stringify(scores))

  showHighscores()
}

const clearHighscores = () => {
  highScores.textContent = ``
  scores = []
  localStorage.setItem(`High Scores`, JSON.stringify(scores))
}


const checkAnswer = (answer) => {
  randQuestions.splice(questionNum, 1)
  answer = parseInt(answer)
  if (resultTimer !== undefined) {
    clearTimeout(resultTimer)
  }
  if (answer === correctAnswer) {
    result.textContent = "Correct!"
  } else {
    result.textContent = "Wrong!"
    timer -= 10
    clock.textContent = `Time: ${timer}`
  }

  resultTimer = setTimeout(() => {
    hr.style.display = "none"
    result.style.display = "none"
    resultTimer = undefined
  }, 3000);

  if (randQuestions.length < 1) {
    endQuiz()
  } else {
    nextQuestion()
  }

}

const nextQuestion = () => {
  let randNum = randInt(randQuestions.length)
  questionNum = randNum
  let randQuestion = randQuestions[randNum]

  heading.textContent = questions[randQuestion]

  let randWrongAnswers = [0, 1, 2, 3]
  for (let i = 0; i < 4; i++) {
    randNum = randInt(randWrongAnswers.length)
    let index = randWrongAnswers[randNum]
    answers[i].textContent = `${(i + 1)}. ${wrongAnswers[randQuestion][index]}`
    randWrongAnswers.splice(randNum, 1)
  }

  randNum = randInt(4)
  answers[randNum].textContent = `${(randNum + 1)}. ${correctAnswers[randQuestion]}`
  correctAnswer = randNum
}