// jQuery.fn.clickToggle = function(a,b) {
// 	var ab = [b,a];
// 	return this.on("click", function(){ ab[this._tog^=1].call(this);
//   });
// };

// preloader
$(window).on('load', function(){
	$('.js-preloader').delay(1000).fadeOut('100');
	setTimeout(function() {$('body').css('overflow', 'initial');}, 1000);
})

//menu
function muneHide(){
	if ($('.js-hamburger').hasClass('hamburger--active') && window.matchMedia('(max-width: 767px)').matches) {
		$('.js-hamburger').removeClass('hamburger--active');
		$('.js-menu').fadeOut(500);
		$('body').css('overflow', 'initial');
	}
}

$('.js-hamburger').click(function() {
	if ($(this).hasClass('hamburger--active')) {
		$(this).removeClass('hamburger--active');
		$('.js-menu').fadeOut(500);
		$('body').css('overflow', 'initial');
	}
	else {
		$(this).addClass('hamburger--active');
		$('.js-menu').fadeIn(500).css({
			width: '100%',
			display:'flex'});
		$('body').css('overflow', 'hidden');
	}
});

$(window).on('resize', function(){
	if (window.matchMedia('(min-width: 768px)').matches) {
		$('.js-hamburger').addClass('hamburger--active');
		$('.js-menu').fadeIn(0).css('width', 'auto');
	}
	else {
		$('.js-menu').fadeOut(0).css('width', '100%');
		$('.js-hamburger').removeClass('hamburger--active');
	};
});
