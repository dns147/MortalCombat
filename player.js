export const player1 = {
   player: 1,
   name: 'SUBZERO',
   hp: 100,
   img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
   weapon: ['spoon', 'fork'],
   changeHP,
   elHP,
   renderHP,
};

export const player2 = {
   player: 2,
   name: 'SONYA',
   hp: 100,
   img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
   weapon: ['rollingPin', 'fryingPan'],
   changeHP,
   elHP,
   renderHP,
};

//--- Изменение HP ----
function changeHP(num) {
   this.hp -= num;

   if (this.hp <= 0) {
      this.hp = 0;
   }
}

//--- Поиск элемента HP ----
function elHP() {
   return document.querySelector(`.player${this.player} .life`);
}

//--- Перерисовка элемента HP ----
function renderHP(elem) {
   elem.style.width = `${this.hp}%`;
}