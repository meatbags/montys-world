/*
 * App
 * App wrapper.
 */

import { Carousel } from './carousel';
import { Parallax } from './parallax';
import { Menu } from './menu';

class App {
  constructor() {
    this.carousel = new Carousel();
    this.parallax = new Parallax();
    this.menu = new Menu();
  }
}

window.onload = () => {
  const app = new App();
};
