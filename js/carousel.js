/*
 * Carousel
 * Simple carousel functionality.
 */

class Carousel {
  constructor() {
    // get targets
    this.target = {
      carousel: document.querySelector('#carousel'),
      buttonLeft: document.querySelector('#carousel-button-left'),
      buttonRight: document.querySelector('#carousel-button-right'),
      indexCurrent: document.querySelector('#carousel-slide-index-current'),
      indexMax: document.querySelector('#carousel-slide-index-max'),
      wrapper: document.querySelector('#carousel-wrapper'),
      slider: document.querySelector('#carousel-slider'),
      slides: document.querySelectorAll('.carousel__slide'),
    };
    this.currentIndex = 0;
    this.maxIndex = this.target.slides.length - 1;

    // bind controls
    this.target.buttonLeft.addEventListener('mousedown', () => { this.goToIndex(this.currentIndex - 1); });
    this.target.buttonRight.addEventListener('mousedown', () => { this.goToIndex(this.currentIndex + 1); });
    this.target.buttonLeft.addEventListener('touchstart', () => { this.goToIndex(this.currentIndex - 1); });
    this.target.buttonRight.addEventListener('touchstart', () => { this.goToIndex(this.currentIndex + 1); });
    window.addEventListener('resize', () => { this.resize(); });

    // initialise carousel
    this.setIndex();
    this.resize();
    this.target.carousel.classList.add('active');
  }

  goToIndex(index) {
    const clamped = Math.min(this.maxIndex, Math.max(0, index));
    if (clamped != this.currentIndex) {
      this.currentIndex = clamped;
      this.setIndex();
      this.setSlide();
    }
  }

  setIndex() {
    // set index and
    const i = this.currentIndex + 1;
    const j = this.maxIndex + 1;
    this.target.indexCurrent.innerHTML = `${i > 9 ? i : '0' + i}`;
    this.target.indexMax.innerHTML = `${j > 9 ? j : '0' + j}`;
  }

  setSlide() {
    const parentRect = this.target.slider.getBoundingClientRect();
    const childRect = this.target.slides[this.currentIndex].getBoundingClientRect();
    const dx = parentRect.left - childRect.left;
    this.target.slider.style.transform = `translateX(${dx}px)`;
    this.target.slider.querySelectorAll('.active').forEach(el => { el.classList.remove('active'); });
    this.target.slides[this.currentIndex].classList.add('active');
  }

  resize() {
    // resize slides to fit wrapper
    const rect = this.target.wrapper.getBoundingClientRect();
    this.target.slides.forEach(el => {
      el.style.width = `${rect.width}px`;
    });

    // snap to current slide
    this.target.slider.classList.add('transition-lock');
    this.setSlide();
    this.target.slider.classList.remove('transition-lock');
  }
}

export { Carousel };
