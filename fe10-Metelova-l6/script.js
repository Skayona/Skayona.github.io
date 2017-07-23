$('.hamburger').click(function() {
	if ($(this).hasClass('hamburger--cross')) {
		$(this).removeClass('hamburger--cross'),
		$('.hamburger__item').removeClass('hamburger__item--cross'),
		$('.menu-wrap').animate({
			right: '-70%'}, 1000)
	}
	else {
		$(this).addClass('hamburger--cross'),
		$('.hamburger__item').fadeIn('1000', function() {
			$(this).addClass('hamburger__item--cross')
		});
		$('.menu-wrap').animate({
			right: '0'}, 1000)
	}
});
