// create template
const wrapper = document.createElement('div')
const menu = document.createElement('div')
const field = document.createElement('div')
const indicatorsWrapper = document.createElement('div')
const restartButton = document.createElement('button')
const soundButton = document.createElement('button')
const easyModeButton = document.createElement('button')
const saveButton = document.createElement('button')
const loadButton = document.createElement('button')
const records = document.createElement('button')
const movesIndicator = document.createElement('span')
const timesIndicator = document.createElement('div')
const minutes = document.createElement('span')
const separator= document.createElement('span')
const seconds = document.createElement('span')
const winWrapper = document.createElement('div')
const recordsWrapper = document.createElement('div')
const winText = document.createElement('p')
const selections = document.createElement('select')
const selectionsLabel = document.createElement('label')
const blocksField3x3 = document.createElement('option')
const blocksField4x4 = document.createElement('option')
const blocksField5x5 = document.createElement('option')
const blocksField6x6 = document.createElement('option')
const blocksField7x7 = document.createElement('option')
const blocksField8x8 = document.createElement('option')
wrapper.classList.add('wrapper')
winWrapper.classList.add('winWrapper')
recordsWrapper.classList.add('recordsWrapper')
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
wrapper.append(winWrapper)
wrapper.append(recordsWrapper)
winWrapper.append(winText)
menu.append(selectionsLabel)
menu.append(selections)
menu.append(easyModeButton)
menu.append(saveButton)
menu.append(loadButton)
menu.append(records)
selections.append(blocksField3x3)
selections.append(blocksField4x4)
selections.append(blocksField5x5)
selections.append(blocksField6x6)
selections.append(blocksField7x7)
selections.append(blocksField8x8)
selections.name = 'field-size'
selectionsLabel.for = 'field-size'
selectionsLabel.innerHTML = "Chose your field size"
easyModeButton.innerHTML = 'Easy mode'
restartButton.innerHTML = 'Shuffle and start'
saveButton.innerHTML = 'Save'
loadButton.innerHTML = 'Load'
records.innerHTML = 'Records'
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
let blockArray = []
let stopwatch;
let sec = 0
let min = 0
let fieldWidth = field.offsetWidth
let blockSize = fieldWidth / side
let matrixFlat = []

selections.addEventListener('change', function(){  
	side= this.value;
	blocksNumber = Math.pow(side, 2);
	blockSize = fieldWidth / side;
  });
//   console.log(selections.value)

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
			blockArray = SortArray(blockArray)
}
}

const SortArray = (arr) => {
	arr = arr.sort(() => Math.random() - 0.5)
	return arr
}

const checkSolvable = (arr) => {
	let counter = 0
	let zeroblockIndex
	let temp = matrix.flat()
	for (let i=0 ; i < temp .length; i++) {
		for (let j=i ; j < temp.length; j++) {
			if (temp[i].innerHTML == 0) {
				zeroblockIndex = i;
			}
			if (temp[i].innerHTML > temp[j].innerHTML && temp[j].innerHTML > 0) {
				counter++;
			}
		}
	}
	let zeroblockRow = Math.floor(zeroblockIndex / side)
if(side % 2 != 0) {
	if((counter) % 2 != 0) {
		startNewGame()
	}
}
if(side % 2 == 0) {
	if((counter + zeroblockRow) % 2 == 0) {
		startNewGame()
	}
}
}


let matrix = [];
const buildMatrix = () => {
	
	for (let i=0 ; i < side; i++) {
		matrix.push([]);
	}
	return matrix
} 

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

function startNewGame() {
	matrix.length = 0
	etalon.length = 0
	if (blockArray.length > 0) {
		blockArray.forEach(element => {
			element.remove()
		});
	}
	createBlocks()
	buildMatrix()
	setBlocksPosition(blockArray)
	getZero()
	startTimer()
	startTimer()
	makeEtalonArray()
	checkSolvable(matrix)
	removeMoveClass()
	addMoveClass()
	field.addEventListener('click', moveBlocks)
	sec = 0
 	min = 0
	moves = 0
	movesIndicator.innerHTML = `Moves: ${moves}`
	minutes.innerHTML  = '00'
	seconds.innerHTML  = '00'
}

restartButton.addEventListener('click', startNewGame)

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



function moveBlocks(event) {
	target = event.target
	getTarget()
	if ((Math.abs(X-x) == 1) && Y ==y) {
		playAudio()
		event.target.style.left = `${X * blockSize}px`;
		matrix[Y][X].style.left = `${x * blockSize}px`;
		[matrix[Y][X], matrix[y][x]] = [matrix[y][x], matrix[Y][X]];
		 X=x
		updatemoves()
		compareToEtalon()
		removeMoveClass()
		addMoveClass()
	}
	if ((Math.abs(Y-y) == 1) && X == x) {
		playAudio()
		event.target.style.top = `${Y * blockSize}px`;
		matrix[Y][X].style.top = `${y * blockSize}px`;
		[matrix[Y][X], matrix[y][x]] = [matrix[y][x], matrix[Y][X]];
		Y = y;
		updatemoves()
		compareToEtalon()
		removeMoveClass()
		addMoveClass()
	}
}

