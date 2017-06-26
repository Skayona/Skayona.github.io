// preloader
$(window).on('load', function(){
	$('.preloader').delay(1000).fadeOut('100');
});



// menu
	$('.js-hamburger').click(function() {
		if ($(this).hasClass('is-active')) {
			$(this).removeClass('is-active')
			$('.js-menu').fadeOut(500)
			$('.menu-wrap').fadeOut(500)
		}
		else {
			$(this).addClass('is-active')
			$('.js-menu').fadeIn(500)
			$('.menu-wrap').fadeIn(500).css({
				width: '100%'})
		}
	});


	function hideMenu() {
		if ($('.js-hamburger').hasClass('is-active')) {
				$('.js-hamburger').removeClass('is-active')
				$('.js-menu').fadeOut(500)
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


	$(window).scroll(function() {
		if($(this).scrollTop() > 100) {
			$('.header-site').css({
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
	});


	// Cache selectors
	var lastId,
		topMenu = $(".js-menu"),
		topMenuHeight = topMenu.outerHeight()+15,
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
		var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		$('html, body').stop().animate({ 
		scrollTop: offsetTop
		}, 300);
		e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function(){
		// Get container scroll position
		var fromTop = $(this).scrollTop()+topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
			return this;
		});
		// Get the id of the current element
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
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
		dotsSpeed: 2000,
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
			navSpeed: 2000,
			dots: false
		})
		$('.slider-nested .owl-nav .owl-prev').html('<svg width="10px" height="14px"><path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M3.860,7.016 L8.643,2.415 C9.123,1.957 9.123,1.216 8.643,0.757 L8.207,0.342 C7.726,-0.115 6.947,-0.115 6.466,0.342 L0.838,5.749 C0.828,5.759 0.818,5.760 0.809,5.769 L0.374,6.183 C0.132,6.411 0.013,6.715 0.015,7.016 C0.013,7.318 0.132,7.621 0.374,7.850 L0.809,8.264 C0.818,8.273 0.830,8.274 0.838,8.283 L6.466,13.646 C6.947,14.104 7.726,14.104 8.207,13.646 L8.643,13.232 C9.123,12.773 9.123,12.031 8.643,11.572 L3.860,7.016 Z"/></svg>')

		$('.slider-nested .owl-nav .owl-next').html('<svg width="10px" height="14px"><path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M5.867,7.001 L1.134,2.431 C0.659,1.975 0.659,1.239 1.134,0.783 L1.565,0.373 C2.041,-0.083 2.812,-0.083 3.288,0.373 L8.857,5.742 C8.868,5.750 8.878,5.753 8.886,5.762 L9.317,6.173 C9.556,6.401 9.674,6.700 9.673,7.001 C9.674,7.300 9.556,7.600 9.317,7.828 L8.886,8.240 C8.878,8.248 8.866,8.249 8.857,8.260 L3.288,13.585 C2.812,14.041 2.041,14.041 1.565,13.585 L1.134,13.174 C0.659,12.720 0.659,11.982 1.134,11.526 L5.867,7.001 Z"/></svg>')



// subscribe
	$('#subscribe-form').submit(function(event) {
		event.preventDefault();

		var subscribeMail = $('#subscribe-mail').val();
		
		$('.subscribe__modal').find('.modal-email').html(subscribeMail);

		$('.subscribe__modal').fadeIn('200', function() {
			$('.modal-close').click(function() {
				$('.subscribe__modal').fadeOut('100');
			});
		});
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

	$('.services-carousel .owl-nav .owl-prev').html('<svg viewBox="-15 0 50 100" width="33px" height="106px"><path fill-rule="evenodd" fill="#fbb040" d="M32.988,104.987 L31.248,106.003 L0.386,53.390 L0.137,53.244 L0.218,53.104 L0.011,52.751 L0.635,52.388 L31.136,-0.008 L32.863,1.008 L2.544,53.088 L32.988,104.987 Z"/></svg>')

	$('.services-carousel .owl-nav .owl-next').html('<svg viewBox="0 0 50 100" width="33px" height="106px"><path fill-rule="evenodd"  fill="#fbb040" d="M32.988,53.003 L32.781,53.353 L32.863,53.493 L32.613,53.639 L1.751,106.003 L0.012,104.992 L30.455,53.338 L0.136,1.503 L1.863,0.492 L32.364,52.641 L32.988,53.003 Z"/></svg>')



// tours
	function openTourModal(modal, close) {
		$(modal).fadeIn('200', function() {
			$(close).click(function() {
				$(modal).fadeOut('100');
			});
		}
	)}

	$('.tour1-btn').click(function() {
		openTourModal($('.tour1__modal'), $('.modal-close'));
	});

	$('.tour2-btn').click(function() {
		openTourModal($('.tour2__modal'), $('.modal-close'));
	});

	$('.tour3-btn').click(function() {
		openTourModal($('.tour3__modal'), $('.modal-close'));
	});

	$('.tour4-btn').click(function() {
		openTourModal($('.tour4__modal'), $('.modal-close'));
	});

	$('.tours__form').submit(function(event) {
		event.preventDefault()
		

		$(this).after('<p class="txt-large" style="font-weight: bold; background-color: #efefef; padding: 10px 0;">Ваша заявка передана менеджеру. Найближчим часом з&nbsp;вами зв’яжуться для уточнення іноформації. Дякуємо!</p>')
		
		$(this).hide();
	});



// percentages

	var percentage = [];

	$('.percentage').each(function(i) {
		percentage[i] = $(this).text();
	})

	$('.statistic-bar').each(function(i) {
		$(this).width(percentage[i])
	})



// gallery
	var imgLinks 	= $('.gallery-album__item'),
		lightbox 	= $('.gallery__lightbox'),
		overlay		= $('.gallery__lightbox .overlay'),
		prev 		= $('.gallery__lightbox .prev'),
		next		= $('.gallery__lightbox .next'),
		imgIndex,
		targetImg;

		prev.html('<svg viewBox="0 0 50 100" width="33px" height="106px"><path fill-rule="evenodd" fill="#fff" d="M32.988,104.987 L31.248,106.003 L0.386,53.390 L0.137,53.244 L0.218,53.104 L0.011,52.751 L0.635,52.388 L31.136,-0.008 L32.863,1.008 L2.544,53.088 L32.988,104.987 Z"/></svg>')

		next.html('<svg viewBox="-15 0 50 100" width="33px" height="106px"><path fill-rule="evenodd"  fill="#fff" d="M32.988,53.003 L32.781,53.353 L32.863,53.493 L32.613,53.639 L1.751,106.003 L0.012,104.992 L30.455,53.338 L0.136,1.503 L1.863,0.492 L32.364,52.641 L32.988,53.003 Z"/></svg>')


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


// appearence


