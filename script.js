
function crearMapa(cols, rows) {
    let arr = Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let map;
let cols;
let rows;
let res = 10;

function setup() {
    createCanvas(1860,900)
    cols = width / res;
    rows = height / res;

    map = crearMapa(cols, rows);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            map[i][j] = floor(random(2));
        }
    }
}
console.table(map);

function draw() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * res;
          let y = j * res;
          if (map[i][j] == 1) {
            fill(255);
            stroke(0);
            rect(x, y, res - 1, res - 1);
          }
        }
    }

    // siguiente generacion
    let nextMap = crearMapa(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let estado = map[i][j];
          // Count live neighbors!
          let vecinos = contarVecinos(map, i, j);
    
          if (estado == 0 && vecinos == 3) {
            nextMap[i][j] = 1;
          } else if (estado == 1 && (vecinos < 2 || vecinos > 3)) {
            nextMap[i][j] = 0;
          } else {
            nextMap[i][j] = estado;
          }
    
        }
      }

      map = nextMap;
      
}

function contarVecinos(grid, x, y) {
    let suma = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          let col = (x + i + cols) % cols;
          let row = (y + j + rows) % rows;
          suma += grid[col][row];
        }
    }
    suma -= grid[x][y];
    return suma;
}


