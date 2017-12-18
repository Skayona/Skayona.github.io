function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

<<<<<<< HEAD
let snake = {
	head: document.getElementById('snakeHead'),
	headX: function() {return +getComputedStyle(this.head).left.replace('px', '')},
	headY: function() {return +getComputedStyle(this.head).top.replace('px', '')},
	parts: document.getElementsByClassName('js-snake'),
	newPart: function() {
		let newPart = snake.parts[0].cloneNode(true),
				newPartX = +getComputedStyle(snake.parts[0]).left.replace('px', ''),
				newPartY = +getComputedStyle(snake.parts[0]).top.replace('px', '') ;

		switch (snake.direction) {
			case 0:
				newPart.style.top = newPartY + snake.dMove() + 'px';
				break;
			case 1:
				newPart.style.left = newPartX - snake.dMove() + 'px';
				break;
			case 2:
				newPart.style.top = newPartY - snake.dMove() + 'px';
				break;
			case 3:
				newPart.style.left = newPartX + snake.dMove() + 'px';
				break;
			default:
				break;
		}

		return newPart;

	},
	rising: function() {
		snake.parts[0].parentNode.insertBefore(snake.newPart(), snake.parts[0]);
		snake.moveTop(snake.speed);
		snake.moveRight(snake.speed);
		snake.moveDown(snake.speed);
		snake.moveLeft(snake.speed);
	},
	dMove: function() {return this.head.clientWidth},
	top: false,
	right: false,
	down: false,
	left: false,
	moveCounter: 0,
	movingTop: [],
	movingRight: [],
	movingDown: [],
	movingLeft: [],
	stopPoint: [],
	direction: null,
	clickCounter: -1,
	addStep: function() {
		snake.movingTop.push([]);
		snake.movingRight.push([]);
		snake.movingDown.push([]);
		snake.movingLeft.push([]);
	},
	moveTop: function(dT) {
		if(this.top && this.moveCounter == 1) {
			this.clickCounter++;
			this.addStep();
			this.left = this.right = this.down = false;
			let n = this.clickCounter,
					l = this.parts.length - 1,
					flag = true;

			this.stopPoint[n] = +getComputedStyle(snake.parts[l]).left.replace('px', '');
			let top = +getComputedStyle(snake.parts[l]).top.replace('px', '');

			while (this.stopPoint[n] % this.dMove() != 0) {
				flag = false;
				if (this.direction == 1) {
					this.stopPoint[n]++;
				} else {
					this.stopPoint[n]--;
				}
			}

			if (this.stopPoint[n] % this.dMove() == 0) {
				this.direction = 0;
				this.moveCounter--;
			}

			for (let i = l; i >= 0; i--) {

				this.movingTop[n][i] = setInterval(function() {
					food.eaten();
					let curPoint;

					if (i == l && flag) {
						curPoint = snake.stopPoint[n];
					} else {
						curPoint = +getComputedStyle(snake.parts[i]).left.replace('px', '');
					}

					if (snake.stopPoint[n] == curPoint) {
						clearInterval(snake.movingRight[n-1][i]);
						clearInterval(snake.movingLeft[n-1][i]);
						let	curY = +getComputedStyle(snake.parts[i]).top.replace('px', '');
						snake.parts[i].style.top = curY - 1 + 'px';
						snake.parts[i].style.transform = 'rotate(-90deg)';
					}

					if (snake.headY() < 0) {
						progress.finish();
					}

				}, dT);

				if (i == 0) {
					setTimeout(function() {
						snake.left = snake.right = true;
					}, dT*(l+1))
				}
			}
		}
	},
	moveRight: function(dT) {
		if (this.right && this.moveCounter == 0) {
			this.clickCounter++;
			this.addStep();
			this.top = this.down = this.left = false;
			let n = this.clickCounter,
					l = this.parts.length - 1,
					flag = true;

			this.stopPoint[n] = +getComputedStyle(snake.parts[l]).top.replace('px', '');

			while (this.stopPoint[n] % this.dMove() != 0) {
				flag = false;
				if (this.direction == 0) {
					this.stopPoint[n]--;
				} else {
					this.stopPoint[n]++;
				}
			}

			if (this.stopPoint[n] % this.dMove() == 0) {
				this.direction = 1;
				this.moveCounter++;
			}


			for (let i = l; i >= 0; i--) {

				this.movingRight[n][i] = setInterval(function() {
					food.eaten();
					let curPoint;

					if (i == l && flag) {
						curPoint = snake.stopPoint[n];
					} else {
						curPoint = +getComputedStyle(snake.parts[i]).top.replace('px', '');
					}

					if (snake.stopPoint[n] == curPoint) {
						clearInterval(snake.movingTop[n-1][i]);
						clearInterval(snake.movingDown[n-1][i]);
						let curX = +getComputedStyle(snake.parts[i]).left.replace('px', '');
						snake.parts[i].style.left = curX + 1 + 'px';
						snake.parts[i].style.transform = 'rotate(0)';
					}

					if (snake.headX() > field.width() - snake.dMove()) {
						progress.finish();
					}

				}, dT)

				if (i == 0) {
					setTimeout(function() {
						snake.top = snake.down = true;
					}, dT*(l+1))
				}
			}
=======
let FieldSize = 20;

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
		newCell.style.width = this.size + 'px';
		newCell.style.height = this.size + 'px';
		return newCell;
	},
	speed: 100,
	size: 20,
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
>>>>>>> master
		}
		this.restart(fieldSize);
	},
