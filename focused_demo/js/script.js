function muneHide(){$(".js-hamburger").hasClass("hamburger--active")&&window.matchMedia("(max-width: 767px)").matches&&($(".js-hamburger").removeClass("hamburger--active"),$(".js-menu").fadeOut(500),$("body").css("overflow","initial"))}function initMap(){var e={lat:50.4276228,lng:30.5133156};map=new google.maps.Map(document.getElementById("map"),{center:{lat:50.4286228,lng:30.514156},scrollwheel:!1,disableDefaultUI:!1,zoom:17}),new google.maps.Marker({position:e,map:map,animation:google.maps.Animation.DROP,label:{color:"#c04e47",fontWeight:"bold",text:"Antonovycha Street, 66"},icon:{labelOrigin:new google.maps.Point(100,35),url:"images/marker_red.png",size:new google.maps.Size(22,40),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(11,40)}}).setMap(map)}function serverReachable(){var e,a=new(window.ActiveXObject||XMLHttpRequest)("Microsoft.XMLHTTP");a.open("HEAD","//"+window.location.hostname+"/?rand="+Math.random(),!1);try{return a.send(),(e=a.status)>=200&&e<300||304===e}catch(e){return!1}}$(window).on("load",function(){$(".js-preloader").delay(1e3).fadeOut("100"),setTimeout(function(){$("body").css("overflow","initial")},1e3)}),$(".js-hamburger").click(function(){$(this).hasClass("hamburger--active")?($(this).removeClass("hamburger--active"),$(".js-menu").fadeOut(500),$("body").css("overflow","initial")):($(this).addClass("hamburger--active"),$(".js-menu").fadeIn(500).css({width:"100%",display:"flex"}),$("body").css("overflow","hidden"))}),$(window).on("resize",function(){window.matchMedia("(min-width: 768px)").matches?($(".js-hamburger").addClass("hamburger--active"),$(".js-menu").fadeIn(0).css("width","auto")):($(".js-menu").fadeOut(0).css("width","100%"),$(".js-hamburger").removeClass("hamburger--active"))});var map;console.log(serverReachable());