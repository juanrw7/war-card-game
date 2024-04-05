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

const playerLeftSide= document.getElementById("player-deciding-deck")
const playerRightSide =document.getElementById("player-personal-deck")
const playerBoardSide =document.getElementById("player-game-card")

const computerLeftSide= document.getElementById("computer-personal-deck")
const computerRightSide =document.getElementById("computer-deciding-deck")
const computerBoardSide =document.getElementById("computer-game-card")

const computerWarBoard =document.getElementById("computer-war-cards")
const computerWarCardHolder =document.getElementById("computer-played-war-card")
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

  let startingDeckCount= document.createElement("button")
  startingDeckCount.className = "count-button"
  startingDeckCount.innerText = unshuffledDeck.length
  startingDeck.appendChild(startingDeckCount)
  

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
  setTimeout(updateBeginBoard,1000)
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

function updateBeginBoard() {
  message.innerText = "Done!"
  if (playerPersonalDeck.length > 1) {
    let newCardEl= document.createElement("div")
    newCardEl.className = "card back-red large"
    playerRightSide.appendChild(newCardEl)

    let playerPersonalCount= document.createElement("button")
    playerPersonalCount.className = "count-button"
    playerPersonalCount.innerText = playerPersonalDeck.length
    playerRightSide.appendChild(playerPersonalCount)
  }
  if (computerPersonalDeck.length > 1) {
    let computerPersonalCount= document.createElement("button")
    computerPersonalCount.className = "count-button"
    computerPersonalCount.innerText = computerPersonalDeck.length
    computerLeftSide.appendChild(computerPersonalCount)
    
    let newCardEl= document.createElement("div")
    newCardEl.className = "card back-red large"
    computerLeftSide.appendChild(newCardEl)
    startingDeck.innerHTML = ""
  }
}

function handlePlayCard() {
  console.log("play card hit")

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

  }  if (checkVal(playerPersonalDeck[0]) < checkVal(computerPersonalDeck[0])) {
    console.log("computer card is higher")
    setTimeout(computerWinsCard,1000)
    
  }  if (checkVal(playerPersonalDeck[0]) === checkVal(computerPersonalDeck[0])) {
    console.log("Enter War mode")
    setTimeout(runWarMode,1000)
  }
}

function playerWinsCard() {
  console.log("handle player winning card")
  message.innerText= "Player wins round"

  playerBoardSide.innerHTML= ""
  computerBoardSide.innerHTML= ""
  
  let cardToAdd2 = playerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardToAdd2)
  let cardToAdd = computerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardToAdd)

//  console.log(playerDecidingDeck)
  playerLeftSide.innerHTML = ""
  updatePlayerDecidingDeckCount()
  let newCardEl= document.createElement("div")
  newCardEl.className = `card ${playerDecidingDeck[0]} large`
  playerLeftSide.appendChild(newCardEl)
//  console.log(playerPersonalDeck)
  updatePersonalDeckCount()
}

function computerWinsCard() {
  console.log("handle computer winning card")
  message.innerText= "Computer wins round"

  playerBoardSide.innerHTML= ""
  computerBoardSide.innerHTML= ""

  let cardToAdd = computerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardToAdd)
  let cardToAdd2 = playerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardToAdd2)

  computerRightSide.innerHTML = ""
  let newCardEl= document.createElement("div")
  newCardEl.className = `card ${computerDecidingDeck[0]} large`
  computerRightSide.appendChild(newCardEl)
//  console.log(playerPersonalDeck)
  updateComputerDecidingDeckCount()

  updatePersonalDeckCount()
}

function runWarMode() {
  console.log("handle war mode")
  message.innerText= "WAR"

  setTimeout(displayUpsideDownCards,200)
  setTimeout(displayUpsideDownCards,500)
  setTimeout(displayUpsideDownCards,800)
  setTimeout(displayDecidingWarCards,1350)
  setTimeout(determineWarWinner,2000)

}

function determineWarWinner() {
  if (checkVal(playerPersonalDeck[4]) > checkVal(computerPersonalDeck[4])) {
    console.log("Player Wins War")
    playerWinsWar()

  } if (checkVal(playerPersonalDeck[4]) < checkVal(computerPersonalDeck[4])) {
    console.log("Computer Wins War")
    computerWinsWar()
  
  } if (checkVal(playerPersonalDeck[4]) === checkVal(computerPersonalDeck[4])){
    console.log("DOUBLE WAR")
//TODO  try  runWarMode()
  }
}