<<<<<<< HEAD
	moveDown: function(dT) {
		if(this.down && this.moveCounter == 1) {
			this.clickCounter++;
			this.addStep();
			this.left = this.right = this.top = false;
			let n = this.clickCounter,
					l = this.parts.length - 1,
					flag = true;

			this.stopPoint[n]= +getComputedStyle(snake.parts[l]).left.replace('px', '');

			while (this.stopPoint[n] % this.dMove() != 0) {
				flag = false;
				if (this.direction == 1) {
					this.stopPoint[n]++;
				} else {
					this.stopPoint[n]--;
				}
			}

			if (this.stopPoint[n] % this.dMove() == 0) {
				this.direction = 2;
				this.moveCounter--;
			}

			for (let i = l; i >= 0; i--) {
				this.movingDown[n][i] = setInterval(function() {

					food.eaten();

					let curPoint;

					if (i == l && flag) {
						curPoint = snake.stopPoint[n];
					} else {
						curPoint = +getComputedStyle(snake.parts[i]).left.replace('px', '');
					}

					if (snake.stopPoint[n] == curPoint) {
						clearInterval(snake.movingRight[n-1][i]);
						clearInterval(snake.movingLeft[n-1][i])
						let	curY = +getComputedStyle(snake.parts[i]).top.replace('px', '');
						snake.parts[i].style.top = curY + 1 + 'px';
						snake.parts[i].style.transform = 'rotate(90deg)';
					}

					if (snake.headY() > field.width() - snake.dMove()) {
						progress.finish();
					}

				}, dT)

				if (i == 0) {
					setTimeout(function() {
						snake.left = snake.right = true;
					}, dT*(l+1))
				}
			}
=======
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
				snake.increaseSpeed(fieldSize, 70);
				break;
			case 10:
				snake.increaseSpeed(fieldSize, 60);
				break;
			case 15:
				snake.increaseSpeed(fieldSize, 50);
				break;
			case 20:
				snake.increaseSpeed(fieldSize, 40);
				break;
			case 25:
				game.win = true;
				game.end();
				break;
			default:
				snake.grow(fieldSize);
				break;
>>>>>>> master
		}
		this.lvlIndicator.textContent = this.lvl;
	},
