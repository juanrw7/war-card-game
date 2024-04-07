/*------------------------- Constants -------------------------*/
const unshuffledDeck = ["d02", "d03", "d04", "d05", "d06", "d07", "d08", "d09", "d10", "dJ", "dQ", "dK", "dA", "h02", "h03", "h04", "h05", "h06", "h07", "h08", "h09", "h10", "hJ", "hQ", "hK", "hA", "c02", "c03", "c04", "c05", "c06", "c07", "c08", "c09", "c10", "cJ", "cQ", "cK", "cA", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10", "sJ", "sQ", "sK", "sA"]


/*--------------------- Variables (state) ---------------------*/
let shuffledDeck = [], playerPersonalDeck=[], playerDecidingDeck=[], computerPersonalDeck=[], computerDecidingDeck=[]

let wholeDeck, turn, winner, warMode, playerGameCard, computerGameCard 

let gameIsInPlay = false
let deckCopy = [...unshuffledDeck]

let computerWarCards=[], playerWarCards=[]
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
  resetButton.removeEventListener("click",handleReset)
  playCardButton.removeEventListener("click",handlePlayCard)

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
    checkForWinnerBeforeWar()
  }
}

function checkForWinner() {
  if (+playerPersonalDeck.length + +playerDecidingDeck.length===52) {
    console.log("PLAYER WINS")
    message.innerText= "YOU WIN!!!"

    playCardButton.style.display ="none"
    
  } else if (+computerPersonalDeck.length + +computerDecidingDeck.length===52){
    console.log("COMPUTER WINS")    
    message.innerText= "You lose."

    playCardButton.style.display ="none"  
  }
}

