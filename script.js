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

questions.push(`How long does it take for sunlight to reach the earth's surface??`)
wrongAnswers.push([`8 minutes`, `1 hour`, `6 hours`, `1 day`])
correctAnswers.push(`8 minutes`)

questions.push(`Which of these is a cyrillic language?`)
wrongAnswers.push([`Greek`, `English`, `Russian`, `Chinese`])
correctAnswers.push(`Russian`)

questions.push(`How many hours are you supposed to study coding in a week?`)
wrongAnswers.push([`0-5 hours`, `6-10 hours`, `11-15 hours`, `16-20 hours`])
correctAnswers.push(`16-20 hours`)

questions.push(`What is the most profitable franchise in the world?`)
wrongAnswers.push([`Fast&Furious`, `Disney`, `Star Wars`, `Pokemon`])
correctAnswers.push(`Pokemon`)

questions.push(`What would happen if the stomach did not have a protective layer of mucus?`)
wrongAnswers.push([`It would dissolve itself`, `It would live the life of Riley`, `Nausea`, `I don't care, I'm not a Doctor`])
correctAnswers.push(`It would dissolve itself`)

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
  description.textContent = "This quiz will test your basic knowledge of coding. You will have 60 seconds to finish, if you get a questions wrong you will lose 5 seconds."

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
  timer += -5 * randQuestions.length

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
    timer -= 5
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