const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
   player: 1,
   name: 'subzero',
   hp: 100,
   img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
   weapon: ['spoon', 'fork'],
   attack: function() {
      console.log(name + 'Fight...');
   },
   changeHP: changeHP,
   elHP: elHP,
   renderHP: renderHP,
};

const player2 = {
   player: 2,
   name: 'sonya',
   hp: 100,
   img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
   weapon: ['rollingPin', 'fryingPan'],
   attack: function() {
      console.log(name + 'Fight...');
   },
   changeHP: changeHP,
   elHP: elHP,
   renderHP: renderHP,
};

function createElement(tag, className) {
   const $tag = document.createElement(tag);

   if (className) {
      $tag.classList.add(className);
   }

   return $tag;
}

//--- Создание кнопки Restart ----
function createReloadButton() {
   const $reloadDiv = createElement('div', 'reloadWrap');
   $arena.appendChild($reloadDiv);

   const $reloadButton = createElement('button', 'button');
   $reloadButton.innerText = 'Restart';
   $reloadDiv.appendChild($reloadButton);

   $reloadButton.addEventListener('click', function() {
      window.location.reload();
   });
}

//--- Создание игрока ----
function createPlayer(playerObj) {
   const $player = createElement('div', 'player' + playerObj.player);

   const $progressbar = createElement('div', 'progressbar');
   $player.appendChild($progressbar);

   const $life = createElement('div', 'life');
   $life.style.width = `${playerObj.hp}%`;
   $progressbar.appendChild($life);

   const $name = createElement('div', 'name');
   $name.innerText = playerObj.name;
   $name.style.textTransform = 'uppercase';
   $progressbar.appendChild($name);

   const $character = createElement('div', 'character');
   $player.appendChild($character);

   const $img = createElement('img');
   $img.setAttribute('src', playerObj.img);
   $character.appendChild($img);

   return $player;
}

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

function playerWin(name) {
   const $winTitle = createElement('div', 'loseTitle');

   if (name) {
      $winTitle.innerText = name + ' wins';
   } else {
      $winTitle.innerText = 'draw';
   }

   return $winTitle;
}

$randomButton.addEventListener('click', function() {
   player1.changeHP(getRandomNum(1, 20));
   const $player1Life = player1.elHP();
   player1.renderHP($player1Life);

   player2.changeHP(getRandomNum(1, 20));
   const $player2Life = player2.elHP();
   player2.renderHP($player2Life);

   if (player1.hp === 0 || player2.hp === 0) {
      $randomButton.disabled = true;
      createReloadButton();
   }

   if (player1.hp === 0 && player1.hp < player2.hp) {
      $arena.appendChild(playerWin(player2.name));
   } else if (player2.hp === 0 && player2.hp < player1.hp) {
      $arena.appendChild(playerWin(player1.name));
   } else if (player1.hp === 0 && player2.hp === 0) {
      $arena.appendChild(playerWin());
   }
});

function getRandomNum(a, b) {
   return Math.floor(Math.random() * (b - a + 1)) + a;
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

