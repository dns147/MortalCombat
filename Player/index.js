import { createElement } from '../utils/index.js';

export class Player {
   constructor(props) {
      this.name = props.name;
      this.hp = props.hp;
      this.img = props.img;
      this.player = props.player;
      this.selector = `player${this.player}`;
      this.rootSelector = props.rootSelector;
   }

   //--- Изменение HP ----
   changeHP = (num) => {
      this.hp -= num;

      if (this.hp <= 0) {
         this.hp = 0;
      }
   }

   //--- Поиск элемента HP ----
   elHP = () => document.querySelector(`.${this.selector} .life`);

   //--- Перерисовка элемента HP ----
   renderHP = (elem) => {
      elem.style.width = `${this.hp}%`;
      elem.classList.add('anim');
   }

   //--- Создание игрока ----
   createPlayer = () => {
      const $player = createElement('div', this.selector);

      const $progressbar = createElement('div', 'progressbar');
      $player.appendChild($progressbar);

      const $life = createElement('div', 'life');
      $life.style.width = `${this.hp}%`;
      $progressbar.appendChild($life);

      const $name = createElement('div', 'name');
      $name.innerText = this.name;
      $name.style.textTransform = 'uppercase';
      $progressbar.appendChild($name);

      const $character = createElement('div', 'character');
      $player.appendChild($character);

      const $img = createElement('img');
      $img.setAttribute('src', this.img);
      $character.appendChild($img);

      const $root = document.querySelector(`.${this.rootSelector}`);
      $root.appendChild($player);
      
      return $player;
   }
}
