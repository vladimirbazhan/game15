function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomStep() {
	const zeroLocation = matrix.findLocation(0);
	const randomElement = matrix.getRandomStep();
	if (matrix.exchange(randomElement, zeroLocation))
		generateTable(matrix);
}

function locationOffset(location, x, y) {
	return {
		x: location.x + x,
		y: location.y + y
	}
}

function onItemClick(e) {
	const value = parseInt(e.currentTarget.innerText);
	if (value === 0)
		return;

	const clickedLocation = matrix.findLocation(value);
	const emptyLocation = matrix.findLocation(0);

	if (matrix.exchange(clickedLocation, emptyLocation))
		generateTable(matrix);

	if (matrix.checkWin())
		setTimeout(function () {
			alert("Congratulations!!!");
		}, 0);
}

function onShuffleClick() {
	let i = 0;
	const RenderTimeoutInterval = 30;
	const ShufflesCount = 3;
	const intervalId = setInterval(function () {
		i++;
		randomStep();
		if (i === ShufflesCount) {
			clearInterval(intervalId);
		}
	}, RenderTimeoutInterval);
}

function generateTable() {
	const table = document.createElement('table');
	for (let i = 0; i < 4; i++) {
		const tr = document.createElement('tr');
		for (let j = 0; j < 4; j++) {
			const td = document.createElement('td');

			const h2 = document.createElement('h2');
			h2.innerText = matrix.get(i, j) || '';
			td.appendChild(h2);

			td.addEventListener('click', onItemClick);

			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	document.getElementById('gameContainer').innerHTML = '';
	document.getElementById('gameContainer').appendChild(table);
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('shuffle-btn').addEventListener('click', onShuffleClick);;
	window.matrix = new Matrix();
	generateTable(window.matrix);
}, false);