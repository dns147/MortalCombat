import { getRandomNum, createElement, makeChangeHP, getDate } from '../utils/index.js';
import { $formFight, $chat, $randomButton, $arena, player1, player2, HIT, ATTACK, LOGS } from '../constans/index.js';

class Game {
   constructor(props) {
   }

   //--- Создание кнопки Restart ----
   createReloadButton = () => {
      const $reloadDiv = createElement('div', 'reloadWrap');
      $arena.appendChild($reloadDiv);

      const $reloadButton = createElement('button', 'button');
      $reloadButton.innerText = 'Restart';
      $reloadDiv.appendChild($reloadButton);

      $reloadButton.addEventListener('click', function() {
         window.location.reload();
      });
   }

   //--- Создание победившего игрока ----
   playerWin = (name) => {
      const $winTitle = createElement('div', 'loseTitle');

      if (name) {
         $winTitle.innerText = name + ' wins';
      } else {
         $winTitle.innerText = 'draw';
      }

      return $winTitle;
   }

   //--- Параметры атаки врага ----
   enemyAttack = () => {
      const hit = ATTACK[getRandomNum(0, 2)];
      const defence = ATTACK[getRandomNum(0, 2)];

      return {
         value: getRandomNum(1, HIT[hit]),
         hit,
         defence,
      }
   }

   //--- Параметры атаки игрока ----
   playerAttack = () => {
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

   //--- Создание лога игры ----
   generateLogs = (type, {name: name1}, {name: name2, hp: hp}, value) => {
      let text = null;
      const n = LOGS[type].length - 1;
      
      switch (type) {
         case 'start':
            text = LOGS[type]
            .replace('[time]', getDate())
            .replace('[player1]', name2)
            .replace('[player2]', name1);
            break;
   
         case 'end':
            text = LOGS[type][getRandomNum(0, n)]
            .replace('[playerWins]', name1)
            .replace('[playerLose]', name2);
            break;
   
         case 'hit':
            text = `${getDate()} - ${LOGS[type][getRandomNum(0, n)]
            .replace('[playerKick]', name1)
            .replace('[playerDefence]', name2)} -${value} [${hp}/100]`;
            break;
   
         case 'defence':
            text = `${getDate()} - ${LOGS[type][getRandomNum(0, n)]
            .replace('[playerKick]', name1)
            .replace('[playerDefence]', name2)}`;
            break;
   
         case 'draw':
            text = LOGS[type];
            break;  
      }
   
      const el = `<p>${text}</p>`
      $chat.insertAdjacentHTML('afterbegin', el);
   }

   //--- Получение результата атаки ----
   showResult = () => {
      const { name: name1, hp: hp1 } = player1;
      const { name: name2, hp: hp2 } = player2;

      if (hp1 === 0 || hp2 === 0) {
         $randomButton.disabled = true;
         this.createReloadButton();
      }

      if (hp1 === 0 && hp1 < hp2) {
         $arena.appendChild(this.playerWin(name2));
         this.generateLogs('end', player2, player1);
      } else if (hp2 === 0 && hp2 < hp1) {
         $arena.appendChild(this.playerWin(name1));
         this.generateLogs('end', player1, player2);
      } else if (hp1 === 0 && hp2 === 0) {
         $arena.appendChild(this.playerWin());
         this.generateLogs('draw');
      }   
   }

   //--- Обработка события по нажатию на кнопку ----
   handleEvent = () => {
      const that = this;

      $formFight.addEventListener('submit', function(event) {
         event.preventDefault();

         const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = that.enemyAttack();
         const {hit: hitPlayer, defence: defencePlayer, value: valuePlayer} = that.playerAttack();
         
         //--- Проверка не попадания в защиту для player1 ----
         if (defencePlayer !== hitEnemy) {
            makeChangeHP(player1, valueEnemy);
            that.generateLogs('hit', player2, player1, valueEnemy);
         } else {
            that.generateLogs('defence', player2, player1);
         }
      
         //--- Проверка не попадания в защиту для player2 ----
         if (defenceEnemy !== hitPlayer) {
            makeChangeHP(player2, valuePlayer);
            that.generateLogs('hit', player1, player2, valuePlayer);
         } else {
            that.generateLogs('defence', player1, player2);
         }
      
         that.showResult();
      });
   }

   start = () => {
      player1.createPlayer();
      player2.createPlayer();
   
      this.generateLogs('start', player2, player1);

      this.handleEvent();
   }
}

export default Game;