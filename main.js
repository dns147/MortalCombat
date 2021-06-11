const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const HIT = {
   head: 30,
   body: 25,
   foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
   player: 1,
   name: 'subzero',
   hp: 100,
   img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
   weapon: ['spoon', 'fork'],
   attack,
   changeHP,
   elHP,
   renderHP,
};

const player2 = {
   player: 2,
   name: 'sonya',
   hp: 100,
   img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
   weapon: ['rollingPin', 'fryingPan'],
   attack,
   changeHP,
   elHP,
   renderHP,
};

//--- Создание элемента DOM ----
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

function attack() {
   console.log(this.name + 'Fight...');
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

//--- Создание победившего игрока ----
function playerWin(name) {
   const $winTitle = createElement('div', 'loseTitle');

   if (name) {
      $winTitle.innerText = name + ' wins';
   } else {
      $winTitle.innerText = 'draw';
   }

   return $winTitle;
}

//--- Получение случайного числа в диапазоне ----
function getRandomNum(a, b) {
   return Math.floor(Math.random() * (b - a + 1)) + a;
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

//--- Создание атакующих значений ----
function enemyAttack() {
   const hit = ATTACK[getRandomNum(0, 2)];
   const defence = ATTACK[getRandomNum(0, 2)];

   return {
      value: getRandomNum(1, HIT[hit]),
      hit,
      defence,
   }
}

$formFight.addEventListener('submit', function(event) {
   event.preventDefault();
   
   const enemy = enemyAttack();
   const attack = {};

   for (let item of $formFight) {
      if (item.checked && item.name === 'hit') {
         attack.value = getRandomNum(1, HIT[item.value]);
         attack.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
         attack.defence = item.value;
      }

      item.checked = false;
   }

//--- Проверка не попадания в защиту для player1 ----
   if (enemy.defence !== attack.hit) {
      makeChange(player1, enemy.value);
   }

//--- Проверка не попадания в защиту для player2 ----
   if (attack.defence !== enemy.hit) {
      makeChange(player2, attack.value);
   }

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

//--- Изменение HP игрока ----
function makeChange(plr, value) {
   plr.changeHP(value);
   const $playerLife = plr.elHP();
   plr.renderHP($playerLife);
}