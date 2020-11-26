function handleFormSubmit({ formData = null, form, constraints, successCallback }) {
  const errors = validate((formData || form), constraints);
  form.classList.add('was-submitted');
  errorHandler(form, errors || {});
  focusOnErrorField(form);

  if (!errors) {
    successCallback && successCallback();
  }
}

function handleFormChange({ formData = null, form, constraints }) {
  if (!form.classList.contains('was-submitted')) return;
  const errors = validate((formData || form), constraints);
  errorHandler(form, errors || {});
}


function handleFormResset({ form }) {
  form.reset();
  form.classList.remove('was-submitted');
  errorHandler(form, {});
}

function errorHandler(form, errors) {
  [...form.querySelectorAll('input[name], select[name], textarea[name]')].forEach((input) => {
    const errorText = errors && errors[input.name];
    const formControl = input.closest('.form-control');
    const errorBlock = formControl && formControl.querySelector('.form-error');
    if (formControl) {
      errorText ? formControl.classList.add('invalid') : formControl.classList.remove('invalid');
    }
    if (errorBlock) {
      errorBlock.innerText = errorText || '';
    }
  });
}

function focusOnErrorField(form) {
  const firstInvalidField = [...form.querySelectorAll('input[name], select[name], textarea[name]')].find((input) => {
    const formControl = input.closest('.form-control');
    return formControl?.classList.contains('invalid')
  });
  firstInvalidField?.focus();
  const parentEl = firstInvalidField?.closest('.form-control');
  parentEl?.scrollIntoViewIfNeeded();
}

// USAGE
// add 1 wrapper for all modals before end of the tag </body>
// EXAMPLE:
// <div calss="modal-overlay hidden" data-modal-overlay> ... here goes list of modals </div>

// then add modal inside, using template modal.pug. add unic value for attr "data-modal" in modal, EXAMPLE: data-modal="my-modal"
// add this value for attr "data-modal-for" in a button, it triggers modal opening, EXAMPLE: <button data-modal-for="my-modal"></button>
// button with attr "data-close-modal" - will close modal. EXAMPLE: <button data-close-modal></button>

// if you need to open modal on some event, just call modals.open('modal-name')

class Modals {
  constructor() {
    this.modalSelector = '[data-modal]';
    this.overflowClass = 'modal-open';
    this.classHidden = 'hidden';
    this.overlayAttr = 'data-modal-overlay';
    this.modals = [...document.querySelectorAll(this.modalSelector)];
    this.overlay = document.querySelector(`[${this.overlayAttr}]`);
    this.openButtons = [...document.querySelectorAll('[data-modal-for]')];
    this.closeButtons = [...document.querySelectorAll('[data-close-modal]')];
    this.body = document.querySelector('body');
    this.inFocus = null;
    this.onKeyUpWindowHandler = null;
    this.overlayClickHandler = null;
  }

  openHandler() {
    this.openButtons.forEach((button) => {
      const forModal = button.dataset.modalFor;
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(forModal);
      })
    });
  }

  closeHandler() {
    this.closeButtons.forEach((button) => {

      button.addEventListener('click', () => {
        const currModal = button.closest(this.modalSelector);
        this.close(currModal);
      })
    });
  }

  close(modal = this.modals.find((m) => !m.classList.contains(this.classHidden))) {
    if (!modal) return;
    const closeModalEvent = new CustomEvent('onCloseModal');
    modal.dispatchEvent(closeModalEvent);
    focusManager.release();
    modal.classList.add(this.classHidden);
    modal.setAttribute('tabindex', 1);
    if (this.modals.find((m) => !m.classList.contains(this.classHidden))) return;
    this.inFocus.focus();
    this.body.classList.remove(this.overflowClass);
    this.overlay.classList.add(this.classHidden);
    document.removeEventListener('keyup', this.onKeyUpWindowHandler);
    this.overlay.removeEventListener('click', this.overlayClickHandler);
  }

  open(forModal, callback) {
    const modal = this.modals.find((m) => m.dataset.modal === forModal);
    if (!modal) return;

    const currentOpenModal = this.modals.find((m) => !m.classList.contains(this.classHidden));

    if (currentOpenModal === modal) {
      this.close(modal);
      return;
    }

    modal.classList.remove(this.classHidden);
    modal.setAttribute('tabindex', -1);
    setTimeout(() => {
      modal.focus();
      focusManager.capture(modal);
    }, 100);

    if (currentOpenModal) {
      this.close(currentOpenModal);
      return;
    }

    this.inFocus = document.activeElement;
    this.overlay.classList.remove(this.classHidden);
    this.body.classList.add(this.overflowClass);

    this.onKeyUpWindowHandler = (e) => {
      if (e.key !== 'Escape' || e.keyCode !== 27) return;
      const curModal = this.modals.find((m) => !m.classList.contains(this.classHidden));
      if (!curModal) return;
      this.close(curModal);
    };

    document.addEventListener('keyup', this.onKeyUpWindowHandler);

    this.overlayClickHandler = (e) => {
      if (!e.target.hasAttribute(this.overlayAttr)) return;
      this.close();
    };

    this.overlay.addEventListener('click', this.overlayClickHandler);

    if (callback) {
      callback(modal);
    }
  }

  init() {
    this.openHandler();
    this.closeHandler();
  }
}

