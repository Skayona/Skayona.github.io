{
  //Accordion init
  const accordionContainer = document.querySelector('.js-lecture-accordion');
  if (accordionContainer) {
    const options = {
      item: '.item',
      target: '.target',
      control: '.target',
      panel: '.panel',
      allowMultiple: false,
      attribute: 'data-status',
      expanded: 'expanded',
      contracted: 'contracted',
      prefix: 'lecture-accordion-',
      transition: 'height .3s',
      setFocus: 'control',
      hashEnabled: false
    };
    new Accordion(accordionContainer, options);
  }
}

{
  // input mask for number
  const numberField = document.querySelector('#lecture-rewards');
  numberField && IMask(numberField, {
      mask: Number,
      min: 1,
      scale: 0
  });
}

{
  //lecture date select
  const onChangeCallback = (selectedDates, dateStr, instance) => {
    const dateFielad = document.querySelector('#lecture-date');
    dateFielad.value ? dateFielad.classList.add('has-value') : dateFielad.classList.remove('has-value');
  }

  calendarInit({
    calendarSelector: '.js-lecture-date',
    mode: 'single',
    wrap: true,
    altInput: true,
    altFormat: "d/m/Y",
    onChangeCallback
  })
}

{
  // lecture start time
  const selectList = [
    { value: '13', label: '13:00' },
    { value: '14', label: '14:00' },
    { value: '18', label: '18:00' },
    { value: '20', label: '20:00' },
  ]

  fieldSelect({
    className: '.js-lecture-start-time',
    selectList
  })
}

{
  // lecture duration
  const selectList = [
    { value: 5, label: '5 минут' },
    { value: 10, label: '10 минут' },
    { value: 15, label: '15 минут' },
    { value: 20, label: '20 минут' },
    { value: 25, label: '25 минут' },
    { value: 30, label: '30 минут' },
    { value: 60, label: '1 час' },
    { value: 90, label: '1 час 30 минут' },
    { value: 120, label: '2 часа' },
  ]
  fieldSelect({
    className: '.js-lecture-duration',
    selectList
  })
}

{
  // lecture listeners
  const selectList = [
    { value: 'слушатель 1', label: 'Слушатель 1' },
    { value: 'слушатель 2', label: 'Слушатель Cлушавич' },
    { value: 'слушатель 3', label: 'Слушатель Сдлиннойфамилией-черездефис' },
    { value: 'слушатель 4', label: 'Сдлиннымименемляляляля Сдлиннойфамилией' },
    { value: 'слушатель 6', label: 'Слушатель 6' },
  ]

  const onSelectCallback = () => {
    const listenersField = document.querySelector('#lecture-listeners');
    listenersField.selectedOptions.length ? listenersField.classList.add('has-value') : listenersField.classList.remove('has-value');
  }

  fieldSelect({
    className: '.js-lecture-listeners',
    selectList,
    removeItemButton: true,
    noChoicesText: 'Все слушатели добавлены',
    noResultsText: 'Нет совпадений',
    onSelectCallback
  })
}

