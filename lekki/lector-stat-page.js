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
  const contextMenuBtnList = document.querySelectorAll('.js-context-menu-handler');

  function showContextMenu(e) {
    const items = [
      { title: 'Edit', icon: 'icon icon-download', fn: () => console.log('Edit') },
      { title: 'Cut', fn: () => console.log('Cut') },
      { title: 'Copy', fn: () => console.log('Copy') },
      { title: 'Paste', fn: () => console.log('Paste'), disabled: true },
      { title: 'Delete', fn: () => console.log('Delete'), visible: false },
      { },
      { title: 'Quit', fn: () => console.log('eQuitdit') }
    ]
    basicContext.show(items, e);
  }

  [...contextMenuBtnList].forEach((btn) => {
    btn.addEventListener('click', showContextMenu);
  });
}