const modals = new Modals();
modals.init();
function textInpuResize(selector) {
  const text = document.querySelector(selector);

  if (!text) return;

  const resize = () => {
    text.style.height = 'auto';
    text.style.height = text.scrollHeight + 'px';
  }
  const delayedResize = () => {
    window.setTimeout(resize, 0);
  }

  text.addEventListener('change', resize, false);
  text.addEventListener('cut', delayedResize, false);
  text.addEventListener('paste', delayedResize, false);
  text.addEventListener('drop', delayedResize, false);
  text.addEventListener('keydown', delayedResize, false);
  // text.focus();
  // text.select();
  resize();
}

function fieldSelect({ className, selectList, onSelectCallback, ...rest }) {
  const selectElement = document.querySelector(className);
  if (selectElement) {
    const choices = new Choices(selectElement, {
      searchEnabled: false,
      shouldSort: false,
      choices: selectList,
      resetScrollPosition: true,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices field-type-select'
      },
      ...rest
    });

    selectElement.addEventListener('showDropdown', () => {
      const dropdown = choices.choiceList.element;
      const selectedOption = dropdown.querySelector('.is-selected');
      selectedOption && selectedOption.scrollIntoViewIfNeeded()
    });

    onSelectCallback && selectElement.addEventListener('change', (e) => {
      onSelectCallback(e.detail.value);
    }, false);

    return choices;
  }
}
function calendarInit({ calendarSelector, onChangeCallback = null, mode = 'multiple', ...rest }) {
  flatpickr(calendarSelector, {
    mode,
    monthSelectorType: 'static',
    dateFormat: 'Y-m-d',
    minDate: 'today',
    locale: flatpickr.l10ns.ru,
    disableMobile: true,
    static: true,
    nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 9 20"><defs/><path d="M6.076,9.9424L0.3048,4.6343c-0.4065-0.3739-0.4065-0.98,0-1.3539c0.4065-0.3739,1.0655-0.3739,1.472,0l6.3834,5.8712	c0.1098,0.101,0.1899,0.2189,0.2404,0.3446c0.236,0.3672,0.1824,0.8481-0.1606,1.1636l-6.3834,5.8712	c-0.4065,0.3739-1.0655,0.3739-1.472,0c-0.4065-0.3739-0.4065-0.98,0-1.3539L6.076,9.9424z"/></svg>',
    prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 10 20"><defs/><path d="M3.467,9.8691l5.7712,5.3081c0.4065,0.3739,0.4065,0.98,0,1.3539c-0.4065,0.3739-1.0655,0.3739-1.472,0l-6.3834-5.8712	c-0.1098-0.101-0.1899-0.2189-0.2404-0.3446c-0.236-0.3672-0.1824-0.8481,0.1606-1.1636l6.3834-5.8712	c0.4065-0.3739,1.0655-0.3739,1.472,0c0.4065,0.3739,0.4065,0.98,0,1.3539L3.467,9.8691z"/></svg>',
    onOpen: (selectedDates, dateStr, instance) => {
      instance.currentYearElement.disabled = true;
    },
    onChange: onChangeCallback,
    ...rest
  })
}
function linkSelect({ className, selectList, onSelectCallback }) {
  const selectElement = document.querySelector(className);
  if (selectElement) {
    const choices = new Choices(selectElement, {
      searchEnabled: false,
      shouldSort: false,
      choices: selectList,
      resetScrollPosition: true,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices link-type-select'
      }
    });

    selectElement.addEventListener('showDropdown', () => {
      const dropdown = choices.choiceList.element;
      const selectedOption = dropdown.querySelector('.is-selected');
      selectedOption.scrollIntoViewIfNeeded()
    });
    onSelectCallback && selectElement.addEventListener('change', (e) => {
      onSelectCallback(e.detail.value);
    }, false);
  }
}
{
  const dropdownMenuOpenHandler = document.querySelector('.js-dropdown-menu-open');
  const dropdownMenuCloseHandler = document.querySelector('.js-dropdown-menu-close');

  const dropdownMenuMob = document.querySelector('.js-dropdown-menu-mob');
  const dropdownMenuMobVisible = 'nav-mob-visible';

  const dropdownMenuTablet = document.querySelector('.js-dropdown-menu-tablet');
  const dropdownMenuTabletVisible = 'nav-tablet-visible';

  const dropdownMenuDesktop = document.querySelector('.js-dropdown-menu-desktop');
  const dropdownMenuDesktopVisible = 'nav-desktop-visible';

  const closeMenuOnOutsideClick = (dropdown, visibleClass) => {
    dropdown && dropdown.addEventListener('click', (event) => {
      event.stopPropagation();
    })

    dropdown && document.addEventListener('click', () => {
      if(dropdown.classList.contains(visibleClass)) {
        dropdown.classList.remove(visibleClass);
      }
    })
  }

  dropdownMenuOpenHandler && dropdownMenuOpenHandler.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (window.matchMedia('(max-width: 767px)').matches) {
      dropdownMenuMob.classList.toggle(dropdownMenuMobVisible);
      document.body.classList.toggle('overflow-hidden');
    }

    if (window.matchMedia('(min-width: 768px) and (max-width: 1365px)').matches) {
      dropdownMenuTablet && dropdownMenuTablet.classList.toggle(dropdownMenuTabletVisible);
    }

    if (window.matchMedia('(min-width: 1366px)').matches) {
      dropdownMenuDesktop && dropdownMenuDesktop.classList.toggle(dropdownMenuDesktopVisible);
    }
  })

  const hideMobMenu = () => {
    dropdownMenuMob.classList.remove(dropdownMenuMobVisible);
    document.body.classList.remove('overflow-hidden');
  }

  dropdownMenuCloseHandler && dropdownMenuCloseHandler.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      hideMobMenu();
    }
  })

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches && dropdownMenuMob.classList.contains(dropdownMenuMobVisible)) {
      hideMobMenu();
    }

    if (
        (window.matchMedia('(min-width: 1366px)').matches || window.matchMedia('(max-width: 767px)').matches) &&
        dropdownMenuTablet &&
        dropdownMenuTablet.classList.contains(dropdownMenuTabletVisible)
      ) {
      dropdownMenuTablet.classList.remove(dropdownMenuTabletVisible);
    }

    if (
      window.matchMedia('(max-width: 1365px)').matches &&
      dropdownMenuDesktop &&
      dropdownMenuDesktop.classList.contains(dropdownMenuDesktopVisible)
    ) {
      dropdownMenuDesktop.classList.remove(dropdownMenuDesktopVisible);
    }
  });

  closeMenuOnOutsideClick(dropdownMenuTablet, dropdownMenuTabletVisible);
  closeMenuOnOutsideClick(dropdownMenuDesktop, dropdownMenuDesktopVisible);
}
{
  const createIframe = (id) => {
      const iframe = document.createElement('iframe');
      const url = `https://www.youtube.com/embed/${ id }?rel=0&showinfo=0&enablejsapi=1&autoplay=1`;

      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay');
      iframe.setAttribute('src', url);
      iframe.classList.add('youtube-video-media');

      return iframe;
  }

  const setupVideo = (video) => {
    const link = video.querySelector('.js-youtube-video-link');
    const button = video.querySelector('.js-yotube-play-btn');
    const id = video.dataset.youtubeid;
    video.addEventListener('click', () => {
        const iframe = createIframe(id);
        link.remove();
        button.remove();
        video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('enabled');
  }

  const findVideos = () => {
    const videos = document.querySelectorAll('.js-youtube-video');
    videos.forEach(setupVideo);
  }

  findVideos();
}