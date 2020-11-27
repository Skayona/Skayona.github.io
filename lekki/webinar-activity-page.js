

{
  textInpuResize('#webinarChatInput');

  const container = document.querySelector('.js-web-video-slider');

  if (container) {
    tns({
      container,
      nextButton: '.js-web-video-slider-next',
      prevButton: '.js-web-video-slider-prev',
      mouseDrag: true,
      autoplay: false,
      loop: false,
      speed: 300,
      items: 1,
      mode: 'gallery'
    });

  }

  const toggleScreens = document.querySelector('.js-toggle-screens');
  const frontScreen = document.querySelector('.js-front-screen');

  toggleScreens && toggleScreens.addEventListener('click', () => {
    frontScreen.classList.toggle('active');
  }, false);
}
