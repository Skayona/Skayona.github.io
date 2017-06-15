
$('.js-scrollto').click(function () {
	var elementClick = $(this).attr('href')
	var destination = $(elementClick).offset().top;
	$('html:not(:animated),body:not(:animated)').animate({
		scrollTop: destination}, 800);
	return false;
});

$('.js-top').click(function() {  
	$('body,html').animate({scrollTop:0},500);  
	return false;
});

$(window).scroll(function() {
	if($(this).scrollTop() > 150) {
		$('.js-top').show(800);
	} else {
		$('.js-top').hide();
	}
});

$('.plan-button').click(function() {
	$('.modal').fadeToggle('slow')
});

$('.js-cross').click(function() {
	$('.modal').fadeToggle('slow')
});

// need to optimize

$('.js-hamburger').click(function() {
	if ($(this).hasClass('is-active')) {
		$(this).removeClass('is-active')
		$('.menu-wrap').slideUp(400)
	}
	else {
		$(this).addClass('is-active')
		$('.menu-wrap').slideDown(400)
	}
});

$('.service1 .js-price').click(function() {
	if ($(this).hasClass('is-active')) {
		$(this).removeClass('is-active')
		$('.service1 .plan-items').slideUp(400)
	}
	else {
		$(this).addClass('is-active')
		$('.service1 .plan-items').slideDown(400)
	}
});

$('.service2 .js-price').click(function() {
	if ($(this).hasClass('is-active')) {
		$(this).removeClass('is-active')
		$('.service2 .plan-items').slideUp(400)
	}
	else {
		$(this).addClass('is-active')
		$('.service2 .plan-items').slideDown(400)
	}
});

$('.service3 .js-price').click(function() {
	if ($(this).hasClass('is-active')) {
		$(this).removeClass('is-active')
		$('.service3 .plan-items').slideUp(400)
	}
	else {
		$(this).addClass('is-active')
		$('.service3 .plan-items').slideDown(400)
	}
});

$('.service4 .js-price').click(function() {
	if ($(this).hasClass('is-active')) {
		$(this).removeClass('is-active')
		$('.service4 .plan-items').slideUp(400)
	}
	else {
		$(this).addClass('is-active')
		$('.service4 .plan-items').slideDown(400)
	}
});
