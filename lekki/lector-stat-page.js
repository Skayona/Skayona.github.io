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

  function hideContextMenu(menuHandler = false) {
    const contextMenu = menuHandler && menuHandler.parentNode.querySelector('.context-menu') || document.querySelector('.context-menu');
    const wasOpen = Boolean(menuHandler && menuHandler.parentNode.querySelector('.context-menu'));
    if (contextMenu) {
      contextMenu.parentNode.removeChild(contextMenu);
      return wasOpen;
    }
    return false;
  }

  function showContextMenu(e, btn, menuList = []) {
    e.stopPropagation();
    const menuWasHidden = hideContextMenu(btn);
    if (menuWasHidden) return;
    const contextWrap = btn.parentNode;
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    const contextList = document.createElement('ul');
    contextList.className = 'context-menu__list';

    menuList.forEach((menu) => {
      const contextItem = document.createElement('li');
      const contextBtn = document.createElement('button');
      contextBtn.className = 'context-menu__btn';
      if (menu.icon) {
        const contextIcon = document.createElement('i');
        contextIcon.className = `icon icon-${ menu.icon }`;
        contextIcon.setAttribute('aria-hidden', true);
        contextBtn.appendChild(contextIcon);
      }
      const contextLabel = document.createElement('span');
      contextLabel.innerText = menu.label;
      contextBtn.appendChild(contextLabel);
      contextItem.appendChild(contextBtn);
      contextList.appendChild(contextItem);

      contextBtn.addEventListener('click', menu.action);
    });
    contextMenu.appendChild(contextList);
    contextWrap.appendChild(contextMenu);
    contextMenu.classList.add('visible');

    contextMenu.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

  contextMenuBtnList.forEach((btn) => {
    btn.addEventListener('click', (e) => showContextMenu(e, btn, contextItems));
  });

  document.addEventListener('click', () => hideContextMenu());
}