const player1 = {
   name: 'subzero',
   hp: 80,
   img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
   weapon: ['spoon', 'fork'],
   attack: function() {
      console.log(name + 'Fight...');
   },
};

const player2 = {
   name: 'sonya',
   hp: 50,
   img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
   weapon: ['rollingPin', 'fryingPan'],
   attack: function() {
      console.log(name + 'Fight...');
   },
};

const $arena = document.querySelector('.arenas');

function createPlayer(playerClass, playerObj) {
   const $player = document.createElement('div');
   $player.classList.add(playerClass);
   $arena.appendChild($player);

   const $progressbar = document.createElement('div');
   $progressbar.classList.add('progressbar');
   $player.appendChild($progressbar);

   const $life = document.createElement('div');
   $life.classList.add('life');
   $life.style.width = `${playerObj.hp}%`;
   $progressbar.appendChild($life);

   const $name = document.createElement('div');
   $name.classList.add('name');
   $name.innerText = playerObj.name;
   $name.style.textTransform = 'uppercase';
   $progressbar.appendChild($name);

   const $character = document.createElement('div');
   $character.classList.add('character');
   $player.appendChild($character);

   const $img = document.createElement('img');
   $img.setAttribute('src', playerObj.img);
   $character.appendChild($img);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
