let rawinput03, input03

function preload() {
	rawinput03 = loadStrings('input.txt')
}

function setup() {
	noCanvas()

	input03 = parseInput(rawinput03)

	part1()
	part2()
}

function parseInput(rawinput) {
	return rawinput.map((instructions) =>
		instructions.split(',').map((instruction) => {
			const direction = instruction[0]
			const distance = Number(instruction.slice(1, instruction.length))
			return { direction, distance }
		})
	)
}

function computePath(instructions) {
	let path = []
	let x = 0
	let y = 0
	let length = 0
	for (let instruction of instructions) {
		const { direction, distance } = instruction
		for (let i = 0; i < distance; i++) {
			x = direction == 'R' ? x + 1 : direction == 'L' ? x - 1 : x
			y = direction == 'D' ? y + 1 : direction == 'U' ? y - 1 : y
			length++
			path.push({ x, y, length })
		}
	}
	return path
}

function pointStringToObject(pointString) {
	const [ x, y ] = pointString.split(',').map((string) => Number(string))
	return { x, y }
}

function pointObjectToString(pointObject) {
	return pointObject.x + ',' + pointObject.y
}

function pointObjectsToStrings(pointObjects) {
	return pointObjects.map((pointObject) => pointObjectToString(pointObject))
}

function findIntersections(pathA, pathB) {
	const stringsPathA = pointObjectsToStrings(pathA)
	const stringsPathB = pointObjectsToStrings(pathB)
	const setA = new Set(stringsPathA)
	const setB = new Set(stringsPathB)
	const intersections = new Set([ ...setA ].filter((p) => setB.has(p)))
	return Array.from(intersections).map((p) => pointStringToObject(p))
}

// this is ugly :(
function findIntersectionsWithDelay(pathA, pathB) {
	const stringsPathA = pointObjectsToStrings(pathA)
	const stringsPathB = pointObjectsToStrings(pathB)
	const setA = new Set(stringsPathA)
	const setB = new Set(stringsPathB)
	const intersections = []
	for (let pointStringA of setA) {
		let pointA = pointStringToObject(pointStringA)
		if (setB.has(pointStringA)) {
			let pointObjectA
			let pointObjectB
			for (let p of pathA) {
				if (p.x == pointA.x && p.y == pointA.y) {
					pointObjectA = p
				}
			}
			for (let p of pathB) {
				if (p.x == pointObjectA.x && p.y == pointObjectA.y) {
					pointObjectB = p
				}
			}
			intersections.push({
				x: pointObjectA.x,
				y: pointObjectA.y,
				delay: pointObjectA.length + pointObjectB.length
			})
		}
	}
	return intersections
}

function manhattanDistance(pointA, pointB) {
	return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)
}

function part1() {
	const [ pathA, pathB ] = input03.map((instructions) => computePath(instructions))
	const startingPoint = { x: 0, y: 0 }
	const intersections = findIntersections(pathA, pathB)
	const manhattanDistances = intersections.map((intersection) => {
		return manhattanDistance(startingPoint, intersection)
	})
	print(min(manhattanDistances))
}

function part2() {
	const [ pathA, pathB ] = input03.map((instructions) => computePath(instructions))
	const intersections = findIntersectionsWithDelay(pathA, pathB)
	const signalDelays = intersections.map((intersection) => {
		return intersection.delay
	})
	print(min(signalDelays))
}

function testPart1() {
	let testPrograms = [
		[ 1, 0, 0, 0, 99 ],
		[ 2, 3, 0, 3, 99 ],
		[ 2, 4, 4, 5, 99, 0 ],
		[ 1, 1, 1, 4, 99, 5, 6, 0, 99 ]
	]
	let testSolutions = [
		[ 2, 0, 0, 0, 99 ],
		[ 2, 3, 0, 6, 99 ],
		[ 2, 4, 4, 5, 99, 9801 ],
		[ 30, 1, 1, 4, 2, 5, 6, 0, 99 ]
	]
	for (let i = 0; i < testPrograms.length; i++) {
		let program = testPrograms[i]
		let solution = testSolutions[i]
		let result = evaluateProgram(program)
		print(program, solution, result)
	}
}

function testPart2() {
	return
}
