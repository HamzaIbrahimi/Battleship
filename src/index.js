import './css/normalize.css';
import './css/style.css';
import displayGrids from './util';

const div = document.querySelector('.player1');
const div1 = document.querySelector('.player2');
displayGrids(div);
displayGrids(div1);

div.addEventListener('click', (e) => {
    if (e.target) {
        console.log(e.currentTarget.c);
    }
});
