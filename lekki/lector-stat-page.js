{
  if (document.querySelector('#lector-chart')) {
    Highcharts.chart('lector-chart', {
      chart: {
        type: 'funnel',
        backgroundColor: 'transparent',
      },
      title: {
        text: 'Sales funnel'
      },
      credits: false,
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            softConnector: true
          },
          center: ['40%', '50%'],
          neckWidth: '30%',
          neckHeight: '25%',
          width: '80%'
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Unique users',
        data: [
          ['Website visits', 15654],
          ['Downloads', 4064],
          ['Requested price list', 1987],
          ['Invoice sent', 976],
          ['Finalized', 846]
        ]
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            plotOptions: {
              series: {
                dataLabels: {
                  inside: true
                },
                center: ['50%', '50%'],
                width: '100%'
              }
            }
          }
        }]
      }
    })
  }
}
{
  const contextItems = [{
    icon: 'edit',
    label: 'Редактировать',
    action: (event) => {
      console.log(event, 'Редактировать');
    }
  }, {
    icon: 'copy',
    label: 'Копировать',
    action: (event) => {
      console.log(event, 'Копировать');
    }
  }, {
    icon: 'trash',
    label: 'Удалить',
    action: (event) => {
      console.log(event, 'Удалить');
    }
  }, {
    icon: null,
    label: 'Без иконки',
    action: (event) => {
      console.log(event, 'Без иконки');
      hideContextMenu();
    }
  }];

  const contextMenuBtnList = [...document.querySelectorAll('.js-context-menu-handler')];

  contextMenuBtnList.forEach((btn) => {
    btn.addEventListener('click', (e) => showContextMenu(e, btn, contextItems));
  });
}