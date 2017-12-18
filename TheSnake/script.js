function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
let SIZE = 20, //amount of field rows and cols
		SPEED = 250; //speed of the snake.no less then

let settings = {
	addRow: function(fieldSize) {
		let newRow = document.createElement('div');
		newRow.className = 'row';
		for (let i = 0; i < fieldSize; i++) {
			newRow.appendChild(this.addCell());
		}
		return newRow;
	},
	addCell: function() {
		let newCell = document.createElement('span')
		newCell.className = 'cell';
		newCell.style.width = this.width + 'px';
		newCell.style.height = this.width + 'px';
		return newCell;
	},
	width: 20,
	box: document.getElementById('snake-wrapper'),
	area: function(fieldSize) {
		for (let i = 0; i < fieldSize; i++) {
			this.box.appendChild(this.addRow(fieldSize));
		}
	},
	row: document.getElementsByClassName('row'),
	cell: document.getElementsByClassName('cell')
}

let game = {
	start: function(fieldSize) {
		settings.area(fieldSize);
		this.startBtn.onclick = function() {
				game.instruction.style.display = 'none';
				food.begin();
				snake.begin();
				snake.animate(fieldSize);
		}
		this.restart(fieldSize);
	},
	startBtn: document.getElementById('startBtn'),
	instruction: document.getElementById('snakeStart'),
	score: 0,
	scoreIndicator: document.getElementById('currentScore'),
	ensScoreIndicator: document.getElementById('currentScoreFinish'),
	bestScore: 0,
	bestScoreIndicator: document.getElementById('bestScore'),
	endBestScoreIndicator: document.getElementById('bestScoreFinish'),
	lvlup: function(fieldSize) {

		switch (game.score) {
			case 5:
				snake.increaseSpeed(fieldSize, 40);
				break;
			case 10:
				snake.increaseSpeed(fieldSize, 40);
				break;
			case 15:
				snake.increaseSpeed(fieldSize, 20);
				break;
			case 20:
				snake.increaseSpeed(fieldSize, 10);
				break;
			case 25:
				game.win = true;
				game.end();
				break;
			default:
				snake.grow(fieldSize);
				break;
		}
		this.lvlIndicator.textContent = this.lvl;
	},
	lvl: 1,
	lvlIndicator: document.getElementById('level'),
	resultFix: function() {
		if (this.bestScore < this.score) {
			this.bestScore = this.score;
		}

		this.scoreIndicator.textContent = this.score;
		this.bestScoreIndicator.textContent = this.bestScore;
	},
	endMessage: document.getElementById('snakeFinished'),
	endTitle: document.getElementById('winTitle'),
	end: function() {
		clearInterval(snake.animateId);
		this.endMessage.style.display = 'block';
		if (this.win) {
			this.endTitle.innerHTML = 'You are win!';
		} else {
			this.endTitle.innerHTML = 'Do you wnat to try again?';
		}
		this.ensScoreIndicator.textContent = this.score;
		this.endBestScoreIndicator.textContent = this.bestScore;
	},
	win: false,
	over: function() {
		for (let i = 1; i < snake.lgth(); i++) {
			if (snake.info[i].y == snake.head().y && snake.info[i].x == snake.head().x) {
				game.win = false;
				game.end();
			}
		}
	},
	restartBtn: document.getElementById('restartBtn'),
	restart: function(fieldSize) {
		this.restartBtn.onclick = function() {
			let foodY = food.info.y,
					foodX = food.info.x;
			game.endMessage.style.display = 'none';
			game.scoreIndicator.textContent = game.score = 0;
			game.lvlIndicator.textContent = game.lvl = 1;
			snake.prevDir = [];
			snake.direction = ['l'];
			snake.rotate = [{
				y: 14,
				x: 14
			}];
			snake.c = 0;
			barrier.clear();
			food.clear(foodY, foodX);
			food.begin();
			snake.clearTotal();
			snake.begin();
			snake.animate(fieldSize);
		}
	}
}

