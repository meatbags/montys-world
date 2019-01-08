/**
 ** Carousel
 ** Simple carousel functionality.
 **/

class Carousel {
  constructor() {
    // get targets
    this.target = {
      buttonLeft: document.querySelector('#carousel-button-left'),
      buttonRight: document.querySelector('#carousel-button-right'),
      indexCurrent: document.querySelector('#carousel-slide-index-current'),
      indexMax: document.querySelector('#carousel-slide-index-max'),
      slider: document.querySelector('#carousel-slider'),
      slides: document.querySelectorAll('.carousel__slide'),
    };
    this.currentIndex = 0;
    this.maxIndex = this.target.slides.length - 1;

    this.target.buttonLeft.addEventListener('click', () => { this.goToIndex(this.currentIndex - 1); });
    this.target.buttonRight.addEventListener('click', () => { this.goToIndex(this.currentIndex + 1); });

    this.setIndex();
  }

  goToIndex(index) {
    const clamped = Math.min(this.maxIndex, Math.max(0, index));
    if (clamped != this.currentIndex) {
      this.currentIndex = clamped;
      this.setIndex();
    }
  }

  setIndex() {
    const i = this.currentIndex + 1;
    const j = this.maxIndex + 1;
    this.target.indexCurrent.innerHTML = `${i > 9 ? i : '0' + i}`;
    this.target.indexMax.innerHTML = `${j > 9 ? j : '0' + j}`;
  }

  resize() {
    this.target.slider.classList.add('transition-lock');

    this.target.slider.classList.remove('transition-lock');
  }
}

export { Carousel };
