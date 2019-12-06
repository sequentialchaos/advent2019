let rawinput03, input03

function preload() {
	rawinput03 = loadStrings('../input.txt')
}

function setup() {
	noCanvas()

	input03 = parseInput(rawinput03)

	print(`part 1 solution: ${part1(input03)}`)
	print(`part 2 solution: ${part2(input03)}`)

	// testPart1()
	// testPart2()
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

function part1(input) {
	const [ pathA, pathB ] = input.map((instructions) => computePath(instructions))
	const startingPoint = { x: 0, y: 0 }
	const intersections = findIntersections(pathA, pathB)
	const manhattanDistances = intersections.map((intersection) => {
		return manhattanDistance(startingPoint, intersection)
	})
	return min(manhattanDistances)
}

function part2(input) {
	const [ pathA, pathB ] = input.map((instructions) => computePath(instructions))
	const intersections = findIntersectionsWithDelay(pathA, pathB)
	const signalDelays = intersections.map((intersection) => {
		return intersection.delay
	})
	return min(signalDelays)
}

function testPart1() {
	let testInputs = [
		[ 'R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83' ],
		[ 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7' ]
	]
	let testSolutions = [ 159, 135 ]
	for (let i = 0; i < testInputs.length; i++) {
		let input = parseInput(testInputs[i])
		let solution = testSolutions[i]
		let output = part1(input)
		print(solution, output)
	}
}

function testPart2() {
	let testInputs = [
		[ 'R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83' ],
		[ 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7' ]
	]
	let testSolutions = [ 610, 410 ]
	for (let i = 0; i < testInputs.length; i++) {
		let input = parseInput(testInputs[i])
		let solution = testSolutions[i]
		let output = part2(input)
		print(solution, output)
	}
}
