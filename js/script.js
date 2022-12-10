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
  toggleButtons(false)
  resetSection.classList.toggle("playagain-visible")
  scoreBoard.textContent='Ready to start...'
})
const playerIcon=document.querySelector("#player-icon")
const computerIcon=document.querySelector("#computer-icon")

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

function toggleButtons(buttonDisabled) {
  buttons.forEach((button) => {
    button.disabled = buttonDisabled
    button.classList.toggle("btn-disabled")
  })
}

function playRound(playerSelection, computerSelection) {
  round++
  let roundResult
  let finalResult

  //Animate icons and hide
  playerIcon.src=`./images/${playerSelection}.png`
  playerIcon.classList.add("move-left")
  computerIcon.src=`./images/${computerSelection}.png`
  computerIcon.classList.toggle("move-right")
  // Disable buttons until animation ends
  toggleButtons(true)
  setTimeout(() => {
    playerIcon.src='./images/blank.png'
    playerIcon.classList.toggle("move-left")
    computerIcon.src='./images/blank.png'
    computerIcon.classList.toggle("move-right")
    toggleButtons(false)
  }, 2000)

  if (playerSelection == computerSelection) {
    roundResult = `Draw!\n\nPlayer and computer both selected ${playerSelection}.`
  } else if (playerSelection == 'rock' && computerSelection == 'paper') {
    roundResult = `You lose!\n\n Paper covers rock.`
    scoreComputer++
  } else if (playerSelection == 'rock' && computerSelection == 'scissors') {
    roundResult = `You win!\n\n Rock crushes scissors.`
    scorePlayer++
  } else if (playerSelection == 'paper' && computerSelection == 'rock') {
    roundResult = `You win!\n\n Paper covers rock.`
    scorePlayer++
  } else if (playerSelection == 'paper' && computerSelection == 'scissors') {
    roundResult = `You lose!\n\n Scissors cut paper.`
    scoreComputer++
  } else if (playerSelection == 'scissors' && computerSelection == 'paper') {
    roundResult = `You win!\n\n Scissors cut paper.`
    scorePlayer++
  } else if (playerSelection == 'scissors' && computerSelection == 'rock') {
    roundResult = `You lose!\n\n Rock crushes scissors.`
    scoreComputer++
  }

  // Display round score after the animation
  scoreBoard.textContent= `${playerSelection.toUpperCase()} - ${computerSelection.toUpperCase()}`
  setTimeout(() => {
    scoreBoard.textContent= `ROUND #${round}\n\n${roundResult}\n\nPlayer ${scorePlayer} - ${scoreComputer} Computer`
  }, 2000)

  // Announce winner
  if (scorePlayer==maxScore || scoreComputer==maxScore) {
    if (scorePlayer>scoreComputer) {
      finalResult = `Player Wins ${scorePlayer} to ${scoreComputer}`
    } else {
      finalResult = `Computer Wins ${scoreComputer} to ${scorePlayer}`
    }
    setTimeout(() => {
      scoreBoard.textContent = finalResult
      toggleButtons(true)
      resetSection.classList.toggle("playagain-visible")
    }, 2000)    
  }
}