function playerWinsWar() {

  let cardsToAdd = computerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardsToAdd)
  let cardsToAdd2 = computerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardsToAdd2)
  let cardsToAdd3 = computerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardsToAdd3)
  let cardsToAdd4 = computerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardsToAdd4)
  let cardsToAdd5 = computerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardsToAdd5)

  let cardsToAdd6 = playerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardsToAdd6)
  let cardsToAdd7 = playerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardsToAdd7)
  let cardsToAdd8 = playerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardsToAdd8)
  let cardsToAdd9 = playerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardsToAdd9)
  let cardsToAdd10 = playerPersonalDeck.splice(0, 1)[0]
  playerDecidingDeck.unshift(cardsToAdd10)

  console.log(playerDecidingDeck)
}

function computerWinsWar() {
  //TODO  dry this code, try using toString 
  let cardsToAdd = computerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardsToAdd)
  let cardsToAdd2 = computerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardsToAdd2)
  let cardsToAdd3 = computerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardsToAdd3)
  let cardsToAdd4 = computerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardsToAdd4)
  let cardsToAdd5 = computerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardsToAdd5)

  let cardsToAdd6 = playerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardsToAdd6)
  let cardsToAdd7 = playerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardsToAdd7)
  let cardsToAdd8 = playerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardsToAdd8)
  let cardsToAdd9 = playerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardsToAdd9)
  let cardsToAdd10 = playerPersonalDeck.splice(0, 1)[0]
  computerDecidingDeck.unshift(cardsToAdd10)
  console.log(computerDecidingDeck)
}

function displayDecidingWarCards() {
  let newCardEl= document.createElement("div")
  newCardEl.className = `card ${playerPersonalDeck[4]} large`
  playerBoardSide.appendChild(newCardEl)
  let newCardEl2= document.createElement("div")
  newCardEl2.className =  `card ${computerPersonalDeck[4]} large`
  computerWarCardHolder.appendChild(newCardEl2)
}

function displayUpsideDownCards() {
    let newCardEl= document.createElement("div")
    newCardEl.className = "card back-red large"
    computerWarBoard.appendChild(newCardEl)
    let newCardEl2= document.createElement("div")
    newCardEl2.className = "card back-red large"
    playerBoardSide.appendChild(newCardEl2)
}

function updatePlayerDecidingDeckCount() {
  if (playerDecidingDeck.length>=1) { 
    let playerDecidingCount= document.createElement("button")
    playerDecidingCount.className = "count-button"
    playerDecidingCount.innerText = playerDecidingDeck.length
    playerLeftSide.appendChild(playerDecidingCount)
  }
}

function updateComputerDecidingDeckCount() {
  if (computerDecidingDeck.length>=1) {
    let computerDecidingCount= document.createElement("button")
    computerDecidingCount.className = "count-button"
    computerDecidingCount.innerText = computerDecidingDeck.length
    computerRightSide.appendChild(computerDecidingCount)
  }
}

function updatePersonalDeckCount() {
  playerRightSide.innerHTML = ""
  if (playerPersonalDeck.length >= 1) {
    let newCardEl= document.createElement("div")
    newCardEl.className = "card back-red large"
    playerRightSide.appendChild(newCardEl)
    
    let playerPersonalCount= document.createElement("button")
    playerPersonalCount.className = "count-button"
    playerPersonalCount.innerText = playerPersonalDeck.length
    playerRightSide.appendChild(playerPersonalCount)
  }
  computerLeftSide.innerHTML =""
  if (computerPersonalDeck.length >= 1) {
    let computerPersonalCount= document.createElement("button")
    computerPersonalCount.className = "count-button"
    computerPersonalCount.innerText = computerPersonalDeck.length
    computerLeftSide.appendChild(computerPersonalCount)

    let newCardEl= document.createElement("div")
    newCardEl.className = "card back-red large"
    computerLeftSide.appendChild(newCardEl)
  }
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

  playerBoardSide.innerHTML= ""
  computerBoardSide.innerHTML= ""
  computerWarBoard.innerHTML=""
  computerWarCardHolder.innerHTML= ""
  computerDecidingDeck = []
  playerDecidingDeck = []
}