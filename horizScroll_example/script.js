$(function () { // wait for document ready
  // init
  var controller = new ScrollMagic.Controller();

  // define movement of panels
  var wipeAnimation = new TimelineMax()
  .fromTo(".block--scroll-2", 1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone});  // in from right
  // .fromTo(".block--scroll-3", 1, {y: "100%"}, {y: "0%", ease: Linear.easeNone}); // in from top
  // .fromTo(".block--scroll-4", 1, {y: "100%"}, {y: "0%", ease: Linear.easeNone}); // in from top

  // create scene to pin and link animation
  new ScrollMagic.Scene({
      triggerElement: "#pinContainer",
      triggerHook: "onLeave",
      duration: "200%"
    })
    .setPin("#pinContainer")
    .setTween(wipeAnimation)
    .addTo(controller);
});