{
  // lectures form submiting
  const form = document.querySelector('.js-lecture-editing');
  if (form) {
    const formData = {
      ['lecture-brochures']: [],
      ['lecture-presentation']: ''
    };

    validate.validators.filesSize = (value, options) => {
      const totalSize = value.reduce((res, val) => val.size + res, 0) / 1000000;
      return totalSize > options.maxSize ? options.message : null;
    };

    const constraints = {
      ['lecture-name']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-description']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-date']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-start-time']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-duration']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-listeners']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-rewards']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },

      // file upload validation
      ['lecture-presentation']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-brochures']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        },
        filesSize: {
          maxSize: 10,
          message: '^Общий размер файлов не должен превышать 10мб'
        }
      },

      // lecture questions block
      ['lecture-q1']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-q1-a1']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-q1-a2']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-q1-a3']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      },
      ['lecture-q1-a4']: {
        presence: {
          message: "^Обязательное поле",
          allowEmpty: false
        }
      }
    };

    // file upload handlers,
    // drug and drop
    {
      const selectedFilesHandler = (files, fileWrap) => {
        const nodeEl = fileWrap.querySelector('.js-selected-file-list');
        const inputEl = fileWrap.querySelector('input[type="file"]');
        const isMultiple = inputEl?.multiple;
        const acceptFileFormats = inputEl?.accept.split(', ');
        const inputFiles = [...files].filter((file) => acceptFileFormats.includes(file.type));
        let selectedFiles;

        if (!isMultiple && inputFiles.length) {
          selectedFiles = [inputFiles[0]];
        }

        if (isMultiple) {
          selectedFiles = [...formData[inputEl.name], ...inputFiles];
        }

        const renderSelectedItems = () => {
          if (selectedFiles?.length) {
            nodeEl.innerText = 'Выбранные файлы:';
            selectedFiles.forEach(({ name, size }, i) => {
              const fileInfo = document.createElement('div');
              fileInfo.innerText = `- ${ name } (${ Math.round(size/10000)/100 }Мб)`
              const removeButton = document.createElement('button');
              removeButton.type = 'button';
              removeButton.className = 'icon icon-cross';
              removeButton.setAttribute('aria-label', 'Удалить выбранный файл');
              removeButton.addEventListener('click', () => {
                selectedFiles.splice(i, 1);
                formData[inputEl.name] = isMultiple ? selectedFiles : (selectedFiles && selectedFiles[0] || '');
                renderSelectedItems();
                udateFormData();
                handleFormChange({ formData, form, constraints });
              });
              fileInfo.appendChild(removeButton);
              nodeEl.appendChild(fileInfo);
            })
          } else {
            nodeEl.innerText = '';
          }
        }
        renderSelectedItems();
        formData[inputEl.name] = isMultiple ? selectedFiles : (selectedFiles && selectedFiles[0] || '');
        udateFormData();
        handleFormChange({ formData, form, constraints });
      }

      const fileUploadHandler = (uploadHandler) => {
        uploadHandler && uploadHandler.addEventListener('change', ({ target }) => {
          selectedFilesHandler(target.files, target.parentElement);
        })
      }

      const dropAreaHandler = (dropArea, callback) => {
        const highlight = () => {
          dropArea.classList.add('highlight');
        };
        const unhighlight = () => {
          dropArea.classList.remove('highlight');
        };

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
          dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
          }, false)
        });

        ['dragenter', 'dragover'].forEach((eventName) => {
          dropArea.addEventListener(eventName, highlight, false)
        });

        ['dragleave', 'drop'].forEach((eventName) => {
          dropArea.addEventListener(eventName, unhighlight, false)
        });

        dropArea.addEventListener('drop', (e) => {
          const dt = e.dataTransfer;
          const files = dt.files;
          callback(files, dropArea);
        }, false);
      }

      const selectedBrochures = document.querySelector('#lecture-brochures');
      const selectedPresentation = document.querySelector('#lecture-presentation');

      fileUploadHandler(selectedBrochures);
      fileUploadHandler(selectedPresentation);

      const dropAreaList = document.querySelectorAll('.js-drop-area');

      dropAreaList.forEach((dropArea) => dropAreaHandler(dropArea, selectedFilesHandler));
    }

    // add question handler
    {
      let questionNumber = 2;
      const questionHandler = document.querySelector('.js-add-question-handler');

      const createNewQuestion = () => {
        const questionsList = document.querySelector('.js-lecture-question-block');
        const questionBlock = document.createElement('div');
        const questionId = `lecture-q${ questionNumber }`;
        questionBlock.className = 'lecture-test__question bounce-new-question';

        for (let i = 0; i < 5; i++) {
          const id = i === 0 ? questionId : `${questionId}-a${ i }`;
          const placehoolderText = i === 0  ? `Вопрос ${questionNumber }`:
                                  i === 1 ? 'Правильный ответ ' : 'Вариант ответа';
          const questionGroup = document.createElement('div');
          questionGroup.className = 'lecture-test__question-group';
          const questionControl = document.createElement('div');
          questionControl.className = 'form-control-textarea form-control form-control-bordered';
          const questionLabelWrapper = document.createElement('label');
          questionLabelWrapper.id = id;
          const questionField = document.createElement('textarea');
          questionField.id = id;
          questionField.name = id;
          questionField.placeholder = placehoolderText;
          questionField.required = true;
          const questionLabel = document.createElement('span');
          questionLabel.className = 'label';
          questionLabel.innerText = placehoolderText;
          if (i === 1) {
            const questionAnswerCorrect = document.createElement('i');
            questionAnswerCorrect.className = 'icon icon-check';
            questionAnswerCorrect.setAttribute('aria-hidden', true);
            questionLabel.appendChild(questionAnswerCorrect);
          }
          const errorField = document.createElement('p');
          errorField.className = 'form-error';

          questionLabelWrapper.appendChild(questionField);
          questionLabelWrapper.appendChild(questionLabel);

          questionControl.appendChild(questionLabelWrapper);
          questionControl.appendChild(errorField);

          questionGroup.appendChild(questionControl);
          questionBlock.appendChild(questionGroup);

          constraints[id] = {
            presence: {
              message: "^Обязательное поле",
              allowEmpty: false
            }
          };
        }

        // delete question handler
        const formGroup = document.createElement('div');
        formGroup.className = 'lecture-test__question-group';
        const deleteQuestionBtn = document.createElement('button');
        deleteQuestionBtn.type = 'button';
        deleteQuestionBtn.className = 'btn btn-sm btn-secondary';
        deleteQuestionBtn.innerText = 'Удалить вопрос';
        formGroup.appendChild(deleteQuestionBtn);
        questionBlock.appendChild(formGroup);
        questionsList.appendChild(questionBlock);
        deleteQuestionBtn.addEventListener('click', () => {
          questionBlock.remove();
          for (let i = 0; i < 5; i++) {
            const id = i === 0 ? questionId : `${questionId}-a${ i }`;
            delete constraints[id];
            delete formData[id];
          }
        });
        questionNumber++;
      }

      questionHandler?.addEventListener('click', createNewQuestion);
    }

    const udateFormData = () => {
      (new FormData(form)).forEach((val, key) => {
        if (key === 'lecture-listeners') {
          const selectedListeners = [...document.querySelector('#lecture-listeners').selectedOptions];
          formData[key] = selectedListeners.map(({ value }) => value);
          return;
        }
        if (key === 'lecture-brochures' || key === 'lecture-presentation') {
          return;
        }
        formData[key] = val;
      });
    }

    const successCallback = () => {
      const submitBtn = form.querySelector('[type="submit"]');
      const url = 'url';

      udateFormData();

      submitBtn.disabled = true;

      console.log(formData);

      fetch((url), {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      .then((response) => {
        submitBtn.disabled = false;
        return response.json()
      })
      .then(() => {
        form.reset();
      })
      .catch((err) => {
        console.error(err);
      });
    };

    form.addEventListener('change', () => {
      udateFormData();
      handleFormChange({ formData, form, constraints });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      udateFormData();
      handleFormSubmit({ formData, form, constraints, successCallback });
    });
  }
}