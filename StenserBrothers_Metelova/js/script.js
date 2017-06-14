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