let food = {
	create: function(y, x) {
		this.info.html = settings.row[y].children[x];
		this.info.y = y;
		this.info.x = x;
		settings.row[y].children[x].style.transform = 'initial';
		return settings.row[y].children[x].classList.add('cell--food');
	},
	begin: function() {
		let y = 14,
				x = 3;
		this.create(y, x);
	},
	appear: function(fieldSize) {
		let y,
				x,
				allowed;

		do {
			allowed = true;
			y = getRandomInt(0, fieldSize);
			x = getRandomInt(0, fieldSize);

			for (let i = 0; i < snake.lgth(); i++) {
				if (y == snake.info[i].y && x == snake.info[i].x) {
					allowed = false;
				}
			}

			for (let i=0; i < barrier.info.length; i++) {
				if (y == barrier.info[i].y && x == barrier.info[i].x) {
					allowed = false;
				}
			}

		} while (!allowed);



		if (allowed) {
			this.create(y, x);
		}
	},
	clear: function(y, x) {
		settings.row[y].children[x].classList.remove('cell--food');
	},
	info: {},
	eaten: function(snakeHead, fieldSize) {
		if (this.info.y == snake.head().y && this.info.x == snake.head().x) {
			let y = this.info.y,
					x = this.info.x;
			game.score++;
			if (game.lvl >= 2) {
				barrier.appear(fieldSize);
			}
			game.resultFix();
			game.lvlup(fieldSize);
			this.clear(y, x);
			this.appear(fieldSize);
		}
	}
}

let barrier = {
	create: function(i, y, x) {
		this.info[i] = {};
		this.info[i].html = settings.row[y].children[x];
		this.info[i].y = y;
		this.info[i].x = x;
		settings.row[y].children[x].style.transform = 'initial';
		return settings.row[y].children[x].classList.add('cell--barrier');
	},
	amount: 0,
	appear: function(fieldSize) {
		let y,
				x,
				allowed;

		setTimeout(function() {
			do {
				allowed = true;
				y = getRandomInt(0, fieldSize);
				x = getRandomInt(0, fieldSize);

				for (let i = 0; i < snake.lgth(); i++) {
					if (y == snake.info[i].y && x == snake.info[i].x) {
						allowed = false;
					}
				}

				if (y == food.info.y && x == food.info.x) {
					allowed = false;
				}

			} while (!allowed);


			if (allowed) {
				barrier.create(barrier.amount, y, x);
				barrier.amount++;
			}
		}, 500)
	},
	clear: function(y, x) {
		let l = settings.cell.length;
		for (let i = 0; i < l; i++) {
			settings.cell[i].classList.remove('cell--barrier');
		}
		this.info = [];
		this.amount = 0;
	},
	info: [],
	eaten: function() {
		for (let i = 0; i < barrier.info.length; i++) {
			if (this.info[i].y == snake.head().y && this.info[i].x == snake.head().x) {
				game.win = false;
				game.end();
			}
		}
	}
}

