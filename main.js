/**************
* 
*    Welcome to the DiceGarden's JavaScript file ! 
*           Summary :
*                   - On-load animation, line 21 ( or ctrl+f for ID001 )
*                   - History information button mechanisms, line 36 ( or ctrl+f for ID002 )
*                   - Declarations for the traditional dice, line 62 ( or ctrl+f for ID003 )
*                   - Idle state for the Dice (useful on-load), line 82 ( or ctrl+f for ID004 )
*                   - Dice addition & substraction, line 111 ( or ctrl+f for ID005 )
*                   - Traditional dice Roll mechanisms & animation, line 156 ( or ctrl+f for ID006 )
*                   - Declarations for the Challenge Dice, line 253 ( or ctrl+f for ID007 )
*                   - Challenge Dice mechanisms, line 270 ( or ctrl+f for ID008 )
*                   - Declarations for the Mega Dice, line 314 ( or ctrl+f for ID009 )
*                   - Mega Dice mechanics, line 328 ( or ctrl+f for ID010 )
*
**************/



/**************
* On-load animation (ID001)
**************/



const opening = document.querySelector('.opening-animation')

// Timeout before removing the elements of the on-load animation from the screen
setTimeout(() => {
    opening.style.display = "none"
}, 3000)



/**************
* History information button mechanisms (ID002)
**************/



const history = document.querySelector('.dice-history')
const historyButton = history.querySelector('.history-button')
const historyText = history.querySelector('.history-information')

// counter, allowing us to know if yes or no the history tab will be active
let historyClicked = 0

// Event listener allowing us to display or hide the dice history tab
historyButton.addEventListener('click', () => {
    if (historyClicked === 0) {
        historyText.style.display = 'block'
        historyClicked = 1
    } else {
        historyText.style.display = 'none'
        historyClicked = 0
    }
})



/**************
* Declarations for the traditional dice (ID003)
**************/



const traditional = document.querySelector('.traditional-dice')
const traditionalLaunch = traditional.querySelector('.launch-button')
const diceOne = traditional.querySelector('.dice-one .dice')
const diceOneScore = traditional.querySelector('.dice-one-full .dice-score .dice-score-title')
const diceTwo = traditional.querySelector('.dice-two .dice')
const diceTwoScore = traditional.querySelector('.dice-two-full .dice-score .dice-score-title')
const diceTwoFull = traditional.querySelector('.dice-two-full')
const diceThree = traditional.querySelector('.dice-three .dice')
const diceThreeScore = traditional.querySelector('.dice-three-full .dice-score .dice-score-title')
const diceThreeFull = traditional.querySelector('.dice-three-full')
const totalDiceScore = traditional.querySelector('.total-score-title')



/**************
* Idle state for the Dice (useful on-load) (ID004)
**************/



// Velocity used for the idle animation of the dice
let velocity = 0
// Checks if the idle still needs to be used
let idleActive = true
// Function giving the dice an idle effect on-load, showing the user that it is a 3D dice, adds rotation on the X and Y axis
function idle()
{
    if (idleActive) {
        velocity += 1
        diceOne.style.transform = `rotateX(${velocity}deg) rotateY(${velocity}deg)`
        requestAnimationFrame(idle) 
    } else {
        return velocity
    }
}

// Fixes a bug that happened when idle started at the same moment that the on-load animation
setTimeout(() => {
    idle()
}, 100)



/**************
* Dice addition & substraction (ID005)
**************/



const substractDice = traditional.querySelector('.substract-dice')
const diceCounter = traditional.querySelector('.dice-counter')
const addDice = traditional.querySelector('.add-dice')

// Counts how many active dices there are, default is 1
let activeDices = 1

// Allows to remove a dice, only possible when there's more than 1 dice displayed
substractDice.addEventListener('click', () => {
    if (activeDices > 1) {
        activeDices -= 1
        diceCounter.textContent = activeDices
        if (activeDices === 2) {
            diceThreeScore.textContent = ''
            diceThreeFull.style.display = 'none'
            showScore()
        } else if (activeDices === 1) {
            diceTwoFull.style.display = 'none'
            diceTwoScore.textContent = ''
            showScore()
        }
    }
})

