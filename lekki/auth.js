// REGISTER FORM
{
  // custom select init
  const selectList = [
    { value: 'должность 1', label: 'Должность 1' },
    { value: 'должность 2', label: 'Должность 2' },
    { value: 'должность 3', label: 'Должность 3' },
    { value: 'должность 4', label: 'Должность 4' },
    { value: 'должность 5', label: 'Должность 5' },
    { value: 'должность 6', label: 'Должность 6' },
  ]
  const positionSelect = fieldSelect({
    className: '.js-register-position',
    selectList,
  })

// form submit
  const form = document.querySelector('.js-register-form');
  if (form) {
    const formModal = form.closest('[data-modal]');
    const constraints = {
      ['register-email']: {
        presence: {
          message: "^Обязательное поле"
        },
        email: {
          message: "^Неверный формат"
        }
      },
      ['register-position']: {
        presence: {
          message: "^Обязательное поле"
        }
      }
    };

    const successCallback = () => {
      const submitBtn = form.querySelector('[type="submit"]');
      const successMsg = form.querySelector('.js-form-success');
      const url = 'url';
      const data = { };
      (new FormData(form)).forEach((value, key) => (data[key] = value));

      submitBtn.disabled = true;
      console.log(data);

      fetch((url), {
        method: 'POST',
        body: JSON.stringify(data),
      })
      .then((response) => {
        submitBtn.disabled = false;
        return response.json();
      })
      .then(() => {
        successMsg.classList.add('is-visible');
        setTimeout(() => {
          successMsg.classList.remove('is-visible');
        }, 5000);
        form.reset();
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

    formModal.addEventListener('onCloseModal', () => {
      handleFormResset({ form });
      positionSelect.destroy();
      positionSelect.init();
    });
  }
}
// LOGIN FORM
{
  const form = document.querySelector('.js-login-form');
  if (form) {
    const formModal = form.closest('[data-modal]');
    const constraints = {
      ['login-email']: {
        presence: {
          message: "^Обязательное поле"
        },
        email: {
          message: "^Неверный формат"
        }
      },
      ['login-pass']: {
        presence: {
          message: "^Обязательное поле"
        }
      }
    };

    const successCallback = () => {
      const submitBtn = form.querySelector('[type="submit"]');
      const url = 'API_URL';
      const data = { };
      (new FormData(form)).forEach((value, key) => (data[key] = value));

      submitBtn.disabled = true;

      console.log(data);

      fetch((url), {
        method: 'POST',
        body: JSON.stringify(data),
      })
      .then((response) => {
        submitBtn.disabled = false;
        return response.json();
      })
      .then(() => {
        form.reset();
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

    formModal.addEventListener('onCloseModal', () => handleFormResset({ form }));
  }
}