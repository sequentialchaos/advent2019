const fs = require('fs')

let program = fs.readFileSync(process.argv[2], 'utf-8').split(',').map((s) => parseInt(s))

function run(program, inputs, ip = 0) {
	let copy = [ ...program ]
	let i = ip
	let opcode = 0
	const lengths = [ 0, 4, 4, 2, 2, 3, 3, 4, 4 ]
	while (opcode != 99) {
		const start = copy[i]

		opcode = start % 100
		modes = [ 2, 3, 4 ].map((n) => Math.floor(start / 10 ** n) % 10)

		const param1 = modes[0] == 1 ? copy[i + 1] : copy[copy[i + 1]]
		const param2 = modes[1] == 1 ? copy[i + 2] : copy[copy[i + 2]]
		const param3 = copy[i + 3]

		if (opcode == 1) copy[param3] = param1 + param2
		if (opcode == 2) copy[param3] = param1 * param2
		if (opcode == 3) {
			if (inputs.length == 0) {
				return { program: copy, output: copy[0], ip: i, halted: false }
			}
			copy[copy[i + 1]] = inputs.pop()
		}
		if (opcode == 4) copy[0] = copy[copy[i + 1]]
		if (opcode == 5) i = param1 != 0 ? param2 : i + lengths[5]
		if (opcode == 6) i = param1 == 0 ? param2 : i + lengths[6]
		if (opcode == 7) copy[param3] = param1 < param2 ? 1 : 0
		if (opcode == 8) copy[param3] = param1 == param2 ? 1 : 0
		if (opcode != 5 && opcode != 6) i += lengths[opcode]
	}
	return { program: copy, output: copy[0], ip: i, halted: true }
}

function permute(string, permutations = [], visited = []) {
	let chars = string.split('')
	for (let i = 0; i < chars.length; i++) {
		let char = chars.splice(i, 1)
		visited.push(char)
		if (chars.length == 0) permutations.push(visited.join(''))
		permute(chars.join(''), permutations, visited)
		chars.splice(i, 0, char)
		visited.pop()
	}
	return permutations
}

// PART 1
function thrusterSignal(program, phaseSequence) {
	let output = 0
	for (let phase of phaseSequence) {
		let inputs = [ output, phase ]
		output = run(program, inputs).output
	}
	return output
}

function thrusterSignalWithLoop(program, phaseSequence) {
	let programs = [ 0, 1, 2, 3, 4 ].map((_) => [ ...program ])
	let ips = [ 0, 1, 2, 3, 4 ].map((_) => 0)
	let output = 0
	let i = 0
	while (true) {
		let amplifier = i % 5
		let phase = phaseSequence[i % phaseSequence.length]
		let ip = ips[i % ips.length]
		let inputs = i < 5 ? [ output, phase ] : [ output ]

		let result = run(programs[amplifier], inputs, ip)
		programs[amplifier] = result.program
		ips[amplifier] = result.ip
		output = result.output

		if (amplifier == 4 && result.halted) {
			return output
		}

		i++
	}
}

function findMaxSignal(program, feedback = false) {
	let maxSignal = 0
	let maxPhaseSequence = ''
	let permutations = feedback ? permute('56789') : permute('01234')
	for (let phaseSequence of permutations) {
		let p = phaseSequence.split('').map((c) => parseInt(c))
		let signal = feedback ? thrusterSignalWithLoop(program, p) : thrusterSignal(program, p)

		if (signal > maxSignal) {
			maxSignal = signal
			maxPhaseSequence = phaseSequence
		}
	}
	return { maxSignal, maxPhaseSequence }
}

// PART 1
console.log('part 1:')
console.log(findMaxSignal(program))

// PART 2
console.log('part 2:')
console.log(findMaxSignal(program, (feedback = true)))
