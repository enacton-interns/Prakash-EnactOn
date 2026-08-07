
document.addEventListener('DOMContentLoaded', () => {

  //   Active Nav Link Scroll Spy


  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleScrollSpy() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScrollSpy);


  //  Mobile Hamburger Menu Drawer


  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile drawer when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }



  //   Interactive Menu Category Filter


  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });



  // FAQ Accordion (Simple Single Item Open Only)

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // 1. Close all FAQ items
      faqItems.forEach(el => {
        el.classList.remove('active');
        el.querySelector('.faq-content').style.maxHeight = null;
      });

      // 2. Open clicked FAQ item if it was closed
      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  //   Simple Photo Gallery Lightbox

  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  let currentGalleryIndex = 0;

  function showGalleryImage(index) {
    if (!galleryItems.length) return;
    currentGalleryIndex = (index + galleryItems.length) % galleryItems.length;
    const img = galleryItems[currentGalleryIndex].querySelector('img');
    if (img && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Gallery Image';
    }
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      showGalleryImage(index);
      if (lightbox) lightbox.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightbox) lightbox.classList.remove('active');
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => showGalleryImage(currentGalleryIndex - 1));
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => showGalleryImage(currentGalleryIndex + 1));
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') lightbox.classList.remove('active');
      if (e.key === 'ArrowRight') showGalleryImage(currentGalleryIndex + 1);
      if (e.key === 'ArrowLeft') showGalleryImage(currentGalleryIndex - 1);
    }
  });

  //   Simple Testimonial Slider (Continuous 1-Direction Infinite Loop)

  const track = document.querySelector(".testimonial-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  const container = document.querySelector(".testimonials-slider-container");

  let currentIndex = 0;
  let autoSlide;
  let isTransitioning = false; // Transition lock flag to prevent rapid-click bugs

  // Clone cards once for continuous infinite scroll

  if (track && cards.length) {
    cards.forEach(card => {
      track.appendChild(card.cloneNode(true));
    });
  }


  function updateSlider() {
    if (!track || !cards.length) return;
    const cardWidth = cards[0].offsetWidth;
    const gap = 24;
    const moveDistance = (cardWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${moveDistance}px)`;
  }

  function nextSlide() {
    // Ignore click if a slide transition is currently running
    if (isTransitioning) return;
    isTransitioning = true; // Lock transitions

    currentIndex++;
    track.style.transition = "transform 0.5s ease";
    updateSlider();
  }

  function prevSlide() {
    // Ignore click if a slide transition is currently running
    if (isTransitioning) return;
    isTransitioning = true; // Lock transitions

    if (currentIndex <= 0) {
      // Jump instantly to cloned position before sliding back
      track.style.transition = "none";
      currentIndex = cards.length;
      updateSlider();
      void track.offsetWidth; // Force browser reflow to apply instant jump
    }
    currentIndex--;
    track.style.transition = "transform 0.5s ease";
    updateSlider();
  }

  // Handle seamless reset from cloned slides back to original start after transition finishes
  if (track) {
    track.addEventListener("transitionend", (e) => {
      // Ensure we only handle transform transition end
      if (e.propertyName !== "transform") return;

      if (currentIndex >= cards.length) {
        track.style.transition = "none"; // Disable animation
        currentIndex = 0;                // Reset index to original start
        updateSlider();                  // Move to start position instantly
        void track.offsetWidth;          // Force browser reflow
      }

      isTransitioning = false; // Unlock transition so next slide can happen
    });
  }

  // Manual navigation buttons with autoplay timer reset
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoSlide(); // Reset autoplay timer on click to prevent race condition
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoSlide(); // Reset autoplay timer on click to prevent race condition
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(nextSlide, 3000);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  if (container) {
    container.addEventListener("mouseenter", stopAutoSlide);
    container.addEventListener("mouseleave", startAutoSlide);
  }

  window.addEventListener("resize", () => {
    if (track) track.style.transition = "none";
    updateSlider();
  });

  updateSlider();
  startAutoSlide();

  // Contact Form Validation

  const contactForm = document.getElementById('contactForm');
  const successAlert = document.getElementById('formSuccessAlert');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      // Name Validation
      const nameGroup = nameInput.parentElement;
      if (nameInput.value.trim() === '') {
        nameGroup.classList.add('error');
        isValid = false;
      } else {
        nameGroup.classList.remove('error');
      }

      // Email Validation
      const emailGroup = emailInput.parentElement;
      if (!validateEmail(emailInput.value.trim())) {
        emailGroup.classList.add('error');
        isValid = false;
      } else {
        emailGroup.classList.remove('error');
      }

      // Message Validation
      const messageGroup = messageInput.parentElement;
      if (messageInput.value.trim().length < 10) {
        messageGroup.classList.add('error');
        isValid = false;
      } else {
        messageGroup.classList.remove('error');
      }

      if (isValid) {
        if (successAlert) {
          successAlert.style.display = 'block';
          contactForm.reset();
          setTimeout(() => {
            successAlert.style.display = 'none';
          }, 5000);
        }
      }
    });
  }

  //   Newsletter Subscription Validation

  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      if (input && validateEmail(input.value.trim())) {
        alert('Thank you for subscribing to Aroma Craft updates!');
        input.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  //   Item Order Modal Popup and Toast Notification

  const orderModal = document.getElementById('orderModal');
  const orderModalImg = document.getElementById('orderModalImg');
  const orderModalTitle = document.getElementById('orderModalTitle');
  const orderModalPrice = document.getElementById('orderModalPrice');
  const orderModalDesc = document.getElementById('orderModalDesc');
  const orderModalClose = document.getElementById('orderModalClose');
  const confirmOrderBtn = document.getElementById('confirmOrderBtn');

  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  let activeItemName = 'Coffee Item';

  // Delegate click for any order button inside bento or menu card
  document.addEventListener('click', (e) => {
    const orderBtn = e.target.closest('.btn-order');
    if (!orderBtn) return;

    const card = orderBtn.closest('.bento-card, .menu-card');
    if (!card) return;

    const imgEl = card.querySelector('img');
    const titleEl = card.querySelector('.bento-title, .menu-card-title');
    const priceEl = card.querySelector('.bento-price, .menu-card-price');
    const descEl = card.querySelector('.bento-desc, .menu-card-desc');

    activeItemName = titleEl.textContent;
    const priceText = priceEl.textContent;
    const imgSrc = imgEl.src;
    const descText = descEl.textContent;

    if (orderModalImg) {
      orderModalImg.src = imgSrc;
      orderModalImg.alt = activeItemName;
    }
    if (orderModalTitle) orderModalTitle.textContent = activeItemName;
    if (orderModalPrice) orderModalPrice.textContent = priceText;
    if (orderModalDesc) orderModalDesc.textContent = descText;

    if (orderModal) orderModal.classList.add('active');
  });

  function closeOrderModal() {
    if (orderModal) orderModal.classList.remove('active');
  }

  if (orderModalClose) {
    orderModalClose.addEventListener('click', closeOrderModal);
  }

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeOrderModal();
    });
  }

  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', () => {
      closeOrderModal();
      showToast(`Your order for "${activeItemName}" has been placed successfully!`);
    });
  }

});
