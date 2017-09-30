function openModal(modal) {
	$(modal).fadeIn('200');
	$('.modal-close').click(function() {
		$(modal).fadeOut('100');
	})
	$('.g-modal .overlay').click(function() {
		$(modal).fadeOut('100');
	});
};


// preloader
	$(window).on('load', function(){
		$('.preloader').delay(1000).fadeOut('100');
	});


// appearence of blocks
	wow = new WOW({
		offset: 0,
	})
	wow.init();


// menu
	
	$('.js-hamburger').click(function() {
		if ($(this).hasClass('is-active')) {
			$(this).removeClass('is-active')
			$('.menu-wrap').fadeOut(500)
		}
		else {
			$(this).addClass('is-active')
			$('.menu-wrap').fadeIn(500).css({
				width: '100%',
				display:'flex'})
		}
	});


	$(window).on('resize', function(){
		if (window.matchMedia('(min-width: 960px)').matches) {
			$('.js-hamburger').addClass('is-active')
			$('.menu-wrap').fadeIn(0).css('width', 'auto');
		}
		else {
			$('.menu-wrap').fadeOut(0).css('width', '100%');
			$('.js-hamburger').removeClass('is-active')
		}
	});


	function hideMenu() {
		if ($('.js-hamburger').hasClass('is-active')) {
				$('.js-hamburger').removeClass('is-active')
				$('.menu-wrap').fadeOut(500)
			}
	}


	$('.js-scrollto').click(function () {
		var elementClick = $(this).attr('href');
		var destination = $(elementClick).offset().top;
		$('html:not(:animated),body:not(:animated)').animate({
			scrollTop: destination}, 800);
		hideMenu();
		return false;
	});


	$('.js-top').click(function() {  
		$('body,html').animate({scrollTop:0},500);
		hideMenu(); 
		return false;
	});


	// menu-item-selecting-onscroll
	var lastId,
		topMenu = $(".js-menu"),
		topMenuHeight = topMenu.outerHeight()+15,
		menuItems = topMenu.find("a"),
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});
	menuItems.click(function(e){
		var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		$('html, body').stop().animate({scrollTop: offsetTop}, 300);
		e.preventDefault();
	});

	$(window).scroll(function() {
		if($(this).scrollTop() > 100) {
			$('.header-site').css({
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				transition: '1s ease'
			});
			$('.header-site .logo').css({
				transition: '.5s ease',
				width: '50px',
				marginTop: '5px',
				marginBottom: '5px'
			});	
		} else {
			$('.header-site').css({backgroundColor: 'transparent'})
			$('.header-site .logo').css({
				marginTop: '10px',
				marginBottom: '10px'
			})
			if(window.matchMedia('(min-width: 960px)').matches){
				$('.header-site .logo').css({
					width: '70px',
				})
			}
		}

		if($(this).scrollTop() > 200) {
			$('.scrollto-top').fadeIn('400');
		} else {
			$('.scrollto-top').fadeOut('100');
		}

		// menu-item-selecting-onscroll
		var fromTop = $(this).scrollTop()+topMenuHeight;
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
			return this;
		});
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			menuItems
			.parent().removeClass("menu__item--is-active")
			.end().filter("[href='#"+id+"']").parent().addClass("menu__item--is-active");
		}

	});



// main slider
  $(".main-slider").owlCarousel({
		items: 1,
		loop:true,
		autoplay: true,
		autoplayTimeout: 8000,
		autoplaySpeed: 2000,
		dotsSpeed: 1000,
		touchDrag: false
	})

	//nested slider-nested__content
		$(".slider-nested").owlCarousel({
			items: 1,
			loop:true,
			autoplay: true,
			autoplayTimeout: 10000,
			autoplaySpeed: 2000,
			touchDrag: false,
			nav: true,
			navSpeed: 1000,
			dots: false
		})
		$('.slider-nested .owl-nav .owl-prev').html('<div class="nested-prev"></div>')

		$('.slider-nested .owl-nav .owl-next').html('<div class="nested-next"></div>')



// subscribe
	$('#subscribe-form').submit(function(event) {
		event.preventDefault();

		var subscribeMail = $('#subscribe-mail').val();
		
		$('.subscribe__modal').find('.modal-email').html(subscribeMail);
		openModal('.subscribe__modal')
	});



