// google maps styles
var map;
function initMap()
{
      map = new google.maps.Map(document.getElementById('map'),
      {
            center: {lat: 50.451943, lng: 30.525894},
            zoom: 18,
      	styles:
            [{
                	"featureType": "all",
                  "elementType": "all",
                  "stylers":
                        [{"saturation": "-61"},
                        {"hue": "#00d5ff"},
                        {"gamma": "1.00"},
                        {"visibility": "on"}]
            },
            {
                  "featureType": "road",
                   "elementType": "geometry.fill",
                   "stylers":
                        [{"hue": "#00cbff"}]
            },
            {
                  "featureType": "road",
                   "elementType": "geometry.stroke",
                   "stylers":
                        [{"hue": "#00cbff" }]
            },
            {
                  "featureType": "road",
                   "elementType": "labels.text.fill",
                   "stylers":
                        [{"hue": "#00cbff"}]
            },
            {
                  "featureType": "road",
                   "elementType": "labels.text.stroke",
                   "stylers":
                        [{"hue": "#00cbff"}]
            },
            {
                  "featureType": "road.highway",
                   "elementType": "geometry.fill",
                   "stylers":
                        [{"color": "#00bff0"}]
            },
            {
                   "featureType": "road.highway.controlled_access",
                   "elementType": "geometry.fill",
                   "stylers":
                        [{"color": "#00a6d0"}]
            },
            {
                  "featureType": "road.arterial",
                   "elementType": "geometry.fill",
                   "stylers":
                        [{"color": "#00bff0"}]
            },
            {
                  "featureType": "road.local",
                   "elementType": "geometry.fill",
                   "stylers":
                        [{"color": "#00bff0"},
                        {"weight": "0.8"}]
            }]
      });

      var marker = new google.maps.Marker(
            {
            	position: {lat: 50.451843, lng: 30.525894},
            	map: map,
            	title: 'GYM - спортивний клуб! м.Київ, Хрещатик, 10',
            	icon: 'images/map-marker.png'
            });
}

// form after submit
var submitted=false;

// big image in gallery
$(document).ready(function() {

  $(".gallery-img").click(function(){
      var img = $(this);
    var src = img.attr('src');
    $("body").append("<div class='gallery-popup'>"+
             "<div class='gallery-popup_bg'></div>"+
             "<img src='"+src+"' class='gallery-popup_img' />"+
             "</div>");
    $(".gallery-popup").fadeIn(800);
    $(".gallery-popup_bg").click(function(){
      $(".gallery-popup").fadeOut(800);
      setTimeout(function() {
        $(".gallery-popup").remove();
      }, 800);
    });
  });

});

// slider
var slideNow = 1;
var slideCount = $('.slide-wrapper').children().length;
var slideInterval = 6000;
var translateHeight = 0;
var height = $('.slider-viewport').width() * 0.52;




$(document).ready(function() {
    var switchInterval = setInterval(nextSlide, slideInterval);
    $('.slider-viewport').css({'height': height, });
    $('.slide-img').css({'height': height, });
});

function nextSlide() {
   if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
   $('.slide-wrapper').css('transform', 'translate(0, 0)');
     slideNow = 1;
  } else {
        translateHeight = -$('.slider-viewport').height() * (slideNow);
        $('.slide-wrapper').css({
            'transform': 'translate(0, ' + translateHeight + 'px)',
        });
    slideNow++;
    }
}

function imgCentering() {

  $('.glr-img__wrapper').each(function() {
    var imgWrapH = $(this).height(),
      imgWrapW = $(this).width(),
      imgCent = $(this).children('img'),
      imgH = imgCent.height(),
      imgW = imgCent.width(),
      wrap = imgWrapH / imgWrapW,
      img = imgH / imgW;

    if (wrap > img) {
      imgCent.addClass('js-element-horizont').removeClass('js-element-vertical');
    } else {
      imgCent.addClass('js-element-vertical').removeClass('js-element-horizont');
    };
  });
};

$(document).ready(function() {
  imgCentering();
  $(window).on('resize', imgCentering);
});
