document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid') 
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0

    //shapes
    const jShape = [
        [0, width, width+1, width+2],
        [0, 1, width, width*2],
        [0, 1, 2, width+2],
        [1, width+1, width*2, width*2+1]
        
    ]
    
    const oShape = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const lShape = [
        [2, width, width+1, width+2],
        [0, width, width*2, width*2+1],
        [0, 1, 2, width],
        [0, 1, width+1, width*2+1]
        
    ]

    const iShape = [
        [0, width, width*2, width*3],
        [0, 1, 2, 3],
        [0, width, width*2, width*3], 
        [0, 1, 2, 3]
    ]

    const zShape = [
        [0, 1, width+1, width+2],
        [1, width, width+1, width*2],
        [0, 1, width+1, width+2],
        [1, width, width+1, width*2]
    ]

    const sShape = [
        [1, 2, width, width+1],
        [0, width, width+1, width*2+1],
        [1, 2, width, width+1],
        [0, width, width+1, width*2+1]

    ]

    const tShape = [
        [1, width, width+1, width+2],
        [0, width, width*2, width+1],
        [0, 1, 2, width+1],
        [1, width+1, width*2+1, width]
    ]

    const theShapes = [jShape, oShape, lShape, iShape, zShape, sShape, tShape]

    let currentPosition = 4
    let currentRotation = 0

    //randomly select a shape and its 1st rotation
    let random = Math.floor(Math.random()*theShapes.length)
    let current = theShapes[random][currentRotation]

    //draw 1st rotation of 1st shape
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('shape')
        })
    }
    //erase the shape
    function erase() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('shape')
        })
    }
    //moving pieces down the grid
    //timerId = setInterval(moveDown, 1000)

    //assign function to keys
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener('keyup', control)

    function moveDown() {
        erase()
        currentPosition += width
        draw()
        freeze()
    }

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //new shape begins falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theShapes.length)
            current = theShapes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }
    //move left, but stop shape from moving outside grid
    function moveLeft() {
        erase()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -= 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }

        draw()
    }

    function moveRight() {
        erase()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }

    function rotate() { 
        erase()
        currentRotation++
        if (currentRotation === current.length) {
            currentRotation = 0 
        }
        current = theShapes[random][currentRotation]
        draw()
    }

    //next-up piece in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0 
    

    ///the pieces w/o rotations
    const upNextShape = [
        [0, displayWidth, displayWidth+1, displayWidth+2], //jshape
        [0, 1, displayWidth, displayWidth+1], //oshape
        [2, displayWidth, displayWidth+1, displayWidth+2], //lshape
        [0, displayWidth, displayWidth*2, displayWidth*3], //ishape
        [0, 1, displayWidth+1, displayWidth+2], //zshape
        [1, 2, displayWidth, displayWidth+1], //sshape
        [1, displayWidth, displayWidth+1, displayWidth+2] //tshape

    ]

    //display piece in mini-grid
    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('shape')
        })
        upNextShape[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('shape')
        })
    }

    //add button functionality 
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*theShapes.length)
            displayShape()
        }
    })

    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))){
                score += 10 
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('shape')
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }

        }
    }
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }
})