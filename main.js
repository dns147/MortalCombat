import { player1, player2 } from './player.js';
import { createElement, makeChangeHP } from './utils.js';
import { generateLogs } from './logs.js';
import { $formFight, $arena, showResult, enemyAttack, playerAttack } from './game.js';

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

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

generateLogs('start', player2, player1);

$formFight.addEventListener('submit', function(event) {
   event.preventDefault();
   
   const enemy = enemyAttack();
   const player = playerAttack();

//--- Проверка не попадания в защиту для player1 ----
   if (player.defence !== enemy.hit) {
      makeChangeHP(player1, enemy.value);
      generateLogs('hit', player2, player1, enemy.value);
   } else {
      generateLogs('defence', player2, player1);
   }

//--- Проверка не попадания в защиту для player2 ----
   if (enemy.defence !== player.hit) {
      makeChangeHP(player2, player.value);
      generateLogs('hit', player1, player2, player.value);
   } else {
      generateLogs('defence', player1, player2);
   }

   showResult();
});

