let rawinput01, input01

function preload() {
	rawinput01 = loadStrings('../input.txt')
}

function setup() {
	noCanvas()
	input01 = rawinput01.map((string) => Number(string))
	part1()
	part2()
}

function fuelRequired(mass) {
	return floor(mass / 3) - 2
}

function fuelRequiredRecursive(mass, total = 0) {
	if (fuelRequired(mass) <= 0) {
		return total
	}
	let fuel = fuelRequired(mass)
	return total + fuel + fuelRequiredRecursive(fuel)
}

function part1() {
	let fuels = input01.map((mass) => fuelRequired(mass))
	let fuelSum = fuels.reduce((accumulator, summand) => accumulator + summand)
	print(`part 1 total fuel output: ${fuelSum}`)
}

function part2() {
	let fuels = input01.map((mass) => fuelRequiredRecursive(mass))
	let fuelSum = fuels.reduce((accumulator, summand) => accumulator + summand)
	print(`part 2 total fuel output: ${fuelSum}`)
}

function testPart1() {
	let testMasses = [ 12, 14, 1969, 100756 ]
	let testSolutions = [ 2, 2, 654, 33583 ]
	for (let i = 0; i < testMasses.length; i++) {
		let mass = testMasses[i]
		let solution = testSolutions[i]
		let result = fuelRequired(mass)
		print(mass, solution, result)
	}
}

function testPart2() {
	let testMasses = [ 14, 1969, 100756 ]
	let testSolutions = [ 2, 966, 50346 ]
	for (let i = 0; i < testMasses.length; i++) {
		let mass = testMasses[i]
		let solution = testSolutions[i]
		let result = fuelRequiredRecursive(mass)
		print(mass, solution, result)
	}
}
