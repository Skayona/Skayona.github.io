function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let snake = {
	head: document.getElementById('snakeHead'),
	tail: document.getElementById('snakeTail'),
	parts: document.getElementsByClassName('js-snake'),
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
	addStep: function() {
		snake.movingTop.push([]);
		snake.movingRight.push([]);
		snake.movingDown.push([]);
		snake.movingLeft.push([]);
	},
	moveTop: function() {
		if(this.top && this.moveCounter == 1) {
			this.clickCounter++;
			this.addStep();
			this.left = this.right = this.down = false;
			let n = this.clickCounter,
					l = this.parts.length - 1,
					flag = true;

			this.stopPoint[n] = +getComputedStyle(snake.parts[l]).left.replace('px', '');

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
				}, 10);

				if (i == 0) {
					setTimeout(function() {
						snake.left = snake.right = true;
					}, 10*(l+1))
				}
			}
		}
	},
	moveRight: function() {
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
				}, 10)

				if (i == 0) {
					setTimeout(function() {
						snake.top = snake.down = true;
					}, 10*(l+1))
				}
			}
		}
	},
	moveDown: function() {
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
				}, 10)

				if (i == 0) {
					setTimeout(function() {
						snake.left = snake.right = true;
					}, 10*(l+1))
				}
			}
		}
	},
	moveLeft: function() {
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
				}, 10)

				if (i == 0) {
					setTimeout(function() {
						snake.top = snake.down = true;
					}, 10*(l+1))
				}
			}
		}
	},
	firstMove: function() {
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
					let curPoint;

					if (i == l && flag) {
						curPoint = snake.stopPoint[n];
					} else {
						curPoint = +getComputedStyle(snake.parts[i]).top.replace('px', '');
					}

					if (snake.stopPoint[n] == curPoint) {
						let curX = +getComputedStyle(snake.parts[i]).left.replace('px', '');
						snake.parts[i].style.left = curX + 1 + 'px';
					}
				}, 10)

				if (i == 0) {
					setTimeout(function() {
						snake.top = snake.down = true;
					}, 10*(l+1))
				}
			}
		}
	},
	clickCounter: -1,
	move: document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 38:
				snake.moveTop();
				break;
			case 39:
				snake.moveRight();
				break;
			case 40:
				snake.moveDown();
				break;
			case 37:
				snake.moveLeft();
				break;
			default:
				break;
		}
	}
}

let field = {
	box: document.getElementById('snakeField'),
	width: function() {return this.box.clientWidth},
	height: function() {return this.box.clientHeight},
	beginGame: document.getElementById('snakeStart'),
	endGame: document.getElementById('snakeFinished')
}

let food = {
	apple: document.getElementById('snakeFood'),
	appleX: function() {return +getComputedStyle(this.apple).left.replace('px', '')},
	appleY: function() {return +getComputedStyle(this.apple).top.replace('px', '')},
	eaten: function() {
		this.apple.onclick = function() {
			food.moveX(food.position(food.appleX()));
			food.moveY(food.position(food.appleY()));
			progress.currentScoreIndex += 1;
			progress.currentScore.textContent = progress.currentScoreIndex;

			if (progress.currentScoreIndex > progress.bestScoreIndex) {
				progress.bestScoreIndex = progress.currentScoreIndex;
				progress.bestScore.textContent = progress.bestScoreIndex;
			}

			switch (progress.currentScoreIndex) {
				case 5:
					progress.levelUp();
					break;
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
					progress.finish();
					break;
				default:
					break;
			}
		}
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
	finish:  function() {
		field.endGame.style.display = 'block';
		this.currentScoreFinish.textContent = this.currentScoreIndex;
		this.bestScoreFinish.textContent = this.bestScoreIndex;
		this.restart();
	},
	startBtn: document.getElementById('startBtn'),
	start: function() {
		this.startBtn.onclick = function() {
			field.beginGame.style.display = 'none';
			snake.right = true;
			snake.firstMove();
		}
	},
	restartBtn: document.getElementById('restartBtn'),
	restart: function() {
		this.restartBtn.onclick = function() {
			field.endGame.style.display = 'none';
			progress.currentScore.textContent = progress.currentScoreIndex = 0;
			progress.level.textContent = progress.levelIndex = 1;
		}
	}
}

progress.start();