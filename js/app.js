/*------------------------- Constants -------------------------*/
const unshuffledDeck = ["d02", "d03", "d04", "d05", "d06", "d07", "d08", "d09", "d10", "dJ", "dQ", "dK", "dA", "h02", "h03", "h04", "h05", "h06", "h07", "h08", "h09", "h10", "hJ", "hQ", "hK", "hA", "c02", "c03", "c04", "c05", "c06", "c07", "c08", "c09", "c10", "cJ", "cQ", "cK", "cA", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10", "sJ", "sQ", "sK", "sA"]

console.log(unshuffledDeck)

/*--------------------- Variables (state) ---------------------*/
let shuffledDeck = [], playerPersonalDeck=[], playerDecidingDeck=[], computerPersonalDeck=[], computerDecidingDeck=[]

let wholeDeck, turn, winner, warMode, playerGameCard, computerGameCard 

let gameIsInPlay = false
/*----------------- Cached Element References -----------------*/
const resetButton = document.getElementById("reset")
const beginButton = document.getElementById("start-game")
const playCardButton = document.getElementById("play-card")

const message = document.getElementById("message")

const startingDeck = document.getElementById("starting-deck")

const playerLeftSide= document.getElementById("player-deciding-deck")
const playerRightSide =document.getElementById("player-personal-deck")
const playerBoardSide =document.getElementById("player-game-card")

const computerLeftSide= document.getElementById("computer-personal-deck")
const computerRightSide =document.getElementById("computer-deciding-deck")
const computerBoardSide =document.getElementById("computer-game-card")
console.log(beginButton)
/*---------------------- Event Listeners ----------------------*/
beginButton.addEventListener("click",playGame)
resetButton.addEventListener("click",handleReset)


/*------------------------- Functions -------------------------*/
init()
function handleReset() {
  gameIsInPlay = false
  render()
}

function playGame() {
  gameIsInPlay = true
  render()
}

function init() {
  //gameIsInPlay = true
  render()
}


function render() {
  console.log(gameIsInPlay)
  if (gameIsInPlay) {
    resetButton.style.display =""
    playCardButton.style.display =""
    beginButton.style.display = "none"
  } else {
    resetButton.style.display ="none"
    playCardButton.style.display ="none"
    beginButton.style.display = ""
  }
}