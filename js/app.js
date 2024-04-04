/*------------------------- Constants -------------------------*/
const unshuffledDeck = ["d02", "d03", "d04", "d05", "d06", "d07", "d08", "d09", "d10", "dJ", "dQ", "dK", "dA", "h02", "h03", "h04", "h05", "h06", "h07", "h08", "h09", "h10", "hJ", "hQ", "hK", "hA", "c02", "c03", "c04", "c05", "c06", "c07", "c08", "c09", "c10", "cJ", "cQ", "cK", "cA", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10", "sJ", "sQ", "sK", "sA"]


/*--------------------- Variables (state) ---------------------*/
let shuffledDeck = [], playerPersonalDeck=[], playerDecidingDeck=[], computerPersonalDeck=[], computerDecidingDeck=[]

let wholeDeck, turn, winner, warMode, playerGameCard, computerGameCard 

let gameIsInPlay = false
let deckCopy = [...unshuffledDeck]
/*----------------- Cached Element References -----------------*/
const resetButton = document.getElementById("reset")
const beginButton = document.getElementById("start-game")
const playCardButton = document.getElementById("play-card")

const message = document.getElementById("message")

const startingDeck = document.querySelector(".starting-deck")
console.log(startingDeck)

const playerLeftSide= document.getElementById("player-deciding-deck")
const playerRightSide =document.getElementById("player-personal-deck")
const playerBoardSide =document.getElementById("player-game-card")

const computerLeftSide= document.getElementById("computer-personal-deck")
const computerRightSide =document.getElementById("computer-deciding-deck")
const computerBoardSide =document.getElementById("computer-game-card")
/*---------------------- Event Listeners ----------------------*/
beginButton.addEventListener("click",beginGame)
resetButton.addEventListener("click",handleReset)
playCardButton.addEventListener("click",handlePlayCard)

/*------------------------- Functions -------------------------*/
init()

function init() {
  gameIsInPlay = false
  render()
}

function handleReset() {
  gameIsInPlay = false
  message.innerText = "---"
  deckCopy = [...unshuffledDeck]
  playerPersonalDeck = []
  computerPersonalDeck = []
  let newCardEl= document.createElement("div")
  newCardEl.className = "card back-red large"
  startingDeck.appendChild(newCardEl)
  render()
}

function beginGame() {
  generatePlayerDeck()
  generateComputerDeck()
  gameIsInPlay = true
  console.log(playerPersonalDeck)
  console.log(computerPersonalDeck)
  message.innerText = "Shuffling deck"
  beginButton.style.display = "none"
  setTimeout(render,1000)
  setTimeout(function () {
    message.innerText = "Done!"
    if (playerPersonalDeck.length > 1) {
      let newCardEl= document.createElement("div")
      newCardEl.className = "card back-red large"
      playerRightSide.appendChild(newCardEl)
    }
    if (computerPersonalDeck.length > 1) {
      let newCardEl= document.createElement("div")
      newCardEl.className = "card back-red large"
      computerLeftSide.appendChild(newCardEl)
      startingDeck.innerHTML = ""
    }
    
  },1000)
}

function generatePlayerDeck() {
  for (let i = 0; i <= 25; i++) {
    let randIdx = Math.floor(Math.random() * deckCopy.length)
    //    console.log(randIdx)
    let cardToAdd = deckCopy.splice(randIdx, 1)[0]
    playerPersonalDeck.push(cardToAdd)
  }
  return playerPersonalDeck
}

function generateComputerDeck() {
  for (let i = 0; i <= 25; i++) {
    let randIdx = Math.floor(Math.random() * deckCopy.length)
    //    console.log(randIdx)
    let cardToAdd = deckCopy.splice(randIdx, 1)[0]
    computerPersonalDeck.push(cardToAdd)
  }
  return computerPersonalDeck
}

function handlePlayCard() {
  console.log("play card hit")

  console.log(checkVal(playerPersonalDeck[0]))
  console.log(checkVal(computerPersonalDeck[0]))

  message.innerText= "Comparing cards"

  let newCardEl= document.createElement("div")
  newCardEl.className = `card ${playerPersonalDeck[0]} large`
  playerBoardSide.appendChild(newCardEl)

  let newCardEl2= document.createElement("div")
  newCardEl2.className = `card ${computerPersonalDeck[0]} large`
  computerBoardSide.appendChild(newCardEl2)

  if (checkVal(playerPersonalDeck[0]) > checkVal(computerPersonalDeck[0])) {
    console.log("player card is higher")
    setTimeout(playerWinsCard,1000)

  } else if (checkVal(playerPersonalDeck[0]) < checkVal(computerPersonalDeck[0])) {
    console.log("computer card is higher")

  } else if (checkVal(playerPersonalDeck[0]) === checkVal(computerPersonalDeck[0])) {
    console.log("Enter War mode")
  }
}

function playerWinsCard() {
  console.log("handle player winning card")
  message.innerText= "Player wins round"

  playerBoardSide.innerHTML= ""
  computerBoardSide.innerHTML= ""

  let cardToAdd = computerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardToAdd)
  let cardToAdd2 = playerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardToAdd2)

  console.log(playerDecidingDeck)
  playerLeftSide.innerHTML = ""
  let newCardEl= document.createElement("div")
  newCardEl.className = `card ${playerDecidingDeck[0]} large`
  playerLeftSide.appendChild(newCardEl)
  console.log(playerPersonalDeck)
}

function computerWinsCard() {
  console.log("handle computer winning card")
}

function runWarMode() {
  console.log("handle war mode")
}

function checkVal(str) {
  let adjustedStr = str.slice(1)
  if (adjustedStr === "A") return 14
  if (adjustedStr === "K") return 13
  if (adjustedStr === "Q") return 12
  if (adjustedStr === "J") return 11
  return parseInt(adjustedStr)
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
  computerRightSide.innerHTML = ""
  computerLeftSide.innerHTML = ""
  playerRightSide.innerHTML = ""
  playerLeftSide.innerHTML = ""
}