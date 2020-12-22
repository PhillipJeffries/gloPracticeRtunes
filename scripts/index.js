import radioPlayerInit from './radioPlayer.js';//export default without breakets
import {audioPlayerInit} from './audioPlayer.js';
import {videoPlayerInit} from './videoPlayer.js';


const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

//функция перебирает коллекцию элементов
const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach((item) => item.classList.remove('active')); //фигурные скобки можно убрать, если выржение помещается на одной строке
  playerBlock.forEach(item => item.classList.remove('active')); // если передаётся только один аргумент, то можно убрать круглые скобки
};

playerBtn.forEach((btn, i) => {
  btn.addEventListener('click', ()=> {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active')
  })
})


radioPlayerInit();
audioPlayerInit();
videoPlayerInit();
