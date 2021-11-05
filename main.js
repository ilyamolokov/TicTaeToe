let canvas = document.getElementById('gameCanvas');
let canvasContext = canvas.getContext("2d");
const NUM_OF_ROWS_AND_COLS = 3;
const BLOCK_WIDTH_AND_HEIGHT = 100;

let clickedRow, clickedColumn;

let player = true;

let grid = [0,0,0,  // 0 1 2
            0,0,0,  // 3 4 5
            0,0,0]; // 6 7 8

let winStates = [0,1,2,
                 3,4,5,
                 6,7,8,
                 0,3,6,
                 1,4,7,
                 2,5,8,
                 0,4,8,
                 2,4,6];

drawRect(0,0,canvas.width,canvas.height,'black');

window.addEventListener('mousedown', game);

function game(event) {
  clickedColumn = Math.floor(event.x/BLOCK_WIDTH_AND_HEIGHT);
  clickedRow = Math.floor(event.y/BLOCK_WIDTH_AND_HEIGHT);
  // console.log(clickedColumn, clickedRow);
  if (clickedColumn < NUM_OF_ROWS_AND_COLS && clickedRow < NUM_OF_ROWS_AND_COLS) {
    if (grid[blockIndex(clickedColumn, clickedRow)] == 0) {
      if (player) {
        grid[blockIndex(clickedColumn, clickedRow)] = 'X';
        checkState('X');
        player = false;
        drawSymbol('X', clickedColumn*BLOCK_WIDTH_AND_HEIGHT+(BLOCK_WIDTH_AND_HEIGHT*0.25), clickedRow*BLOCK_WIDTH_AND_HEIGHT+(BLOCK_WIDTH_AND_HEIGHT*0.75));
      } else {
        grid[blockIndex(clickedColumn, clickedRow)] = 'O';
        checkState('O');
        player = true;
        drawSymbol('O', clickedColumn*BLOCK_WIDTH_AND_HEIGHT+(BLOCK_WIDTH_AND_HEIGHT*0.25), clickedRow*BLOCK_WIDTH_AND_HEIGHT+(BLOCK_WIDTH_AND_HEIGHT*0.75));
      }
    }
  }
}

function checkState(symbol) {
  for (let i=0; i<winStates.length; i+=3) {
    if (grid[winStates[i]]==symbol && grid[winStates[i+1]]==symbol && grid[winStates[i+2]]==symbol) {
      drawRect(0,0,canvas.width,canvas.height,'black');
      canvasContext.fillStyle = 'white';
      canvasContext.font = "40px Georgia";
      canvasContext.fillText(symbol+"'s won!", 80, canvas.height/2);
      window.addEventListener('mousedown', function(event) {
        document.location.reload();
      });
    }
    if (!grid.includes(0)) {
      document.location.reload();
    }
  }
}

function blockIndex(col, row) {
  return row*NUM_OF_ROWS_AND_COLS + col;
}

function drawRect(topX, topY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(topX, topY, width, height);
}


for (let i=0; i<NUM_OF_ROWS_AND_COLS; i++) {
  for(let j=0; j<NUM_OF_ROWS_AND_COLS; j++) {
    drawRect(BLOCK_WIDTH_AND_HEIGHT*j,BLOCK_WIDTH_AND_HEIGHT*i,BLOCK_WIDTH_AND_HEIGHT-2,BLOCK_WIDTH_AND_HEIGHT-2,'white');
  }
}

function drawSymbol(text, pos1, pos2) {
  canvasContext.fillStyle = 'black';
  canvasContext.font = "70px Georgia";
  canvasContext.fillText(text, pos1, pos2);
}