<<<<<<< HEAD
	moveLeft: function(dT) {
		if(this.left && this.moveCounter == 0) {
			this.clickCounter++;
			this.addStep();
			this.top = this.down = this.right = false;
			let n = this.clickCounter,
					l = this.parts.length - 1,
					flag = true,
					bodyRadius;
			this.stopPoint[n] = +getComputedStyle(snake.parts[l]).top.replace('px', '');

			while (this.stopPoint[n] % this.dMove() != 0) {
				flag = false;
				if (this.direction == 0) {
					this.stopPoint[n]--;
				} else {
					this.stopPoint[n]++;
				}
			}

			if (this.stopPoint[n] % this.dMove() == 0) {
				this.direction = 3;
				this.moveCounter++;
			}

			for (let i = l; i >= 0; i--) {

				this.movingLeft[n][i] = setInterval(function() {
					food.eaten();
					let curPoint;

					if (i == l && flag) {
						curPoint = snake.stopPoint[n];
					} else {
						curPoint = +getComputedStyle(snake.parts[i]).top.replace('px', '');
					}

					if (snake.stopPoint[n] == curPoint) {
						clearInterval(snake.movingTop[n-1][i]);
						clearInterval(snake.movingDown[n-1][i]);
						let curX = +getComputedStyle(snake.parts[i]).left.replace('px', '');
						snake.parts[i].style.left = curX - 1 + 'px';
						snake.parts[i].style.transform = 'rotate(180deg)';
					}

					if (snake.headX() < 0) {
						progress.finish();
					}
				}, dT)

				if (i == 0) {
					setTimeout(function() {
						snake.top = snake.down = true;
					}, dT*(l+1))
				}
			}
		}
	},
	firstMove: function(dT) {
		if (this.right && this.moveCounter == 0) {

			this.clickCounter++;
			this.addStep();
			this.top = this.down = this.left = false;
			let n = this.clickCounter,
					l = this.parts.length - 1,
					flag = true;
=======
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
				console.log('d')
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
			food.clear(foodY, foodX);
			food.begin();
			snake.clearTotal();
			snake.begin();
			snake.animate(fieldSize);
		}
	}
}
>>>>>>> master

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
				if (y == snake.info[i].y && x == snake.info[i].y) {
					allowed = false;
				}
			}
			console.log(allowed)
		} while (!allowed);

<<<<<<< HEAD
			for (let i = l; i >= 0; i--) {
				this.movingRight[n][i] = setInterval(function() {
					food.eaten();
					let curPoint;
=======
>>>>>>> master

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
			game.resultFix();
			game.lvlup(fieldSize);
			this.clear(y, x);
			this.appear(fieldSize);
		}
	}
}

<<<<<<< HEAD
					if (snake.stopPoint[n] == curPoint) {
						let curX = +getComputedStyle(snake.parts[i]).left.replace('px', '');
						snake.parts[i].style.left = curX + 1 + 'px';
					}

					if (snake.headX() > field.width() - snake.dMove()) {
						progress.finish();
					}

				}, dT)

				if (i == 0) {
					setTimeout(function() {
						snake.top = snake.down = true;
					}, dT*(l+1))
				}
			}
=======
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
			this.info[0].html.style.transform = '0deg';
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
>>>>>>> master
		}
		this.info = [];
		this.go = false;
		this.speed = 300;
	},
<<<<<<< HEAD
	stopMove: function () {
		let n = this.clickCounter,
				l = this.parts.length - 1;

		for (let i = l; i >= 0; i--) {
			for (let j = 0; j <=n; j++) {
				clearInterval(snake.movingTop[j][i]);
				clearInterval(snake.movingDown[j][i]);
				clearInterval(snake.movingLeft[j][i]);
				clearInterval(snake.movingRight[j][i]);
			}
		}
	},
	speed: 10,
	move: document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 38:
				snake.moveTop(snake.speed);
				break;
			case 39:
				snake.moveRight(snake.speed);
				break;
			case 40:
				snake.moveDown(snake.speed);
				break;
			case 37:
				snake.moveLeft(snake.speed);