function getTarget() {
	for (let i=0 ; i < side; i++) {
		for (let j=0 ; j < side; j++) {
			if(matrix[i][j] == target ) {
				x = j 
				 y= i
			}
}
	}
}

const updatemoves = () => {
	moves++
	return movesIndicator.innerHTML = `Moves: ${moves}`
}

const addMoveClass = () => {
	matrix[Y][X].id = "target"
	matrix[Y][X].addEventListener('drop', dropHandler)
	matrix[Y][X].addEventListener('dragover', dragoverHandler)
	if (Y==0) {
	matrix[Y+1][X].draggable = true;
	matrix[Y+1][X].addEventListener('dragstart', dragstartHandler)
	}
	if (Y == side -1) {
		matrix[Y-1][X].draggable = true;
		matrix[Y-1][X].addEventListener('dragstart', dragstartHandler)
	}
	if (Y > 0 && Y < side - 1) {
		matrix[Y-1][X].draggable = true;
		matrix[Y-1][X].addEventListener('dragstart', dragstartHandler)
		matrix[Y+1][X].draggable = true;
		matrix[Y+1][X].addEventListener('dragstart', dragstartHandler)
	}
	if (X==0) {
	matrix[Y][X+1].draggable = true;
	matrix[Y][X+1].addEventListener('dragstart', dragstartHandler)
	}
	if (X == side -1) {
		matrix[Y][X-1].draggable = true;
		matrix[Y][X-1].addEventListener('dragstart', dragstartHandler)
	}
	if (X > 0 && X < side -1) {
		matrix[Y][X+1].draggable = true;
		matrix[Y][X+1].addEventListener('dragstart', dragstartHandler)
		matrix[Y][X-1].draggable = true;
		matrix[Y][X-1].addEventListener('dragstart', dragstartHandler)
	}
	}
function dragstartHandler(event) {
		target = event.target
		getTarget()
		event.dataTransfer.effectAllowed = "move";
}
function dragoverHandler(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move"
}
function dropHandler(event) {
		
		event.preventDefault();	
		if ((Math.abs(X-x) == 1) && Y ==y) {
			playAudio()
			target.style.left = `${X * blockSize}px`;
			matrix[Y][X].style.left = `${x * blockSize}px`;
			[matrix[Y][X], matrix[y][x]] = [matrix[y][x], matrix[Y][X]];
			 X=x
			updatemoves()
			compareToEtalon()
			removeMoveClass()
			addMoveClass()
		}
		if ((Math.abs(Y-y) == 1) && X == x) {
			playAudio()
			target.style.top = `${Y * blockSize}px`;
			matrix[Y][X].style.top = `${y * blockSize}px`;
			[matrix[Y][X], matrix[y][x]] = [matrix[y][x], matrix[Y][X]];
			Y = y;
		
			updatemoves()
			compareToEtalon()
			removeMoveClass()
			addMoveClass()
		}
}

const removeMoveClass = () => {
		let tempArr = matrix.flat()
		for(let i = 0; i <tempArr.length; i++) {
			tempArr[i].draggable = false;
			tempArr[i].removeEventListener('dragstart', dragstartHandler);
			tempArr[i].removeEventListener('dragover', dragoverHandler);
			tempArr[i].removeEventListener('drop', dropHandler);
		}
}

// win

let etalon = [];
let resultArray = []

const makeEtalonArray = () => {
	for(let i = 1; i < blocksNumber; i++) {
		etalon.push(i)
	}
}

function compareToEtalon() {
	matrixFlat = matrix.flat()
	for(let i = 0; i < etalon.length; i++) {
		if (etalon[i] != matrixFlat[i].innerHTML) {
			return false
		}
}
showWin()
setRecord()
return true
}

function showWin() {
	clearInterval(stopwatch);
	winWrapper.classList.add('winWrapper_active')
	winText.innerHTML = `Hooray! You solved the puzzle in ${minutes.innerHTML}:${seconds.innerHTML} and ${moves} moves!`
	field.removeEventListener('click', moveBlocks)
	removeMoveClass()
}

