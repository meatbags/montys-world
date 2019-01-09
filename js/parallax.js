/*
 * Parallax
 * Handle auto-scrolling, parallax events and animations.
 */

import { mobileCheck } from './mobile_check';

class Parallax {
  constructor() {
    this.isMobile = mobileCheck();
    this.mobileBreakpoint = 800;
    this.animation = {};
    this.target = {
      scrollHint: document.querySelector('.scroll-hint'),
      sections: document.querySelectorAll('.section')
    };

    // bind scroll
    window.addEventListener('scroll', () => { this.parallax(); });

    // bind back-to-top
    document.querySelectorAll('.back-to-top').forEach(el => {
      el.addEventListener(this.isMobile ? 'touchstart' : 'mousedown', () => {
        if (!this.lock) {
          this.scrollTo(this.target.sections[0], 2);
        }
      });
    });

    // prevent scrolling defaults
    const onWheel = e => { this.onWheel(e); };
    window.onwheel = onWheel;
    window.onmousewheel = document.onmousewheel = onWheel;
    window.ontouchmove = onWheel;
    document.onkeydown = e => {
      if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        this.preventDefault(e);
      }
    }

    // snap on resize
    window.addEventListener('resize', () => { this.resize(); });
  }

  onWheel(evt) {
    // perform autoscroll on valid screens
    if (!(this.isMobile || window.innerWidth < this.mobileBreakpoint)) {
      this.preventDefault(evt);

      if (!this.lock) {
        const currentIndex = this.getCurrentIndex();
        const next = evt.deltaY < 0 ? currentIndex - 1 : currentIndex + 1;
        if (next >= 0 && next < this.target.sections.length) {
          this.scrollTo(this.target.sections[next], 1);
        }
      }
    }
  }

  resize() {
    // snap to nearest section
    const index = this.getCurrentIndex();
    document.documentElement.scrollTop += this.target.sections[index].getBoundingClientRect().top;
  }

  getCurrentIndex() {
    // find nearest section index
    const y = document.body.scrollTop || document.documentElement.scrollTop;
    let currentIndex = 0;
    let distance = 1000;
    let index = 0;

    this.target.sections.forEach(e => {
      const rect = e.getBoundingClientRect();
      const dy = Math.abs(rect.top) - y;
      if (dy < distance) {
        distance = dy;
        currentIndex = index;
      }
      index += 1;
    });

    return currentIndex;
  }

  parallax() {
    // perform parallax events
    const y = document.body.scrollTop || document.documentElement.scrollTop;
    if (y == 0) {
      this.target.scrollHint.classList.remove('hidden');
    } else {
      this.target.scrollHint.classList.add('hidden');
    }
  }

  scrollTo(el, dur) {
    // set animation
    this.animation.start = document.documentElement.scrollTop;
    this.animation.stop = this.animation.start + el.getBoundingClientRect().top;
    this.animation.range = this.animation.stop - this.animation.start;
    this.animation.time = (new Date()).getTime();
    this.animation.age = 0;
    this.animation.duration = dur;

    // lock & run
    this.lock = true;
    this.loop();
  }

  loop() {
    // perform scroll animation loop
    if (this.lock) {
      requestAnimationFrame(() => { this.loop() });
      const now = (new Date()).getTime();
      this.animation.age += (now - this.animation.time) / 1000.0;

      // check if done
      if (this.animation.age >= this.animation.duration) {
        document.documentElement.scrollTop = this.animation.stop;
        this.lock = false;
      } else {
        let t = this.animation.age / this.animation.duration;
        t = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const res = this.animation.start + Math.round(this.animation.range * t);
        document.documentElement.scrollTop = res;
        this.animation.time = now;
      }
    }
  }

  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }
}

export { Parallax };