function checkForWinnerBeforeWar() {
  if (+playerPersonalDeck.length + +playerDecidingDeck.length >= 5 && +computerPersonalDeck.length + +computerDecidingDeck.length >= 5) {
    console.log("Both can go into war")
    setTimeout(runWarMode,1000)

  } else   if (+playerPersonalDeck.length + +playerDecidingDeck.length<5) {
    console.log("Computer wins/Player loses, not enough cards")
    message.innerText= "You lose."

    playCardButton.style.display ="none"

    let warLoseMessage = document.createElement("div")
    warLoseMessage.innerText = "Not enough cards"
    playerLeftSide.appendChild(warLoseMessage)
    
  } else if (+computerPersonalDeck.length + +computerDecidingDeck.length<5) {
    console.log("player wins/computer loses, not enough cards")
    message.innerText= "You win!!!"
    
    playCardButton.style.display ="none"

    let warLoseMessage = document.createElement("div")
    warLoseMessage.innerText = "Not enough cards"
    computerLeftSide.appendChild(warLoseMessage)
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

  checkForWinner()

  resetButton.addEventListener("click",handleReset)
  playCardButton.addEventListener("click",handlePlayCard)

  setTimeout(checkReShuffle,0)
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

  checkForWinner()

  resetButton.addEventListener("click",handleReset)
  playCardButton.addEventListener("click",handlePlayCard)

  setTimeout(checkReShuffle,0)
}

function runWarMode() {
  console.log("handle war mode")
  
  //TODO test code below
  //playerBoardSide.innerHTML= ""
  //computerBoardSide.innerHTML= ""
  computerWarBoard.innerHTML=""
  computerWarCardHolder.innerHTML= ""
  checkWarReShuffle()
  
  message.innerText= "WAR"

  setTimeout(displayUpsideDownCards,200)
  setTimeout(displayUpsideDownCards,500)
  setTimeout(displayUpsideDownCards,800)
  setTimeout(displayDecidingWarCards,1350)
  setTimeout(determineWarWinner,2800)

}

function determineWarWinner() {

  let cardsAddedToPlayerWarCards = playerPersonalDeck.splice(0,5)
  console.log(cardsAddedToPlayerWarCards)
  playerWarCards.unshift(...cardsAddedToPlayerWarCards)
  console.log(playerWarCards)

  let cardsAddedToComputerWarCards = computerPersonalDeck.splice(0,5)
  console.log(cardsAddedToComputerWarCards)
  computerWarCards.unshift(...cardsAddedToComputerWarCards)
  console.log(computerWarCards)

  console.log("player war cards length below")
  console.log(playerWarCards)
  console.log("computer war cards length below")
  console.log(computerWarCards)
  
  if (checkVal(playerWarCards[4]) > checkVal(computerWarCards[4])) {
    console.log("Player Wins War")
    
    playerDecidingDeck.unshift(...playerWarCards,...computerWarCards)
    console.log(playerDecidingDeck)
    
    playerWinsWar()
    resetButton.addEventListener("click",handleReset)
    playCardButton.addEventListener("click",handlePlayCard)
    computerWarCards = []
    playerWarCards = []
    
  } else if (checkVal(playerWarCards[4]) < checkVal(computerWarCards[4])) {
    console.log("Computer Wins War")
    
    computerDecidingDeck.unshift(...playerWarCards,...computerWarCards)
    console.log(computerDecidingDeck)
    
    computerWinsWar()
    resetButton.addEventListener("click",handleReset)
    playCardButton.addEventListener("click",handlePlayCard)
    computerWarCards = []
    playerWarCards = []
  
  } else if (checkVal(playerWarCards[4]) === checkVal(computerWarCards[4])){
    console.log("DOUBLE WAR")
    checkReShuffle()
    handleDoubleWar()
  }
}

function handleDoubleWar() {
  message.innerText= "DOUBLE WAR"
  setTimeout(() => {
    playerBoardSide.innerHTML= ""
    computerBoardSide.innerHTML= ""
    computerWarBoard.innerHTML=""
    computerWarCardHolder.innerHTML= ""
  }, 500);
  setTimeout(runWarMode,1300)
}

function playerWinsWar() {

  console.log(playerDecidingDeck)

  message.innerText= "Player wins WAR"

  playerBoardSide.innerHTML= ""
  computerBoardSide.innerHTML= ""
  computerWarBoard.innerHTML=""
  computerWarCardHolder.innerHTML= ""

  playerLeftSide.innerHTML=""

  updatePlayerDecidingDeckCount()
  updatePersonalDeckCount()

  let newCardEl= document.createElement("div")
  newCardEl.className = `card ${playerDecidingDeck[0]} large`
  playerLeftSide.appendChild(newCardEl)
//  console.log(playerPersonalDeck)

  checkForWinner()

  setTimeout(checkReShuffle,0)
}

function computerWinsWar() {

  console.log(computerDecidingDeck)

  message.innerText= "Computer wins WAR"

  playerBoardSide.innerHTML= ""
  computerBoardSide.innerHTML= ""
  computerWarBoard.innerHTML=""
  computerWarCardHolder.innerHTML= ""

  computerRightSide.innerHTML=""
  
  let newCardEl= document.createElement("div")
  newCardEl.className = `card ${computerDecidingDeck[0]} large`
  computerRightSide.appendChild(newCardEl)
  updateComputerDecidingDeckCount()
  updatePersonalDeckCount()

  checkForWinner()

  setTimeout(checkReShuffle,0)
}

function checkWarReShuffle() {
  if (playerPersonalDeck.length<5) {
    message.innerText = "RESHUFFLING"

    shuffle(playerDecidingDeck,playerPersonalDeck)

    console.log("Reshufled player personal array below")
    console.log(playerPersonalDeck)
    setTimeout(updatePlayerBoardReshuffle,190,playerLeftSide,playerRightSide,playerPersonalDeck)

  } if (computerPersonalDeck.length<5) {
    console.log("RESHUFFLING computer deck")
    message.innerText = "RESHUFFLING"
    console.log(computerDecidingDeck.length)

    shuffle(computerDecidingDeck,computerPersonalDeck)

    console.log("Reshufled pc personal array below")
    console.log(computerPersonalDeck)
    setTimeout(updateComputerBoardReshuffle,190,computerRightSide,computerLeftSide,computerPersonalDeck)
  }
}

function checkReShuffle () {
  if (playerPersonalDeck.length === 0 && playerDecidingDeck.length >0) {
    resetButton.removeEventListener("click",handleReset)
    playCardButton.removeEventListener("click",handlePlayCard)
    shuffle(playerDecidingDeck,playerPersonalDeck)
    
    
    setTimeout(() => {   
      console.log("RESHUFFLING player deck")
      message.innerText = "RESHUFFLING"
      console.log(playerDecidingDeck.length)
    }, 500);
    
    console.log("Reshufled player personal array below")
    console.log(playerPersonalDeck)
    setTimeout(updatePlayerBoardReshuffle,1100,playerLeftSide,playerRightSide,playerPersonalDeck)
  } 
  
  if (computerPersonalDeck.length === 0 && computerDecidingDeck.length >0) {
    resetButton.removeEventListener("click",handleReset)
    playCardButton.removeEventListener("click",handlePlayCard)
    shuffle(computerDecidingDeck,computerPersonalDeck)
    
    setTimeout(() => {
      
          console.log("RESHUFFLING computer deck")
          message.innerText = "RESHUFFLING"
          console.log(computerDecidingDeck.length)
      
    }, 500);

    console.log("Reshufled pc personal array below")
    console.log(computerPersonalDeck)
    setTimeout(updateComputerBoardReshuffle,1100,computerRightSide,computerLeftSide,computerPersonalDeck)
  }
}

function shuffle(deck,deckToAdd) {
  let arrayLength = [...deck]

  for (let i = 0; i < arrayLength.length; i++) {
    let randIdx = Math.floor(Math.random() * deck.length)
    //    console.log(randIdx)
    let cardToAdd = deck.splice(randIdx, 1)[0]
    deckToAdd.push(cardToAdd)
  }
  return deck
}

function updatePlayerBoardReshuffle(clearBoard,updateBoard,personalDeck) {
  clearBoard.innerHTML=""
  updateBoard.innerHTML=""

  let newCardEl= document.createElement("div")
  newCardEl.className = "card back-red large"
  updateBoard.appendChild(newCardEl)

  let personalCount= document.createElement("button")
  personalCount.className = "count-button"
  personalCount.innerText = personalDeck.length
  updateBoard.appendChild(personalCount)

  message.innerText="Done!"
  resetButton.addEventListener("click",handleReset)
  playCardButton.addEventListener("click",handlePlayCard)
}

function updateComputerBoardReshuffle(clearBoard,updateBoard,personalDeck) {
  clearBoard.innerHTML=""
  updateBoard.innerHTML=""
  
  let personalCount= document.createElement("button")
  personalCount.className = "count-button"
  personalCount.innerText = personalDeck.length
  updateBoard.appendChild(personalCount)
  
  let newCardEl= document.createElement("div")
  newCardEl.className = "card back-red large"
  updateBoard.appendChild(newCardEl)

  message.innerText="Done!"
  resetButton.addEventListener("click",handleReset)
  playCardButton.addEventListener("click",handlePlayCard)
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