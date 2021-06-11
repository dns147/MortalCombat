const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
   head: 30,
   body: 25,
   foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const logs = {
   start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
   end: [
      'Результат удара [playerWins]: [playerLose] - труп',
      '[playerLose] погиб от удара бойца [playerWins]',
      'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
   ],
   hit: [
      '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
      '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
      '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
      '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
      '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
      '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
      '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
      '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
      '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
      '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
      '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
      '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
      '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
      '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
      '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
      '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
      '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
      '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
   ],
   defence: [
      '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
      '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
      '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
      '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
      '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
      '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
   ],
   draw: 'Ничья - это тоже победа!'
};

const player1 = {
   player: 1,
   name: 'SUBZERO',
   hp: 100,
   img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
   weapon: ['spoon', 'fork'],
   changeHP,
   elHP,
   renderHP,
};

const player2 = {
   player: 2,
   name: 'SONYA',
   hp: 100,
   img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
   weapon: ['rollingPin', 'fryingPan'],
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
generateLogs('start', player2, player1);

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

function playerAttack() {
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

   return attack;
}

function showResult() {
   if (player1.hp === 0 || player2.hp === 0) {
      $randomButton.disabled = true;
      createReloadButton();
   }

   if (player1.hp === 0 && player1.hp < player2.hp) {
      $arena.appendChild(playerWin(player2.name));
      generateLogs('end', player2, player1);
   } else if (player2.hp === 0 && player2.hp < player1.hp) {
      $arena.appendChild(playerWin(player1.name));
      generateLogs('end', player1, player2);
   } else if (player1.hp === 0 && player2.hp === 0) {
      $arena.appendChild(playerWin());
      generateLogs('draw');
   }   
}

//--- Изменение HP игрока ----
function makeChange(plr, value) {
   plr.changeHP(value);
   const $playerLife = plr.elHP();
   plr.renderHP($playerLife);
}

//--- Получение времени ----
function getDate() {
   let date = new Date();
   let min = date.getMinutes();

   if (min > 10) {
      return `${date.getHours()}:${date.getMinutes()}`;
   } else {
      return `${date.getHours()}:0${date.getMinutes()}`;
   }
}

function generateLogs(type, plr1, plr2, value) {
   let text = null;
   const n = logs[type].length - 1;
   
   switch (type) {
      case 'start':
         text = logs[type].replace('[time]', getDate()).replace('[player1]', plr2.name).replace('[player2]', plr1.name);
         break;

      case 'end':
         text = logs[type][getRandomNum(0, n)].replace('[playerWins]', plr1.name).replace('[playerLose]', plr2.name);
         break;

      case 'hit':
         text = `${getDate()} - ${logs[type][getRandomNum(0, n)].replace('[playerKick]', plr1.name).replace('[playerDefence]', plr2.name)} -${value} [${plr2.hp}/100]`;
         break;

      case 'defence':
         text = `${getDate()} - ${logs[type][getRandomNum(0, n)].replace('[playerKick]', plr1.name).replace('[playerDefence]', plr2.name)}`;
         break;

      case 'draw':
         text = logs[type];
         break;  
   }

   const el = `<p>${text}</p>`
   $chat.insertAdjacentHTML('afterbegin', el);
}

$formFight.addEventListener('submit', function(event) {
   event.preventDefault();
   
   const enemy = enemyAttack();
   const player = playerAttack();

//--- Проверка не попадания в защиту для player1 ----
   if (player.defence !== enemy.hit) {
      makeChange(player1, enemy.value);
      generateLogs('hit', player2, player1, enemy.value);
   } else {
      generateLogs('defence', player2, player1);
   }

//--- Проверка не попадания в защиту для player2 ----
   if (enemy.defence !== player.hit) {
      makeChange(player2, player.value);
      generateLogs('hit', player1, player2, player.value);
   } else {
      generateLogs('defence', player1, player2);
   }

   showResult();
});

