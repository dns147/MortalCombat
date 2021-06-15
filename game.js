import { getRandomNum, createElement } from './utils.js';
import { player1, player2 } from './player.js';
import { generateLogs } from './logs.js';

export const $formFight = document.querySelector('.control');
export const $arena = document.querySelector('.arenas');

const $randomButton = document.querySelector('.button');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
 
const ATTACK = ['head', 'body', 'foot'];

//--- Параметры атаки врага ----
export function enemyAttack() {
    const hit = ATTACK[getRandomNum(0, 2)];
    const defence = ATTACK[getRandomNum(0, 2)];
 
    return {
       value: getRandomNum(1, HIT[hit]),
       hit,
       defence,
    }
}
 
//--- Параметры атаки игрока ----
export function playerAttack() {
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
 
//--- Получение результата атаки ----
export function showResult() {
    const { name: name1, hp: hp1 } = player1;
    const { name: name2, hp: hp2 } = player2;
 
    if (hp1 === 0 || hp2 === 0) {
       $randomButton.disabled = true;
       createReloadButton();
    }
 
    if (hp1 === 0 && hp1 < hp2) {
       $arena.appendChild(playerWin(name2));
       generateLogs('end', player2, player1);
    } else if (hp2 === 0 && hp2 < hp1) {
       $arena.appendChild(playerWin(name1));
       generateLogs('end', player1, player2);
    } else if (hp1 === 0 && hp2 === 0) {
       $arena.appendChild(playerWin());
       generateLogs('draw');
    }   
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