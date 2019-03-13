class Matrix {
	constructor() {
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
		this.matrix = [];
		for (let i = 0; i < 4; i++) {
			const row = [];
			for (let j = 0; j < 4; j++) {
				row.push(numbers[i * 4 + j]);
			}
			this.matrix.push(row);
		}
	}
		
	get(x, y) {
		return this.matrix[x][y];
	}
		
	findLocation(item) {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (this.matrix[i][j] === item)
					return {
						value: item,
						x: i,
						y: j
					};
			}
		}
		return null;
	}
		
	checkWin() {
		for (let i = 0; i < 15; i++) {
			const x = Math.floor(i / 4);
			const y = i - x * 4;
			if (this.matrix[x][y] !== i + 1)
				return false;
		}
		return true;
	}

	exchange(a, b) {
		if (a.x === b.x && Math.abs(a.y - b.y) === 1) {
			this.matrix[a.x][b.y] = a.value;
			this.matrix[a.x][a.y] = b.value;
			return true;
		}

		if (a.y === b.y && Math.abs(a.x - b.x) === 1) {
			this.matrix[a.x][a.y] = b.value;
			this.matrix[b.x][a.y] = a.value;
			return true;
		}

		return false;
	}

	getPossibleSteps() {
		const zeroLocation = this.findLocation(0);
		const possibleSteps = [];
		switch (zeroLocation.x) {
			case 0:
				possibleSteps.push(locationOffset(zeroLocation, 1, 0));
				break;
			case 3:
				possibleSteps.push(locationOffset(zeroLocation, -1, 0));
				break;
			default:
				possibleSteps.push(locationOffset(zeroLocation, 1, 0));
				possibleSteps.push(locationOffset(zeroLocation, -1, 0));
		}

		switch (zeroLocation.y) {
			case 0:
				possibleSteps.push(locationOffset(zeroLocation, 0, 1));
				break;
			case 3:
				possibleSteps.push(locationOffset(zeroLocation, 0, -1));
				break;
			default:
				possibleSteps.push(locationOffset(zeroLocation, 0, 1));
				possibleSteps.push(locationOffset(zeroLocation, 0, -1));
		}

		return possibleSteps;
	}

	getRandomStep() {
		const possibleSteps = this.getPossibleSteps();
		const randCoordinates = getRandomInt(0, possibleSteps.length - 1);
		const randomLocation = possibleSteps[randCoordinates];
		const valueAtRandomLocation = this.matrix[randomLocation.x][randomLocation.y];
		return this.findLocation(valueAtRandomLocation);
	}
}