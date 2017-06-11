var levelNumber = 1;
var startGame = false;
var nextLevel = true;
var cols = rows = 2;
var circleDiam = 60;
var circleMargin = 5;

$('.start').click(function() {
	$('.container')
		.css({
				width: '250',
				height: '250',
			})
		.fadeIn(0)
	$(this).fadeOut(0)
	$('.restart').fadeIn(0)
	$('.restart-level').fadeIn(0)
	$('.to-do').text('Press RESTART to start over.')
	next (cols, rows);
});


$('.restart').click(function() {
	location.reload();
});


$('.restart-level').click(function() {
	$('.circle[selected="selected"]:not(.right)').addClass("right");
	next (cols, rows);
});


$('.continue').click(function() {
	$('.level-done-wrap').fadeOut('slow', 0)
	next(cols, rows);
});


function modalDiplay(modalName) {
	$(modalName).fadeIn(1000);
}


function containerAnimate() {
	var containerWidth = (circleDiam  + circleMargin * 2) * cols + 38;
	var containerHeight = (circleDiam  + (circleMargin + 1) * 2) * rows + 38;

	$('.container').animate({
			width: containerWidth,
			height: containerHeight},
			1000)
};


function containerEmpty () {
	$('.container').empty();
};


function levelCounterDelay() {
	$('.level').text('Level ' + levelNumber);
}


function next (c, r) {
	setTimeout(levelCounterDelay, 400);
	setTimeout(containerEmpty, 400);
	setTimeout(containerAnimate, 400);
	setTimeout(createCircle, 1400);
};


function createCircle() {
	for (var i = 0; i < (rows * cols); i++) {
		$('<div class="circle"></div>').appendTo('.container');
		$('.circle').css({
			width: circleDiam,
			height: circleDiam,
			margin: circleMargin+'px'
		});
	}
	setTimeout(colorCircle, 500);
	chooseCircle();
};


function chooseCircle() {
	return $('.circle').click(function() {
		if(startGame) {
			if ($(this).attr('selected') == 'selected') 
				$(this).addClass('right')
			else
				$(this).addClass('wrong');

			var totalSelected = $('.circle[selected="selected"]').length;

			if (($('.right').length + $('.wrong').length) == totalSelected) {
				startGame = false;
				
				$('.circle[selected="selected"]:not(.right)').addClass("right");				
				
				if($('.wrong').length == 0){

					if (cols == rows)
						cols++,
						levelNumber++;
					else if (cols > rows)
						rows++,
						levelNumber++;
					
					if (cols > 6) {
						cols = 6;
						rows = cols;
						levelNumber = 9;
						$('.level-done-wrap').fadeOut(0);
						modalDiplay('.end-game-wrap');
					}
					else
						setTimeout(modalDiplay, 200, '.level-done-wrap');
				}
			}	
		}
	})
};


function colorCircle() {
	var amt = $('.circle').length;

	for (var counter = 0; counter < Math.ceil(amt/3);) {
		var randomCircle = Math.ceil(Math.random()*amt -1 );
		if (randomCircle < amt) {
			if(!$('.circle').eq(randomCircle).hasClass('right')) {
				$('.circle').eq(randomCircle).addClass('right').attr('selected', 'selected');
				counter++;
			}
		}
	}	
	setTimeout(hideСolorCircle, 1500);
};


function hideСolorCircle () {
	$('.circle').removeClass('right');
	startGame = true;
	nextLevel = true;
};