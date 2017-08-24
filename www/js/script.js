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

//map
var map;
function initMap() {
	var coordinates = {lat: 50.4276228, lng: 30.5133156}
	map = new google.maps.Map(document.getElementById('map'), {
		center: coordinates,
		scrollwheel: false,
		disableDefaultUI: false,
		zoom: 17
	});

	var marker = new google.maps.Marker({
		position: coordinates,
		map: map,
		animation: google.maps.Animation.DROP,
		label: {
	    color: '#c04e47',
	    fontWeight: 'bold',
	    text: 'Antonovycha Street, 66',
  	},
		icon: {
		 labelOrigin: new google.maps.Point(100, 35),
		 url: 'images/marker_red.png',
		 size: new google.maps.Size(22, 40),
		 origin: new google.maps.Point(0, 0),
		 anchor: new google.maps.Point(11, 40),
	 }
  });
	marker.setMap(map);
};
