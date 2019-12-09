const fs = require('fs')

let image = fs.readFileSync(process.argv[2], 'utf-8').split('')

function makeFlatLayers(image, layerWidth, layerHeight) {
	let layerArea = layerWidth * layerHeight
	let numLayers = image.length / layerArea
	let layers = []
	for (let i = 0; i < numLayers; i++) {
		layers.push(image.slice(i * layerArea, i * layerArea + layerArea))
	}
	return layers
}

function countValueInLayer(value, index, layers) {
	let count = 0
	for (let pixel of layers[index]) {
		count = pixel == value ? count + 1 : count
	}
	return count
}

// PART 1
let layerWidth = 25
let layerHeight = 6
let layers = makeFlatLayers(image, layerWidth, layerHeight)
let [ minZeros, minIndex ] = [ 1000, 0 ]
for (let i = 0; i < layers.length; i++) {
	let numZeros = countValueInLayer('0', i, layers)
	if (numZeros < minZeros) {
		minZeros = numZeros
		minIndex = i
	}
}

let numOnes = countValueInLayer('1', minIndex, layers)
let numTwos = countValueInLayer('2', minIndex, layers)

console.log(`part 1: ${numOnes * numTwos}`)

// PART 2
let decodedImage = []
for (let column = 0; column < layers[0].length; column++) {
	for (let row = 0; row < layers.length; row++) {
		let pixel = layers[row][column]
		if (decodedImage[column] == undefined && (pixel === '0' || pixel === '1')) {
			decodedImage[column] = pixel === '0' ? ' ' : '#'
		}
	}
}

for (let row = 0; row < layerHeight; row++) {
	let i = row * layerWidth
	console.log(decodedImage.slice(i, i + layerWidth).join(''))
}
