document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid') 
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10

    //shapes
    const jShape = [
        [1, width+1, width*2+1, 2], 
        [0, 1, 2, width+2],
        [1, width+1, width*2+1, width*2],
        [0, width, width+1, width+2]
    ]
    
    const oShape = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const lShape = [
        [0, width, width*2, width*2+1],
        [2, width, width+1, width+2],
        [0, 1, width+1, width*2+1],
        [0, 1, 2, width]
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
        [0, 1, 2, width+1],
        [0, width, width*2, width+1],
        [1, width, width+1, width+2],
        [1, width+1, width*2+1, width]
    ]

    const theShapes = [jShape, oShape, lShape, iShape, zShape, sShape, tShape]

    let currentPosition = 4
    let currentRotation = 3

    //randomly select a shape and its 1st rotation
    let random = Math.floor(Math.random()*theShapes.length)
    let current = theShapes[random][currentRotation]

    //draw 1st rotation of 1st shape
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('shape')
        })
    }
    draw()
    //erase the shape
    function erase() {
        current.forEach(index => {
            squares[currentPostion + index].classList.remove('shape')
        })
    }
 



})