// owl-carousel services
	$('.services-carousel').owlCarousel({
	    loop:true,
	    margin:10,
	    autoplay: true,
	    nav:true,
	    autoplayTimeout: 6000,
	    responsiveClass:true,
	    autoHeight:false,
	    dots: false,
	    responsive:{
	        0:{
	            items:1
	        },
	        640:{
	            items:2
	        },
	        960:{
	            items:3
	        }
	    }
	})

	$('.services-carousel .owl-nav .owl-prev').html('<div class="services-prev"></div>')

	$('.services-carousel .owl-nav .owl-next').html('<div class="services-next"></div>')


// tours
	$('.tour-btn').click(function(){
		var tourId = $(this).attr('id');
		openModal('.' + tourId);
	})		



	$('.tours__form').submit(function(event) {
		event.preventDefault()
		
		$(this).after('<p class="txt-large" style="font-weight: bold; background-color: #efefef; padding: 10px; margin: 20px;">Ваша заявка передана менеджеру. Найближчим часом з&nbsp;вами зв’яжуться для уточнення іноформації. Дякуємо!</p>')
		
		$(this).hide();
	});



// percentages

	var percentage = [];

	$('.percentage').each(function(i) {
		percentage[i] = $(this).text();
	})

	$('.statistic-bar').each(function(i) {
		$(this).width(percentage[i]+'%')
	})



// gallery
	var imgLinks 	= $('.gallery-album__item'),
		lightbox 	= $('.gallery__lightbox'),
		overlay		= $('.gallery__lightbox .overlay'),
		prev 		= $('.gallery__lightbox .prev'),
		next		= $('.gallery__lightbox .next'),
		imgIndex,
		targetImg;


		function replaceImg(src) {
			lightbox.find('img').attr('src', src);
		}

		function getHref(index) {
			return imgLinks.eq(index).attr('href');
		}

		imgLinks.click(function(event){
			event.preventDefault();
			imgIndex = $(this).index();
			targetImg = $(this).attr('href');
			replaceImg(targetImg);
			lightbox.fadeIn('400');
		});

		overlay.click(function() {
			lightbox.fadeOut('400');
		});

		next.click(function() {
			if ((imgIndex + 1) < imgLinks.length) {
				targetImg = getHref(imgIndex + 1);
				imgIndex ++;
			}
			else{
				targetImg = getHref(0);
				imgIndex = 0;
			}
			replaceImg(targetImg);
		});

		prev.click(function() {
			if (imgIndex > 0) {
				targetImg = getHref(imgIndex - 1);
				imgIndex --;
			}
			else{
				targetImg = getHref(imgLinks.length - 1);
      			imgIndex = imgLinks.length - 1;
			}
			replaceImg(targetImg);
		});

		$('.show-more').click(function() {
			if ($(this).hasClass('.show-less')) {
				if (window.matchMedia('(min-width: 993px)').matches){
					$('.gallery-album__item:nth-child(n+9)').fadeOut(500)
				}
				else {
					$('.gallery-album__item:nth-child(n+5)').fadeOut(500)
				}
				$(this).removeClass('.show-less').html('Більше')
				
			}
			else {
				$(this).addClass('.show-less').html('Сховати')
				$('.gallery-album__item').fadeIn(500)
				
			}
		})


		$('.g-tab').click(function() {
			$('.g-tab').removeClass('gallery-btn--is-active')
			$('.gallery-album__item').fadeOut(0)
			$('.show-more').fadeOut(0)
			if ($(this).hasClass('tab-nature')){
				$(this).addClass('gallery-btn--is-active')
				$('.tag-nature').fadeIn(0)
			}
			else if ($(this).hasClass('tab-city')){
				$(this).addClass('gallery-btn--is-active')
				$('.tag-city').fadeIn(0)
			}
			else if ($(this).hasClass('tab-animal')){
				$(this).addClass('gallery-btn--is-active')
				$('.tag-animal').fadeIn(0)
			}
			else {
				$(this).addClass('gallery-btn--is-active')
				$('.gallery-album__item').fadeIn(0)
				$('.show-more').fadeIn(0).addClass('.show-less').html('Сховати')
			}
		});

	// var tabs = [];
 //   	var tabNames = $('.g-tab');

 //  	$.each(tabNames, function(index){
 //    	tabs[index] = $(this).attr('id');
 //    }).click(function(){
 //     	$('.g-tab').removeClass('gallery-btn--is-active')
 //    	$('.gallery-album__item').fadeOut(0)

 //    	var tab = $(this);

 //    	$.each(tabs, function(i, val){
 //      		if ($(tab).hasClass('tab-'+val)){
 //       			$(tab).addClass('gallery-btn--is-active')
 //       			if(i == 0){
 //       		 		$('.gallery-album__item').fadeIn(0)
 //        			$('.show-more').fadeIn(0).addClass('.show-less').html('Сховати')
 //        		} else {
	// 		        $('.show-more').fadeOut(0)
	// 				$('.tag-'+val).fadeIn(0);
 //       			}
 //      		} 
 //     	})
 //   });



