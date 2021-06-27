import { getRandomNum } from '../utils/index.js';
import { ATTACK } from '../constans/index.js';


export class Request {
   constructor(props) {
      this.url = props.url;
   }

   getPlayers = () => fetch(this.url).then(res => res.json());

   fight = async() => {
      const hit = ATTACK[getRandomNum(0, 2)];
      const defence = ATTACK[getRandomNum(0, 2)];

      const response =  await fetch(this.url, {
         method: 'POST',
         body: JSON.stringify({
            hit,
            defence,
         }),
      });

      const result = await response.json();

      return result;     
   }
}
