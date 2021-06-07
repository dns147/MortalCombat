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
};

function createElement(tag, className) {
   const $tag = document.createElement(tag);

   if (className) {
      $tag.classList.add(className);
   }

   return $tag;
}

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

function changeHP(playerObj, num) {
   const $playerLife = document.querySelector(`.player${playerObj.player} .life`);
   playerObj.hp -= num;

   if (playerObj.hp < 0) {
      playerObj.hp = 0;
   }

   $playerLife.style.width = `${playerObj.hp}%`;
   
   if (playerObj.hp === 0 && playerObj.player === 1) {
      $arena.appendChild(playerWin(player2.name));
      $randomButton.disabled = true;
   } else if (playerObj.hp === 0 && playerObj.player === 2) {
      $arena.appendChild(playerWin(player1.name));
      $randomButton.disabled = true;
   }
}

function playerWin(name) {
   const $winTitle = createElement('div', 'loseTitle');
   $winTitle.innerText = name + ' win';

   return $winTitle;
}

$randomButton.addEventListener('click', function() {
   changeHP(player1, randomNum(1, 20));
   changeHP(player2, randomNum(1, 20));
});

function randomNum(a, b) {
   return Math.floor(Math.random() * (b - a + 1)) + a;
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

