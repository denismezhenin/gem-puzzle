// create template
const wrapper = document.createElement('div')
const menu = document.createElement('div')
const field = document.createElement('div')
const indicatorsWrapper = document.createElement('div')
const restartButton = document.createElement('button')
const soundButton = document.createElement('button')
const easyModeButton = document.createElement('button')
const movesIndicator = document.createElement('span')
const timesIndicator = document.createElement('div')
const minutes = document.createElement('span')
const separator= document.createElement('span')
const seconds = document.createElement('span')
const selections = document.createElement('select')
const blocksField3x3 = document.createElement('option')
const blocksField4x4 = document.createElement('option')
const blocksField5x5 = document.createElement('option')
const blocksField6x6 = document.createElement('option')
const blocksField7x7 = document.createElement('option')
const blocksField8x8 = document.createElement('option')
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
menu.append(soundButton)
wrapper.append(field)
menu.append(selections)
menu.append(easyModeButton)
selections.append(blocksField3x3)
selections.append(blocksField4x4)
selections.append(blocksField5x5)
selections.append(blocksField6x6)
selections.append(blocksField7x7)
selections.append(blocksField8x8)
easyModeButton.innerHTML = 'Easy mode'
restartButton.innerHTML = 'Shuffle and start'
let moves = 0
movesIndicator.innerHTML = `Moves: ${moves}`
minutes.innerHTML  = '00'
seconds.innerHTML  = '00'
separator.innerHTML  = ':'
soundButton.innerHTML  = 'Sound on'

// filed
blocksField3x3.innerHTML = '3x3'
blocksField4x4.innerHTML = '4x4'
blocksField5x5.innerHTML = '5x5'
blocksField6x6.innerHTML = '6x6'
blocksField7x7.innerHTML = '7x7'
blocksField8x8.innerHTML = '8x8'
blocksField3x3.value = 3
blocksField4x4.value = 4
blocksField5x5.value = 5
blocksField6x6.value = 6
blocksField7x7.value = 7
blocksField8x8.value = 8
blocksField4x4.selected = true
selections.id = 'select';
let side = 4
let blocksNumber = 16;
let blockArray
let stopwatch;
let sec = 0
let min = 0
let fieldWidth = field.offsetWidth
// console.log(fieldWidth)
let blockSize = fieldWidth / side
let matrixFlat = []

selections.addEventListener('change', function(){  
	side= this.value;
	blocksNumber = Math.pow(side, 2);
	blockSize = fieldWidth / side
  });

const createBlocks = () => {
	for(let i=0; i <blocksNumber; i++) {
		let div = document.createElement('div')
		div.innerHTML = i;
		div.classList.add('block');
		div.classList.add(`block${i}`);
		field.append(div)
		div.style.width = `${blockSize}px`
		div.style.height = `${blockSize}px`
		blockArray = Array.from(document.querySelectorAll('.block'))
		blockArray = blockArray.sort(() => Math.random() - 0.5)
		}
}

// const sortBlocks = () => {
// 			blockArray = Array.from(document.querySelectorAll('.block'))
// 		blockArray = blockArray.sort(() => Math.random() - 0.5)
// }

let matrix = [];
const buildMatrix = () => {
	
	for (let i=0 ; i < side; i++) {
		matrix.push([]);
	}
	return matrix
} 
// buildmatrix()
// console.log(blockArray[0])

function setBlocksPosition (matrixArray) {
	for (let i=0 ; i < side; i++) {
	for (let j=0 ; j < side; j++) {
		matrix[i][j] = matrixArray[side * i + j];
		matrix[i][j].style.left = `${blockSize*j}px`;
		matrix[i][j].style.top = `${blockSize*i}px`;
	}
	}
	return matrix
}
// start game

const startTimer = () => {

	clearInterval(stopwatch);
	stopwatch = setInterval(() => {
		sec++
		seconds.innerHTML = sec.toString().padStart(2, '0') 
		if (sec > 60) {
			sec = 0
			min++
			minutes.innerHTML = min.toString().padStart(2, '0')
		}
	}, 1000)
}

