console.log('campoMinato')

const gridElement = document.querySelector('.grid')
const btnPlayElement = document.querySelector('.btn-play')
const selectElement = document.getElementById('game-difficulty')
const totalScoreElement = document.getElementById('total-score')
const messageElement = document.getElementById('message')

let bombe = []
let totalCellsClicked = []
let gameOver = false
let punteggio = 0
gridElement.classList.add('d-none')

// evento play - INIZIO GIOCO
btnPlayElement.addEventListener('click', () => {

    // variabili che devono resettarsi nel momento in cui il giocatore inizia un altra partita
    gridElement.classList.remove('d-none')
    gridElement.innerHTML = ''
    bombe = []
    gameOver = false
    punteggio = 0
    totalScoreElement.innerHTML = ''
    messageElement.innerHTML = ''
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

// GENERARE NUMERI CASUALI PER LE BOMBE
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

// MODALITÀ DI GIOCO
function gameMode(difficulty, numOfCells) {
    // aggiungo le 100 celle al gridElement
    for (let i = 0; i < numOfCells; i++) {
        const num = i + 1

        const divElement = document.createElement('div')
        divElement.classList.add('grid-cell')
        divElement.classList.add(`grid-cell-${difficulty}`)
        gridElement.append(divElement)
    }

    // recupero le celle create e in base al numero di celle determino il numero di bombe in modo che la logica di vittoria funzioni
    const cellDOMElements = document.querySelectorAll(`.grid-cell-${difficulty}`)
    if (numOfCells === 100) {
        addClickEventOnCells(cellDOMElements, 10)
    }

    if (numOfCells === 81) {
        addClickEventOnCells(cellDOMElements, 9)
    }

    if (numOfCells === 49) {
        addClickEventOnCells(cellDOMElements, 7)
    }
}

// CONTROLLO SE SCHIACCIA UNA BOMBA + PUNTEGGIO + LOSE / WIN
function addClickEventOnCells(DOMElement, numOfBombs) {

    // ciclo tutte le celle del DOM => posso aggiungere ad ognuna un evento click
    for (let i = 0; i < DOMElement.length; i++) {
        const cellNumber = i + 1
        const currentCell = DOMElement[i]

        // evento click per ogni cella
        currentCell.addEventListener('click', function () {
            if (gameOver) return

            if (bombe.includes(cellNumber)) {
                gameOver = true
                totalScoreElement.innerHTML = punteggio
                messageElement.innerHTML = 'HAI PERSO!'
                this.classList.add('bg-red')
                this.classList.add('color')

                // ciclo l'array di bombe (che sono solo dei numeri random) per assegnare ad ogni elemento dell'array bombe un oggetto del DOM corrispondente => posso accedervi e modificarne le proprietà
                for (let k = 0; k < bombe.length; k++) {
                    const currentBomb = bombe[k]
                    const bombCells = DOMElement[currentBomb - 1]
                    bombCells.classList.add('bg-red')
                    bombCells.innerHTML = '<i class="fa-solid fa-bomb"></i>'
                    this.innerHTML = '<i class="fa-solid fa-land-mine-on"></i>'
                }

            } else {
                this.classList.add('bg-cell')
                this.innerHTML = '<i class="fa-solid fa-xmark"></i>'
                if (!totalCellsClicked.includes(cellNumber)) {
                    totalCellsClicked.push(cellNumber)
                    punteggio++
                    totalScoreElement.innerHTML = punteggio
                }
            }

            // logica per la vincita nel caso in cui vengano cliccate tutte le celle tranne le bombe
            if (DOMElement.length - totalCellsClicked.length === numOfBombs) {
                totalScoreElement.innerHTML = punteggio
                messageElement.innerHTML = 'HAI VINTO'
                gameOver = true
            }
        })
    }
}
