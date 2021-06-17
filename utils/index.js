//--- Получение случайного числа в диапазоне ----
export const getRandomNum = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

//--- Создание элемента DOM ----
export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
 
    if (className) {
       $tag.classList.add(className);
    }
 
    return $tag;
};

//--- Изменение HP игрока ----
export const makeChangeHP = (plr, value) => {
    plr.changeHP(value);
    const $playerLife = plr.elHP();
    plr.renderHP($playerLife);
}
 
//--- Получение времени ----
export const getDate = () => {
    let date = new Date();
    let min = date.getMinutes();
 
    if (min > 10) {
       return `${date.getHours()}:${date.getMinutes()}`;
    } else {
       return `${date.getHours()}:0${date.getMinutes()}`;
    }
}



