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
      autoplay: true,
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
        loop: false,
        autoplay: false,
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
{
  window.onload = function() {
    const grid = document.querySelector('.js-portfolio');
    if (grid) {
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
  }
}
{
  const goBackLink = document.querySelector('.js-privacy-back');
  const referrer = document.referrer;
  if (goBackLink && referrer) {
    goBackLink.href = referrer;
  }
}