// Allows to add a dice, only possible when there's not already the maximum amount of dices (3)
addDice.addEventListener('click', () => {
    if (activeDices < 3) {        
        activeDices += 1
        diceCounter.textContent = activeDices
        if (activeDices === 2) {
            diceTwoFull.style.display = 'flex'
        } else if (activeDices === 3) {
            diceThreeFull.style.display = 'flex'
        }
    }
})



/**************
* Traditional dice Roll mechanisms & animation (ID006)
**************/



// Activates the roll when the launch button is clicked
traditionalLaunch.addEventListener('click', traditionalRandom)

// Function that allows to disable the Idle state, calculates a random number between 1 and 6 and calls the function randomize depending on the quantity of dices that are active
function traditionalRandom()
{
    idleActive = false
    let randValue = (Math.floor(Math.random()*6) + 1)

    if (activeDices === 1) {
        randomize(diceOne, diceOneScore, randValue)
    } else if (activeDices === 2) {
        randomize(diceOne, diceOneScore, randValue)
        randValue = (Math.floor(Math.random()*6) + 1)
        randomize(diceTwo, diceTwoScore, randValue)
    } else if (activeDices === 3) {
        randomize(diceOne, diceOneScore, randValue)
        randValue = (Math.floor(Math.random()*6) + 1)
        randomize(diceTwo, diceTwoScore, randValue)
        randValue = (Math.floor(Math.random()*6) + 1)
        randomize(diceThree, diceThreeScore, randValue)
    }
    showScore()
}

// When you click on the first dice, you will only re-roll the first one, in case you were satisfied by the others and not by the first one
diceOne.addEventListener('click', () => {
    idleActive = false
    randValue = (Math.floor(Math.random()*6) + 1)
    randomize(diceOne, diceOneScore, randValue)
    showScore()
})

// When you click on the second dice, you will only re-roll the second one, in case you were satisfied by the others and not by the second one
diceTwo.addEventListener('click', () => {
    idleActive = false
    randValue = (Math.floor(Math.random()*6) + 1)
    randomize(diceTwo, diceTwoScore, randValue)
    showScore()
})

// When you click on the third dice, you will only re-roll the third one, in case you were satisfied by the others and not by the third one
diceThree.addEventListener('click', () => {
    idleActive = false
    randValue = (Math.floor(Math.random()*6) + 1)
    randomize(diceThree, diceThreeScore, randValue)
    showScore()
})

// Function allowing to show the total score of the dices, and if there are doubles or triples, indicates it to the user
function showScore()
{
    totalDiceScore.textContent = Number(diceOneScore.textContent) + Number(diceTwoScore.textContent) + Number(diceThreeScore.textContent)
    if (diceOneScore.textContent === diceTwoScore.textContent && diceTwoScore.textContent === diceThreeScore.textContent) {
        totalDiceScore.textContent = totalDiceScore.textContent + ' (Triples !)'
    } else if ((diceOneScore.textContent === diceTwoScore.textContent || diceTwoScore.textContent === diceThreeScore.textContent || diceOneScore.textContent === diceThreeScore.textContent) && activeDices != 1) {
        totalDiceScore.textContent = totalDiceScore.textContent + ' (Doubles !)'
    } 
}

// Function that uses all the values brought to rotate the 3D dice in the good direction (x), and show the individual score of the dice (y) based on the result (z) of the Math.random
function randomize(x, y, z) 
{
    if (z === 1) {
        x.style.transform = 'rotateY(0deg)'
        y.textContent = '1'
    }
    else if (z === 2) {
        x.style.transform = 'rotateY(90deg)'
        y.textContent = '2'
    }
    else if (z === 3) {
        x.style.transform = 'rotateX(-90deg)'
        y.textContent = '3'
    }
    else if (z === 4) {
        x.style.transform = 'rotateY(180deg)'
        y.textContent = '4'
    }
    else if (z === 5) {
        x.style.transform = 'rotateX(90deg)'
        y.textContent = '5'
    }
    else if (z === 6) {
        x.style.transform = 'rotateY(-90deg)'
        y.textContent = '6'
    }
}



/***********
* Declarations for the Challenge Dice (ID007)
**********/