function setRecord() {
	let temp = {
		minutes:  `${minutes.innerHTML}`,
		seconds:  `${seconds.innerHTML}`,
		moves: `${moves}`,
		boardSize: `${side}x${side}`,
	}
	if(localStorage.getItem('results')) {
		resultArray = JSON.parse(localStorage.getItem('results'))
	}
	if(resultArray.length > 9) resultArray.length = 9;
	resultArray.push(temp)
	resultArray.sort(function(a, b) {
		return a.moves-b.moves
	})
	localStorage.setItem('results', JSON.stringify(resultArray));
}

winWrapper.addEventListener('click', () => {
	winWrapper.classList.remove('winWrapper_active')
	winText.innerHTML = '';
	removeMoveClass()

})

records.addEventListener('click', showRecords)


function showRecords() {
	recordsWrapper.classList.add('recordsWrapper_active')
	if(localStorage.getItem('results')) {
		resultArray = JSON.parse(localStorage.getItem('results'))
	}
	if (resultArray.length == 0) {
		let p = document.createElement('p')
		p.innerHTML = "No records yet"
		recordsWrapper.append(p)
	} else {
		for(let i=0; i < resultArray.length; i++) {
			let p = document.createElement('p')
			p.innerHTML = `${i+1}. Moves: ${resultArray[i].moves}  Time: ${resultArray[i].minutes}:${resultArray[i].seconds}  Field size: ${resultArray[i].boardSize}`;
			recordsWrapper.append(p)
			}
	}
}

recordsWrapper.addEventListener('click', () => {
	recordsWrapper.classList.remove('recordsWrapper_active')
	recordsWrapper.innerHTML = ""
})

// console.log(matrix)

// easy mode 
easyModeArray = []
const easyMode = () => {
	easyModeArray = blockArray.slice(0)
	easyModeArray = easyModeArray.sort( function(a, b) {
		return a.innerHTML - b.innerHTML
	})
	let temp = easyModeArray.splice(0, 1)
	easyModeArray.splice(easyModeArray.length - 1, 0, temp[0])
	return easyModeArray
}


easyModeButton.addEventListener('click', () => {
	matrix.length = 0
	etalon.length = 0
	if (blockArray.length > 0) {
		blockArray.forEach(element => {
			element.remove()
		});
	}
	createBlocks()
	buildMatrix()
	easyMode()
	setBlocksPosition(easyModeArray)
	getZero()
	startTimer()
	startTimer()
	makeEtalonArray()
	removeMoveClass()
	addMoveClass()
	field.addEventListener('click', moveBlocks)
	sec = 0
 	min = 0
	moves = 0
	movesIndicator.innerHTML = `Moves: ${moves}`
	minutes.innerHTML  = '00'
	seconds.innerHTML  = '00'
})


// save game

saveButton.addEventListener('click', 
savegame)
let savedArray = [];
function savegame() {
	let save = matrix.flat().map(el => el.innerHTML)
	let saveObj = {
		minutes:  `${minutes.innerHTML}`,
		seconds:  `${seconds.innerHTML}`,
		moves: `${moves}`,
		side: `${side}`,
		blocksNumber: `${blocksNumber}`,
	}

	localStorage.setItem('lastSave', JSON.stringify(save));
	localStorage.setItem('lastSaveIndicators', JSON.stringify(saveObj));
}

function compareArrays(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < blockArray.length; j++) {
			if(arr[i] == blockArray[j].innerHTML) {
				savedArray.push(blockArray[j])
			}
		} 
	}
}

loadButton.addEventListener('click', checkLocalStorage)


function checkLocalStorage() {
	if(!localStorage.getItem('lastSave')) {
		return
	}
if(localStorage.getItem('lastSave')) {
	matrix.length = 0
	etalon.length = 0
	if (blockArray.length > 0) {
		blockArray.forEach(element => {
			element.remove()
		});
	}
	side = (JSON.parse(localStorage.getItem('lastSaveIndicators'))).side;
	blocksNumber = (JSON.parse(localStorage.getItem('lastSaveIndicators'))).blocksNumber;
	blockSize = fieldWidth / side;
	createBlocks()
	buildMatrix()
	compareArrays(JSON.parse(localStorage.getItem('lastSave')))
	setBlocksPosition(savedArray)
	getZero()
	startTimer()
	startTimer()
	makeEtalonArray()
	removeMoveClass()
	addMoveClass()
	field.addEventListener('click', moveBlocks)
	sec = (JSON.parse(localStorage.getItem('lastSaveIndicators'))).seconds;
 	min = (JSON.parse(localStorage.getItem('lastSaveIndicators'))).minutes;
	moves = (JSON.parse(localStorage.getItem('lastSaveIndicators'))).moves;
	movesIndicator.innerHTML = `Moves: ${moves}`
	minutes.innerHTML  = `${min}`
	seconds.innerHTML  = `${sec}`
	document.querySelectorAll('option').forEach(el => el.value == side? el.selected = true : el.selected = false)
}
}


