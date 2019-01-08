/**
 ** Parallax
 ** Handle parallax events.
 **/

class Parallax {
  constructor() {
    // targets
    this.target = {
      scrollHint: document.querySelector('.scroll-hint'),
    };

    // bind scroll
    window.addEventListener('scroll', () => { this.onScroll(); });
  }

  onScroll() {
    const y = document.body.scrollTop || document.documentElement.scrollTop;

    if (y == 0) {
      this.target.scrollHint.classList.remove('hidden');
    } else {
      this.target.scrollHint.classList.add('hidden');
    }
  }
}

export { Parallax };
