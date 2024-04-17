console.log('campoMinato')

const gridElement = document.querySelector('.grid')
const btnPlayElement = document.querySelector('.btn-play')
const selectElement = document.getElementById('game-difficulty')
const totalScoreElement = document.getElementById('total-score')
const iconElement = document.querySelector('.game-icon')
console.dir(iconElement)

let bombe = []
let totalCellsClicked = []
let gameOver = false
let punteggio = 0

// evento play - INIZIO GIOCO
btnPlayElement.addEventListener('click', () => {

    // variabili che devono resettarsi nel momento in cui il giocatore inizia un altra partita
    gridElement.innerHTML = ''
    bombe = []
    gameOver = false
    punteggio = 0
    totalScoreElement.innerHTML = ''
    totalCellsClicked = []

    const selectValue = selectElement.value

    if (selectValue == 0) {
        gameMode(100, 100)
        generateBombs(1, 100, bombe, 10)
    }

    if (selectValue == 1) {
        gameMode(81, 81)
        generateBombs(1, 81, bombe, 9)
    }

    if (selectValue == 2) {
        gameMode(49, 49)
        generateBombs(1, 49, bombe, 7)
    }
    console.log(bombe)
})

// ------- FUNZIONI -------

// GENERARE ARRAY DI BOMBE
function generateBombs(min, max, array, numOfBombs) {
    while (array.length < numOfBombs) {
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
function gameMode(difficulty, numOfCells) {
    // aggiungo le 100 celle al gridElement
    for (let i = 0; i < numOfCells; i++) {
        const num = i + 1

        const divElement = document.createElement('div')
        divElement.classList.add('grid-cell')
        divElement.classList.add(`grid-cell-${difficulty}`)
        gridElement.append(divElement)
        divElement.innerHTML = num
    }
    // evento click per ogni cella per cambiarle il bg 
    const cellDOMElements = document.querySelectorAll(`.grid-cell-${difficulty}`)
    if (numOfCells === 100) {
        addClickEventOnCells(cellDOMElements, 10)
        console.log(cellDOMElements)
    }

    if (numOfCells === 81) {
        addClickEventOnCells(cellDOMElements, 9)
        console.log(cellDOMElements)
    }

    if (numOfCells === 49) {
        addClickEventOnCells(cellDOMElements, 7)
        console.log(cellDOMElements)
    }


}

// EVENTO CLICK PER OGNI CELLA + CONTROLLO SE SCHIACCIA UNA BOMBA + PUNTEGGIO
function addClickEventOnCells(DOMElement, numOfBombs) {
    for (let i = 0; i < DOMElement.length; i++) {
        const cellNumber = i + 1
        const currentCell = DOMElement[i]
        // console.log(currentCell, cellNumber)

        // evento click per ogni cella
        currentCell.addEventListener('click', () => {
            if (gameOver) return

            if (bombe.includes(cellNumber)) {
                gameOver = true
                totalScoreElement.innerHTML = `HAI PERSO!`
                currentCell.classList.add('bg-red')
                currentCell.classList.add('color')

                currentCell.innerHTML = iconElement.innerHTML

                // ciclo l'array di bombe per assegnare ad ogni elemento dell'array bombe un DOMElement => posso assegnare la classe bg-red a tutte le bombe corrispondenti
                for (let k = 0; k < bombe.length; k++) {
                    const currentBomb = bombe[k]
                    const bombCells = DOMElement[currentBomb - 1]
                    bombCells.classList.add('bg-red')

                    bombCells.innerHTML = iconElement.innerHTML

                }

            } else {
                currentCell.classList.add('bg-cell')
                currentCell.innerHTML = '<i class="fa-solid fa-xmark"></i>'
                if (!totalCellsClicked.includes(cellNumber)) {
                    totalCellsClicked.push(cellNumber)
                    punteggio++
                    totalScoreElement.innerHTML = punteggio
                }
            }

            // logica per la vincita nel caso in cui vengano cliccate tutte le celle tranne le bombe
            if (DOMElement.length - totalCellsClicked.length === numOfBombs) {
                totalScoreElement.innerHTML = `HAI VINTO !`
                gameOver = true
            }
        })
    }
}