restartButton.addEventListener('click', () => {
	matrix.length = 0
	etalon.length = 0
	// console.log(blockArray.length)
	blockArray.forEach(element => {
		element.remove()
	});
	createBlocks()
	buildMatrix()
	setBlocksPosition(blockArray)
	getZero()
	startTimer()
	startTimer()
	makeEtalonArray()
	sec = 0
 	min = 0
	moves = 0
	movesIndicator.innerHTML = `Moves: ${moves}`
	minutes.innerHTML  = '00'
	seconds.innerHTML  = '00'
	console.log(easyMode())
	
})

//audio 
let isMute = false
const moveAudio = new Audio("./assets/resourse/audio/blip1.mp3")
soundButton.addEventListener('click', changeVolume)
function changeVolume() {
	if(isMute) {
		isMute = false
		soundButton.innerHTML  = 'Sound on'
	} else {
		isMute = true
		soundButton.innerHTML  = 'Sound off'
	}
}

const playAudio = () => {
	if(!isMute) {
		moveAudio.play() ;
	}
}




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
		playAudio()

		// console.log(compareToEtalon())
		// console.log(`X :${X} x :${x} Y: ${Y}, y: ${y}`)
		e.target.style.left = `${X * blockSize}px`;
		matrix[Y][X].style.left = `${x * blockSize}px`;
		[matrix[Y][X], matrix[y][x]] = [matrix[y][x], matrix[Y][X]];
		X=x
		// console.log(matrix)
		// console.log(`X :${X} x :${x} Y: ${Y}, y: ${y}`)
		updatemoves()
		compareToEtalon()
		// console.log(compareToEtalon())
	}
	if ((Math.abs(Y-y) == 1) && X == x) {
		playAudio()
		
		// console.log(compareToEtalon())
		e.target.style.top = `${Y * blockSize}px`;
		matrix[Y][X].style.top = `${y * blockSize}px`;
		// console.log(matrix);
		[matrix[Y][X], matrix[y][x]] = [matrix[y][x], matrix[Y][X]];
		Y = y;
		// console.log(matrix);
		moves++
		updatemoves()
		compareToEtalon()
		// console.log(compareToEtalon())
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

// win

let etalon = []

const makeEtalonArray = () => {
	for(let i = 1; i < blocksNumber; i++) {
		etalon.push(i)
	}
}
// makeEtalonArray()

function compareToEtalon() {
	// console.log(matrix)
	let isWin
	matrixFlat = matrix.flat()
	// matrixFlat = matrixFlat.flat()

	// console.log(matrix)
	// console.log(matrixFlat)
	// console.log(etalon)
	for(let i = 0; i < etalon.length; i++) {
		// console.log(i)
					// console.log(etalon[i] , ':', matrixFlat[i].innerHTML )
			// console.log(matrixFlat[i].innerHTML)
		if (etalon[i] != matrixFlat[i].innerHTML) {

			return false
		}

}
return true
}

// console.log(matrix)

// easy mode 
easyModeArray = []
const easyMode = () => {
	console.log(blockArray)
	easyModeArray = blockArray.slice(0)
	easyModeArray = easyModeArray.sort( function(a, b) {
		return a.innerHTML - b.innerHTML
	})
	let temp = easyModeArray.splice(0, 1)
	easyModeArray.splice(easyModeArray.length - 1, 0, temp[0])
	// console.log(easyModeArray)
	// console.log(temp)
	// console.log(blockArray)

	return easyModeArray
}


easyModeButton.addEventListener('click', () => {
	matrix.length = 0
	etalon.length = 0
	blockArray.forEach(element => {
		element.remove()
	});
	// easyMode()
	createBlocks()
	buildMatrix()
	easyMode()
	setBlocksPosition(easyModeArray)
	getZero()
	startTimer()
	startTimer()
	makeEtalonArray()
	sec = 0
 	min = 0
	moves = 0
	movesIndicator.innerHTML = `Moves: ${moves}`
	minutes.innerHTML  = '00'
	seconds.innerHTML  = '00'
	// console.log(blockArray)
	// console.log(matrix.flat())
	// console.log(etalon)
})

//initial shuffle
createBlocks()
buildMatrix()
setBlocksPosition(blockArray)
getZero()