const fs = require('fs')

let program = fs.readFileSync(process.argv[2], 'utf-8').split(',').map((s) => parseInt(s))
const inputValue = parseInt(process.argv[3])

let i = 0
let opcode = 0
const lengths = [ 0, 4, 4, 2, 2, 3, 3, 4, 4 ]
while (opcode != 99) {
	const start = program[i]

	opcode = start % 100
	modes = [ 2, 3, 4 ].map((n) => Math.floor(start / 10 ** n) % 10)

	const param1 = modes[0] == 1 ? program[i + 1] : program[program[i + 1]]
	const param2 = modes[1] == 1 ? program[i + 2] : program[program[i + 2]]
	const param3 = program[i + 3]

	if (opcode == 1) program[param3] = param1 + param2
	if (opcode == 2) program[param3] = param1 * param2
	if (opcode == 3) program[program[i + 1]] = inputValue
	if (opcode == 4) program[0] = program[program[i + 1]]
	if (opcode == 5) i = param1 != 0 ? param2 : i + 3
	if (opcode == 6) i = param1 == 0 ? param2 : i + 3
	if (opcode == 7) program[param3] = param1 < param2 ? 1 : 0
	if (opcode == 8) program[param3] = param1 == param2 ? 1 : 0
	if (opcode != 5 && opcode != 6) i += lengths[opcode]
}

console.log(program[0])
