{
  window.addEventListener('load', () => {

    const links = [...document.querySelectorAll('link[rel="preload"]')];

    if (!links.length) return;

    links.forEach(function (link) {
      const media = link.media;
      const asAttr = link.as || [...link.attributes].find((attr) => attr.name === 'as').value;
      let ext = null;

      if (asAttr === 'style') {
        ext = 'stylesheet';
      }

      if (!ext) return;

      if (window.matchMedia(media).matches) {
        link.rel = ext;
        return;
      }

      const resizeListener = () => {
        if (window.matchMedia(media).matches) {
          link.rel = ext;
          window.removeEventListener('resize', resizeListener)
        }
      }

      window.addEventListener('resize', resizeListener)
    });
  });
}
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
// add this value for attr "data-modal-for"  in a button, that triggers modal opening, EXAMPLE: <button data-modal-for="my-modal"></button>
// button with attr "data-modal-close" - will close modal. EXAMPLE: <button data-modal-close></button>

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
    this.closeButtons = [...document.querySelectorAll('[data-modal-close]')];
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
        this.close(button.closest(this.modalSelector));
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

    const openModalEvent = new CustomEvent('onOpenModal');
    modal.dispatchEvent(openModalEvent);

    if (currentOpenModal) {
      this.close(currentOpenModal);
      return;
    }

    this.inFocus = document.activeElement;
    this.overlay.classList.remove(this.classHidden);
    this.body.classList.add(this.overflowClass);

    this.onKeyUpWindowHandler = (e) => {
      if (e.key !== 'Escape' || e.keyCode !== 27) return;
      const mdl = this.modals.find((m) => !m.classList.contains(this.classHidden));
      if (!mdl) return;
      this.close(mdl);
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

// init modals
const modals = new Modals();
modals.init();
{
  const openMenuHandler = document.querySelector('.js-mob-menu-handler');
  const menu = document.querySelector('.js-mob-menu');
  const header = menu?.closest('header');
  const openContactsHandlerList = document.querySelectorAll('[data-modal-for="modal-contacts"]');

  openMenuHandler?.addEventListener('click', () => {
    const headerHeight = header?.offsetHeight;
    menu.style.top = `${ headerHeight }px`;
    openMenuHandler.classList.toggle('is-active');
    menu.classList.toggle('is-active');
    document.body.classList.toggle('overflow-hidden');
  });

  openContactsHandlerList.forEach((btn) => {
    btn.addEventListener('click', () => {
      openMenuHandler.classList.remove('is-active');
      menu.classList.remove('is-active');
      document.body.classList.remove('overflow-hidden');
    });
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches && openMenuHandler?.classList.contains('is-active')) {
      openMenuHandler.classList.remove('is-active');
      menu.classList.remove('is-active');
      document.body.classList.remove('overflow-hidden');
    }
  })
}
{
  const currYearNode = document.querySelector('.js-curr-year');
  const currYear = (new Date()).getFullYear();
  currYearNode.innerText = currYear;
}
{
  const container = document.querySelector('.js-adv-slider');
  if (container)
    tns({
      container,
      mouseDrag: true,
      loop: true,
      autoplay: false,
      autoplayButtonOutput: false,
      speed: 300,
      controls: false,
      lazyload: true,
      items: 1,
      navPosition: 'bottom',
      responsive: {
        768: {
          disable: true
        }
      }
    }
  )
}
{
  // form submit
  const formContactsList = document.querySelectorAll('.js-contact-form');

  function formSubmitHandler(form) {
    // const formModal = form.closest('[data-modal]');

    // add phone mask
    const telField = form.querySelector('[name="phone"]');
    telField && IMask(telField, {
      mask: '+{7}(000)000-00-00'
    });
    const constraints = {
      ['name']: {
        presence: {
          message: "^Обязательное поле"
        }
      },
      ['phone']: {
        presence: {
          message: "^Обязательное поле"
        },
        format: {
          pattern: /\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}/,
          message: "^Введите номер в формате: +7(000)000-00-00"
        },
      }
    };

    const formRequestSuccess = () => {
      handleFormResset({ form });
      modals.open('success-request-modal');
    }

    const validationSuccessCallback = () => {
      const submitBtn = form.querySelector('[type="submit"]');
      const url = 'API_URL';
      const data = { };
      (new FormData(form)).forEach((value, key) => (data[key] = value));

      submitBtn.disabled = true;

      fetch((url), {
        method: 'POST',
        body: JSON.stringify(data),
      })
      .then((response) => {
        submitBtn.disabled = false;
        return response.json();
      })
      .then(() => {
        formRequestSuccess();
      })
      .catch((err) => {
        // just example of form succeed - remove this part of block start
        formRequestSuccess();
        console.log(data);
        // just example of form succeed - remove this part of block end
        console.error(err);
      });
    };


    form.addEventListener('change', () => {
      handleFormChange({ form, constraints });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit({ form, constraints, successCallback: validationSuccessCallback });
    });

    // formModal?.addEventListener('onCloseModal', () => handleFormResset({ form }));
  }

  formContactsList.forEach(formSubmitHandler);
}
{
  const container = document.querySelector('.js-price-slider');
  if (container)
    tns({
      container,
      mouseDrag: true,
      loop: false,
      autoplay: false,
      autoplayButtonOutput: false,
      speed: 300,
      controls: false,
      lazyload: true,
      items: 1,
      fixedWidth: false,
      gutter: 0,
      navPosition: 'bottom',
      responsive: {
        768: {
          items: 2
        },
        1366: {
          items: 3
        },
        1920: {
          items: 4
        }
      }
    }
  )
}
{
  const instaFeedContainer = document.querySelector('.js-insta-feed');
  if (instaFeedContainer) {
    const template = ({ username, logo, image, link, caption, likesCount, commentsCount }) => {
      const instaPostContainer = document.createElement('div');
      instaPostContainer.className = 'insta-feed__item';

      const instaPost = document.createElement('a');
      instaPost.href = `https://www.instagram.com/p/${ link }`;
      instaPost.target = '_blank';
      instaPost.rel = 'noopener noreferrer';
      instaPost.className = 'insta-post';

      const instaPostHeader = document.createElement('div');
      instaPostHeader.className = 'insta-post__header';

        const instaPostLogoContainer = document.createElement('div');
        instaPostLogoContainer.className = 'insta-post__logo';
        const instaPostLogo = document.createElement('img');
        instaPostLogo.src = logo;
        instaPostLogo.alt = username;
        instaPostLogo.width = 32;
        instaPostLogoContainer.appendChild(instaPostLogo);
        const instaPostUserName = document.createElement('div');
        instaPostUserName.className = 'insta-post__username';
        instaPostUserName.innerText = username;
        const instaPostInstaLogo = document.createElement('i');
        instaPostInstaLogo.className = 'icon icon-insta';
        instaPostHeader.appendChild(instaPostLogoContainer);
        instaPostHeader.appendChild(instaPostUserName);
        instaPostHeader.appendChild(instaPostInstaLogo);

      const instaPostImageContainer = document.createElement('div');
      instaPostImageContainer.className = 'insta-post__image';
        const instaPostImage = document.createElement('img');
        instaPostImage.src = image;
        instaPostImage.alt = caption;
        instaPostImage.width = 200;
        instaPostImageContainer.appendChild(instaPostImage);

      const instaPostActions = document.createElement('div');
      instaPostActions.className = 'insta-post__actions';
        const instaPostLikeContainer = document.createElement('span');
        instaPostLikeContainer.innerText = likesCount;
        const instaPostLikeIcon = document.createElement('i');
        instaPostLikeIcon.className = 'icon icon-insta-like';
        instaPostLikeContainer.prepend(instaPostLikeIcon);
        const instaPostCommentContainer = document.createElement('span');
        instaPostCommentContainer.innerText = commentsCount;
        const instaPostCommentIcon = document.createElement('i');
        instaPostCommentIcon.className = 'icon icon-insta-comment';
        instaPostCommentContainer.prepend(instaPostCommentIcon);
        instaPostActions.appendChild(instaPostLikeContainer);
        instaPostActions.appendChild(instaPostCommentContainer);

      const instaPostCaption = document.createElement('div');
      instaPostCaption.className = 'insta-post__caption';
        const instaPostCaptionText = document.createElement('span');
        instaPostCaptionText.innerText = caption;
        instaPostCaption.appendChild(instaPostCaptionText);

      instaPost.appendChild(instaPostHeader);
      instaPost.appendChild(instaPostImageContainer);
      instaPost.appendChild(instaPostActions);
      instaPost.appendChild(instaPostCaption);

      instaPostContainer.appendChild(instaPost);
      return instaPostContainer;
    }

    const instaFeedCallback = (data) => {
      const source = data.edge_hashtag_to_media || data.edge_owner_to_timeline_media;

      source.edges.forEach(({ node }, i) => {
        const username = data.username || data.name;
        const logo = data.profile_pic_url;
        const image = node.thumbnail_src;
        const link = node.shortcode;
        const caption = node.edge_media_to_caption.edges[0]?.node?.text || '';
        const likesCount = node.edge_media_preview_like?.count || 0;
        const commentsCount = node.edge_media_to_comment?.count || 0;
        if (i < 12) {
          const instaPost = template({ username, logo, image, link, caption, likesCount, commentsCount });
          instaFeedContainer.appendChild(instaPost);
        }
      })

      tns({
        container: instaFeedContainer,
        nextButton: '.js-insta-feed-next',
        prevButton: '.js-insta-feed-prev',
        mouseDrag: true,
        loop: true,
        autoplay: true,
        autoplayButtonOutput: false,
        speed: 300,
        nav: false,
        lazyload: true,
        items: 1,
        gutter: 0,
        navPosition: 'bottom',
        responsive: {
          768: {
            items: 2
          },
          1366: {
            items: 4,
          }
        }
      });

      instaFeedContainer.closest('.insta-feed-wrap').classList.remove('is-hidden');
    }

    new InstagramFeed({
      'username': 'kiro_mar_todi',
      // 'tag': 'cat',
      'display_profile': false,
      'display_biography': false,
      'display_gallery': false,
      'callback': (data) => instaFeedCallback(data),
      'lazy_load': true,
      'on_error': console.error
    });
  }
}
{
  const modal = document.querySelector('[data-modal="modal-contacts"]');
  const header = document.querySelector('header');
  const openModalList = document.querySelectorAll('[data-modal-for="modal-contacts"]');

  modal.addEventListener('onOpenModal', (event) => {
    // const headerHeight = window.matchMedia('(min-width: 768px)').matches ? header.offsetHeight + 60 : header.offsetHeight;
    const headerHeight =header.offsetHeight;
    modal.style = `top: ${ headerHeight }px; max-height: calc(100% - ${ headerHeight }px);`;
    header.style = `position: sticky; z-index: 10000;`;
    openModalList.forEach((btn) => btn.classList.add('is-active'));
  });

  modal.addEventListener('onCloseModal', (event) => {
    setTimeout(() => {
      modal.style = '';
      header.style = '';
    }, 350);
    openModalList.forEach((btn) => btn.classList.remove('is-active'));
  });
}
function initMasonryGridLayout() {
  const grid = document.querySelector('.js-portfolio');
  if (!grid) return
  const changeWorksHandlers = [...document.querySelectorAll('.js-works-toggle')];
  const addWorksHandler = document.querySelector('.js-portfolio-add');

  let masonryGrid = new Masonry(grid, {
    itemSelector: '.portfolio__works-item',
  });

  //change tab handler
  changeWorksHandlers.forEach((handler) => {
    handler.addEventListener('click', () => {
      const activeHandler = changeWorksHandlers.find((el) => el.classList.contains('is-active'));
      activeHandler.classList.remove('is-active');
      handler.classList.add('is-active');

      const elements = masonryGrid.getItemElements();
      masonryGrid.remove(elements);

      const newElements = [];
      const fragment = document.createDocumentFragment();

      // JUST EXAMPLE. REMOVE THIS CODE start
      for (let index = 0; index < 4; index++) {
        const work = document.createElement('div');
        work.className = 'portfolio__works-item';
        work.innerHTML = '<a class="portfolio-item" href="project"><div class="portfolio-item__img"><img src="context.png" alt="Контекст" width="130"></div><h6 class="h6 portfolio-item__title">Контекст</h6><div class="portfolio-item__descr">NEEEm lrb lr bltgtr</div></a>';
        fragment.appendChild(work);
        newElements.push(work);
      }
      // JUST EXAMPLE. REMOVE THIS CODE end

      grid.appendChild(fragment);
      masonryGrid.appended(newElements);
      masonryGrid.layout();
    });
  });

  // add new elements
  addWorksHandler.addEventListener('click', () => {
    const newElements = [];
    const fragment = document.createDocumentFragment();

    // JUST EXAMPLE. REMOVE THIS CODE start
    for (let index = 0; index < 4; index++) {
      const work = document.createElement('div');
      work.className = 'portfolio__works-item';
      work.innerHTML = '<a class="portfolio-item" href="project"><div class="portfolio-item__img"><img src="context.png" alt="Контекст" width="130"></div><h6 class="h6 portfolio-item__title">Контекст</h6><div class="portfolio-item__descr">NEEEm lrb lr bltgtr</div></a>';
      fragment.appendChild(work);
      newElements.push(work);
    }
    // JUST EXAMPLE. REMOVE THIS CODE end

    grid.appendChild(fragment);
    masonryGrid.appended(newElements);
  });
}
{
  const goBackLink = document.querySelector('.js-privacy-back');
  const referrer = document.referrer;
  if (goBackLink && referrer) {
    goBackLink.href = referrer;
  }
}
{
  const container = document.querySelector('.js-project-slider');
  if (container) {
    tns({
      container,
      nextButton: '.js-project-slider-next',
      prevButton: '.js-project-slider-prev',
      mouseDrag: true,
      loop: true,
      autoplay: true,
      autoplayButtonOutput: false,
      speed: 300,
      nav: false,
      lazyload: true,
      items: 1,
      gutter: 10,
      fixedWidth: 300,
      navPosition: 'bottom',
      responsive: {
        768: {
          fixedWidth: false,
          items: 2,
          gutter: 40,
        },
        1366: {
          fixedWidth: false,
          items: 4,
          // nav: true,
        },
        1920: {
          items: 5,
          gutter: 60
        }
      }
    });
  }
}
function initValuesSlider() {
  const container = document.querySelector('.js-values-slider');

  if (!container) return;

  const currSlideNode = document.querySelector('.js-values-curr-slide');
  const totalSlidesNode = document.querySelector('.js-values-total-slides');

  const slider = tns({
    container,
    nextButton: '.js-values-slider-next',
    prevButton: '.js-values-slider-prev',
    mode: 'gallery',
    mouseDrag: true,
    loop: true,
    autoplay: true,
    autoHeight: false,
    autoplayButtonOutput: false,
    speed: 300,
    nav: false,
    lazyload: true,
    items: 1,
    gutter: 0,
    navPosition: 'bottom',
  });

  const setSlideSize = () => {
    const sliderInfo = slider?.getInfo();
    const maxHeight = Math.max(...[...sliderInfo?.slideItems].map((e) => e.offsetHeight));
    container.style.height = `${maxHeight }px`;
  }

  slider.events.on('indexChanged', ({ displayIndex }) => {
    currSlideNode.innerText = displayIndex;
  });

  totalSlidesNode.innerText = slider.getInfo()?.slideCount;
  setSlideSize();

  window.addEventListener('resize', () => {
    setSlideSize();
  });
}


