/*------------------------- Constants -------------------------*/
const unshuffledDeck = ["d02", "d03", "d04", "d05", "d06", "d07", "d08", "d09", "d10", "dJ", "dQ", "dK", "dA", "h02", "h03", "h04", "h05", "h06", "h07", "h08", "h09", "h10", "hJ", "hQ", "hK", "hA", "c02", "c03", "c04", "c05", "c06", "c07", "c08", "c09", "c10", "cJ", "cQ", "cK", "cA", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10", "sJ", "sQ", "sK", "sA"]

console.log(unshuffledDeck)

/*--------------------- Variables (state) ---------------------*/
let shuffledDeck = [], playerPersonalDeck=[], playerDecidingDeck=[], computerPersonalDeck=[], computerDecidingDeck=[]

let wholeDeck, turn, winner, warMode, playerGameCard, computerGameCard 


/*----------------- Cached Element References -----------------*/
const resetButton = document.getElementById("reset")
const beginButton = document.getElementById("start-game")
const playButton = document.getElementById("play-card")

const message = document.getElementById("message")

console.log(beginButton)
/*---------------------- Event Listeners ----------------------*/



/*------------------------- Functions -------------------------*/