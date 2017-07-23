jQuery.fn.clickToggle = function(a,b) {
	var ab = [b,a];
	return this.on("click", function(){ ab[this._tog^=1].call(this); });
};

// menu

function muneHide(){
	if ($('.js-hamburger').hasClass('is-active') && window.matchMedia('(max-width: 1199px)').matches) {
		$('.js-hamburger').removeClass('is-active');
		$('.header-menu').fadeOut(500);
		$('body').css('overflow', 'initial');
	}
}

$('.js-top').click(function() {  
	$('body,html').animate({scrollTop:0},500);
	muneHide();
	return false;
});

$('.js-hamburger').click(function() {
	if ($(this).hasClass('is-active')) {
		$(this).removeClass('is-active');
		$('.header-menu').fadeOut(500);
		$('body').css('overflow', 'initial');
	}
	else {
		$(this).addClass('is-active')
		$('.header-menu').fadeIn(500).css({
			width: '100%',
			display:'flex'});
		$('body').css('overflow', 'hidden');
	}
});


$(window).on('resize', function(){
	if (window.matchMedia('(min-width: 1200px)').matches) {
		$('.js-hamburger').addClass('is-active')
		$('.header-menu').fadeIn(0).css('width', 'auto');
	}
	else {
		$('.header-menu').fadeOut(0).css('width', '100%');
		$('.js-hamburger').removeClass('is-active')
	}
});

$('.js-scrollto').click(function () {
	var elementClick = $(this).attr('href');
	var destination = $(elementClick).offset().top;
	$('html:not(:animated),body:not(:animated)').animate({
	scrollTop: destination}, 800);
	muneHide();
	return false;
});



$(window).scroll(function() {
	if($(this).scrollTop() > 0) {
		$('.header-site-wrap').css({
			position: 'fixed',
			top: '0',
			left: '0',
			right: '0',
			boxShadow: '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.3)',
			transition: '1s ease'
		});
	} else {
		$('.header-site-wrap').css({
			boxShadow: 'none',
			position: 'initial'
		});
	};	
})


// slider
$(document).ready(function(){
	$('.what__slider').owlCarousel({
		items: 1,
		loop: true,
		dots: true,
		autoplay: true,
		autoplayTimeout: 8000,
		responsive: {
			768: {
				nav: true,
			}
		}
	});
	$('.what__slider .owl-prev').html('<svg width="22.5px" height="32.5px"><path fill-rule="evenodd" stroke="rgb(99, 185, 69)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M18.500,3.049 L4.597,15.500 L18.500,27.951 "/></svg>');
	$('.what__slider .owl-next').html('<svg width="22.5px" height="32.5px"><path fill-rule="evenodd"  stroke="rgb(99, 185, 69)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M2.500,3.049 L16.402,15.500 L2.500,27.951 "/></svg>');
});

//form

$('.g-form-tel').mask('+380999999999');

function form (f, n) {
	$(f).submit(function(event) {
		event.preventDefault();

		var formName = $(n).val();
		$(f).fadeOut(100)
			.after('<p class="form__txt">'+formName+', наш менеджер свяжется с вами в течении 30 минут. Спасибо за заявку!</p>');
	});
};

form('#callback__form', '#callback-name');
form('#m-form', '#m-form-name');


var opt = $('.select-customize__select option');
var optVal = []; 
var replaceSel = $('.select-replace__txt');

$.each(opt, function(i){
	optVal[i] = $(this).text();
	replaceSel.text(optVal[0]);
});

function sel(val) {
    replaceSel.text(val);
    if (val==0) {replaceSel.text(optVal[0]);} 
};



// modal
function modal (click, modal) {
	$(click).click(function() {
		$(modal).fadeToggle(400).toggleClass('is-active');
		if ($(modal).hasClass('is-active'))  {
			$('body').css('overflow', 'hidden');
		}
		else {
			$('body').css('overflow', 'initial');
		}
	});
};

modal('.js-callme', '#m-callback');
modal('.m-header__cross', '#m-callback');