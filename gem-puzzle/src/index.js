// create template
const wrapper = document.createElement('div')
const menu = document.createElement('div')
const field = document.createElement('div')
const indicatorsWrapper = document.createElement('div')
const restartButton = document.createElement('button')
const movesIndicator = document.createElement('span')
const timesIndicator = document.createElement('div')
const minutes = document.createElement('span')
const separator= document.createElement('span')
const seconds = document.createElement('span')
wrapper.classList.add('wrapper')
field.classList.add('field')
menu.classList.add('menu')
indicatorsWrapper.classList.add('indicators')
restartButton.classList.add('button-start')
movesIndicator.classList.add('moves-indicator')
timesIndicator.classList.add('time-indicator')
document.body.append(wrapper)
wrapper.append(menu)
wrapper.append(indicatorsWrapper)
indicatorsWrapper.append(timesIndicator)
indicatorsWrapper.append(movesIndicator)
timesIndicator.append(minutes)
timesIndicator.append(separator)
timesIndicator.append(seconds)
menu.append(restartButton)
wrapper.append(field)
restartButton.innerHTML = 'Shuffle and start'
let moves = 0
movesIndicator.innerHTML = `Moves: ${moves}`
minutes.innerHTML  = '00'
seconds.innerHTML  = '00'
separator.innerHTML  = ':'

// filed



let blocksNumber = 16;
let side = 4
let blockArray
let stopwatch
const createBlocks = () => {
	for(let i=0; i <blocksNumber; i++) {
		let div = document.createElement('div')
		div.innerHTML = i;
		div.classList.add('block');
		div.classList.add(`block${i}`);
		field.append(div)
		}
		blockArray = Array.from(document.querySelectorAll('.block'))
		blockArray = blockArray.sort(() => Math.random() - 0.5)
}



let matrix = [];
const buildMatrix = () => {
	
	for (let i=0 ; i < side; i++) {
		matrix.push([]);
	}
	return matrix
} 
// buildmatrix()
// console.log(blockArray[0])

function setBlocksPosition (blockArray) {
	for (let i=0 ; i < side; i++) {
	for (let j=0 ; j < side; j++) {
		matrix[i][j] = blockArray[side * i + j] 
		matrix[i][j].style.left = `${200*j}px`
		matrix[i][j].style.top = `${200*i}px`
	}
	}
	return matrix
}

const startTimer = () => {
	let sec = 0
	let min = 0
	clearInterval(stopwatch);
	stopwatch = setInterval(() => {
		seconds++
		seconds.innerHTML = sec 
		if (seconds > 60) {
			min++
			minutes.innerHTML = min
		}
	}, 100)
}

restartButton.addEventListener('click', () => {
	console.log(blockArray.length)
	blockArray.forEach(element => {
		element.remove()
	});
	createBlocks()
	buildMatrix()
	setBlocksPosition(blockArray)
	getZero()
	startTimer()
	moves = 0
	movesIndicator.innerHTML = `Moves: ${moves}`
})


// move functionality
let X, Y, x, y, target;
function getZero() {
	for (let i=0 ; i < side; i++) {
		for (let j=0 ; j < side; j++) {
			if(matrix[i][j].classList.contains('block0') ) {
				X = j 
				Y = i
			}
}
	}
}



field.addEventListener('click', (e) => {
	target = e.target
	// console.log(target)
	getTarget()
	// console.log(`X :${X} x :${x} Y: ${Y}, y: ${y}`)
	
	// console.log(matrix)
	if ((Math.abs(X-x) == 1) && Y ==y) {
		// console.log(`X :${X} x :${x} Y: ${Y}, y: ${y}`)
		e.target.style.left = `${X * 200}px`;
		matrix[Y][X].style.left = `${x * 200}px`;
		[matrix[Y][X], matrix[y][x]] = [matrix[y][x], matrix[Y][X]];
		X=x
		// console.log(matrix)
		// console.log(`X :${X} x :${x} Y: ${Y}, y: ${y}`)
		updatemoves()
	}
	if ((Math.abs(Y-y) == 1) && X == x) {
		e.target.style.top = `${Y * 200}px`;
		matrix[Y][X].style.top = `${y * 200}px`;
		// console.log(matrix);
		[matrix[Y][X], matrix[y][x]] = [matrix[y][x], matrix[Y][X]];
		Y = y;
		// console.log(matrix);
		moves++
		updatemoves()
	}

})

function getTarget() {
	for (let i=0 ; i < side; i++) {
		for (let j=0 ; j < side; j++) {
			if(matrix[i][j] == target ) {
				x = j 
				 y= i
				//  console.log(x,y)
			}
}
	}
}

const updatemoves = () => {
	moves++
	return movesIndicator.innerHTML = `Moves: ${moves}`
}
// console.log(matrix)
// const addMoveClass = () => {
// 	if (Y==0) {
// 	matrix[Y+1][X].classList.add('down')
// 	}
// 	if (Y == side -1) {
// 		matrix[Y-1][X].classList.add('up')
// 	}
// 	if (Y > 0 && Y < side - 1) {
// 		matrix[Y-1][X].classList.add('down')
// 		matrix[Y+1][X].classList.add('up')
// 	}
// 	if (X==0) {
// 	matrix[Y][X+1].classList.add('left')
// 	}
// 	if (X == side -1) {
// 		matrix[Y][X-1].classList.add('right')
// 	}
// 	if (X > 0 && X < side -1) {
// 		matrix[Y][X+1].classList.add('left')
// 		matrix[Y][X-1].classList.add('right')
// 	}
// 	}
// addMoveClass()


//initial shuffle
createBlocks()
buildMatrix()
setBlocksPosition(blockArray)
getZero()