import sys

with open(sys.argv[1]) as f:
  input01 = list(map(int, f.readlines()))

# PART 1
def fuel(mass):
  return int(mass / 3) - 2

print(sum(map(fuel, input01)))

# PART 2
def fuelfuel(mass, total=0):
  if fuel(mass) <= 0:
    return total
  return total + fuel(mass) + fuelfuel(fuel(mass))

print(sum(map(fuelfuel, input01)))