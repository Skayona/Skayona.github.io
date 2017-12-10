function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let snake = {
	head: document.getElementById('snakeHead'),
	tail: document.getElementById('snakeTail'),
	dMove: function() {return this.head.clientWidth}
}

let field = {
	box: document.getElementById('snakeField'),
	width: function() {return this.box.clientWidth},
	height: function() {return this.box.clientHeight},
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
	restartBtn: document.getElementById('restartBtn'),
	restart: function() {
		this.restartBtn.onclick = function() {
			field.endGame.style.display = 'none';
			progress.currentScore.textContent = progress.currentScoreIndex = 0;
			progress.level.textContent = progress.levelIndex = 1;
		}
	}
}

food.eaten();