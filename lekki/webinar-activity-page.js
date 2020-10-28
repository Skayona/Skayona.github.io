

{
  textInpuResize('#webinarChatInput');

  const container = document.querySelector('.js-web-video-slider');
  const stopPlayingVideos = () => {
    const youtubeVideos = document.querySelectorAll('.js-youtube-video iframe');
    youtubeVideos.forEach((video) => {
      video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
  }

  if (container) {
    const slider = tns({
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

    slider.events.on('indexChanged', () => {
      const youtubeVideos = document.querySelectorAll('.js-youtube-video iframe');
      youtubeVideos.forEach(stopPlayingVideos);
    });
  }

  const toggleScreens = document.querySelector('.js-toggle-screens');
  const frontScreen = document.querySelector('.js-front-screen');

  toggleScreens && toggleScreens.addEventListener('click', () => {
    stopPlayingVideos();
    frontScreen.classList.toggle('active');
  }, false);
}
