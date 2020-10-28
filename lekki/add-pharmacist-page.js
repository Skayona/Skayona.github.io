{
  const resetSelectBlock = (selectBlock) => {
    selectBlock.destroy();
    selectBlock.init();
  }

  // input mask for tel
  const telField = document.querySelector('#pharmacist-tel');
  telField && IMask(telField, {
    mask: '+{7}(000)000-00-00'
  });

  // drugstors select
  const drugstoreList = [
    { value: 'аптека 1', label: 'АптекаАптекаАптекаАптекаАптекаАптекаАптекаАптекаАптекаАптека 1' },
    { value: 'аптека 2', label: 'Аптека 2' },
    { value: 'аптека 3', label: 'Аптека 3' },
    { value: 'аптека 4', label: 'Аптека 4' },
    { value: 'аптека 5', label: 'Аптека 5' },
    { value: 'аптека 6', label: 'Аптека 6' },
  ];
  const drugstoreSelect = fieldSelect({
    className: '.js-pharmacist-drugstore',
    selectList: drugstoreList
  })

// position select
  const positionList = [
    { value: 'должность 1', label: 'Должность 1' },
    { value: 'должность 2', label: 'Должность 2' },
    { value: 'должность 3', label: 'Должность 3' },
    { value: 'должность 4', label: 'Должность 4' },
    { value: 'должность 5', label: 'Должность 5' },
    { value: 'должность 6', label: 'Должность 6' },
  ];
  const positionSelect = fieldSelect({
    className: '.js-pharmacist-position',
    selectList: positionList
  })

// form submit
  const form = document.querySelector('.js-add-pharmacist');
  if (form) {
    const constraints = {
      ['pharmacist-drugstore']: {
        presence: {
          message: "^Обязательное поле"
        }
      },
      ['pharmacist-email']: {
        presence: {
          message: "^Обязательное поле"
        },
        email: {
          message: "^Неверный формат"
        }
      },
      ['pharmacist-tel']: {
        presence: {
          message: "^Обязательное поле"
        },
        format: {
          pattern: /\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}/,
          message: "^Введите номер в формате: +7(000)000-00-00"
        },
      },
      ['pharmacist-second-name']: {
        presence: {
          message: "^Обязательное поле"
        }
      },
      ['pharmacist-name']: {
        presence: {
          message: "^Обязательное поле"
        }
      },
      ['pharmacist-experience']: {
        presence: {
          message: "^Обязательное поле"
        }
      },
      ['pharmacist-position']: {
        presence: {
          message: "^Обязательное поле"
        }
      },
    };

    const successCallback = () => {
      const submitBtn = form.querySelector('[type="submit"]');
      const url = 'url';
      const data = {
        'pharmacist-drugstore': null,
        'pharmacist-email': null,
        'pharmacist-tel': null,
        'pharmacist-second-name': null,
        'pharmacist-name': null,
        'pharmacist-experience': null,
        'pharmacist-position': null,
        'pharmacist-send-email': false
      };
      (new FormData(form)).forEach((value, key) => {
        if (key === 'pharmacist-send-email') {
          data[key] = true;
          return;
        }
        data[key] = value;
      });

      submitBtn.disabled = true;
      console.log(data);

      fetch((url), {
        method: 'POST',
        body: JSON.stringify(data),
      })
      .then((response) => {
        submitBtn.disabled = false;
        return response.json()
      })
      .then(() => {
        form.reset();
        resetSelectBlock(drugstoreSelect);
        resetSelectBlock(positionSelect);
      })
      .catch((err) => {
        console.error(err);
      });
    };

    form.addEventListener('change', () => {
      handleFormChange({ form, constraints });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit({ form, constraints, successCallback });
    });
  }
}