function initServiceAccordion() {
  //Accordion init
  const accordionContainer = document.querySelector('.js-service-accordion');
  const options = {
    item: '.item',
    target: '.target',
    control: '.target',
    panel: '.panel',
    allowMultiple: false,
    attribute: 'data-status',
    expanded: 'expanded',
    contracted: 'contracted',
    prefix: 'service-accordion-',
    transition: 'height .3s',
    setFocus: 'control',
    hashEnabled: false,
  };

  function HorizontalAccordion(accordion) {
    const items = [...accordion.querySelectorAll('.item')];

    const getPanelWidth = () => {
      const accordionPaddingLeft = window.getComputedStyle(accordion).paddingLeft.replace('px', '');
      const accordionPaddingRight = window.getComputedStyle(accordion).paddingRight.replace('px', '');
      const innerWidth = accordion.clientWidth - +accordionPaddingLeft - +accordionPaddingRight;
      const controlWidth = items.reduce((res, el) => (res + el.querySelector('.control').clientWidth), 0);
      return innerWidth - controlWidth;
    }

    const setPanelHeight = ({ propertyName }) => {
      if (propertyName === 'width') {
        const outerContainer = accordion.parentElement;
        outerContainer.style = '';
        const outerContainerPaddingTop = window.getComputedStyle(outerContainer).paddingTop.replace('px', '');
        const outerContainerPaddingBottom = window.getComputedStyle(outerContainer).paddingBottom.replace('px', '');
        const accordionHeight = accordion.scrollHeight;
        const totalHeight =  +outerContainerPaddingTop + +outerContainerPaddingBottom + accordionHeight;
        outerContainer.style = `height: ${ totalHeight }px`;
      }
    }

    const expandAction = (e) => {
      e.preventDefault();
      if (!this.enabled) return;
      const item = e.target.closest('.item');
      const panel = item.querySelector('.panel');
      const expandedTab = items.find((el) => el.getAttribute('data-status') === 'expanded');
      const expandedPanel = expandedTab.querySelector('.panel');
      const panelWidth = getPanelWidth();
      expandedTab.setAttribute('data-status', 'contracted');
      item.setAttribute('data-status', 'expanded');
      panel.style = `width: ${ panelWidth }px`;
      expandedPanel.style = '';
    }

    const setPanelWidth = () => {
      const expandedTab = items.find((el) => el.getAttribute('data-status') === 'expanded');
      const expandedPanel = expandedTab.querySelector('.panel');
      const panelWidth = getPanelWidth();
      expandedPanel.style = `width: ${ panelWidth }px`;
    }

    this.enabled = false;

    this.enable = () => {
      this.enabled = true;
      setPanelWidth();
      items.forEach((item) => {
        const target = item.querySelector('.target');
        target.addEventListener('click', expandAction);
      });
      window.addEventListener('resize', setPanelWidth);
      window.addEventListener('transitionend', setPanelHeight);
    }

    this.destroy = () => {
      this.enabled = false;
      const expandedTab = items.find((el) => el.getAttribute('data-status') === 'expanded');
      const expandedPanel = expandedTab.querySelector('.panel');
      expandedPanel.style = '';
      const outerContainer = accordion.parentElement;
      outerContainer.style = '';
      items.forEach((item) => {
        const target = item.querySelector('.target');
        target.removeEventListener('click', expandAction);
      });
      window.removeEventListener('resize', setPanelWidth);
      window.removeEventListener('transitionend', setPanelHeight);
    }

    this.enable();
  }

  let mobAccordion;
  const mobAccordionHandler = () => {
    if (window.matchMedia('(min-width: 1366px)').matches) {
      mobAccordion && mobAccordion._enabled && mobAccordion.destroy();
      return;
    }
    if (!mobAccordion) {
      mobAccordion = new Accordion(accordionContainer, options)
      return;
    }
    if (!mobAccordion._enabled) {
      mobAccordion.enable();
      mobAccordion.items.forEach((item) => {
        const isExpanded = item.el.getAttribute('data-status') === 'expanded';
        item.isExpanded = isExpanded;
      })
    }
  }

  let desktopAccordion;
  const desktopAccordionHandler = () => {
    if (!window.matchMedia('(min-width: 1366px)').matches) {
      desktopAccordion && desktopAccordion.enabled && desktopAccordion.destroy();
      return;
    }
    if (!desktopAccordion) {
      desktopAccordion = new HorizontalAccordion(accordionContainer);
      return;
    }
    if (!desktopAccordion.enabled) {
      desktopAccordion.enable();
    }
  }

  if (accordionContainer) {
    mobAccordionHandler();
    desktopAccordionHandler();
    window.addEventListener('resize', () => {
      mobAccordionHandler();
      desktopAccordionHandler();
    });
  }
}
{
  //Accordion init
  const accordionContainer = document.querySelector('.js-create-technology-accordion');
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
      prefix: 'create-tech-accordion-',
      transition: 'height .3s',
      setFocus: 'none',
      hashEnabled: false
    };
    new Accordion(accordionContainer, options);
  }
}
{
  //Accordion init
  const accordionContainer = document.querySelector('.js-support-steps-accordion');
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
      prefix: 'support-steps-accordion-',
      transition: 'height .3s',
      setFocus: 'none',
      hashEnabled: false
    };
    new Accordion(accordionContainer, options);
  }
}

