// Initialize game
let round = 0
let scorePlayer = 0
let scoreComputer = 0
let maxScore = 5

const buttonsContainer = document.querySelector(".selection")
const buttons = buttonsContainer.querySelectorAll('button')
buttons.forEach((button) => {
  button.addEventListener('click', () => playRound(button.id, computerPlay()))
})

const scoreBoard = document.querySelector(".scoreboard > div")
const resetSection = document.querySelector('section.playagain')
const resetButton = document.querySelector('#reset-btn')
resetButton.addEventListener('click', () => {
  round = 0
  scorePlayer = 0
  scoreComputer = 0
  buttons.forEach((button) => {
    button.disabled = false
    button.classList.toggle("btn-disabled")
  })
  resetSection.classList.toggle("playagain-visible")
  scoreBoard.textContent='Ready to start...'
})

function computerPlay() {
  let computerMove
  let randomNumber = Math.floor(Math.random() * 3 + 1) //Generate a random number between 1 and 3
  switch (randomNumber) {
    case 1:
      computerMove = 'rock'
      break;
    case 2:
      computerMove = 'paper'
      break;
    case 3:
      computerMove = 'scissors'
  }
  return computerMove
}


function playRound(playerSelection, computerSelection) {
  round++
  let roundResult
  if (playerSelection == computerSelection) {
    roundResult = `Draw!\n\nPlayer and computer both selected ${playerSelection}.`
  } else if (playerSelection == 'rock' && computerSelection == 'paper') {
    roundResult = `You lose!\n\n Computer selected ${computerSelection}. Paper covers rock.`
    scoreComputer++
  } else if (playerSelection == 'rock' && computerSelection == 'scissors') {
    roundResult = `You win!\n\n Computer selected ${computerSelection}. Rock crushes scissors.`
    scorePlayer++
  } else if (playerSelection == 'paper' && computerSelection == 'rock') {
    roundResult = `You win!\n\n Computer selected ${computerSelection}. Paper covers rock.`
    scorePlayer++
  } else if (playerSelection == 'paper' && computerSelection == 'scissors') {
    roundResult = `You lose!\n\n Computer selected ${computerSelection}. Scissors cut paper.`
    scoreComputer++
  } else if (playerSelection == 'scissors' && computerSelection == 'paper') {
    roundResult = `You win!\n\n Computer selected ${computerSelection}. Scissors cut paper.`
    scorePlayer++
  } else if (playerSelection == 'scissors' && computerSelection == 'rock') {
    roundResult = `You lose!\n\n Computer selected ${computerSelection}. Rock crushes scissors.`
    scoreComputer++
  }
  
  scoreBoard.textContent= `ROUND #${round}\n\n${roundResult}\n\nPlayer ${scorePlayer} - ${scoreComputer} Computer`

  // Disable all buttons and enable reset link if max score is reached
  if (scorePlayer==maxScore || scoreComputer==maxScore) {
    buttons.forEach((button) => {
      button.disabled = true
      button.classList.toggle("btn-disabled")
    })
    resetSection.classList.toggle("playagain-visible")
  }
}
