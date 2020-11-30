{
  const container = document.querySelector('.js-reviews-slider');
  console.log(document.querySelector('.js-reviews-slider'));
  if (container)
    tns({
      container,
      controls: false,
      nextButton: '.js-reviews-slider-next',
      prevButton: '.js-reviews-slider-prev',
      mouseDrag: true,
      loop: false,
      autoplay: false,
      autoplayButtonOutput: false,
      speed: 300,
      lazyload: true,
      gutter: 20,
      responsive: {
        768: {
          nav: false,
          controls: true
        },
        1366: {
          items: 2,
        }
      }
    }
  )
}

