{
  const container = document.querySelector('.js-partners-slider');
  if (container)
    tns({
      container,
      nextButton: '.js-partners-slider-next',
      prevButton: '.js-partners-slider-prev',
      mouseDrag: true,
      loop: false,
      autoplay: false,
      autoplayButtonOutput: false,
      speed: 300,
      nav: false,
      lazyload: true,
      fixedWidth: 50,
      gutter: 40,
      responsive: {
        768: {
          fixedWidth: 76,
          gutter: 64,
        },
        1366: {
          items: 6,
          fixedWidth: false,
          gutter: 102,
        }
      }
    }
  )
}

{
  const container = document.querySelector('.js-clients-slider');
  if (container)
    tns({
      container,
      nextButton: '.js-clients-slider-next',
      prevButton: '.js-clients-slider-prev',
      mouseDrag: true,
      loop: false,
      autoplay: false,
      autoplayButtonOutput: false,
      speed: 300,
      nav: false,
      lazyload: true,
      fixedWidth: 240,
      responsive: {
        768: {
          fixedWidth: 278,
        },
        1366: {
          items: 4,
          fixedWidth: false,
          gutter: 20
        }
      }
    }
  )
}


{
  const container = document.querySelector('.js-intro-slider');
  if (container)
    tns({
      container,
      nextButton: '.js-intro-slider-next',
      prevButton: '.js-intro-slider-prev',
      mouseDrag: true,
      loop: false,
      autoplay: false,
      autoplayButtonOutput: false,
      speed: 300,
      items: 1,
      mode: 'gallery'
    });
}


{
  // webinars by days
  const onChangeCallback = (selectedDates, dateStr, instance) => {
    // actions on selected dates change
    console.log('selected dates:', dateStr);
  }
  calendarInit({
    calendarSelector: '.js-schedule-by-date',
    onChangeCallback
  });
}

{
  // webinars by month
  const selectList = [
    { value: 'январь', label: 'Январь' },
    { value: 'февраль', label: 'Февраль' },
    { value: 'март', label: 'Март' },
    { value: 'апрель', label: 'Апрель' },
    { value: 'май', label: 'Май' },
    { value: 'июнь', label: 'Июнь' },
    { value: 'июль', label: 'Июль' },
    { value: 'август', label: 'Август' },
    { value: 'сентябрь', label: 'Сентябрь' },
    { value: 'октябрь', label: 'Октябрь' },
    { value: 'ноябрь', label: 'Ноябрь' },
    { value: 'декабрь', label: 'Декабрь', selected: true }
  ];
  const onSelectCallback = (value) => {
    console.log(value);
  }
  linkSelect({
    className: '.js-schedule-by-month',
    selectList, onSelectCallback
  })
}