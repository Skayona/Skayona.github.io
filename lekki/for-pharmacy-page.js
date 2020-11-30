
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

