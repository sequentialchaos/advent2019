const fs = require('fs')

const mapData = fs.readFileSync(process.argv[2], 'utf-8').split('\n').map((s) => s.split(')'))

let orbitTree = {}

for (let orbit of mapData) {
	let [ orbitee, orbiter ] = orbit
	orbitTree[orbiter] = orbitee
}

function depth(orbiter, orbitTree) {
	let count = 0
	let next = orbitTree[orbiter]
	while (next != undefined) {
		next = orbitTree[next]
		count++
	}
	return count
}

let numOrbits = 0
for (let orbiter of Object.keys(orbitTree)) {
	numOrbits += depth(orbiter, orbitTree)
}

console.log(`part 1: ${numOrbits} total orbits`)

// PART 2
function leastCommonAncestor(orbiter1, orbiter2, orbitTree) {
	let ancestors1 = []
	let next1 = orbitTree[orbiter1]
	while (next1 != undefined) {
		ancestors1.push(next1)
		next1 = orbitTree[next1]
	}
	let next2 = orbitTree[orbiter2]
	while (!ancestors1.includes(next2)) {
		next2 = orbitTree[next2]
	}
	return next2
}

function ancestorDegree(orbiter, ancestor, orbitTree) {
	let count = 0
	let next = orbitTree[orbiter]
	while (next != ancestor && next != undefined) {
		next = orbitTree[next]
		count++
	}
	return count
}

function distance(orbiter1, orbiter2, orbitTree) {
	const lca = leastCommonAncestor(orbiter1, orbiter2, orbitTree)
	return ancestorDegree(orbiter1, lca, orbitTree) + ancestorDegree(orbiter2, lca, orbitTree)
}

console.log(`part 2: ${distance('YOU', 'SAN', orbitTree)} orbit jumps from me to santa`)
