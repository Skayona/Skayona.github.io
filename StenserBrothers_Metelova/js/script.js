$('.js-hamburger').click(function() {
	if ($(this).hasClass('is-active')) {
		$(this).removeClass('is-active')
		$('.menu-wrap').fadeOut(200)
	}
	else {
		$(this).addClass('is-active')
		$('.menu-wrap').fadeIn(400)
	}
})
