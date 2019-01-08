/**
 ** App
 ** App wrapper.
 **/

import { Carousel } from './carousel';
import { Parallax } from './parallax';

class App {
  constructor() {
    this.carousel = new Carousel();
    this.parallax = new Parallax();
  }
}

window.onload = () => {
  const app = new App();
};