// why
	var showNum = true
	function increaseNum (numBox) {

		if (!showNum) return false;
		var wTop = $(window).scrollTop();
		var elTop = $(numBox).offset().top;

		var wHeight = $(window).height();
		var dHeight = $(document).height();

		var eHeight = $(numBox).outerHeight();

		if (wTop + 500 >= elTop || wHeight + wTop == dHeight || eHeight + elTop < wHeight) {
			$('.spincrement').spincrement({
				from: 0,
				decimalPlaces: 0,
				thousandSeparator: "", 
				duration: 1200 
				});
			showNum = false
		}	
	}

	var showPer= true
	function increasePerc (percBox) {
		
		if (!showPer) return false;
		var wTop = $(window).scrollTop();
		var elTop = $(percBox).offset().top;

		var wHeight = $(window).height();
		var dHeight = $(document).height();

		var eHeight = $(percBox).outerHeight();

		if (wTop + 500 >= elTop || wHeight + wTop == dHeight || eHeight + elTop < wHeight) {
			$('.spincrement').spincrement({
				from: 0,
				decimalPlaces: 0,
				thousandSeparator: "", 
				duration: 1700 
				});
			showPer = false
		}	
	}

	var showWidth = true
	function fillWidht (fillBox) {
		if (!showWidth) return false;
		var wTop = $(window).scrollTop();
		var elTop = $(fillBox).offset().top;

		var wHeight = $(window).height();
		var dHeight = $(document).height();

		var eHeight = $(fillBox).outerHeight();

		if (wTop + 500 >= elTop || wHeight + wTop == dHeight || eHeight + elTop < wHeight) {
			$('.statistic-bar').css('animation', 'increseWidth 1.7s ease forwards');
			showWidth = false
		}	
	}


	$(window).on('scroll resize load', function (){
		increaseNum ('.why')
		fillWidht ('.destination__item')
		increasePerc ('.percentage')
	})



// map
	var map;
	function initMap() {
		var coordinates = {lat: 50.389693, lng: 30.497523}
		map = new google.maps.Map(document.getElementById('map'), {
			center: coordinates,
			scrollwheel: false,
			disableDefaultUI: false,
			zoom: 17,
			styles:
			[
			  {
			    "featureType": "administrative",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#914800"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#914800"
			      }
			    ]
			  },
			  {
			    "featureType": "road.arterial",
			    "elementType": "geometry.fill",
			    "stylers": [
			      {
			        "color": "#ff952b"
			      }
			    ]
			  },
			  {
			    "featureType": "road.arterial",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#914800"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry.fill",
			    "stylers": [
			      {
			        "color": "#ff952b"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry.stroke",
			    "stylers": [
			      {
			        "color": "#ff952b"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#914800"
			      }
			    ]
			  },
			  {
			    "featureType": "road.local",
			    "elementType": "geometry.fill",
			    "stylers": [
			      {
			        "color": "#ffcb97"
			      }
			    ]
			  },
			  {
			    "featureType": "road.local",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#914800"
			      }
			    ]
			  },
			  {
			    "featureType": "transit",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#6a3500"
			      }
			    ]
			  }
			]
		});

		var marker = new google.maps.Marker({
			position: coordinates,
			map: map,
			animation: google.maps.Animation.BOUNCE,
			title: 'Надзвичайна Україна',
			icon: 'img/map-marker.png'
         });
	}



// footer-form
	$('#contacts-form').submit(function(e){
		e.preventDefault();

		var name = $('#contacts-name').val();
		var email = $('#contacts-mail').val();
		var text = $('#contacts-text').val();
		var url = $(this).attr('action');

		$.ajax({
			type: "POST",
			url: url,
			data: {name: name, email: email, text: text},
			success: function(data) {
				console.log(data);
			}
		});
	})






