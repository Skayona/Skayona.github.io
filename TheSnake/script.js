function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
		}
	},
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
		}
	},
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
		}
	},
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
		if (snake.headX() == this.appleX() && snake.headY() == this.appleY()) {
			food.moveX(food.position(food.appleX()));
			food.moveY(food.position(food.appleY()));
			progress.currentScoreIndex += 1;
			progress.currentScore.textContent = progress.currentScoreIndex;
			// snake.rising();

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
					progress.win = true;
					progress.finish();
					break;
				default:
					break;
			}
		} else {
			snake.allowRise = false;
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

progress.start();