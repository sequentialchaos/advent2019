import sys

with open(sys.argv[1]) as f:
  input05 = list(map(int, f.read().split(",")))

input_value = int(sys.argv[2])

i = 0
opcode = 0
program = [n for n in input05]
while opcode != 99:
  start = program[i]
  opcode = start % 100
  modes = [(start // (10 ** n)) % 10 for n in range(2, 5)]
  if opcode in [1, 2, 5, 6, 7, 8]:
    param1 = program[i+1] if modes[0] == 1 else program[program[i+1]]
    param2 = program[i+2] if modes[1] == 1 else program[program[i+2]]
    param3 = program[i+3]
  if opcode == 1: # add
    program[param3] = param1 + param2
    i += 4
  elif opcode == 2: # multiply
    program[param3] = param1 * param2
    i += 4
  elif opcode == 3: # input
    param1 = program[i+1]
    program[param1] = input_value
    i += 2
  elif opcode == 4: # output
    param1 = program[program[i+1]]
    program[0] = param1
    i += 2
  elif opcode == 5: # jump if true
    if param1 != 0:
      i = param2
    else:
      i += 3
  elif opcode == 6: # jump if false
    if param1 == 0:
      i = param2
    else:
      i += 3
  elif opcode == 7: # less than
    if param1 < param2:
      program[param3] = 1
    else:
      program[param3] = 0
    i += 4
  elif opcode == 8: # equals
    if param1 == param2:
      program[param3] = 1
    else:
      program[param3] = 0
    i += 4

print(program[0])