const challenge = document.querySelector('.challenge-dice')
const rolledChallenge = challenge.querySelector('.active-challenge')
const challengeToggle1 = challenge.querySelector('.challenge-one-toggle')
const challengeToggle2 = challenge.querySelector('.challenge-two-toggle')
const challengeToggle3 = challenge.querySelector('.challenge-three-toggle')
const challengeObjectOne = challenge.querySelector('.challenge-object-one')
const challengeObjectTwo = challenge.querySelector('.challenge-object-two')
const challengeObjectThree = challenge.querySelector('.challenge-object-three')



/***********
* Challenge Dice mechanisms (ID008)
**********/



// If the first challenge list (Sportive) is asked, it will take one challenge randomly and display it big, also making it green in the list
challengeToggle1.addEventListener('click', () => {
    for(let i=0; i<7; i++) {
        challengeObjectOne.children[i].classList.remove('selected-challenge')
    }

    let challengeRandValue = (Math.floor(Math.random()*6) + 1)
    rolledChallenge.textContent = challengeObjectOne.children[challengeRandValue].children[0].textContent
    challengeObjectOne.children[challengeRandValue].classList.add('selected-challenge')
    rolledChallenge.classList.add('once-rolled')
})

// If the second challenge list (Confinement) is asked, it will take one challenge randomly and display it big, also making it green in the list
challengeToggle2.addEventListener('click', () => {
    for(let i=0; i<7; i++) {
        challengeObjectTwo.children[i].classList.remove('selected-challenge')
    }

    let challengeRandValue = (Math.floor(Math.random()*6) + 1)
    rolledChallenge.textContent = challengeObjectTwo.children[challengeRandValue].children[0].textContent
    challengeObjectTwo.children[challengeRandValue].classList.add('selected-challenge')
    rolledChallenge.classList.add('once-rolled')
})

// If the third challenge list (Custom) is asked, it will take one challenge randomly and display it big, also making it green in the list, little twist here from the two others, since we take the value and not the textContent
challengeToggle3.addEventListener('click', () => {
    for(let i=0; i<7; i++) {
        challengeObjectThree.children[i].classList.remove('selected-challenge')
    }

    let challengeRandValue = (Math.floor(Math.random()*6) + 1)
    rolledChallenge.textContent = challengeObjectThree.children[challengeRandValue].children[0].value
    challengeObjectThree.children[challengeRandValue].classList.add('selected-challenge')
    rolledChallenge.classList.add('once-rolled')
})



/***********
* Declarations for the Mega Dice (ID009)
**********/



const mega = document.querySelector('.mega-dice')
const megaFrom = mega.querySelector('.mega-value-from')
const megaTo = mega.querySelector('.mega-value-to')
const megaOutput = mega.querySelector('.mega-output')
const megaLaunch = mega.querySelector('.mega-launch')



/***********
* Mega Dice mechanics (ID010)
**********/



// Allows to block the user from entering a negative value or one that would be superior to the second one
megaFrom.addEventListener('input', (event) => {     
    if (event.target.value < 0) {
        megaFrom.value = 0
    } else if (event.target.value >= Number(megaTo.value)) {
        megaFrom.value = Number(megaTo.value) - 1
    }
}) 

// Allows to block the user from entering value that would be inferior to the first one
megaTo.addEventListener('input', (event) => {     
    if (event.target.value <= Number(megaFrom.value)) {
        megaTo.value = Number(megaFrom.value) + 1
}
}) 

// When the launch button is clicked, it will display a little thinking anmation, and then display a random number between the 2 values entered
megaLaunch.addEventListener('click', () => {
    let megaRandValue = (Math.floor(Math.random()*(Number(megaTo.value) - Number(megaFrom.value))) + Number(megaFrom.value))
    let tick = 0
    let megaOpacity = 100
    function megaRoll(){
        if(tick === 1) {
            return console.log("Roll animation finished !")
        } else {
            megaOutput.textContent = (Math.floor(Math.random()*1000)) + " (Rolling...)"
            requestAnimationFrame(megaRoll)
            megaOpacity -= 1
            megaOutput.style.opacity = `${megaOpacity}%`
        }
        setTimeout(() => {
            tick = 1
        }, 990)
    }
    megaRoll()
    setTimeout(() => {
        megaOutput.style.opacity = `100%`
        megaOutput.textContent = megaRandValue + ' !'
    }, 1000)
})



/**************
*
* End of the JavaScript part
*
**************/