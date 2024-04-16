console.log('campoMinato')

const gridElement = document.querySelector('.grid')
const btnPlayElement = document.querySelector('.btn-play')
const btnResetElement = document.querySelector('.btn-reset')
const selectElement = document.getElementById('game-difficulty')

// evento play - INIZIO GIOCO
btnPlayElement.addEventListener('click', () => {

    // imposto innerHTML 0 = '' per non duplicare le celle ad ogni click
    gridElement.innerHTML = ''
    const selectValue = selectElement.value
    if (selectValue == 0) {
        easyGameMode()
    }

    if (selectValue == 1) {
        intermediateGameMode()
    }

    if (selectValue == 2) {
        difficultGameMode()
    }
})

// evento reset griglia
btnResetElement.addEventListener('click', () => {
    removeGrid(gridElement)
})


// ------- FUNZIONI -------

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
    for (let i = 0; i < cellDOMElements.length; i++) {
        const cellNumber = i + 1
        const currentCell = cellDOMElements[i]
        console.log(currentCell)

        currentCell.addEventListener('click', () => {
            console.log(`ho cliccato sulla cella numero: ${cellNumber}`)
            currentCell.classList.add('bg-blue')
        })
    }

}

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
    for (let i = 0; i < cellDOMElements.length; i++) {
        const cellNumber = i + 1
        const currentCell = cellDOMElements[i]
        console.log(currentCell)

        currentCell.addEventListener('click', () => {
            console.log(`ho cliccato sulla cella numero: ${cellNumber}`)
            currentCell.classList.add('bg-blue')
        })
    }

}

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
    for (let i = 0; i < cellDOMElements.length; i++) {
        const cellNumber = i + 1
        const currentCell = cellDOMElements[i]
        console.log(currentCell)

        currentCell.addEventListener('click', () => {
            console.log(`ho cliccato sulla cella numero: ${cellNumber}`)
            currentCell.classList.add('bg-blue')
        })
    }
}

function removeGrid(DOMElement) {
    DOMElement.innerHTML = ''
}





