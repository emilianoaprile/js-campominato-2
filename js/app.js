console.log('campoMinato')

const gridElement = document.querySelector('.grid')
const btnPlayElement = document.querySelector('.btn-play')
const btnResetElement = document.querySelector('.btn-reset')
const selectElement = document.getElementById('game-difficulty')
let bombe = []
let gameOver = false

// evento play - INIZIO GIOCO
btnPlayElement.addEventListener('click', () => {

    // imposto innerHTML 0 = '' per non duplicare le celle ad ogni click
    gridElement.innerHTML = ''
    // imposto array vuoto in modo tale che ad ogni click si generano numeri diversi
    bombe = []
    // reimposto la varibile gameOver a false cosi che ad ogni click su gioca lo status di gioco si resetta => il giocatore può ricominciare
    gameOver = false
    const selectValue = selectElement.value
    if (selectValue == 0) {
        easyGameMode()
        generateBombs(1, 100, bombe)
    }

    if (selectValue == 1) {
        intermediateGameMode()
        generateBombs(1, 81, bombe)
    }

    if (selectValue == 2) {
        difficultGameMode()
        generateBombs(1, 49, bombe)
    }

    
    console.log(bombe)
})

// evento reset griglia
btnResetElement.addEventListener('click', () => {
    removeGrid(gridElement)
})



// ------- FUNZIONI -------

// GENERARE ARRAY DI BOMBE
function generateBombs(min, max, array) {
    while (array.length < 16) {
        const currentBomb = getRandomIntInclusive(min, max)
        if (!array.includes(currentBomb, array)) {
            array.push(currentBomb)
        }
    }

}

// GENERARE NUMERI CASUALI
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

// MODALITÀ DI GIOCO FACILE
function easyGameMode() {
    // aggiungo le 100 celle al gridElement
    for (let i = 0; i < 100; i++) {
        const num = i + 1

        const divElement = document.createElement('div')
        divElement.classList.add('grid-cell-100')
        gridElement.append(divElement)
        divElement.innerHTML = num
    }
    // evento click per ogni cella per cambiarle il bg 
    const cellDOMElements = document.querySelectorAll('.grid-cell-100')
    addClickEventOnCells(cellDOMElements)

}

// MODALITÀ DI GIOCO INTERMEDIA
function intermediateGameMode() {
    // aggiungo le 81 celle al gridElement
    for (let i = 0; i < 81; i++) {
        const num = i + 1

        const divElement = document.createElement('div')
        divElement.classList.add('grid-cell-81')
        gridElement.append(divElement)
        divElement.innerHTML = num
    }
    // evento click per ogni cella per cambiarle il bg 
    const cellDOMElements = document.querySelectorAll('.grid-cell-81')
    addClickEventOnCells(cellDOMElements)

}

// MODALITÀ DI GIOCO DIFFICILE
function difficultGameMode() {
    // aggiungo le 49 celle al gridElement
    for (let i = 0; i < 49; i++) {
        const num = i + 1

        const divElement = document.createElement('div')
        divElement.classList.add('grid-cell-49')
        gridElement.append(divElement)
        divElement.innerHTML = num
    }
    // evento click per ogni cella per cambiarle il bg 
    const cellDOMElements = document.querySelectorAll('.grid-cell-49')
    addClickEventOnCells(cellDOMElements)
    
}

// EVENTO CLICK PER OGNI CELLA + CONTROLLO SE SCHIACCIA UNA BOMBA
function addClickEventOnCells(DOMElement) {
    for (let i = 0; i < DOMElement.length; i++) {
        const cellNumber = i + 1
        const currentCell = DOMElement[i]

        // evento click per ogni cella
        currentCell.addEventListener('click', () => {
            if (gameOver) return;

            // logica per controllare se il giocatore prende una bomba
            for (let i = 0; i < bombe.length; i++) {
                if (cellNumber === bombe[i]) {
                    currentCell.classList.add('bg-red')
                    currentCell.classList.add('color-white')
                    gameOver = true
                } else {
                    currentCell.classList.add('bg-blue')
                }
            }
            
            console.log(`ho cliccato sulla cella numero: ${cellNumber}`)
        })
    }

}

function removeGrid(DOMElement) {
    DOMElement.innerHTML = ''
}