let snake = {
	info: [],
	create: function(i, y, x) {
		this.info[i] = {};
		this.info[i].html = settings.row[y].children[x];
		this.info[i].y = y;
		this.info[i].x = x;
		return settings.row[y].children[x].classList.add('cell--snake');
	},
	body: document.getElementsByClassName('cell--snake'),
	lgth: function() {return this.body.length},
	head: function() {
		this.info[0].html.classList.add('cell--snake-head');
		if (this.direction == 'l') {
			this.info[0].html.style.transform = 'rotate(0)';
		}
		return this.info[0];
	},
	tail: function() {
		this.info[snake.lgth()-1].html.classList.add('cell--snake-tail');
		return this.info[snake.lgth()-1];
	},
	clearTail: function(y, x) {
		settings.row[y].children[x].classList.remove('cell--snake');
		settings.row[y].children[x].classList.remove('cell--snake-tail');
	},
	clearHead: function(y, x) {
		settings.row[y].children[x].classList.remove('cell--snake-head');
	},
	clearTotal: function() {
		let l = settings.cell.length;
		for (let i = 0; i < l; i++) {

			settings.cell[i].classList.remove('cell--snake-head');
			settings.cell[i].classList.remove('cell--snake-tail');
			settings.cell[i].classList.remove('cell--snake');
			settings.cell[i].style.transform = 'initial';
		}
		this.info = [];
		this.go = false;
		this.speed = SPEED;
	},
	beginY: 14,
	beginX: 13,
	begin: function(fieldSize) {
		let y = this.beginY,
				x = this.beginX;

		for (let i = 0; i < 3; i++) {
			x++;
			this.create(i, y, x);
			this.turnCount[i] = 1;
			snake.info[i].html.style.transform = 'rotate(0)';
		}
		snake.head();
		snake.tail();
	},
	speed: SPEED,
	turnCount: [],
	headRotate: function() {
		switch (snake.direction[snake.c]) {
			case 'u':
				snake.info[0].html.style.transform = 'rotate(90deg)';
				break;
			case 'd':
				snake.info[0].html.style.transform = 'rotate(-90deg)';
				break;
			case 'r':
				snake.info[0].html.style.transform = 'rotate(180deg)';
				break;
			case 'l':
				snake.info[0].html.style.transform = 'rotate(0deg)';
				break;
			default:
				break;
		}
	},
	chooseDirection: function (fieldSize, intId) {
		let l = snake.lgth();

		for (let i = 0; i < l; i++) {
			let y = snake.info[i].y,
					x = snake.info[i].x,
					delY = snake.info[l-1].y,
					delX = snake.info[l-1].x,
					n = snake.turnCount[i];

			food.eaten(l-1, fieldSize);
			barrier.eaten();

			snake.headRotate();

			switch (snake.direction[n]) {
				case 'u':
					if (x == snake.rotate[n].x) {
						y--;
					} else {
						if (snake.prevDir[n] == 'r') {
							x++;
						} else {
							x--;
						}
					}
					break;
				case 'd':
					if (x == snake.rotate[n].x) {
						y++;
					} else {
						if (snake.prevDir[n] == 'r') {
							x++;
						} else {
							x--;
						}
					}
					break;
				case 'r':
					if (y == snake.rotate[n].y) {
						x++;
					} else {
						if (snake.prevDir[n] == 'u') {
							y--;
						} else {
							y++;
						}
					}
					break;
				case 'l':
					if (y == snake.rotate[n].y) {
						x--;
					} else {
						if (snake.prevDir[n] == 'u') {
							y--;
						} else {
							y++;
						}
					}
					break;
				default:
				break;
			}

			if (x > fieldSize - 1) {
				x = 0;
			} else if (x < 0) {
				x = fieldSize - 1;
			}

			if (y > fieldSize - 1) {
				y = 0;
			} else if (y < 0) {
				y = fieldSize - 1;
			}


			if ((snake.direction[n] == 'u' || snake.direction[n] == 'd') && i > 0 && y == snake.rotate[snake.turnCount[i-1]].y) {
				snake.turnCount[i] = snake.turnCount[i-1];
			}


			if ((snake.direction[n] == 'r' || snake.direction[n] == 'l') && i > 0 && x == snake.rotate[snake.turnCount[i-1]].x) {
				snake.turnCount[i] = snake.turnCount[i-1];
			}


			snake.clearTail(delY, delX);
			snake.clearHead(y, x);
			snake.create(i, y, x);
			game.over();
			snake.tail();
		}
	},
	animateId: [],
	animate: function(fieldSize) {
		snake.control();
		this.animateId = setInterval(function() {
			if (snake.go) {
				snake.chooseDirection(fieldSize);
			}
		}, snake.speed);
	},
	increaseSpeed: function(fieldSize, speed) {
		clearInterval(this.animateId);
		this.speed -= speed;
		this.animate(fieldSize);
		game.lvl++;
		snake.grow(fieldSize);
	},
	grow: function(fieldSize) {
		let y = this.info[snake.lgth()-1].y,
				x = this.info[snake.lgth()-1].x
				count = this.turnCount[snake.lgth()-1];
		clearInterval(snake.animateId);
		setTimeout(function() {
			snake.create(snake.lgth(), y, x);
			snake.turnCount[snake.lgth()-1] = count;
		}, snake.speed)
		this.animate(fieldSize);
	},
	prevDir: [],
	direction: ['l'],
	rotate: [{
		y: -1,
		x: -1
	}],
	c: 0, //counter of turns
	go: false,
	control: function() {

		function direction(dir, oppositeDir) {
			if (dir != 'r') {
				snake.go = true;
			}
			if (snake.direction[snake.c] != oppositeDir) {
				snake.c++
				snake.prevDir[snake.c] = snake.direction[snake.c - 1];
				snake.direction[snake.c] = dir;
				snake.turnCount[0] = snake.c;
				snake.rotate[snake.c] = {
					y: snake.head().y,
					x: snake.head().x
				}
			}
		}

		document.onkeydown = function(e) {
			e.preventDefault();
			switch (e.keyCode) {
				case 38:
					direction('u', 'd');
					break;
				case 87:
					direction('u', 'd');
					break;
				case 39:
					direction('r', 'l');
					break;
				case 68:
					direction('r', 'l');
					break;
				case 40:
					direction('d', 'u');
					break;
				case 83:
					direction('d', 'u');
					break;
				case 37:
					direction('l', 'r');
					break;
				case 65:
					direction('l', 'r');
					break;
				default:
					break;
			}
		}
	}
}


game.start(SIZE);