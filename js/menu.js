/*
 * Menu
 * Menu functionality.
 */

class Menu {
  constructor() {
    this.timeoutMenu = 200;
    this.timeoutMenuItem = 150;
    this.target = {
      menuButton: document.querySelector('#menu-button'),
      menu: document.querySelector('#menu'),
      sections: document.querySelectorAll('.section'),
      menuItems: document.querySelectorAll('.menu__item'),
    };

    // bind events
    this.target.menuButton.addEventListener('click', () => {
      this.toggleMenu();
    });
    this.target.menuItems.forEach(el => {
      el.addEventListener('click', evt => { this.onMenuItem(evt); });
    });
  }

  onMenuItem(evt) {
    // jump to target and close menu
    if (!this.lock) {
      const target = evt.currentTarget.dataset.target;
      const el = document.querySelector(target);
      if (el) {
        const box = el.getBoundingClientRect();
        document.documentElement.scrollTop += box.top;
        this.toggleMenu();
      }
    }
  }

  toggleMenu() {
    if (!this.lock) {
      if (this.target.menu.classList.contains('active')) {
        // close menu
        this.target.menuButton.classList.remove('active');
        this.target.sections.forEach(el => { el.classList.remove('blurred'); });
        this.target.menuItems.forEach(el => { el.classList.remove('active'); });
        this.target.menu.classList.remove('active');
        this.lock = false;
      } else {
        this.lock = true;
        this.target.menuButton.classList.add('active');
        this.target.sections.forEach(el => { el.classList.add('blurred'); });

        //  open menu
        setTimeout(() => {
          this.target.menu.classList.add('active');

          // cascade in menu items
          let index = 0;
          this.target.menuItems.forEach(el => {
            setTimeout(() => {
              el.classList.add('active');
            }, ++index * this.timeoutMenuItem);
          });

          // remove menu lock
          setTimeout(() => {
            this.lock = false;
          }, index * this.timeoutMenuItem);
        }, this.timeoutMenu);
      }
    }
  }
}

export { Menu };
