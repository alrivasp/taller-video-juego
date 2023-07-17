const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  
  canvas.setAttribute('width', canvasSize + 45);
  canvas.setAttribute('height', canvasSize + 20);
  
  elementsSize = canvasSize /10;

  startGame();
}

function startGame() {
  game.font = elementsSize  + 'px Geneva';
  game.textAlign = 'center';

  const map = maps[0];
  const mapRows = map.trim().split('\n')
  const mapRowsCols = mapRows.map(row => row.trim().split(''))

  game.clearRect(0, 0, canvasSize + 45, canvasSize + 20)

  mapRowsCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const postX = elementsSize * (colIndex + 1);
      const postY = elementsSize * (rowIndex + 1);

      if ( col == 'O') {
        if(!playerPosition.x && !playerPosition.y) {
          playerPosition.x = postX;
          playerPosition.y = postY;
        }
      };

      game.fillText(emoji, postX, postY);
    });
  });

  movePlayer();
}

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
  if((playerPosition.y - elementsSize) < 0) return;
  playerPosition.y -= elementsSize;
  startGame();
}
function moveLeft() {
  if((playerPosition.x - elementsSize) < 20) return;
  playerPosition.x -= elementsSize;
  startGame();
}
function moveRight() {
  if((playerPosition.x + elementsSize) > (canvasSize + 45)) return;
  playerPosition.x += elementsSize;
  startGame();
}
function moveDown() {
  if((playerPosition.y + elementsSize) > canvasSize) return;
  playerPosition.y += elementsSize;
  startGame();
}