=======
	beginY: 14,
	beginX: 13,
	begin: function(fieldSize) {
		let y = this.beginY,
				x = this.beginX;

		for (let i = 0; i < 3; i++) {
			x++;
			this.create(i, y, x);
			this.turnCount[i] = 1;
			snake.info[i].html.style.transform = 'initial';
		}
		snake.head();
		snake.tail();
	},
	// throughWall: function(point, fieldSize) {
	// 	let wall = fieldSize - 1;
	// 	if (point > wall) {
	// 		point = 0;
	// 	} else if (point < 0) {
	// 		point = wall;
	// 	}
	// },
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
>>>>>>> master
				break;
			default:
				break;
		}
	},
	move: function (fieldSize, intId) {
		let l = snake.lgth();

		snake.control();
		if (snake.go) {
			for (let i = 0; i < l; i++) {
				let y = snake.info[i].y,
						x = snake.info[i].x,
						delY = snake.info[l-1].y,
						delX = snake.info[l-1].x,
						n = snake.turnCount[i];

				food.eaten(l-1, fieldSize);

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

					// snake.throughWall(y, fieldSize);
					// snake.throughWall(x, fieldSize);

<<<<<<< HEAD
let food = {
	apple: document.getElementById('snakeFood'),
	appleX: function() {return +getComputedStyle(this.apple).left.replace('px', '')},
	appleY: function() {return +getComputedStyle(this.apple).top.replace('px', '')},
	eaten: function() {
		if (snake.headX() == this.appleX() && snake.headY() == this.appleY()) {
			food.moveX(food.position(food.appleX()));
			food.moveY(food.position(food.appleY()));
			progress.currentScoreIndex += 1;
			progress.currentScore.textContent = progress.currentScoreIndex;
			// snake.rising();
=======
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
>>>>>>> master

				if ((snake.direction[n] == 'r' || snake.direction[n] == 'l') && i > 0 && x == snake.rotate[snake.turnCount[i-1]].x) {
					snake.turnCount[i] = snake.turnCount[i-1];
				}

				snake.create(i, y, x);
				snake.clearTail(delY, delX);
				snake.tail();
				snake.clearHead(y, x);
				game.over();
			}
		}
	},
	animateId: [],
	animate: function(fieldSize) {
		this.animateId = setInterval(function() {
			snake.move(fieldSize);
		}, snake.speed);
	},
	speed: 300,
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
		y: 14,
		x: 14
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
<<<<<<< HEAD
				// case 12:
				// 	progress.levelUp();
				// 	break;
				// case 20:
				// 	progress.levelUp();
				// 	break;
				// case 30:
				// 	progress.levelUp();
				// 	break;
				case 10:
					progress.win = true;
					progress.finish();
=======
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
>>>>>>> master
					break;
				default:
					break;
			}
		} else {
			snake.allowRise = false;
		}
<<<<<<< HEAD

	},
	moveX: function(x) {this.apple.style.left = x + 'px'},
	moveY: function(y) {this.apple.style.top = y + 'px'},
	position: function(curPos) {
		let newPos;
		do {
			newPos = getRandomInt(0, field.width());
		}	while (newPos % snake.dMove() != 0 && newPos != curPos);
		return newPos;
	}
}

let progress = {
	currentScore: document.getElementById('currentScore'),
	currentScoreIndex: +this.currentScore.textContent,
	level: document.getElementById('level'),
	levelIndex: +this.level.textContent,
	levelUp: function() {
		this.levelIndex +=1;
		this.level.textContent = this.levelIndex;
	},
	bestScore: document.getElementById('bestScore'),
	bestScoreIndex: +this.bestScore.textContent,
	currentScoreFinish: document.getElementById('currentScoreFinish'),
	bestScoreFinish: document.getElementById('bestScoreFinish'),
	win: false,
	finishTitle: document.getElementById('winTitle'),
	finish:  function() {
		snake.stopMove();
		field.endGame.style.display = 'block';
		if (progress.win) {
			progress.finishTitle.innerHTML = 'You are win!';
		} else {
			progress.finishTitle.innerHTML = 'Do you wnat to try again?';
		}
		this.currentScoreFinish.textContent = this.currentScoreIndex;
		this.bestScoreFinish.textContent = this.bestScoreIndex;
		this.restart();
	},
	startBtn: document.getElementById('startBtn'),
	start: function() {
		this.startBtn.onclick = function() {
			field.beginGame.style.display = 'none';
			snake.right = true;
			snake.firstMove(snake.speed);
		}
	},
	restartBtn: document.getElementById('restartBtn'),
	restart: function() {
		this.restartBtn.onclick = function() {
			field.endGame.style.display = 'none';
			progress.currentScore.textContent = progress.currentScoreIndex = 0;
			progress.level.textContent = progress.levelIndex = 1;
			progress.win = false;
			snake.right = snake.top = snake.down = true;
			snake.left = false;
			food.moveX(snake.dMove()*14);
			food.moveY(snake.dMove()*15);

			let l = snake.parts.length - 1,
					posX = snake.dMove()*4;

			while (l > 2) {
				snake.parts[0].remove();
				l--;
			}

			for (let i = l; i >= 0; i--) {
				snake.parts[i].style.top = (snake.dMove()*15) + 'px';
				snake.parts[i].style.left = posX + 'px';
				snake.parts[i].style.transform = 'rotate(0)';
				posX -= snake.dMove();
			}
			snake.moveCounter = 0;
			snake.firstMove(snake.speed);
		}
	}
}
=======
	}
}

>>>>>>> master

game.start(FieldSize);