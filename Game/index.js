import { getRandomNum, createElement, makeChangeHP, getDate } from '../utils/index.js';
import { $formFight, $chat, $randomButton, $arena, HIT, LOGS } from '../constans/index.js';
import { Player } from '../Player/index.js';
import { Request } from '../Request/index.js';

class Game {
   constructor() {
      this.player1 = null;
      this.player2 = null;
      this.fightBase = null;
   }

   start = async() => {
      const enemyBase = new Request({
         url: 'https://reactmarathon-api.herokuapp.com/api/mk/players',
      });

      this.fightBase = new Request({
         url: 'https://reactmarathon-api.herokuapp.com/api/mk/player/fight',
      });      
      
      //--- Получение выбранного игрока из localStorage ----
      const player = JSON.parse(localStorage.getItem('player1'));

      //--- Выбор врага случайным образом ----
      const enemies = await enemyBase.getPlayers();
      const enemy = enemies[getRandomNum(0, enemies.length - 1)];

      this.player1 = new Player({
         ...player,
         player: 1,
         rootSelector: 'arenas',
      });

      this.player2 = new Player({
         ...enemy,
         player: 2,
         rootSelector: 'arenas',
      });

      this.player1.createPlayer();
      this.player2.createPlayer();
   
      this.generateLogs('start', this.player2, this.player1);

      this.handleEvent();
   }

   //--- Создание кнопки Restart ----
   createReloadButton = () => {
      const $reloadDiv = createElement('div', 'reloadWrap');
      $arena.appendChild($reloadDiv);

      const $reloadButton = createElement('button', 'button');
      $reloadButton.innerText = 'Restart';
      $reloadDiv.appendChild($reloadButton);

      $reloadButton.addEventListener('click', function() {
         window.location.pathname = 'index.html';
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

   //--- Параметры атаки выбранного из localStorage игрока ----
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
      const { name: name1, hp: hp1 } = this.player1;
      const { name: name2, hp: hp2 } = this.player2;

      if (hp1 === 0 || hp2 === 0) {
         $randomButton.disabled = true;
         this.createReloadButton();
      }

      if (hp1 === 0 && hp1 < hp2) {
         $arena.appendChild(this.playerWin(name2));
         this.generateLogs('end', this.player2, this.player1);
      } else if (hp2 === 0 && hp2 < hp1) {
         $arena.appendChild(this.playerWin(name1));
         this.generateLogs('end', this.player1, this.player2);
      } else if (hp1 === 0 && hp2 === 0) {
         $arena.appendChild(this.playerWin());
         this.generateLogs('draw', {}, {});
      }   
   }

   //--- Обработка события по нажатию на кнопку ----
   handleEvent = () => {
      const that = this;

      $formFight.addEventListener('submit', async function(event) {
         event.preventDefault();

         //--- Параметры атаки врага, выбираются случайным образом ----
         const fight = await that.fightBase.fight();

         const {value: valuePlayer, hit: hitPlayer, defence: defencePlayer} = that.playerAttack();
         const {value: valueEnemy, hit: hitEnemy, defence: defenceEnemy} = fight.player2;
                  
         //--- Проверка не попадания в защиту для player1 ----
         if (defencePlayer !== hitEnemy) {
            makeChangeHP(that.player1, valueEnemy);
            that.generateLogs('hit', that.player2, that.player1, valueEnemy);
         } else {
            that.generateLogs('defence', that.player2, that.player1);
         }
      
         //--- Проверка не попадания в защиту для player2 ----
         if (defenceEnemy !== hitPlayer) {
            makeChangeHP(that.player2, valuePlayer);
            that.generateLogs('hit', that.player1, that.player2, valuePlayer);
         } else {
            that.generateLogs('defence', that.player1, that.player2);
         }
      
         that.showResult();
      });
   }
}

export default Game;
