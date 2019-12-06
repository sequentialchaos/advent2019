let rawinput02, input02

function preload() {
	rawinput02 = loadStrings('../input.txt')
}

function setup() {
	noCanvas()
	input02 = rawinput02[0].split(',').map((string) => Number(string))
	input02[1] = 12
	input02[2] = 2
	part1()
	part2()
}

function evaluateProgram(program) {
	let i = 0
	let copy = program.map((n) => n)
	let opcode
	do {
		opcode = copy[i]
		if (opcode === 1 || opcode === 2) {
			let parameter1 = copy[copy[i + 1]]
			let parameter2 = copy[copy[i + 2]]
			if (opcode === 1) {
				copy[copy[i + 3]] = parameter1 + parameter2
			}
			if (opcode === 2) {
				copy[copy[i + 3]] = parameter1 * parameter2
			}
		} else {
			break
		}
		i += 4
	} while (opcode != 99)
	return copy
}

function part1() {
	let output = evaluateProgram(input02)[0]
	print(`part 1\n~ program output: ${output}`)
}

function part2() {
	let goalOutput = 19690720
	for (let noun = 0; noun < 100; noun++) {
		for (let verb = 0; verb < 100; verb++) {
			input02[1] = noun
			input02[2] = verb
			let output = evaluateProgram(input02)[0]
			if (output == goalOutput) {
				print(
					`part 2\n~ the noun ${noun} and verb ${verb} together produce an output of ${goalOutput}\n~ 100 * noun * verb = 100 * ${noun} + ${verb} = ${100 *
						noun +
						verb}`
				)
			}
		}
	}
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