{
  const scene = document.querySelector('#tags-desktop');
  if (scene) {
    const parallaxEl =  new Parallax(scene);

    function disablingParallax(parallax) {
      if (window.matchMedia('(min-width: 1366px)').matches) {
        parallax.enable();
        return;
      }
      parallax.disable();
    }

    disablingParallax(parallaxEl);

    window.addEventListener('resize', () => {
      disablingParallax(parallaxEl);
    });
  }
}
{
  const container = document.querySelector('[data-tabs]');
  if (container) {
    let scrumSlider = null;
    new Tabby('[data-tabs]', {
      default: '[data-tabby-default]'
    });

    document.addEventListener('tabby', ({ detail }) => {
      if (detail.tab.id === 'tabby-toggle_scrum' && !scrumSlider) {
        scrumSlider = initSrumSlider();
        return;
      }

      if (detail.tab.id === 'tabby-toggle_scrum' && scrumSlider) {
        scrumSlider.refresh();
        return;
      }
    }, false);
  }
}
function initSrumSlider() {
  const container = document.querySelector('.js-scrum-slider');
  if (!container) return;

  function changeWheelPos({ displayIndex, indexCached }) {
    const scrumWheel = document.querySelector('.js-scrum-wheel');
    const arrows = [...scrumWheel.querySelectorAll('.arrow-group')];
    const currArrow = arrows.find((el) => el.getAttribute('data-pos-arrow') == displayIndex);
    const prevArrow = arrows.find((el) => el.getAttribute('data-pos-arrow') == indexCached);
    const slideDelta = indexCached - displayIndex;
    const slidingDest =  slideDelta > 5 ? -2 : slideDelta < -5 ? 2: slideDelta;
    const deg = 45;
    const prevDeg = /rotate\((.+)deg\)/.exec(scrumWheel.getAttribute('style'))?.[1];
    const rotateDeg = (slidingDest * deg) + +prevDeg;
    const sliderContainer = document.querySelector('.js-scrum-slider-outer');
    const containerStyle = slidingDest > 0 ? 'back' : 'forward';
    sliderContainer.classList.add('loading', containerStyle);
    currArrow.classList.add('is-active');
    prevArrow.classList.remove('is-active');
    scrumWheel.style = `transform: translate(-51%, 65%) rotate(${ rotateDeg }deg)`;
    setTimeout(() => {
      sliderContainer.classList.remove('loading', containerStyle);
    }, 1000);
  }

  function initWheelPosition() {
    let desktopPosIsActive = window.matchMedia('(min-width: 768px)').matches;
    const scrumWheel = document.querySelector('.js-scrum-wheel');
    const mobPos = 'transform: translate(-51%, 65%) rotate(-55deg)';
    const desktopPos = 'transform: translate(-51%, 65%) rotate(-9deg)';
    scrumWheel.style = window.matchMedia('(min-width: 768px)').matches ? desktopPos : mobPos;

    const changeOnResize = () => {
      const currentDeg = /rotate\((.+)deg\)/.exec(scrumWheel.getAttribute('style'))?.[1];
      const resizeDeg = window.matchMedia('(min-width: 768px)').matches ? +currentDeg + 46 : +currentDeg - 46;
      scrumWheel.style = `transform: translate(-51%, 65%) rotate(${ resizeDeg }deg)`;
    }

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 768px)').matches && !desktopPosIsActive) {
        changeOnResize();
        desktopPosIsActive = true;
      }

      if (!window.matchMedia('(min-width: 768px)').matches && desktopPosIsActive) {
        changeOnResize();
        desktopPosIsActive = false;
      }
    })
  }


  const slider = tns({
    container,
    nextButton: '.js-scrum-slider-next',
    prevButton: '.js-scrum-slider-prev',
    axis: 'vertical',
    mouseDrag: false,
    touch: false,
    loop: true,
    autoplay: false,
    autoplayButtonOutput: false,
    speed: 300,
    nav: true,
    lazyload: true,
  });

  initWheelPosition();
  slider.events.on('transitionStart', changeWheelPos);
  return slider;
}
{
  //Accordion init
  const accordionContainer = document.querySelector('.js-waterfall-accordion');
  const options = {
    item: '.item',
    target: '.target',
    control: '.target',
    panel: '.panel',
    allowMultiple: false,
    attribute: 'data-status',
    expanded: 'expanded',
    contracted: 'contracted',
    prefix: 'waterfall-accordion-',
    transition: 'height .3s',
    setFocus: 'none',
    hashEnabled: false
  };

  function DesktopCellAccordion(accordion) {
    const items = [...accordion.querySelectorAll('.item')];
    
    const expandAction = (e) => {
      e.preventDefault();
      if (!this.enabled) return;
      const item = e.target.closest('.item');
      const expandedTab = items.find((el) => el.getAttribute('data-status') === 'expanded');
      expandedTab.setAttribute('data-status', 'contracted');
      item.setAttribute('data-status', 'expanded');
    }

    this.enabled = false;

    this.enable = () => {
      this.enabled = true;
      items.forEach((item) => {
        const target = item.querySelector('.target');
        target.addEventListener('click', expandAction);
      });
    }

    this.destroy = () => {
      this.enabled = false;
      items.forEach((item) => {
        const target = item.querySelector('.target');
        target.removeEventListener('click', expandAction);
      });
    }

    this.enable();
  }

  let mobAccordion;
  const mobAccordionHandler = () => {
    if (window.matchMedia('(min-width: 1366px)').matches) {
      mobAccordion && mobAccordion._enabled && mobAccordion.destroy();
      return;
    }

    if (!mobAccordion) {
      mobAccordion = new Accordion(accordionContainer, options)
      return;
    }

    if (!mobAccordion._enabled) {
      mobAccordion.enable();
      mobAccordion.items.forEach((item) => {
        const isExpanded = item.el.getAttribute('data-status') === 'expanded';
        item.isExpanded = isExpanded;
      })
    }
  }

  let desktopAccordion;
  const desktopAccordionHandler = () => {
    if (!window.matchMedia('(min-width: 1366px)').matches) {
      desktopAccordion && desktopAccordion.enabled && desktopAccordion.destroy();
      return;
    }
    if (!desktopAccordion) {
      desktopAccordion = new DesktopCellAccordion(accordionContainer);
      return;
    }
    if (!desktopAccordion.enabled) {
      desktopAccordion.enable();
    }
  }

  if (accordionContainer) {
    mobAccordionHandler();
    desktopAccordionHandler();
    window.addEventListener('resize', () => {
      mobAccordionHandler();
      desktopAccordionHandler();
    });
  }
}
window.onload = function () {
  initValuesSlider();
  setTimeout(() => {
    initMasonryGridLayout();
    initServiceAccordion();
  }, 500);
}