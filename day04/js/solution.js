function setup() {
	noCanvas()

	let start = 356261
	let end = 846303

	print(`part 1: ${part1(start, end)}`)
	print(`part 2: ${part2(start, end)}`)

	// testPart1()
	// testPart2()
}

function isNotDecreasing(string) {
	for (let i = 0; i < string.length - 1; i++) {
		let a = string[i]
		let b = string[i + 1]
		if (b < a) {
			return false
		}
	}
	return true
}

function hasDouble(string) {
	for (let i = 0; i < string.length - 1; i++) {
		let a = string[i]
		let b = string[i + 1]
		if (a == b) {
			return true
		}
	}
	return false
}

// kind of lazy, is there a more elegant solution?
function hasTrueDouble(string) {
	let counts = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
	for (let c of string) {
		counts[c]++
	}
	return counts.includes(2)
}

function isValidPassword1(string) {
	return isNotDecreasing(string) && hasDouble(string)
}

function isValidPassword2(string) {
	return isNotDecreasing(string) && hasTrueDouble(string)
}

function testPart1() {
	let testInputs = [ '111111', '223450', '123789' ]
	let testOutputs = [ true, false, false ]
	for (let i = 0; i < testInputs.length; i++) {
		let input = testInputs[i]
		let output = testOutputs[i]
		let programOutput = isValidPassword1(input)
		print(input, output, programOutput)
	}
}

function testPart2() {
	let testInputs = [ '112233', '123444', '111122', '144456', '144445' ]
	let testOutputs = [ true, false, true, false, false ]
	for (let i = 0; i < testInputs.length; i++) {
		let input = testInputs[i]
		let output = testOutputs[i]
		let programOutput = isValidPassword2(input)
		print(input, output, programOutput)
	}
}

function part1(start, end) {
	let count = 0
	for (let number = start; number <= end; number++) {
		let string = number.toString()
		if (isValidPassword1(string)) {
			count++
		}
	}
	return count
}

function part2(start, end) {
	let count = 0
	for (let number = start; number <= end; number++) {
		let string = number.toString()
		if (isValidPassword2(string)) {
			count++
		}
	}
	return count
}
