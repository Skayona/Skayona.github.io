$('.js-hamburger').click(function() {
	if ($(this).hasClass('is-active')) {
		$(this).removeClass('is-active')
		$('.menu-wrap').slideUp(400)
	}
	else {
		$(this).addClass('is-active')
		$('.menu-wrap').slideDown(400)
	}
})

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